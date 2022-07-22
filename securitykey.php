<?php

/* 2 Factor Authentication with GoogleAuthenticator 
    > install via composer
    > run terminal
    > copy >curl -sS https://getcomposer.org/installer | php 
    >      >composer require  phpgangsta/googleauthenticator:dev-master
    > you can now use PHPGangsta_GoogleAunthenticator library

*/

session_start();

/* Create database connection using database.php*/ 
require_once "databaseconn/database.php";

/* require autoload.php */ 
require 'vendor/autoload.php';
$authenticator = new PHPGangsta_GoogleAuthenticator();


   /* select securitykey where id is equals to $_SESSION['id'],
      $_SESSION['id'] was set in login.php */

    $sql = "SELECT securitykey, role FROM admins WHERE id = '" . $_SESSION["id"] . "'";
    $result = mysqli_query($connection,$sql);

    /* $code code you inputted provided by GoogleAuthenticor app */
    $code = $_POST["secretkey"];

    if (mysqli_num_rows($result)) {
           
        while($row = mysqli_fetch_assoc($result)) {

          /* check if inputted securitykey is valid with the row security */
          $secret = $row["securitykey"];
          $isrole = $row["role"];
          $checkResult = $authenticator->verifyCode($secret, $code); 
          if ($checkResult) 
          {
              
              //Set final session for confirmation in session.php */
          
                if ($isrole == 'Admin') {
                  $_SESSION['isAdmin'] = $row["role"];  //set session
                  $myObject = new stdClass();
                  $myObject->success = true;
                  $myObject->reason = 'Valid Key, Successfully Loggedin';
                  $myObject->role = 'Admin';
                  $myJSON = json_encode($myObject);
                  echo $myJSON;
               
                } elseif($isrole == 'User') {
                  $_SESSION['isUser'] = $row["role"]; //set session
                  $myObject = new stdClass();
                  $myObject->success = true;
                  $myObject->reason = 'Valid Key, Successfully Loggedin';
                  $myObject->role = 'User';
                  $myJSON = json_encode($myObject);
                  echo $myJSON;
                }
                           
          } else {
              $myObject = new stdClass();
              $myObject->success = false;
              $myObject->reason = 'Invalid key';
    
              $myJSON = json_encode($myObject);
              echo $myJSON;
          } 
        
      } 
    }else {
      $myObject = new stdClass();
      $myObject->success = false;
      $myObject->reason = 'No result found!';

      $myJSON = json_encode($myObject);
      echo $myJSON;
    }
  
    
 /* $tolerance = 0; */
    //  $checkResult = $authenticator->verifyCode($secret, $code ,tolerance); 
    //Every otp is valid for 30 sec.
    // If somebody provides OTP at 29th sec, by the time it reaches the server OTP is expired.
    //So we can give tolerance =1, it will check current  & previous OTP.
    // tolerance =2, verifies current and last two OTPS
 

 
?>