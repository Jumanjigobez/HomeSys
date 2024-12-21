<?php 

    include "../config.php";

    $IdsArray = $_GET['checkedIds'];
   
  

    $placeholders = implode(',',array_fill(0, count($IdsArray), '?'));
    $query = $conn->prepare("DELETE FROM users WHERE user_id IN ($placeholders)");
    $query->bind_param(str_repeat('s',count($IdsArray)), ...$IdsArray);
    $query->execute();

    if ($query){
        echo 1;
    } else {
        echo 0;
    }

?>