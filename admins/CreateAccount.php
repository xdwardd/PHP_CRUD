<?php

 session_start();

 /* Create database connection using database.php file */
 require_once "../databaseconn/database.php";

 /* For Generating Securitykey */
 require '../vendor/autoload.php';
 $authenticator = new PHPGangsta_GoogleAuthenticator();


 /* Define variables and initialize with empty value */
 $username = $password = $role = $securitykey="";
 $username_err = $password_err = $role_err= "";
  

 /* Proccessing form data when form is submitted */

 if($_SERVER["REQUEST_METHOD"] == "POST") {
     

    /* Validate username */
    $input_username = trim($_POST['username']);
    if (empty($input_username)) {
        $username_err = 'Please enter username';

    } else {
        $username = $input_username;
    }

    /* Validate password */
    $input_password = trim($_POST["password"]);
    if (empty($input_password)) {
        $password_err = 'Please enter password';


    } elseif(!filter_var($input_password, FILTER_VALIDATE_REGEXP, 
        array("options" =>array("regexp"=>"/^.*(?=.{8,16})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/")))) {
        
        $password_err = "Please enter a valid password";

            
    } else {
        /* hash password */
        $hashPassword = password_hash($input_password,PASSWORD_DEFAULT);      
    }
    
    /* Validate role */
    $input_role = trim($_POST["role"]);
    if (empty($input_role)) {
        $role_err = "Please Select role";
    } else {
        $role = $input_role;
    }

    /* Generate security key */
    $securitykey = $authenticator->createSecret();

    if(empty($username_err) && empty($password_err) && empty($role_err)) {
        $sql = "INSERT into admins (username, password, role, securitykey, created_by) VALUES ('".$username."', '".$hashPassword."', '".$role."', '".$securitykey."', '".$_SESSION["id"]."')";
        $result = $connection->query($sql);  //$connection refers to a connection variable created in database.php
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
    $myObject = new stdClass();
    $myObject->success = false;
    $myObject->reason = 'Request not allowed!';

    $myJSON = json_encode($myObject);
    echo $myJSON;
 }


 
    /*
    REGEXP VALIDATION FOR PASSWORD

     ^: anchored to beginning of string
    \S*: any set of characters
    (?=\S{8,}): of at least length 8
    (?=\S*[a-z]): containing at least one lowercase letter
    (?=\S*[A-Z]): and at least one uppercase letter
    (?=\S*[\d]): and at least one number
    $: anchored to the end of the string
    (?=\S*[\W]): include special chars
    */
 

?>
