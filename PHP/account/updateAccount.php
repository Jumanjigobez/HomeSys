<?php 

include "../config.php";

$new_username = $_POST['new_username'];
$new_email = $_POST['new_email'];
$new_psk = $_POST['new_psk'];

$user_id = $_GET['user_id'];

if (!empty($new_username) || !empty($new_email)) {
    // Check if the new username or email is not already taken
    $username_exists = false;
    $email_exists = false;


    if (!empty($new_username)) {
        $query = $conn->prepare("SELECT * FROM users WHERE username = ?");
        $query->bind_param("s", $new_username);
        $query->execute();
        $result_username = $query->get_result();
        $num_username = $result_username->num_rows;
        $username_exists = ($num_username > 0);
    }

    if (!empty($new_email)) {
        $query = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $query->bind_param("s", $new_email);
        $query->execute();
        $result_email = $query->get_result();
        $num_email = $result_email->num_rows;
        $email_exists = ($num_email > 0);
    }

    if ($username_exists && $email_exists) {
        if (!empty($new_psk)) {
            $hash_psk = password_hash($new_psk, PASSWORD_DEFAULT);

            $query = $conn->prepare("UPDATE users SET username = ?, email = ?, psk = ? WHERE user_id = ?");
            $query->bind_param("ssss", $new_username, $new_email, $hash_psk, $user_id);

            if ($query->execute()) {
                echo 1; // Success
            } else {
                echo 0; // Failure
            }
        } else {
            echo 2;//for username or email exist
         }
        
        


    } else if ($username_exists) {
        if (!$email_exists) {
            $query = $conn->prepare("UPDATE users SET email = ? WHERE user_id = ?");
            $query->bind_param("ss", $new_email, $user_id);

          
        }
        
        if (!empty($new_psk)) {
            $hash_psk = password_hash($new_psk, PASSWORD_DEFAULT);

            $query = $conn->prepare("UPDATE users SET username = ?, email = ?, psk = ? WHERE user_id = ?");
            $query->bind_param("ssss", $new_username, $new_email, $hash_psk, $user_id);
        }

        if ($query->execute()) {
            echo 1; // Success
        } else {
            echo 0; // Failure
        }
       
    } else if ($email_exists) {
        if (!$username_exists) {
            $query = $conn->prepare("UPDATE users SET username = ? WHERE user_id = ?");
            $query->bind_param("ss", $new_username, $user_id);

           
        }

        if (!empty($new_psk)) {
            $hash_psk = password_hash($new_psk, PASSWORD_DEFAULT);

            $query = $conn->prepare("UPDATE users SET username = ?, email = ?, psk = ? WHERE user_id = ?");
            $query->bind_param("ssss", $new_username, $new_email, $hash_psk, $user_id);
        }

        if ($query->execute()) {
            echo 1; // Success
        } else {
            echo 0; // Failure
        }
    } else {
        if (!empty($new_psk)) {
            $hash_psk = password_hash($new_psk, PASSWORD_DEFAULT);

            $query = $conn->prepare("UPDATE users SET username = ?, email = ?, psk = ? WHERE user_id = ?");
            $query->bind_param("ssss", $new_username, $new_email, $hash_psk, $user_id);
        } else {
            $query = $conn->prepare("UPDATE users SET username = ?, email = ? WHERE user_id = ?");
            $query->bind_param("sss", $new_username, $new_email, $user_id);
        }

        if ($query->execute()) {
            echo 1; // Success
        } else {
            echo 0; // Failure
        }
    }
} 
?>
