<?php

/*Database credentials. Running MYSQL Server with a 
 default setting (user 'root', password '',) */
    define('DB_SERVER', 'localhost');
    define('DB_USERNAME', 'root');
    define('DB_PASSWORD', '');
    define('DB_NAME', 'demo');

    /* Attempt to connect MySQL Database */
    $connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
    //Check connection

    if($connection === false){
        die("ERROR: Could not connect. " .$connection->connect_error);
    }

?>
