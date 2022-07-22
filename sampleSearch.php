<?php
    //Including Database configuration file.
    require_once "databaseconn/database.php";
    //Getting value of "search" variable from "script.js".
    if (isset($_POST['search'])) {
    //Search box value assigning to $Name variable.
       $Name = $_POST['search'];
    //Search query.
       $Query = "SELECT firstname FROM users WHERE firstname LIKE '%$Name%'";
    //Query execution
       $ExecQuery = MySQLi_query($connection, $Query);
    //Creating unordered list to display result.
       echo '
    <ul>
       ';
       //Fetching result from database.
       while ($Result = MySQLi_fetch_array($ExecQuery)) {
           ?>
       <!-- Creating unordered list items.
            Calling javascript function named as "fill" found in "script.js" file.
            By passing fetched result as parameter. -->
       <li onclick='fill("<?php echo $Result['firstname']; ?>")'>
       <a>
       <!-- Assigning searched result in "Search box" in "search.php" file. -->
           <?php echo $Result['firstname']; ?>
       </li></a>
       <!-- Below php code is just for closing parenthesis. Don't be confused. -->
       <?php
    }}
    ?>
    </ul>