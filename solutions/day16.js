// Text: http://adventofcode.com/2016/day/16
// Input: http://adventofcode.com/2016/day/16/input
import { readFileSync } from 'fs';

const input = '01111010110010011';

const calcDataChecksum = (diskSize) => {
	let dragon = input;

	while(dragon.length < diskSize) {
		dragon = `${dragon}0${dragon.split('').map(i => i=='0' ? 1 : 0).reverse().join('')}`;
	}

	let checksum = dragon.substr(0, diskSize);

	while(checksum.length % 2 == 0) {
		let c = '';
		for(let i = 0; i< checksum.length; i = i+2) {
			c += checksum.substr(i, 2) == '01' || checksum.substr(i, 2) == '10' ? 0 : 1;
		}
		checksum = c;
	}

	return checksum;
}

console.log('Part 1 solution:', calcDataChecksum(272));
console.log('Part 2 solution:', calcDataChecksum(35651584));
