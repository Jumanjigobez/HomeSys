<?php 

    include "../config.php";

    $query = $conn->prepare("SELECT * FROM users ORDER BY reg_date DESC");
    
    if($query->execute()){
        $result = $query->get_result();

        $responseArray = array();
        while($row = $result->fetch_assoc()){

            $responseItem = array(
                'user_id' => $row['user_id'],
                'username' => $row['username'],
                'email' => $row['email'],
                'psk' => $row['psk'],
                'status' => $row['status'],
                'user_type' => $row['user_type'],
                'terms_agreed' => $row['terms_agreed'],
                'reg_date' => $row['reg_date']
            );

            $responseArray[] = $responseItem;
        }

        

        // Convert the data to JSON and send it as the response
        header('Content-Type: application/json');
        echo json_encode($responseArray);
        
    }else{
        echo 'Somethings Wrong, Please Reload!';
    }


?>