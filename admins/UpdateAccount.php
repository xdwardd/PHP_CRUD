<?php

    session_start();
    # Create connection using database.create.php
    require_once "../databaseconn/database.php";

    # Define variables and initialize with empty values
	$username = $role = "";
		$username_err = $role_err ="";

	if($_SERVER["REQUEST_METHOD"] == "POST"){

			//Validate username
			$input_username = trim($_POST["username"]);
			if(empty($input_username)){
				$fistname_err = "Please enter a username.";
			} else {
				$username = $input_username;
			}

			// Validate lastname
			$input_role = trim($_POST["role"]);
			if(empty($input_role)){
				$role_err = "Please enter lastname";
			} else {
				$role = $input_role;
			}

			//check input errors before inserting in database
			if(empty($username_err) && empty($role_err)){
			
				//prepare update statement

				$sql = "UPDATE users SET username=?, role=?, created_by=? WHERE id=?";

				if($stmt = $connection->prepare($sql)){
					// Bind variables to the prepared statement as parameters
					$stmt->bind_param("sssi", $param_username, $param_role, $param_created_by, $param_id);
					
					// Set parameters

					$param_id = trim($_POST["id"]); 
					$param_username = trim($_POST["username"]);
					$param_role = trim($_POST["role"]);
					$param_created_by = $_SESSION['id'];
					
					// Attempt to execute the prepared statement
					if($stmt->execute()){
					  //  echo " Oops! Something is success";
		
						$myObject = new stdClass();
						$myObject->success = true;
						$myObject->reason = "Success";

						$myJSON = json_encode($myObject);
						echo $myJSON;
					} else{
					
					$myObject = new stdClass();
					$myObject->success = false;
					$myObject->reason = "Fail";
					
					$myJSON = json_encode($myObject);						
					echo $myJSON;
					}
				}
				
				
			} else {
				$myObject = new stdClass();
				$myObject->success = false;
				$myObject->reason = "Please input all the fields";

				$myJSON = json_encode($myObject);
				echo $myJSON;
			}

			$connection->close(); // close connection

		} else {
			
		$myObject = new stdClass();
		$myObject->success = false;
		$myObject->reason = "Request not allowed!";

		$myJSON = json_encode($myObject);
		echo $myJSON;
		
		}


?>