<?php

    /* start session */
    session_start();
    /* Create database connection using database file */
    require_once "databaseconn/database.php";

    /* Define variables and initialize empty values */
    $username = $password = "";
    $username_err = $password_err = "";


        if($_SERVER["REQUEST_METHOD"] == 'POST') {

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
                $password = $input_password;               
            }

        
            if(empty($username_err) && empty($password_err)) {
  
                $sql = "SELECT * FROM admins WHERE username ='".$username."' ";
                $result = $connection->query($sql);  # $connection refers to the connection variables in database.php
                $numRows = mysqli_num_rows($result);

                if($numRows == 1){
                    $row = mysqli_fetch_assoc($result);
             
                    if(password_verify($password, $row["password"]))   /*password_verify check if the inputted password is equal to the hashpassword in database*/
                    {
                        $_SESSION["id"] = $row["id"];   /* set session */
                        $myObject = new stdClass();
                        $myObject->success = true;
                        $myObject->reason = 'Successfully Logged in';
            
                        $myJSON = json_encode($myObject);
                        echo $myJSON;
                    } else {
                        $myObject = new stdClass();
                        $myObject->success = false;
                        $myObject->reason = 'Login Failed';
            
                        $myJSON = json_encode($myObject);
                        echo $myJSON;
                    }
                } else {
                    $myObject = new stdClass();
                    $myObject->success = false;
                    $myObject->reason = 'Invalid Credentials';
        
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


?>