<?php

require_once 'databaseconn/database.php';
if(!empty($_GET['id'])){
   
    
    //Get the image from the database
    $result = $connection->query("SELECT image FROM users WHERE id = {$_GET['id']}");  
    if($result->num_rows > 0){
        $row = $result->fetch_assoc();    
        //Render the image
        echo $row["image"];
    }else{
        echo 'Image not found...';
    }
}

