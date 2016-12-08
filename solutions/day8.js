// Text: http://adventofcode.com/2016/day/8
// Input: http://adventofcode.com/2016/day/8/input
import { readFileSync } from 'fs';

const input = readFileSync('../inputs/day8', 'utf-8');
const xSize = 50;
const ySize = 6;

// build up the screen
let screen = Array(ySize).fill().map(() => Array(xSize).fill(' '));

// helper function to print screen
const printScreen = () => {
	screen.forEach(line => {
		console.log(line.join(''));
	});
	console.log();
}

// helper function to keep a value beween bounds
const roll = (value, max) => {
	while(value < 0) {
		value += max; 
	}
	while(value >= max) {
		value -= max; 
	}
	return value;
}

// light up a rectangle of given width and height in the top left corner
const rect = (w, h) => {
	screen = screen.map((line, y) => 
		y < h ? 
			line.map((char, x) => x<w ? '#' : char)
		:
			line
	);
}

// rotate a column by the given amount of pixels
const rotateCol = (col, amount) => {
	screen = screen.map((line, y) => 
		line.map((char, x) => x==col ? screen[roll(y-amount,ySize)][x] : char)
	);
}

// rotate a row by the given amount of pixels
const rotateRow = (row, amount) => {
	screen = screen.map((line, y) => 
		y == row ? 
			line.map((char, x) => screen[y][roll(x-amount,xSize)])
		:
			line
	);
}

// instructions
const rectRegex = /rect (\d+)x(\d+)/;
const rotateColRegex = /rotate column x=(\d+) by (\d+)/;
const rotateRowRegex = /rotate row y=(\d+) by (\d+)/;

input.split('\n').map(line => {
	let match;
	if(match = line.match(rectRegex)) {
		rect(match[1], match[2]);
	} else if(match = line.match(rotateColRegex)) {
		rotateCol(match[1], match[2]);
	} else if(match = line.match(rotateRowRegex)) {
		rotateRow(match[1], match[2]);
	}
});

const countPixels = () =>
	screen.reduce((rowAcc,line) =>
		line.reduce((colAcc, char) => char === '#' ? colAcc + 1 : colAcc, rowAcc)
	, 0);

console.log('Part 1 solution:', countPixels());
console.log('Part 2 solution:'); printScreen();
