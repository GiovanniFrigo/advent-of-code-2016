// Text: http://adventofcode.com/2016/day/10
// Input: http://adventofcode.com/2016/day/10/input
import { readFileSync } from 'fs';

const input = readFileSync('../inputs/day10', 'utf-8');

const bots = [];
const outputs = [];

// instructions
const assignRegex = /value (\d+) goes to bot (\d+)/;
const giveRegex = /bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/; 

const createBot = () => ({
	instruction: null,
	chips: []
})

// load chips and instructions
input.split('\n').map(line => {
	let match;
	if(match = line.match(assignRegex)) {
		const botID = parseInt(match[2]);
		const chip = parseInt(match[1]);
		if( !bots[botID] ) {
			bots[botID] = createBot();
		}

		bots[botID].chips.push(chip)
	}
	else if(match = line.match(giveRegex)) {
		const botID = parseInt(match[1]);

		if( !bots[botID] ) {
			bots[botID] = createBot();
		}

		bots[botID].instruction = line;
	} 
});

// run until end
let processedSomeone;
do {
	processedSomeone = false;

	bots.forEach((bot, botID) => {
		if(bot.chips.length < 2) {
			return;
		}
		processedSomeone = true;


		const hiChip = Math.max(bot.chips[0], bot.chips[1]);
		const loChip = Math.min(bot.chips[0], bot.chips[1]);

		if( hiChip == 61 && loChip == 17 )
			console.log('Part 1 solution:', botID);

		let match = bot.instruction.match(giveRegex);

		// lo chip
		if( match[2] === 'bot' ) {
			bots[parseInt(match[3])].chips.push(loChip)
		} else {
			outputs[parseInt(match[3])] = loChip;
		} 

		// hi chip
		if( match[4] === 'bot' ) {
			bots[parseInt(match[5])].chips.push(hiChip)
		} else {
			outputs[parseInt(match[5])] = hiChip;
		}

		bot.chips = [];
	});	

} while( processedSomeone )

console.log('Part 2 solution:', outputs[0] * outputs[1] * outputs[2]);
