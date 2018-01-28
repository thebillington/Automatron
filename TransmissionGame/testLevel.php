<!DOCTYPE html>

<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	
	if(isset($_POST['testLevelData'])) {
		
		echo "<p style='visibility: hidden; width: 0;' id='levelData'>".$_POST['testLevelData']."</p>";
		
	}
	else {
		die('You must have got here by mistake!');
	}
	
}
else {
	die('You must have got here by mistake!');
}

?>

<html style="height: 100%; overflow-y: hidden;">

<head>
	
	<title>Automatron</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/p5.js"></script>
    <script src="testGame.js"></script>

</head>

<div style="position: absolute; top: 1%; text-align: center;">
	<h1 style="margin: 5px;">Test Level</h1>
</div>

<body style="height: 100%; margin: 0; display: flex; justify-content: center; align-items: center;">

</body>

</html>