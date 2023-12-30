<?php 

    include "config.php";
    
    $username = $_POST['username'];
    $psk = $_POST['password'];

    if(!empty($username) && !empty($psk)){
        $query = $conn->prepare("SELECT * FROM `login` WHERE username = (?)");
        $query->bind_param("s", $username);
        $query->execute();

        $result = $query->get_result();

        $num = mysqli_num_rows($result);

        if($num == 1){
            while($row = $result->fetch_assoc()){
                if(password_verify($psk, $row['psk'])){
                    
                    echo 1;//meaning success
                    
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