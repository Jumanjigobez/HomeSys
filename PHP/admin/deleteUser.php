<?php 

    include "../config.php";

    $User_Id = $_GET['UserId'];

    $query= $conn->prepare("DELETE FROM users WHERE user_id = (?)");
    $query->bind_param("s", $User_Id);
    $query->execute();

    if($query){
        echo 1;
    }else{
        echo 0;
    }

    
?>