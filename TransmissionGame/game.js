// Store the canvas size
var canvasSize = 600;

// Store the number of grid squares
var gridSquares = 20;

// Store the individual grid dimensions
var gridSquareSize;

// List to hold the point
var points = [];

// Setup function run before game starts
function setup() {
		
	// Create a canvas
	createCanvas(canvasSize, canvasSize);
	
	// Set the grid size
	gridSquareSize = canvasSize / gridSquares;
		
}

// Render function
function draw() {
	
	// Call the function to draw the grid
	drawGrid();
	
	// Call the function to draw the points
	drawPoints();
	
}

// Function to draw a grid
function drawGrid() {
	
	// For each row
	for (var i = 0; i < gridSquares; i++) {
		
		// For each column
		for (var j = 0; j < gridSquares; j++) {
			
			// Calculate the x and y
			var x = i * gridSquareSize;
			var y = j * gridSquareSize;
			
			// Draw the grid square
			drawGridSquare(x, y, color(255));
		}
		
	}
	
}

// Function to draw a grid square
function drawGridSquare(x, y, colour) {
	
	// Set the colour
	fill(colour);
			
	// Draw the quad
	quad(x,y, x+gridSquareSize,y, x+gridSquareSize,y+gridSquareSize, x,y+gridSquareSize);
	
}

// Function to draw the points
function drawPoints() {
	
	// For each point
	for(var i = 0; i < points.length; i++) {
		
		// Get the x and y
		x = points[i].x * gridSquareSize;
		y = points[i].y * gridSquareSize;
		
		// Draw the gridsquare
		drawGridSquare(x, y, color(255, 0, 200));
		
	}
	
}

// Function to deal with mouse clicks
function mouseClicked() {
	
	// Check that the mouse click is in the grid
	if (!((mouseX >= 0 && mouseX <= canvasSize) && (mouseY >= 0 && mouseY <= canvasSize))) {
		
		// Return
		return;
		
	}
	
	// Check the mouse button
	if (mouseButton === LEFT) {
		
		// Get the x and y
		var x = Math.floor(mouseX / gridSquareSize);
		var y = Math.floor(mouseY / gridSquareSize);
		
		// Add a new point
		points.push(Point(x,y));
		
	}
	
}

// Function to return a point
function Point(_x, _y) {
	
	// Return a new point
	return {x: _x, y: _y};
	
}