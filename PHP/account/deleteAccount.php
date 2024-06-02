<?php 

    include "../config.php";

    $user_id = $_GET['user_id'];

    $query = $conn->prepare("DELETE FROM users WHERE user_id = (?)");
    $query->bind_param("s", $user_id);
    $query->execute();

    if ($query){
        echo 1;
    } else {
        echo 0;
    }

?>