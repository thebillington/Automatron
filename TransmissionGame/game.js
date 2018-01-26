// Store the canvas size
var canvasSize = 600;

// Store the number of grid squares
var gridSquares = 20;

// Store the individual grid dimensions
var gridSquareSize;

// List to hold the workers
var workers;

// Variable to hold the current worker
var currentWorker;

// Store whether the game is currently running
var running;

// Keys
var SPACE = 32;
var C_KEY = 67;

// Setup function run before game starts
function setup() {
		
	// Create a canvas
	createCanvas(canvasSize, canvasSize);
	
	// Set the grid size
	gridSquareSize = canvasSize / gridSquares;
	
	// Empty the points
	workers = [];
	
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
		
		// Check if this is the current worker
		if (i == currentWorker) {
			
			// Set the colour
			c = color(255, 0, 0);
			
		}
		
		// Draw the gridsquare
		drawGridSquare(x, y, c);
		
	}
	
}

// Draw a worker path
function drawWorkerPath() {
	
	// Check if there is a worker selected
	if (currentWorker !== -1) {
		
		// Draw the workers path
		for (var i = 1; i < workers[currentWorker].path.length; i++) {
			
			// Draw at the location
			drawGridSquare(workers[currentWorker].path[i].x, workers[currentWorker].path[i].y, color(0, 200, 255));
			
		}
		
	}
	
}

// Function to deal with mouse clicks
function mouseClicked() {
	
	// Check if the game is running
	if (running) {
	
		// Stop the game running
		running = false;
		
		// Reset the workers
		resetWorkers();
	
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
					}
					else {
						
						// Unselect the worker
						currentWorker = -1;
						
					}
						
					// Set worker exists to true
					workerExists = true;
					
					// Break
					break;
					
				}
				
			}
			
			// If there isn't already a worker and we haven't got a worker selected
			if (!workerExists && currentWorker == -1) {
				
				// Create a new worker at the location
				workers.push(Worker(Point(x,y), [Point(x,y)]));
				
			}
			else if(!workerExists) {
				
				// Otherwise check if the (x,y) we have selected is adjacent to the (x,y) of the LAST path location of the current worker
				if (equalOrAdjacent(Point(x,y), workers[currentWorker].path[workers[currentWorker].path.length - 1])) {
					
					// Add to the path
					workers[currentWorker].path.push(Point(x,y));
					
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
	return {location: _location, direction: 1, currentPathLocation: 0, path: _path};
	
}

// Function to update the workers location
function updateWorkers() {
	
	// For each worker
	for (var i = 0; i < workers.length; i++) {
		
		// Update the position of this worker
		workers[i].location = workers[i].path[workers[i].currentPathLocation];
		
		// Check if there is a path
		if (workers[i].path.length > 1) {
			
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