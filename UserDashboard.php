
<?php
   include('ScanLoggedinSession.php');
?>

<!DOCTYPE>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CRUD PHP Ext JS</title>
    <link rel="stylesheet" href="includes/css/themes/theme-triton-all.css">
    <script src="jquery-2.2.4.min.js"></script>
</head>
<style type="text/css">
    .icon-add {
        background-image: url(includes/images/icons/addperson.png) !important;
        background-size: cover;
        background-position: center center;
    }
    .icon-update {
        background-image: url(includes/images/icons/editpencil.png) !important;
        background-size: cover;
        background-position: center center;
    }
    
    .icon-refresh {
        background-image: url(includes/images/icons/refresh.png) !important;
        background-size: cover;
        background-position: center center;
    }
    .icon-delete {
        background-image: url(includes/images/icons/delete_black_icon_18dp.png) !important;
        background-size: cover;
        background-position: center center;
    }
    .icon-logout {
        background-image: url(includes/images/icons/logout-512.png) !important;
        background-size: cover;
        background-position: center center;
    }
</style>
<body>

<div id="login"></div>
<script src="includes/jscripts/extjs6/ext-all.js"></script>
<script src="includes/jscripts/UserDashboard.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>


<script src="includes/jscripts/googlemaps.js"></script>
<script async defer 

    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCEkfOtUw7EXaFr6rst5gZSpZ3hzNEsB_4&callback=initMap">
  function initMap() {
            console.log('google maps initialized.');
        }
</script>

</body>
</html>