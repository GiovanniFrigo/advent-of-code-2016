# What I learned
### by trial and error

## Day 1 🎄
- `Array.indexOf()` will search inside the array using _strict equality_ (the same method used by the === or triple-equals operator). [RTFM! 📖](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf).
- This means that **using indexOf to find an array in an array of arrays will not work**:
```js
var visited=[[0,0]];
visited.indexOf([0,0]); // -1
```
This is because `[0,0] === [0,0]` is `false`.
- You can use _find_, _findIndex_ or _some_ instead `visited.findIndex(e => e[0]==x && e[1]==y)`.

## Day 7 ✨

### Part 1
Today was really challenging. Aside from splitting the string in the parts inside and outside the square brackets (regex: `/([a-z]{4,})(\[[a-z]{4,}\])*/g`, running until no more matches were found), I used a regex to detect the possible ABBA sequences.

My first attempt was to simply look for 2 characters, repeating themselves in reverse order for a total length of 4: 

`/([a-z])([a-z])\2\1/`

but this of course would also match strings of the same character repeating 4 times ('aaaa'), so an additional check was required (`$1 !== $2`).

This issue can be solved using *Negative lookahead*, so asserting that after the first matched character this would not repeat itself:

`/([a-z])(?!\1)([a-z])\2\1/`

Note that the negative lookahead group is not captured itself, so groups index are unchanged.


---
### Part 2

For part 2 things got a bit more complicated as I challenged myself to solve it with only one regex:

`/([a-z])(?!\1)([a-z])\1(?:\w*\[\w*\])*\w*\[\w*\2\1\2\w*\]|\[\w*([a-z])(?!\3)([a-z])\3\w*\](?:\w*\[\w*\])*\w*\4\3\4/g`

> 😱

Whoa. This huge regex can be split in little parts:

- First half of the regex (`([a-z])(?!\1)([a-z])\1(?:\w*\[\w*\])*\w*\[\w*\2\1\2\w*\]`):
  - The core is the requirement for an ABA string. Much like part 1, we do it this way: `([a-z])(?!\1)([a-z])\1`
  - We then look for the reversed string (BAB) inside a square brackets group: `\w*\[\w*\2\1\2\w*\]`.
  - Since an ABA should not necessarily find its own BAB in the following group, we also need to allow for unmatching square brackets groups. We do this by matching *zero or more times* complete square brackets groups and outside characters. We don't need to capture these groups as they would just mess up with the indexes, so we prepend the group with `?:`: `(?:\w*\[\w*\])*`
- Second half of the regex (`\[\w*([a-z])(?!\3)([a-z])\3\w*\](?:\w*\[\w*\])*\w*\4\3\4`) is basically needed because an ABA sequence could also find its matching BAB in a *previous* square brackets group (_**Note** that capturing groups indexes keep in count the previously assigned indexes_):
  - We look for the BAB sequence inside a square brackets group: `\[\w*([a-z])(?!\3)([a-z])\3\w*\]`
  - We look for the matching ABA sequence outside any brackets group `\w*\4\3\4`
  - We allow for unmatching square brackets groups and outside strings: `(?:\w*\[\w*\])*`
  
That was easy, wasn't it? 😅

## Day 13 🐑
Today puzzle was pretty nice, a labyrinth exploration problem. I implemented it using an [A* search algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm).  Pretty simple once you get the handle of it.

Anyway, I hate that in JS there isn't a good way to have _searchable_ sets of arrays or objects without implementing them yourself. The problem is the the same as seen in [Day 1](#day1), arrays and objects are never `strictly equal`.

 - In part 1, I used native JS `Sets`, but every time I had to insert a value in the set I would have to convert it to string (`openSet.add(start.toString());`). Same goes for items lookup (`closedSet.has(neighbor.toString())`). This also means that to extract an element from a set I would have to convert it back into an array of integers `setElement.split(',').map(i => parseInt(i))`. _UGH._

 - In part 2 I used an array based implementation, so I considered a set to be an array of arrays. Here insertion is better (just use `openSet.push(start);`), but removing an element requires filtering the whole array to exclude the searched element(`openSet = openSet.filter(c => c.toString() !== current.toString());`), not to mention item lookup (`closedSet.findIndex(e => e.toString() == neighbor.toString()) > -1`).  _OUCH!_
 
 Is there any better solution to this problem I'm not aware of yet?