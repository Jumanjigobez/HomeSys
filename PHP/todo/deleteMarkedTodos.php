<?php 

    include "../config.php";

    $IdsArray = $_GET['checkedIds'];
   
  

    $placeholders = implode(',',array_fill(0, count($IdsArray), '?'));
    $query = $conn->prepare("DELETE FROM todo WHERE id IN ($placeholders)");
    $query->bind_param(str_repeat('i',count($IdsArray)), ...$IdsArray);
    $query->execute();

    if ($query){
        echo 1;
    } else {
        echo 0;
    }

?>