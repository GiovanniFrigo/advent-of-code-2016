// Text: http://adventofcode.com/2016/day/7
// Input: http://adventofcode.com/2016/day/7/input
import { readFileSync } from 'fs';

const input = readFileSync('../inputs/day7', 'utf-8');

const abbaRegex = /([a-z])(?!\1)([a-z])\2\1/;
let match;

const hasABBA = (input) => {
	for(let i = 0; i<=input.length-4; i++)
	{
		if(input.substr(i).match(abbaRegex)) {
			return true;
		}
	}
	return false;
}

const tlsIPs = input.split('\n').filter(line => {
	const regex = /([a-z]{4,})(\[[a-z]{4,}\])*/g;

	let supportsTLS = false;
	while((match = regex.exec(line))!=null) {
		// portion of string outside the brackets
		const outside = match[1];
		const inside = match[2];
		
		// an ABBA sequence inside brackets invalidates the TLS
		if(inside && hasABBA(inside)) {
			return false;
		}
		// to be a valid TLS, at least one ABBA must be found outside square brackets
		if(!supportsTLS && hasABBA(outside)) {
			supportsTLS = true;
		}
	}
	return supportsTLS;
});


console.log('Part 1 solution:', tlsIPs.length);
