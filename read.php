<?php


 session_start();    
// Create database connection using database file

//require_once($_SERVER['DOCUMENT_ROOT'] . "/crud/databaseconn/database.php");

require_once "databaseconn/database.php";

    if ($_SERVER["REQUEST_METHOD"] == 'POST') {

        $start = trim($_POST['start']);
        $limit = trim($_POST['limit']);
        $page = trim($_POST['page']);


        $sql = $connection->query("SELECT COUNT(id) FROM users");  // $connection refers to connection variable create in database.php
        while ($row = mysqli_fetch_row($sql)) {
            $rowCount = $row; 
          }
     
        $return_arr = array(); //ArrayList

        $sql = "SELECT * FROM users LIMIT $start, $limit";
        $result_data = $connection->query($sql);
        
        
        #mysqli error handling
        if (!$result_data){
            printf("Error: %s\n", mysqli_error($connection));
            exit();
        }

        while($row = mysqli_fetch_array($result_data)){
            //here goes the data

            $myObj['id'] = $row['id'];
            $myObj['firstname'] = $row['firstname'];
            $myObj['lastname'] = $row['lastname'];
            $myObj['email'] = $row['email'];
            $myObj['phone'] = $row['phone'];
            $myObj['address'] = $row['address'];
            $myObj['address_lat'] = $row['address_lat'];
            $myObj['address_lng'] = $row['address_lng'];
            
            

            $myObj['start'] = $start;
            $myObj['limit'] = $limit;
            $myObj['page'] = $page;

            
        
            array_push($return_arr,$myObj);
        }
       
        $myObject = new stdClass();
        $myObject->total = $rowCount;
        $myObject->data = $return_arr;
        $myJSON = json_encode($myObject);
        echo $myJSON;
    
        mysqli_close($connection);
    
    } else {
       $myObject = new stdClass();
       $myObject->success = false;
       $myObject->reason = "Request not allowed!";

        $myJSON = json_encode($myObject);

        echo $myJSON;

    }

    
    
    
?>
 