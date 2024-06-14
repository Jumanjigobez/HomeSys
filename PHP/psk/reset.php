<?php 

    include '../config.php';

    

    if(isset($_GET['token']) && isset($_GET['email'])){
        $token = $_GET['token'];
        $email = $_GET['email'];
        if(!empty($token) && !empty($email)){
            $curDate = date("Y-m-d H:i:s");

            $query = $conn->prepare("SELECT * FROM reset_temp WHERE token = (?) AND email = (?)");
            $query->bind_param("ss",$token, $email);
            $query->execute();

            $result = $query->get_result();
            $num = mysqli_num_rows($result);

            if($num==0){
                echo "The Link is invalid/expired!";
            }else{
                
                $row = $result->fetch_assoc();
                $expDate = $row['expDate'];
                
                if($expDate >= $curDate){
                    $responseArray = array();

                    $responseItem = array( "email" => $row['email']);

                    $responseArray[] = $responseItem;
                     // Convert the data to JSON and send it as the response
                    header('Content-Type: application/json');
                    echo json_encode($responseArray);


                }else{
                    echo "Oops! Link Expired";
                }
            }
        }else{
            echo 0;//meaning error
        }
    }else{
        echo 0;//meaing error
    }


?>