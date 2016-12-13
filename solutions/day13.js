// Text: http://adventofcode.com/2016/day/13

const input = 1350;
const start = [1,1];
const goal = [31,39];

const cell = (x,y) => 
	x < 0 || y < 0 ? '#' : (x*x + 3*x + 2*x*y + y + y*y + input).toString(2).split('').filter(b => b==1).length % 2 ? '#' : '.';

// Heuristic cost estimate must be an underestimation (http://planning.cs.uiuc.edu/node45.html)
// so we'll just use taxi cab distance (the distance it would be if no obstacles are in the way)
const heuristic_cost_estimate = (a, b) => 
	Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

const findLowest = (keySet, values) => {
	let min = +Infinity;
	let minKey;
	for ( let k of keySet ) { 
		if( values[k]<min) {
			min = values[k];
			minKey = k;
		}
	};
	return minKey;
}

const Astar = (start, goal) => {
	// The set of nodes already evaluated.
	let closedSet = new Set();
	// The set of currently discovered nodes still to be evaluated.
	let openSet = new Set();
	// Initially, only the start node is known.
	openSet.add(start.toString());

	// For each node, the cost of getting from the start node to that node.
	const gScore = {}; // default value of Infinity
	// The cost of going from start to start is zero.
	gScore[start] = 0;
	// For each node, the total cost of getting from the start node to the goal
	// by passing by that node. That value is partly known, partly heuristic.
	const fScore = {}; // default value of Infinity
	// For the first node, that value is completely heuristic.
	fScore[start] = heuristic_cost_estimate(start, goal)

	while (openSet.size > 0) {
		let current = findLowest(openSet, fScore).split(',').map(i => parseInt(i)); // the node in openSet having the lowest fScore[] value
		if (current.toString() == goal.toString()) {
			return gScore[current];
		}

		// remove current from openSet
		openSet.delete(current.toString());
		closedSet.add(current.toString());


		let neighbors = [[0,1],[0,-1],[1,0],[-1,0]]
			.map(c => [c[0] + current[0], c[1] + current[1]])
			.filter(c => cell(c[0],c[1]) == '.');

		neighbors.forEach(neighbor => {
			if (closedSet.has(neighbor.toString())) {
				// neighbor is in closedSet:
				// ignore it as it is already evaluated
				return;		
			}
			// the distance from start to a neighbor
			let tentative_gScore = gScore[current] + 1;
			if (!openSet.has(neighbor)) {
				// neighbour not in openSet:
				// discovered a new node!
				openSet.add(neighbor.toString());
			}
			else if (tentative_gScore >= gScore[neighbor]) {
				// this is not a better path.
				return;		
			}

			// This path is the best until now. Record it!
			gScore[neighbor] = tentative_gScore;
			fScore[neighbor] = gScore[neighbor] + heuristic_cost_estimate(neighbor, goal);
		});
	}

	// path can't be completed
	return NaN;
}

console.log('Part 1 solution: ', Astar(start, goal));