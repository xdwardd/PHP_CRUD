<?php

 session_start();

 /* Create database connection using database.php file */
 require_once "databaseconn/database.php";

 /* Define variables and initialize with empty value */
 $firstname = $lastname = $email = $phone= $address = $address_lat = $address_lng="";
 $firstname_err = $lastname_err = $email_err= $phone_err= $address_err = $address_lat_err = $address_lng_err = "";
  

 /* Proccessing form data when form is submitted */

 if($_SERVER["REQUEST_METHOD"] == "POST") {
     
   

    /* Validate username */
    $input_firstname = trim($_POST['firstname']);
    if (empty($input_firstname)) {
        $firstname_err = 'This field is required!';
       # echo $username_err;
    } else {
        $firstname = $input_firstname;
    }

    /* Validate username */
    $input_lastname = trim($_POST['lastname']);
    if (empty($input_lastname)) {
        $lastname_err = 'This field is required!';
    } else {
        $lastname = $input_lastname;
    }

    /* Validate username */
    $input_email = trim($_POST['email']);
    if (empty($input_email)) {
        $email_err = 'This field is required!';
     
        
    } else {
        $email = $input_email;
    }

    /* Validate role */
    $input_phone = trim($_POST["phone"]);
    if (empty($input_phone)) {
        $phone_err = "This field is required!";
    } else {
        $phone = $input_phone;
    }
    
    /* Validate address */

    $input_address = trim($_POST['address']);
    if (empty($input_address)) {
        $address_err = "This field is required!";
    } else {
        $address = $input_address;
    }

    /* Validate Location */

    $input_address_lat = trim($_POST["lat"]);
    if (empty($input_address_lat)) {
        $address_lat_err = 'This field is required';
    } else {
        $address_lat = $input_address_lat;
    }

    $input_address_lng = trim($_POST["lng"]);
    if (empty($input_address_lng)) {
        $address_lng_err = 'This field is required';
    } else {
        $address_lng = $input_address_lng;
    }

    /* Image validation */

    $extensions = array(
        "jpg",    
        "jpeg"
    );
  
        $file = $_FILES['image']['tmp_name'];
        $filename = $_FILES['image']['name'];
        $fileType = pathinfo($filename, PATHINFO_EXTENSION);
        $image = addslashes(file_get_contents($file));
        if ($_FILES['image']['size'] < 512000) {

            if (in_array($fileType,$extensions)) {
                    
                if(empty($firstname_err) && empty($lastname_err) && empty($email_err) && empty($phone_err) && empty($address_err) && empty($address_lat_err) && empty($address_lng_err)) {
                        $sql = "INSERT into users (firstname, lastname, email, phone, image, address, address_lat, address_lng)
                         VALUES ('".$firstname."', '".$lastname."', '".$email."', '".$phone."', '".$image."', '".$address."','".$address_lat."', '".$address_lng."')";
                        $result = $connection->query($sql);
                       
                        /*Error Checking

                             echo("Error description: " . $connection -> error); 
                        */
                       
                       
                        if($result)
                        {
                            $myObject = new stdClass();
                            $myObject->success = true;
                            $myObject->reason = "Successfully created!";

                            $myJSON = json_encode($myObject);
                            echo $myJSON;
                        } else {
                            $myObject = new stdClass();
                            $myObject->success = false;
                            $myObject->reason = "Failed to create!";

                            $myJSON = json_encode($myObject);
                            echo $myJSON;
                        }
                } else {
                        $myObject = new stdClass();
                        $myObject->success = false;
                        $myObject->reason = 'Opps! Something went wrong. Try again';

                        $myJSON = json_encode($myObject);
                        echo $myJSON;
                }

            } else {
                echo 'Image must be jpg/jpeg!';
            }

        } else {
            echo 'Invalid file size, Please upload file less than 512kb';
        }
        
    
 } else {
    $myObject = new stdClass();
    $myObject->success = false;
    $myObject->reason = 'Request not allowed!';

    $myJSON = json_encode($myObject);
    echo $myJSON;
 }

