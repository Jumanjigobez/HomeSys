<?php 

    include "../config.php";

    $id = $_GET['id'];
    $status = "Done";

    $query = $conn->prepare("UPDATE todo SET status = (?) WHERE id = (?)");
    $query->bind_param("ss", $status, $id);
    $query->execute();

    if ($query){
        echo 1;
    } else {
        echo 0;
    }

?>