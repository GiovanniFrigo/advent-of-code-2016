// Text: http://adventofcode.com/2016/day/12
// Input: http://adventofcode.com/2016/day/12/input
import { readFileSync } from 'fs';

const input = readFileSync('../inputs/day12', 'utf-8');

// instructions
const cpy = /cpy (\d+|a|b|c|d) (a|b|c|d)/;
const inc = /inc (a|b|c|d)/;
const dec = /dec (a|b|c|d)/;
const jnz = /jnz (\d+|a|b|c|d) (-?\d+)/;

const isReg = (op) => isNaN(parseInt(op));

// load program
const program = input.split('\n').map(line => line.trim());

const run = (reg) => {
	let ip = 0;

	while( ip < program.length ) {
		const line = program[ip];

		let match;
		if(match = line.match(cpy)) {
			if(isReg(match[1])) {
				reg[match[2]] = reg[match[1]];
			} else {
				reg[match[2]] = parseInt(match[1]);
			}
		} else if(match = line.match(inc)) {
			reg[match[1]] = reg[match[1]] + 1;
		} else if(match = line.match(dec)) {
			reg[match[1]] = reg[match[1]] - 1;
		} 

		if(match = line.match(jnz)) {
			let v = isReg(match[1]) ? reg[match[1]] : parseInt(match[1]);
			if( v != 0 ) {
				ip += parseInt(match[2]);
			}
			else {
				ip++;
			}
		} else {
			ip++;
		}
	}

	return reg;
}

console.log('Part 1 solution:', run({a:0, b:0, c:0, d:0}).a);
console.log('Part 2 solution:', run({a:0, b:0, c:1, d:0}).a);
