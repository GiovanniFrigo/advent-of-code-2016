// Text: http://adventofcode.com/2016/day/13

const input = 1350;
const start = [1,1];

const cell = (x,y) => 
	x < 0 || y < 0 ? '#' : (x*x + 3*x + 2*x*y + y + y*y + input).toString(2).split('').filter(b => b==1).length % 2 ? '#' : '.';

const findLowest = (keys, values) => {
	let min = +Infinity;
	let minKey;
	keys.forEach(k => { 
		if( values[k]<min) {
			min = values[k];
			minKey = k;
		}
	});
	return minKey;
}

const reachable50steps = [];

const Astar = (start) => {
	// cells reachable in max 50 steps
	reachable50steps.push(start);
	// The set of nodes already evaluated.
	let closedSet = [];
	// The set of currently discovered nodes still to be evaluated.
	// Initially, only the start node is known.
	let openSet = [start];

	// For each node, the cost of getting from the start node to that node.
	const gScore = {}; // default value of Infinity
	// The cost of going from start to start is zero.
	gScore[start] = 0;
	// For each node, the total cost of getting from the start node to the goal
	// by passing by that node. That value is partly known, partly heuristic.
	const fScore = {}; // default value of Infinity
	// For the first node, that value is completely heuristic.
	fScore[start] = 0;

	while (openSet.length > 0) {
		let current = findLowest(openSet, fScore); // the node in openSet having the lowest fScore[] value

		// remove current from openSet
		openSet = openSet.filter(c => c.toString() !== current.toString());
		closedSet.push(current);

		if (gScore[current] > 50) {
			// don't process if already more distant than 50 steps
			continue;
		 }

		let neighbors = [[0,1],[0,-1],[1,0],[-1,0]]
			.map(c => [c[0] + current[0], c[1] + current[1]])
			.filter(c => cell(c[0],c[1]) == '.');

		neighbors.forEach(neighbor => {
			if (closedSet.findIndex(e => e.toString() == neighbor.toString()) > -1) {
				// neighbor is in closedSet:
				// ignore it as it is already evaluated
				return;     
			}
			// the distance from start to a neighbor
			let tentative_gScore = gScore[current] + 1;
			if(openSet.findIndex(e => e.toString() == neighbor.toString()) < 0) {
				// neighbour not in openSet:
				// discovered a new node!
				openSet.push(neighbor);
			}
			else if (tentative_gScore >= gScore[neighbor]) {
				// this is not a better path.
				return;     
			}

			// This path is the best until now. Record it!
			gScore[neighbor] = tentative_gScore;
			fScore[neighbor] = gScore[neighbor];

			if(tentative_gScore <= 50 && reachable50steps.findIndex(e => e.toString() == neighbor.toString()) < 0) {
				 reachable50steps.push(neighbor);
			 }
		});
	}

	// finished exploring
	return false;
}

Astar(start);

console.log('Part 2 solution: ', reachable50steps.length);