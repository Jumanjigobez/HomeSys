<?php 

    include "config.php";
    
    $username = $_POST['username'];
    $email = $_POST['email'];
    $psk = $_POST['password'];
    $terms_check = $_POST['terms_check'];

    if(!empty($username) && !empty($psk) && !empty($email) && $terms_check){
        $query = $conn->prepare("SELECT * FROM `users` WHERE username = (?) OR email = (?)");
        $query->bind_param("ss", $username, $email);
        $query->execute();

        $result = $query->get_result();

        $num = mysqli_num_rows($result);

        if($num == 1){
           echo "Account Exists";
        }else{
            $user_id = 'user_'.random_int(10, 1000);
            $user_type = "normal";
            $status = "offline";
            $terms_check = "Agreed";
            $psk = password_hash($psk,PASSWORD_DEFAULT);//Hashed Password

            $query = $conn->prepare("INSERT INTO `users` VALUES((?),(?),(?),(?),(?),(?), (?))");
            $query->bind_param("sssssss", $user_id, $username, $email, $psk, $status, $user_type, $terms_check);
            $query->execute();

           if($query){
            echo 1;//Meaning success
           }else{
             echo "Error, Please Try Again!";
           }

        }
    }else{
        echo "All fields Required!";
    }
    
    
    

?>