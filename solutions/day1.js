// Text: http://adventofcode.com/2016/day/1
// Input: http://adventofcode.com/2016/day/1/input
const input = "R3, L5, R2, L2, R1, L3, R1, R3, L4, R3, L1, L1, R1, L3, R2, L3, L2, R1, R1, L1, R4, L1, L4, R3, L2, L2, R1, L1, R5, R4, R2, L5, L2, R5, R5, L2, R3, R1, R1, L3, R1, L4, L4, L190, L5, L2, R4, L5, R4, R5, L4, R1, R2, L5, R50, L2, R1, R73, R1, L2, R191, R2, L4, R1, L5, L5, R5, L3, L5, L4, R4, R5, L4, R4, R4, R5, L2, L5, R3, L4, L4, L5, R2, R2, R2, R4, L3, R4, R5, L3, R5, L2, R3, L1, R2, R2, L3, L1, R5, L3, L5, R2, R4, R1, L1, L5, R3, R2, L3, L4, L5, L1, R3, L5, L2, R2, L3, L4, L1, R1, R4, R2, R2, R4, R2, R2, L3, L3, L4, R4, L4, L4, R1, L4, L4, R1, L2, R5, R2, R3, R3, L2, L5, R3, L3, R5, L2, R3, R2, L4, L3, L1, R2, L2, L3, L5, R3, L1, L3, L4, L3";

const directions = [[0,1], [1,0], [0,-1], [-1,0]];
let dir = 0; // north
let x = 0;
let y = 0;
const visited = [[0,0]];
let firstvisitedtwice = undefined;

const tokens = input.split(', ');
tokens.map(t => {
	// adjust direction
	dir = (t[0] == 'R'? dir + 1 : dir - 1 + 4) % 4;

	// increment path step by step to record all visited places
	for(let i = 0; i < parseInt(t.substr(1)); i++) {
		x += directions[dir][0];
		y += directions[dir][1];
		if(visited.some(e => e[0]==x && e[1]==y)){
			if(!firstvisitedtwice) {
				firstvisitedtwice = [x, y]
			}
		}
		visited.push([x, y]);
	}

})

console.log('Part 1 solution:', Math.abs(x) + Math.abs(y));
console.log('Part 2 solution:', Math.abs(firstvisitedtwice[0]) + Math.abs(firstvisitedtwice[1]));
