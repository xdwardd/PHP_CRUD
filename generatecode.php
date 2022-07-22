<?php
require 'vendor/autoload.php';
$authenticator = new PHPGangsta_GoogleAuthenticator();
$securitykey = $authenticator->createSecret();
echo "Secret: ".$securitykey;
 
?>