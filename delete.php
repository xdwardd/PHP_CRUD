<?php


// Create database connection using database file
require_once "databaseconn/database.php";

if($_SERVER["REQUEST_METHOD"] == "POST"){

// Process delete operation after confirmation
if(isset($_POST["id"]) && !empty($_POST["id"])){
    
    // Prepare a delete statement
    $sql = "DELETE FROM users WHERE id = ?";
    
    if($stmt = $connection->prepare($sql)){
        // Bind variables to the prepared statement as parameters
        $stmt->bind_param("i", $param_id);
        
        // Set parameters
        $param_id = trim($_POST["id"]);
        
        // Attempt to execute the prepared statement
        if($stmt->execute()){

           
            $myObject = new stdClass();
            $myObject->success = true;
            $myObject->reason = "Success";

            $myJSON = json_encode($myObject);
            echo $myJSON;
            
        } else{
            
            
            $myObject = new stdClass();
            $myObject->success = false;
            $myObject->reason = "Failed";

            $myJSON = json_encode($myObject);
            echo $myJSON;
        }
    }
     
    // Close statement
    $stmt->close();  
   
}
 // Close connection
 $connection->close();
} else {
    
    $myObject = new stdClass();
    $myObject->success = false;
    $myObject->reason = "Request not allowed";

    $myJSON = json_encode($myObject);
    echo $myJSON;
}
 
?>

