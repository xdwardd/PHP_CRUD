<?php
		//create database connection using database file

		require_once "databaseconn/database.php";



		//Define variables and initialize with empty values
		$firstname = $lastname = $email = $phone = $address = $address_lat = $address_lng="";
		$fistname_err = $lastname_err = $email_err = $phone_err = $address = $address_lat_err = $address_lng_err="";

	if($_SERVER["REQUEST_METHOD"] == "POST"){

			//Validate firstname
			$input_firstname = trim($_POST["firstname"]);
			if(empty($input_firstname)){
				$fistname_err = "This field is required!";
			} else {
				$firstname = $input_firstname;
			}

			// Validate lastname
			$input_lastname = trim($_POST["lastname"]);
			if(empty($input_lastname)){
				$lastname_err = "This field is required!";
			} else {
				$lastname = $input_lastname;
			}

			//Validate email

			$input_email = trim($_POST["email"]);
			if(empty($input_email)){
				$email_err = "This field is required!";
			} else {
				$email = $input_email;
			}


			//validate phone

			$input_phone = trim($_POST["phone"]);
			if(empty($input_phone)){
				$phone_err = "This field is required!";
			} else {
				$phone = $input_phone;
			}

			/* Validate Address */
			$input_address = trim($_POST['address']);
			if (empty($input_address)) {
				$address_err = "This field is required!";
			} else {
				$address = $input_address;
			}

			/* Validate Location */
			$input_address_lat = trim($_POST["lat"]);
			if (empty($input_address_lat)) {
				$address_lat_err = "This field is required";
			} else {
				$address_lat = $input_address_lat;
			}

			$input_address_lng = trim($_POST["lng"]);
			if (empty($input_address_lng)) {
				$address_lng_err = "This field is required";
			} else {
				$address_lng = $input_address_lng;
			}


		  /* valid image array extension */
			$extensions = array(
				"jpg",    
				"jpeg"
			);
		  

			$file = $_FILES["image"]["tmp_name"];
			$filename = $_FILES["image"]["name"];
			$fileType = pathinfo($filename, PATHINFO_EXTENSION);
			$image = addslashes(file_get_contents($file));

			#checking file size
			if ($_FILES['image']['size'] < 512000) {

				#checking file extension
				if(in_array($fileType,$extensions)) {

				//check input errors before inserting in database
					if(empty($firstname_err) && empty($lastname_err) && empty($email_err) && empty($phone_err) && empty($address_err)&& empty($address_lat_err) && empty($address_lng_err)){
					
						//prepare update statement

						$sql = "UPDATE users SET firstname=?, lastname=?, email=?, phone=?, address=?, address_lat='".$address_lat."',  address_lng='".$address_lng."', image='".$image."' WHERE id=?";

						if($stmt = $connection->prepare($sql)){
							//echo("Error description: " . $connection -> error); 
							// Bind variables to the prepared statement as parameters
							$stmt->bind_param("sssssi", $param_firstname, $param_lastname, $param_email, $param_phone, $param_address,$param_id);
							
							
							// Set parameters

							$param_id = trim($_POST["id"]); 
							$param_firstname = trim($_POST["firstname"]);
							$param_lastname = trim($_POST["lastname"]);
							$param_email = trim($_POST["email"]);
							$param_phone = trim($_POST["phone"]); 
							$param_address = trim($_POST["address"]);
				
							
							
							
							
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
				} else {
					echo "Image must be jpg or jpeg";
				}
			} else {
				echo "Invalid file size. Please upload file less than 512kb";
			}
			
		} else {
			
		$myObject = new stdClass();
		$myObject->success = false;
		$myObject->reason = "Request not allowed!";

		$myJSON = json_encode($myObject);
		echo $myJSON;
		
		}

		
		
	

?>