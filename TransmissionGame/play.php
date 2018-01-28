<!DOCTYPE html>

<?php

if(isset($_GET['lvl'])) {
	echo "<p style='visibility: hidden;width: 0;' id='levelFile'>/levels/".$_GET['lvl']."</p>";
}
else {
	die("No level selected!");
}

?>

<html style="height: 100%;">

<head>
	
	<title>Automatron</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/p5.js"></script>
    <script src="game.js"></script>

</head>

<body style="height: 100%; margin: 0; display: flex; justify-content: center; align-items: center;">

<div style="position: absolute; top: 1%; text-align: center;">
	<h1 style="margin: 5px;">Play</h1>
	<button onclick="showInstructions()">Instructions</button>
	<a href="/browser.php"><button>Levels</button></a>
</div>
	
<div id="instructions" style="position: absolute; text-align: center; padding: 100px; border: 10px solid black; background-color:white; width: 40%; height: 40%; top: 10%; overflow-y: scroll; visibility: hidden;">

	<h1>Instructions</h1>
	
	<button onclick="closeDialogues()">Close</button>
	
	<h2>Basic Controls</h2>
	
	<p>To get started playing automatron, you need to learn the basic control schemes.</p>
	
	<button onclick="closeDialogues()">Close</button>
	
</div>

</body>

</html>
