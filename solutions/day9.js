// Text: http://adventofcode.com/2016/day/9
// Input: http://adventofcode.com/2016/day/9/input
import { readFileSync } from 'fs';

const input = readFileSync('../inputs/day9', 'utf-8');

const calcLength = (substr, recurse) => {
	const regex = /\((\d+)x(\d+)\)/g;
	let match = regex.exec(substr);

	if( match == null ) {
		return substr.length;
	}
	const markerPos = regex.lastIndex - match[0].length;

	const length = parseInt(match[1]);
	const repetitions = parseInt(match[2]);

	return markerPos
		+ ( recurse ? repetitions * calcLength(substr.substr(regex.lastIndex, length), recurse) : repetitions * length )
		+ calcLength(substr.substr(regex.lastIndex + length), recurse); 
}

console.log('Part 1 solution:', calcLength(input));
console.log('Part 2 solution:', calcLength(input, true));
