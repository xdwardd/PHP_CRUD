<?php

    # Create database connection using database.php

    require_once "../databaseconn/database.php";

    if($_SERVER["REQUEST_METHOD"] == "POST") {

        if(isset($_POST["id"]) && !empty($_POST["id"])) {

            # Prepare a delete statement
            $sql = "DELETE FROM admins WHERE id=?";

            if($stmt = $connection->prepare($sql)){
            
                # bind variables to prepare statements as parameters

                $stmt->bind_param("i", $param_id);

                # Set parameters
                $param_id = trim($_POST["id"]);

                # attempt to execute the prepared statement
                if ($stmt->execute()) {
                    
                    $myObject = new stdClass();
                    $myObject->success = true;
                    $myObject->reason = "Success";

                    $myJSON = json_encode($myObject);
                    echo $myJSON;
                } else {
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
        $myObject->success = true;
        $myObject->reason = 'Request no allowed!';
    }




?>


