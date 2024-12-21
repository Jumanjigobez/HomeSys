<?php 

    include "config.php";
    
    $username = $_POST['username'];
    $email = $_POST['email'];
    $psk = $_POST['password'];
    $terms_check = $_POST['terms_check'];

   

    function generateUserID() {
        // $datePart = date("Ymd");
        $randomPart = generateRandomString(8);
        return "user_".$randomPart;
    }
    
    function generateRandomString($length) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charLength - 1)];
        }
        return $randomString;
    }

    // function getRegDate($userId) {
        
    //     $RegDate = substr($userId, -8);
    //     if (substr($RegDate, 0, 1) === "2") {
    //         return $RegDate; // Outputs: 20240609
    //     }
    // }

    if(!empty($username) && !empty($psk) && !empty($email) && $terms_check){
        $query = $conn->prepare("SELECT * FROM `users` WHERE username = (?) OR email = (?)");
        $query->bind_param("ss", $username, $email);
        $query->execute();

        $result = $query->get_result();

        $num = mysqli_num_rows($result);

        if($num == 1){
           echo "Account Exists";
        }else{
            $user_id = generateUserID();
            date_default_timezone_set('Africa/Nairobi');
            $reg_date = date('Y-m-d H:i:s');
            $user_type = "normal";
            $status = "offline";
            $terms_check = "Agreed";
            
            $psk = password_hash($psk,PASSWORD_DEFAULT);//Hashed Password

            $query = $conn->prepare("INSERT INTO `users` VALUES((?),(?),(?),(?),(?),(?), (?), (?))");
            $query->bind_param("ssssssss", $user_id, $username, $email, $psk, $status, $user_type, $terms_check, $reg_date);
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