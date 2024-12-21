<?php 

    include "../config.php";

    $user_id = $_POST['UserId'];
    $username = $_POST['Username'];
    $email = $_POST['Email'];
    $psk = $_POST['Psk'];
    $status = $_POST['Status'];
    $user_type = $_POST['UserType'];
    $terms_agreed = $_POST['TermsAgreed'];
   
    $psk_hashed = password_hash($psk,PASSWORD_DEFAULT);//Hashed Password

    $query = $conn->prepare("UPDATE users SET 
    username = (?), email = (?), psk = (?),
    status = (?), user_type = (?), terms_agreed = (?) WHERE user_id = (?)");

    $query->bind_param("sssssss", $username, $email, $psk_hashed, $status, $user_type, $terms_agreed, $user_id);
    $query->execute();

    if ($query){
        echo 1;
    } else {
        echo 0;
    }

?>