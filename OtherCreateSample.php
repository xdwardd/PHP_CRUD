<?php

 session_start();

 /* Create database connection using database.php file */
 require_once "databaseconn/database.php";

 /* Define variables and initialize with empty value */
 $firstname = $lastname = $email = $phone= "";
 $firstname_err = $lastname_err = $email_err= $phone_err="";
  

 /* Proccessing form data when form is submitted */

 if($_SERVER["REQUEST_METHOD"] == "POST") {
     
   

    /* Validate usernam */
    $input_firstname = trim($_POST['firstname']);
    if (empty($input_firstname)) {
        $firstname_err = 'Please enter firstname';
       # echo $username_err;
    } else {
        $firstname = $input_firstname;
    }

    /* Validate username */
    $input_lastname = trim($_POST['lastname']);
    if (empty($input_lastname)) {
        $lastname_err = 'Please enter lastname';
       # echo $username_err;
    } else {
        $lastname = $input_lastname;
    }
    /* Validate username */
    $input_email = trim($_POST['email']);
    if (empty($input_email)) {
        $email_err = 'Please enter email';
       # echo $username_err;
    } else {
        $email = $input_email;
    }

    /* Validate role */
    $input_phone = trim($_POST["phone"]);
    if (empty($input_phone)) {
        $phone_err = "Please Select phone";
    } else {
        $phone = $input_phone;
    }

    /* Image validation */

    $extensions = array(
        "jpg",    
        "jpeg"
    );

        
        $file = $_FILES['image']['tmp_name'];
        $image = addslashes(file_get_contents($file));
        $filename = $_FILES['image']['name'];
        $ext = pathinfo($filename, PATHINFO_EXTENSION);
      
        if ($_FILES['image']['size'] < 512000) {

            if (in_array($ext,$extensions)) {
                    
                if(empty($firstname_err) && empty($lastname_err) && empty($email_err) && empty($phone_err)) {

                        $sql = "INSERT into users (firstname, lastname, email, phone, image) VALUES ('".$firstname."', '".$lastname."', '".$email."', '".$phone."', '".$image."')";
                        $result = mysqli_query($connection, $sql);
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

