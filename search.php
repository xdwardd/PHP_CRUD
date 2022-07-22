<?php
    //Including Database configuration file.
    require_once "databaseconn/database.php";
    //Getting value of "search" variable from "script.js".
    if (isset($_POST['search'])) {
    
    //Search box value assigning to $Name variable.
       $Name = $_POST['search'];

             
    //Search query.

    $return_arr = array();
       $Query = "SELECT * FROM users WHERE firstname LIKE '%$Name%'";
    //Query execution
       $ExecQuery = mysqli_query($connection, $Query);
    //Creating unordered list to display result.
   
       //Fetching result from database.
       while ($Result = mysqli_fetch_array($ExecQuery)) {
      
        $myObj['id'] = $Result['id']; 
        $myObj['firstname'] = $Result['firstname']; 
        $myObj['lastname'] = $Result['lastname'];
        $myObj['email'] = $Result['email'];
        $myObj['phone'] = $Result['phone'];

    
        array_push($return_arr,$myObj);
       
    }

          
    $myObject = new stdClass();

    $myObject->data = $return_arr;
    $myJSON = json_encode($myObject);
    echo $myJSON;

}
 ?>