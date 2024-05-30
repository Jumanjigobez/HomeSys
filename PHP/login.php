<?php 

    include "config.php";
    
    $username = $_POST['username'];
    $psk = $_POST['password'];

    if(!empty($username) && !empty($psk)){
        $user_id = "";//Get the user_id

        $query = $conn->prepare("SELECT user_id from users WHERE username = (?)");
        $query->bind_param("s",$username);
        $query->execute();

        if($query){
            $result = $query->get_result();
            $row = $result->fetch_assoc();
            
             if(!empty($row)){
                $user_id = $row['user_id'];
            }else{
                $user_id = "";
            }
        }

        $query = $conn->prepare("SELECT * FROM `users` WHERE user_id = (?)");
        $query->bind_param("s", $user_id);
        $query->execute();

        $result = $query->get_result();

        $num = mysqli_num_rows($result);

        if($num == 1){
            while($row = $result->fetch_assoc()){
                if(password_verify($psk, $row['psk'])){
                    $status = "online";

                    $query = $conn->prepare("UPDATE `users` SET status = (?) WHERE user_id = (?)");
                    $query->bind_param("ss", $status, $user_id);
                    $query->execute();

                    $responseArray = array();
                    if($query){
                        $responseItem = array(
                            'user_id' => $user_id,
                            'username' => $username
                        );

                        $responseArray[] = $responseItem;

                        // Convert the data to JSON and send it as the response
                        header('Content-Type: application/json');
                        echo json_encode($responseArray);

                        // echo $user_id;//meaning success
                    }else{
                        echo "Error, Please Try Again!";
                    }
                    
                    
                }else{
                    echo "Invalid Password!";
                }
            }
        }else{
            echo "Unknown User!";
        }
    }else{
        echo "All fields Required!";
    }
    

?>
