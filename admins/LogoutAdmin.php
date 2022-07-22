<?php
    /* start session */

    if($_SERVER["REQUEST_METHOD"] == 'POST') {
        
        session_start();
        /* unset user data */
        
        unset($_SESSION["isAdmin"]);
        unset($_SESSION["isUser"]);
 
        /* redirect to login page */ 
        $myObject = new stdClass();
        $myObject->success = true;
        $myObject->reason = 'Logout success';

        $myJSON = json_encode($myObject);
        echo $myJSON;  /* Decode in login js to redirect login page */

    } else {
        /* redirect to login page */ 
        $myObject = new stdClass();
        $myObject->success = false;
        $myObject->reason = 'Request not allowed!';

        $myJSON = json_encode($myObject);
        echo $myJSON;
    }



?>