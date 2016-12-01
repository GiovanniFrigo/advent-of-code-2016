# What I learned
## by trial and error

### Day 1
- `Array.indexOf()` will search inside the array using _strict equality_ (the same method used by the === or triple-equals operator). [RTFM! 📖](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf).
- This means that **using indexOf to find an array in an array of arrays will not work**:
```js
var visited=[[0,0]];
visited.indexOf([0,0]); // -1
```
This is because `[0,0] === [0,0]` is `false`.
- You can use _find_, _findIndex_ or _some_ instead `visited.findIndex(e => e[0]==y && e[1]==y)`.