<?php

if(isset($_GET['lvl'])) {
	echo "<p style='visibility: hidden;' id='levelFile'>/levels/".$_GET['lvl']."</p>";
}
else {
	die("No level selected!");
}

?>

<!DOCTYPE html>

<html style="height: 100%;">

<head>
	
	<title>Transmission Game</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/p5.js"></script>
    <script src="game.js"></script>

</head>

<body style="height: 100%; margin: 0; display: flex; justify-content: center; align-items: center;">

</body>

</html>
