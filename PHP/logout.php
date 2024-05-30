<?php 

    include "config.php";
    
    $user_id = $_POST['user_id'];
    $status = "offline";
    
    $query = $conn->prepare("UPDATE `users` SET status = (?) WHERE user_id = (?)");
    $query->bind_param("ss", $status, $user_id);
    $query->execute();

    if($query){
        echo 1;//meaning success
    }else{
        echo "Error, Please Try Again!";
    }
                    
            
    

?>