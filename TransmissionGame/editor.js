// Store the canvas size
var canvasSize = 600;

// Store the number of grid squares
var gridSquares = 22;

// Store the individual grid dimensions
var gridSquareSize;

// Create a list of packages
var packages;

// List to hold the walls
var walls;

// List to hold the goals
var goals;

// List to hold all of the crate spawners
var spawners;

// Keys
var D_KEY = 68;
var G_KEY = 71;
var P_KEY = 80;
var S_KEY = 83;
var W_KEY = 87;

// Store the current object list
var currentObjectList;

// Store the current object
var currentObject;

// Store the creation tool selection
var creationSelection;

// Setup function run before game starts
function setup() {
	
	// Create a canvas
	createCanvas(canvasSize, canvasSize);
	
	// Set the background colour to white
	backgroundColour = color(255);
	
	// Set the grid size
	gridSquareSize = canvasSize / gridSquares;
	
	// Create an empty list to hold the packages
	packages = [];
	
	// Create an empty list to hold the goals
	goals = [];
	
	// Create an empty list to hold the walls
	walls = [];
	
	// Create an empty list of spawners
	spawners = [];
	
	// Add some boundary walls
	getBounds();
	
	// Initialise current objects
	currentObjectList = null;
	currentObject = -1;
	
	// By default select walls
	creationSelection = "WALL";
	
	// Set the frame rate
	frameRate(5);
		
}

// Render function
function draw() {
	
	// Clear the canvas
	clear();

	// Call the function to draw the grid
	drawGrid();

	// Draw the walls
	drawWalls();

	// Draw the goals
	drawGoals();
	
	// Draw the spawners
	drawSpawners();

	// Draw the packages
	drawPackages();
	
}

// Function to generate the bounding box
function getBounds() {
	
	// Go round the border
	for (var i = 0; i < gridSquares; i++) {
		
		// Add the walls
		walls.push(Wall(Point(i,0)));
		walls.push(Wall(Point(0,i)));
		walls.push(Wall(Point(gridSquares-1,i)));
		walls.push(Wall(Point(i,gridSquares-1)));
		
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
			drawGridSquare(x, y, backgroundColour);
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

// Function to draw a goal
function drawGoal(x, y, colour) {
	
	// Draw the grid square
	drawGridSquare(x, y, colour);
	
	// Calculate exact location on screen
	x = x * gridSquareSize;
	y = y * gridSquareSize;
	
	// Set the hole percentage
	var goalPercent = 5;
	
	// Draw the hole
	line(x,y, x+gridSquareSize/2-gridSquareSize/goalPercent,y+gridSquareSize/2-gridSquareSize/goalPercent);
	line(x+gridSquareSize,y, x+gridSquareSize/2+gridSquareSize/goalPercent,y+gridSquareSize/2-gridSquareSize/goalPercent);
	line(x+gridSquareSize,y+gridSquareSize, x+gridSquareSize/2+gridSquareSize/goalPercent,y+gridSquareSize/2+gridSquareSize/goalPercent);
	line(x,y+gridSquareSize, x+gridSquareSize/2-gridSquareSize/goalPercent,y+gridSquareSize/2+gridSquareSize/goalPercent);
	quad(x+gridSquareSize/2-gridSquareSize/goalPercent,y+gridSquareSize/2-gridSquareSize/goalPercent, x+gridSquareSize/2+gridSquareSize/goalPercent,y+gridSquareSize/2-gridSquareSize/goalPercent, x+gridSquareSize/2+gridSquareSize/goalPercent,y+gridSquareSize/2+gridSquareSize/goalPercent, x+gridSquareSize/2-gridSquareSize/goalPercent,y+gridSquareSize/2+gridSquareSize/goalPercent);
}

// Function to draw the packages
function drawPackages() {
	
	// Look at each package
	for (var i =0; i < packages.length; i++) {
	
		// Draw the package
		drawGridSquare(packages[i].location.x, packages[i].location.y, packages[i].colour);
	
	}
	
}

// Function to draw the goals
function drawGoals() {
	
	// For each goal
	for (var i = 0; i < goals.length; i++) {
		
		// Draw the goal
		drawGoal(goals[i].location.x, goals[i].location.y, goals[i].colour);
		
	}
	
}

// Function to draw the walls
function drawWalls() {
	
	// Look at each wall
	for (var i = 0; i < walls.length; i++) {
		
		// Draw the wall
		drawGridSquare(walls[i].location.x, walls[i].location.y, color(0));
		
	}
	
}

// Function to draw the spawners
function drawSpawners() {
	
	// For each goal
	for (var i = 0; i < spawners.length; i++) {
		
		// Draw the goal
		drawSpawner(spawners[i].location.x, spawners[i].location.y, spawners[i].colour, spawners[i].direction.x, spawners[i].direction.y);
		
	}
}

// Function to draw a spawner
function drawSpawner(x, y, colour, dx, dy) {
	
	// Draw the grid square
	drawGridSquare(x, y, colour);
	
	// Calculate exact location on screen
	x = x * gridSquareSize;
	y = y * gridSquareSize;
	
	// Fill in black
	fill(0);
	
	// Set the hole percentage
	ellipse(x+gridSquareSize/2+(dx*gridSquareSize/5), y+gridSquareSize/2+(dy*gridSquareSize/5), gridSquareSize/10, gridSquareSize/10);
	
}

// Function to deal with mouse clicks
function mouseReleased() {
	
	// Check there is no dialogue open
	if (dialoguesClosed()) {
		
		// Get the x and y
		var x = Math.floor(mouseX / gridSquareSize);
		var y = Math.floor(mouseY / gridSquareSize);

		// Check the mouse button
		if (mouseButton === LEFT) {
			
			// If we haven't got an object selected
			if (currentObject == -1) {
			
				// Check whether we have clicked on an object
				if (!objectAtLocation(x, y)) {
						
					// Check what we are currently creating
					switch(creationSelection) {
						
						// Walls
						case "WALL":
						
							// Add a new wall
							walls.push(Wall(Point(x,y)));
							break;
							
						// Spawners
						case "SPAWNER":
						
							// Show the spawner dialogue
							showSpawnerDialogue(x, y);
							break;
							
					}
				}
			}
		}
	}
}

// Function to show the spawner dialogue
function showSpawnerDialogue(x, y) {
	
	// Show the dialogue
	document.getElementById('spawnerX').value = ""+x;
	document.getElementById('spawnerY').value = ""+y;
	document.getElementById('spawnDialogue').style.visibility = "visible";
	
}

// Function to close all dialogues
function closeDialogues() {
	
	// Close the dialogues
	document.getElementById('spawnDialogue').style.visibility = "hidden";
	
}

// Function to check if all dialogues are closed
function dialoguesClosed() {
	
	//Check the spawner
	if (document.getElementById('spawnDialogue').style.visibility != "hidden") {
		return false;
	}
	return true;
	
}

// Function to create a spawner
function createSpawner() {
	
	// Get all of the attributes
	var x = parseInt(document.getElementById('spawnerX').value);
	var y = parseInt(document.getElementById('spawnerY').value);
	var r = parseInt(document.getElementById('spawnerR').value);
	var g = parseInt(document.getElementById('spawnerG').value);
	var b = parseInt(document.getElementById('spawnerB').value);
	var f = parseInt(document.getElementById('freq').value);
	var i = parseInt(document.getElementById('items').value);
	var direction = document.getElementById('direction').value.split(' ');
	var dx = parseInt(direction[0]);
	var dy = parseInt(direction[1]);
	var id = parseInt(document.getElementById('spawnerID').value);
	
	// Create the spawner
	spawners.push(Spawner(Point(x,y), i, f, Point(dx,dy), color(r,g,b), id)); 
	
	// Close dialogues
	closeDialogues();
	
}

// Function to check whether we have collided with an object
function objectAtLocation(x,y) {
	
	// Check if have collided with any package
	for (var i = 0; i < packages.length; i++) {
		
		// Check whether we have clicked a package
		if (overlap(packages[i].location, Point(x, y))) {
			
			// Select the package
			currentObject = i;
			currentObjectList = packages;
			return true;
			
		}
	}
	// Check if have collided with any spawner
	for (var i = 0; i < spawners.length; i++) {
		
		// Check whether we have clicked a spawner
		if (overlap(spawners[i].location, Point(x, y))) {
			
			// Select the spawner
			currentObject = i;
			currentObjectList = spawners;
			return true;
			
		}
	}
	// Check if have collided with any wall
	for (var i = 0; i < walls.length; i++) {
		
		// Check whether we have clicked a wall
		if (overlap(walls[i].location, Point(x, y))) {
			
			// Select the wall
			currentObject = i;
			currentObjectList = walls;
			return true;
			
		}
	}
	// Check if have collided with any goal
	for (var i = 0; i < goals.length; i++) {
		
		// Check whether we have clicked a goal
		if (overlap(goals[i].location, Point(x, y))) {
			
			// Select the goal
			currentObject = i;
			currentObjectList = goals;
			return true;
			
		}
	}
	// Return false
	return false;
	
}

// Function to deal with key presses
function keyPressed() {
	
	// Check there is no dialogue open
	if (dialoguesClosed()) {
	
		// Check if it was the D keyPressed
		if (keyCode == D_KEY) {
			
			// Check if we have an object selected
			if (currentSelection !== -1) {
				
				// Delete the object
				currentObjectList.splice(currentSelection, 1);
				
			}
		}

		// Check is the w key was pressed
		if (keyCode == W_KEY) {
			
			// Select the wall tool
			creationSelection = "WALL";
			
		}

		// Check is the s key was pressed
		if (keyCode == S_KEY) {
			
			// Select the spawn tool
			creationSelection = "SPAWNER";
			
		}

		// Check is the p key was pressed
		if (keyCode == P_KEY) {
			
			// Select the package tool
			creationSelection = "PACKAGE";
			
		}

		// Check is the g key was pressed
		if (keyCode == G_KEY) {
			
			// Select the goal tool
			creationSelection = "GOAL";
			
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
function Spawner(_location, _items, _frequency, _direction, _colour, _id) {
	
	// Return a spawner object
	return {location: _location, direction: _direction, items: _items, frequency: _frequency, spawn: 0, id: _id, colour: _colour};
	
}

// Function to create a package
function Package(_location, _colour, _id) {
	
	// Return a package object
	return {location: _location, originalLocation: _location, colour: _colour, id: _id};
	
}

// Function to create a wall
function Wall(_location) {
	
	// Return the wall object
	return {location: _location};
	
}

// Function to create a goal
function Goal(_location, _colour, _id) {
	
	// Return the goal object
	return {location: _location, colour: _colour, id: _id};
	
}

// Function to check if two points overlap
function overlap(pointOne, pointTwo) {
	
	// Return whether they overlap
	return pointOne.x === pointTwo.x && pointOne.y === pointTwo.y;
	
}