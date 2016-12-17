// Text: http://adventofcode.com/2016/day/11
// Input: http://adventofcode.com/2016/day/11/input

// manually processed input: 
// each pair indicates the position of a [0]: generator, [1]: microchip
const input1 = [
	[0,0], [0,0], [1,2], [1,1], [1,1]
]
const input2 = [
	[0,0], [0,0], [0,0], [0,0], [1,2], [1,1], [1,1]
]

const sort = (pairs) => pairs.sort((a,b) => a[0] == b[0] ? a[1] > b[1] : a[0] > b[0]);

const lastFloor = (items) => items.reduce((acc, p) => Math.min(acc, p[0], p[1]), 3);

const validState = (pairs) => {
	// safe floors have no generators
	const safeFloors = [0, 1, 2, 3].filter(f => pairs.find(el => el[0]==f) == null);
	return pairs.every(element =>
		// a microchip is safe if it has its generator on the same floor
		element[0] == element[1] || 
		// or the floor is safe
		safeFloors.indexOf(element[1]) > -1
	);
}

const hash = (elevator, pairs) => `<${elevator}>[${sort(pairs).toString()}]`;

const combo2 = (array) => {
	const ret = [];
	array.forEach((e,i) => {
		for(let j = i + 1; j<array.length; j++) {
			ret.push([e, array[j]]);
		}
	})
	return ret;
}

const createMoves = (state) => {
	const { items } = state;
	// each new move is 1 step further than the previous state
	const distance = state.distance + 1;
	const floor = state.elevator;
	let moves = [];

	const canMoveUp = floor < 3;
	const canMoveDown = floor > 0 && floor > lastFloor(items)
	if(floor <0) {console.error(floor); exit()};

	let generatorInFloor = items.map((p,i) => p[0] === floor ? i : undefined).filter(u => u !== undefined);
	let microchipInFloor = items.map((p,i) => p[1] === floor ? i : undefined).filter(u => u !== undefined);
	let pairsInSameFloor = items.map((p,i) => p[0] === p[1] && p[0] === floor ? i : undefined).filter(u => u !== undefined);

	items.forEach((p, i) => {
		if(generatorInFloor.indexOf(i) > -1) {
			if(canMoveDown) {
				moves.push({
					elevator: floor-1,
					distance,
					items: items.map((item, j) => j == i ? [ p[0]-1, p[1] ] : item)
				});
			}
			if(canMoveUp) {
				moves.push({
					elevator: floor+1,
					distance,
					items: items.map((item, j) => j == i ? [p[0]+1, p[1]] : item)
				})
			}
		}

		if(microchipInFloor.indexOf(i) > -1) {
			if(canMoveDown) {
				moves.push({
					elevator: floor-1,
					distance,
					items: items.map((item, j) => j == i ? [ p[0], p[1]-1 ] : item)
				});
			}
			if(canMoveUp) {
				moves.push({
					elevator: floor+1,
					distance,
					items: items.map((item, j) => j == i ? [p[0], p[1]+1] : item)
				})
			}
		}

		if(pairsInSameFloor.indexOf(i) > -1) {
			if(canMoveDown) {
				moves.push({
					elevator: floor-1,
					distance,
					items: items.map((item, j) => j == i ? [ p[0]-1, p[1]-1 ] : item)
				});
			}
			if(canMoveUp) {
				moves.push({
					elevator: floor+1,
					distance,
					items: items.map((item, j) => j == i ? [p[0]+1, p[1]+1] : item)
				})
			}
		}
	})

	combo2(generatorInFloor).forEach((g) => {
		const elA = g[0];
		const elB = g[1];
		if(canMoveDown) {
			moves.push({
				elevator: floor-1,
				distance,
				items: items.map((item, j) => 
					 (j == elA) ? [ items[elA][0]-1, items[elA][1] ] : 
					((j == elB) ? [ items[elB][0]-1, items[elB][1] ] : item)
				)
			});
		}
		if(canMoveUp) {
			moves.push({
				elevator: floor+1,
				distance,
				items: items.map((item, j) => 
					 (j == elA) ? [ items[elA][0]+1, items[elA][1] ] : 
					((j == elB) ? [ items[elB][0]+1, items[elB][1] ] : item)
				)
			});
		}
	})


	combo2(microchipInFloor).forEach((g) => {
		const elA = g[0];
		const elB = g[1];
		if(canMoveDown) {
			moves.push({
				elevator: floor-1,
				distance,
				items: items.map((item, j) => 
					 (j == elA) ? [ items[elA][0], items[elA][1]-1 ] : 
					((j == elB) ? [ items[elB][0], items[elB][1]-1 ] : item)
				)
			});
		}
		if(canMoveUp) {
			moves.push({
				elevator: floor+1,
				distance,
				items: items.map((item, j) => 
					 (j == elA) ? [ items[elA][0], items[elA][1]+1 ] : 
					((j == elB) ? [ items[elB][0], items[elB][1]+1 ] : item)
				)
			});
		}
	})
	return moves;
}

const BFS = (initState) => {
	const targetString = initState.map(() => [3,3]).toString();
	const seenStates = {};

	let moves = [{
		elevator: 0, 
		distance: 0,
		items: initState
	}];

	while( moves.length ) {
	    let move = moves.splice(0,1)[0];
	    const moveHash = hash(move.elevator, move.items);

	    if(seenStates[moveHash]) {
	    	// already seen!
	    	continue;
	    }
	  	
	  	if(sort(move.items).toString() === targetString) {
	    	// Done!
	        return move.distance;
	    }

    	if( validState(move.items) ){ 
			// save current move		    
	    	seenStates[moveHash] = move.distance;
	    	// generate all possible moves from current move
			moves = moves.concat(createMoves(move));
		}
	}

	return NaN;
}

console.log('Part 1 solution:', BFS(input1));
console.log('Part 2 solution:', BFS(input2));
