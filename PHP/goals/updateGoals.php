<?php 

    include "../config.php";

    $id = $_POST['id'];
    $goal = $_POST['goal'];
    $status = $_POST['status'];

    $query = $conn->prepare("UPDATE goals SET goal = (?), status = (?) WHERE id = (?)");
    $query->bind_param("sss", $goal, $status, $id);
    $query->execute();

    if ($query){
        echo 1;
    } else {
        echo 0;
    }

?>