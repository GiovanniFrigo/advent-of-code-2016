// Text: http://adventofcode.com/2016/day/7
// Input: http://adventofcode.com/2016/day/7/input
import { readFileSync } from 'fs';

const input = readFileSync('../inputs/day7', 'utf-8');

// see what-i-learned.md for explanation
const regex = /([a-z])(?!\1)([a-z])\1(?:\w*\[\w*\])*\w*\[\w*\2\1\2\w*\]|\[\w*([a-z])(?!\3)([a-z])\3\w*\](?:\w*\[\w*\])*\w*\4\3\4/g;

const sslIPs = input.split('\n').filter(line => line.match(regex) != null);


console.log('Part 2 solution:', sslIPs.length);
