<?php 

    include "../config.php";

    $id = $_GET['id'];

    $query= $conn->prepare("DELETE FROM projects WHERE id = (?)");
    $query->bind_param("s", $id);
    $query->execute();

    if($query){
        echo 1;
    }else{
        echo 0;
    }

    
?>