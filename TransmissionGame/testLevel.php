<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	
	if(isset($_POST['testLevelData'])) {
		
		echo "<p style='visibility: hidden;' id='levelData'>".$_POST['testLevelData']."</p>";
		
	}
	else {
		die('You must have got here by mistake!');
	}
	
}
else {
	die('You must have got here by mistake! NO POST');
}

?>

<!DOCTYPE html>

<html style="height: 100%;">

<head>
	
	<title>Transmission Game</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/p5.js"></script>
    <script src="testGame.js"></script>

</head>

<body style="height: 100%; margin: 0; display: flex; justify-content: center; align-items: center;">

</body>

</html>