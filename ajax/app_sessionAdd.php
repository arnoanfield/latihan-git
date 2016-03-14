<?php
	session_start();
	$username=$_REQUEST['username'];
	$check=$_REQUEST['check'];

	$_SESSION['logged'] = $username;

	if ($check == true) {
		setcookie("abcd[username]", $username, time()+7200) or die('unable to create cookie');
	}
?>