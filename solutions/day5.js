// Text: http://adventofcode.com/2016/day/5
// Input: http://adventofcode.com/2016/day/5
import md5 from 'md5';
const input = 'wtnhxymk';

let password = '';
let number = 0;

while (password.length < 8) {
	let hash = md5(`${input}${number}`);
	if( hash.startsWith('00000') ) {
		password += hash[5];
		console.log(hash, number, password);
	}
	number++;
}

console.log('Part 1 solution:', password);
