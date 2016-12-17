// Text: http://adventofcode.com/2016/day/15
// Input: http://adventofcode.com/2016/day/15/input
import { readFileSync } from 'fs';

const input = readFileSync('../inputs/day15', 'utf-8');

// instructions
const inputRegex = /Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)/;

const disks = []
const initPos = [];

// load input
input.split('\n').map(line => {
	let match;
	if(match = line.match(inputRegex)) {
		disks  [parseInt(match[1])] = parseInt(match[2]);
		initPos[parseInt(match[1])] = parseInt(match[3]);
	}
});


let time = 0;
while (!disks.every((disk, i) => (time + i + initPos[i]) % disk === 0)) {
	time++;
}
console.log('Part 1 solution:', time);

// add a new disk
disks.push(11);
initPos.push(0);

time = 0;
while (!disks.every((disk, i) => (time + i + initPos[i]) % disk === 0)) {
	time++;
}

console.log('Part 2 solution:', time);
