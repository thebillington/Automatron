// Store the canvas size
var canvasSize = 600;

// Store the number of grid squares
var gridSquares = 20;

// Store the individual grid dimensions
var gridSquareSize;

// List to hold the workers
var workers;

// Create a list of packages
var packages;

// List to hold the walls
var walls;

// Variable to hold the current worker
var currentWorker;

// Store whether the game is currently running
var running;

// Keys
var SPACE = 32;
var C_KEY = 67;
var L_KEY = 76;
var R_KEY = 82;

// Setup function run before game starts
function setup() {
		
	// Create a canvas
	createCanvas(canvasSize, canvasSize);
	
	// Set the grid size
	gridSquareSize = canvasSize / gridSquares;
	
	// Create an empty list to hold the workers
	workers = [];
	
	// Create an empty list to hold the packages
	packages = [];
	
	// Add a package
	packages.push(Package(Point(4,2)));
	packages.push(Package(Point(2,2)));
	
	// Clear any workers
	currentWorker = -1;
	
	// Set running to false
	running = false;
	
	// Set the frame rate
	frameRate(5);
		
}

// Render function
function draw() {
	
	// Call the function to draw the grid
	drawGrid();
	
	// Call the function to draw the points
	drawWorkers();
	
	// Draw the worker path
	drawWorkerPath();
	
	// Draw the packages
	drawPackages();
	
	// Check whether we are running
	if (running) {
		
		// Update the workers
		updateWorkers();
		
	}
	
}

// Function to draw a grid
function drawGrid() {
	
	// For each row
	for (var i = 0; i < gridSquares; i++) {
		
		// For each column
		for (var j = 0; j < gridSquares; j++) {
			
			// Calculate the x and y
			var x = i;
			var y = j;
			
			// Draw the grid square
			drawGridSquare(x, y, color(255));
		}
		
	}
	
}

// Function to draw a grid square
function drawGridSquare(x, y, colour) {
	
	// Calculate exact location on screen
	x = x * gridSquareSize;
	y = y * gridSquareSize;
	
	// Set the colour
	fill(colour);
			
	// Draw the quad
	quad(x,y, x+gridSquareSize,y, x+gridSquareSize,y+gridSquareSize, x,y+gridSquareSize);
	
}

// Function to draw the points
function drawWorkers() {
	
	// For each point
	for(var i = 0; i < workers.length; i++) {
		
		// Get the x and y
		var x = workers[i].location.x;
		var y = workers[i].location.y;
		
		// Set the worker colour
		var c = color(255, 0, 200);
		
		// Check if the worker is a loop worker
		if (workers[i].loop) {
			
			// Set the worker colour to green
			c = color(0, 200, 88);
			
		}
		
		// Check if this is the current worker
		if (i == currentWorker) {
			
			// Set the colour
			c = color(255, 0, 0);
			
		}
		
		// Draw the gridsquare
		drawGridSquare(x, y, c);
		
	}
	
}

// Function to draw the packages
function drawPackages() {
	
	// Look at each package
	for (var i =0; i < packages.length; i++) {
	
		// Draw the package
		drawGridSquare(packages[i].location.x, packages[i].location.y, color(102, 51, 0));
	
	}
	
}

// Draw a worker path
function drawWorkerPath() {
	
	// Check if there is a worker selected
	if (currentWorker !== -1) {
		
		// Draw the workers path
		for (var i = 1; i < workers[currentWorker].path.length; i++) {
			
			// Check that the path isn't over the worker
			if (!(workers[currentWorker].location.x === workers[currentWorker].path[i].x && workers[currentWorker].location.y === workers[currentWorker].path[i].y)) {
			
				// Draw at the location
				drawGridSquare(workers[currentWorker].path[i].x, workers[currentWorker].path[i].y, color(0, 200, 255));
			
			}
		}
	}
	
}

// Function to deal with mouse clicks
function mouseClicked() {
	
	// Check if the game is running
	if (running) {
	
		// Reset
		reset();
		
	}
	else {
	
		// Check that the mouse click is in the grid
		if (!((mouseX >= 0 && mouseX <= canvasSize) && (mouseY >= 0 && mouseY <= canvasSize))) {
			
			// Return
			return;
			
		}
			
		// Get the x and y
		var x = Math.floor(mouseX / gridSquareSize);
		var y = Math.floor(mouseY / gridSquareSize);
		
		// Check the mouse button
		if (mouseButton === LEFT) {
			
			// Store whether we already have a worker at this location
			var workerExists = false;
			
			// Check whether there is already a worker at the location
			for (var i = 0; i < workers.length; i++) {
				
				// Check whether the worker is at (x,y) of mouse
				if (workers[i].location.x == x && workers[i].location.y == y) {
					
					// Check if there is a worker selected
					if (currentWorker == -1) {
					
						// Select the worker
						currentWorker = i;
						
						// Set worker exists to true
						workerExists = true;
					}
					
					// Break
					break;
					
				}
				
			}
			
			// If there isn't already a worker and we haven't got a worker selected
			if (!workerExists && currentWorker == -1) {
				
				// Set package location to false
				packageLocation = false;
				
				// Look at each package
				for (var i = 0; i < packages.length; i++) {
					
					// If the location has a package on it
					if (packages[i].location.x == x && packages[i].location.y == y) {
						
						// Set package location to true
						packageLocation = true;
						
						// Break
						break;
						
					}
					
				}
				
				// Check that there is no package on the new worker location
				if (!packageLocation) {
				
					// Create a new worker at the location
					workers.push(Worker(Point(x,y), [Point(x,y)]));
				
				}
				
			}
			else if(!workerExists) {
				
				// Otherwise check if the (x,y) we have selected is adjacent to the (x,y) of the LAST path location of the current worker
				if (equalOrAdjacent(Point(x,y), workers[currentWorker].path[workers[currentWorker].path.length - 1])) {
					
					// Add to the path
					workers[currentWorker].path.push(Point(x,y));
					
				}
				else {
					
					// If not valid, deselect worker
					currentWorker = -1;
					
				}
				
			}
			
		}
	}
	
}

// Function to deal with key presses
function keyPressed() {
	
	// Check if it was the space keyPressed
	if (keyCode == SPACE) {
		
		// Set running to true
		running = true;
		
		// Deselect all workers
		currentWorker = -1;
		
	}
	
	// Check if it was the space key
	if (keyCode == C_KEY) {
		
		// Check if there is a worker selected
		if (currentWorker != -1) {
			
			// Clear the worker path
			workers[currentWorker].path = [workers[currentWorker].path[0]];
			
		}
	}
	
	// Check if it was the l key
	if (keyCode == L_KEY) {
		
		// Check if there is currently a worker
		if (currentWorker !== -1) {
			
			// Check whether the workers last path location is adjacent to the first
			if (equalOrAdjacent(workers[currentWorker].path[0], workers[currentWorker].path[workers[currentWorker].path.length - 1])) {
				
				// Set the worker as a loop worker
				workers[currentWorker].loop = true;
				
			}
			
		}
	}
	
	// Check if it was the r key
	if (keyCode == R_KEY) {
		
		// Check if there is currently a worker
		if (currentWorker !== -1) {
			
			// Set the current worker to be a repeater
			workers[currentWorker].loop = false;
			
		}
	}
}

// Function to return whether two points are at the same location
function equalOrAdjacent(pointOne, pointTwo) {
	
	// Check whether they are adjacent
	if (pointOne.x + 1 == pointTwo.x && pointOne.y == pointTwo.y) {
		return true;
	}
	if (pointOne.x - 1 == pointTwo.x && pointOne.y == pointTwo.y) {
		return true;
	}
	if (pointOne.x == pointTwo.x && pointOne.y + 1 == pointTwo.y) {
		return true;
	}
	if (pointOne.x == pointTwo.x && pointOne.y - 1 == pointTwo.y) {
		return true;
	}
	
	// Return whether they are equivalent
	return pointOne.x == pointTwo.x && pointOne.y == pointTwo.y;
	
}

// Function to return a point
function Point(_x, _y) {
	
	// Return a new point
	return {x: _x, y: _y};
	
}

// Create a function to create a spawner
function Spawner(_location, _items, _frequency) {
	
	// Return a spawner object
	return {location: _location, items: _items, frequency: _frequency, spawn: 0};
	
}

// Create a function to return a worker
function Worker(_location, _path) {
	
	// Return a new worker object
	return {location: _location, direction: 1, currentPathLocation: 0, path: _path, loop: false};
	
}

// Function to create a package
function Package(_location) {
	
	// Return a package object
	return {location: _location, originalLocation: _location};
	
}

// Function to create a wall
function Wall(_location) {
	
	// Return the wall object
	return {location: _location};
	
}

// Function to update the workers location
function updateWorkers() {
	
	// For each worker
	for (var i = 0; i < workers.length; i++) {
		
		// Update the position of this worker
		workers[i].location = workers[i].path[workers[i].currentPathLocation];
		
		// Check if there is a path
		if (workers[i].path.length > 1) {
			
			// Check if the package has been moved
			pushPackages(i);
			
			// Move the worker to the next location
			workers[i].currentPathLocation += workers[i].direction;
			
			// Check whether this is the first or last location on the path
			if (workers[i].currentPathLocation == 0 || workers[i].currentPathLocation == workers[i].path.length - 1) {
				
				// Reverse the location 
				workers[i].direction = -workers[i].direction;
				
			}
		
		}
		
	}
	
}

// Function to reset() {
function reset() {
	
	// Reset everything to none running state
	running = false;
	resetWorkers();
	resetPackages();
	
}

// Function to reset all workers
function resetWorkers() {
	
	// Look at each worker
	for (var i = 0; i < workers.length; i++) {
		
		// Reset location and path location
		workers[i].location = workers[i].path[0];
		workers[i].currentPathLocation = 0;
		workers[i].direction = 1;
		
	}
	
}

// Function to reset the packages
function resetPackages() {
	
	// Look at each package
	for (var i = 0; i < packages.length; i++) {
		
		// Reset the location
		packages[i].location = packages[i].originalLocation;
		
	}
	
}

// Create a function to push the packages
function pushPackages(worker) {
	
	// Look at each package
	for (var i = 0; i < packages.length; i++) {
		
		// Check if the current worker has pushed the package
		if (workers[worker].location.x == packages[i].location.x && workers[worker].location.y == packages[i].location.y) {
			
			// Get the current and previous package location
			var currentLocation = workers[worker].path[workers[worker].currentPathLocation];
			var prevLocation = workers[worker].path[workers[worker].currentPathLocation - 1];
			
			// Check whether the direction is negative
			if (workers[worker].currentPathLocation == 0 || (workers[worker].direction < 0 && workers[worker].currentPathLocation < workers[worker].path.length - 1)) {
				prevLocation = workers[worker].path[workers[worker].currentPathLocation + 1];
			}
			
			// Get the x and y direction to move
			var dx = (currentLocation.x - prevLocation.x);
			var dy = (currentLocation.y - prevLocation.y);
			
			// move the package
			packages[i].location = Point(packages[i].location.x + dx, packages[i].location.y + dy);
			
			
		}
	
	}
	
}