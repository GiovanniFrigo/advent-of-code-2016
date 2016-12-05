// Text: http://adventofcode.com/2016/day/5
// Input: http://adventofcode.com/2016/day/5
import md5 from 'md5';
const input = 'wtnhxymk';

let password = Array(8).fill('_');
let number = 0;

while (password.indexOf('_') > -1) {
	let hash = md5(`${input}${number}`);
	if( hash.startsWith('00000') && password[parseInt(hash[5])] == '_') {
		password[parseInt(hash[5])] = hash[6];
		console.log(hash, number, password);
	}
	number++;
}

console.log('Part 2 solution:', password.join(''));
