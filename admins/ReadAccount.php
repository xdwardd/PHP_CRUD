<?php

    # Create database connection using database.php file

    require_once "../databaseconn/database.php";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        # code...
        $return_arr = array();

        $sql = "SELECT * FROM admins";
        $result = $connection->query($sql); # $mysqli refers to the connection variable in database.php

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $row_array["id"] = $row["id"];
            $row_array["username"] = $row["username"];
            $row_array["password"] = $row["password"];
            $row_array["securitykey"] = $row["securitykey"];
            $row_array["role"] = $row["role"];
            $row_array["created_by"] = $row["created_by"];

            array_push($return_arr, $row_array);
        }
        echo json_encode($return_arr);
    } else {
        $myObject = new stdClass();
        $myObject->success = false;
        $myObject->reason = 'Request not allowed';

        $myJSON = json_encode($myObject);
        echo $myJSON;
    }


?>