<?php
   require_once "databaseconn/database.php";
   
   # Generate hash password

   
   $password = 'Admin12!@';

   $hash_password = password_hash($password, PASSWORD_DEFAULT);

   echo $hash_password;   
    


    # Verify hash password;

  // $newhash = '$2y$10$48KKG/ZyqH6Y2cuX3b2KweS0gpCrR.UCxYqnPN4HcneH1ujHGlJOm';
   //$password = 'Admin12!@';
   /*
   $newhash = '$2y$10$CxT.a4XYZE5D.x1AU9SWG.ETzaCM1dnqdABhqXKeNwHlhbaZ9lNsa';
   $password = 'Myadminn';
   if(password_verify($password, $newhash)){

        echo 'Password Match';

    } else {

        echo 'Password Dont Match';
   }*/

?>