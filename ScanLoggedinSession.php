<?php
  session_start();
  
  require_once "databaseconn/database.php";
 require 'vendor/autoload.php';

  $authenticator = new PHPGangsta_GoogleAuthenticator();
  if($_SERVER["REQUEST_METHOD"] == 'POST' ) {
      
   // check if there are session saved


   if(isset($_SESSION["isAdmin"])) {

         $myObject = new stdClass();
         $myObject->success = true;
         $myObject->role = "Admin";
         $myObject->reason = 'There are admin session saved';
         $myJSON = json_encode($myObject);
         echo $myJSON;   // redirect to page
   
      } elseif(isset($_SESSION["isUser"])) {
         $myObject = new stdClass();
         $myObject->success = true;
         $myObject->role = 'User';
         $myObject->reason = 'There are user session saved';
      
         $myJSON = json_encode($myObject);
         echo $myJSON;   // redirect to page
   
      } else {
         $myObject = new stdClass();
         $myObject->success = false;
         $myObject->reason = 'No Session saved';
      
         $myJSON = json_encode($myObject);
         echo $myJSON;  //redirect to login page
      }

    
   
}
  

?>