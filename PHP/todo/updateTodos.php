<?php 

    include "../config.php";

    $id = $_POST['id'];
    $task = $_POST['task'];
    $status = $_POST['status'];

    $query = $conn->prepare("UPDATE todo SET task = (?), status = (?) WHERE id = (?)");
    $query->bind_param("sss", $task, $status, $id);
    $query->execute();

    if ($query){
        echo 1;
    } else {
        echo 0;
    }

?>