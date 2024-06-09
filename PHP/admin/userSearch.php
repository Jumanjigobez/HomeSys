<?php 

    include "../config.php";

    $term = $_POST['search_term'];


    $query = $conn->prepare("SELECT * FROM users WHERE
    ( 
        user_id like '%{$term}%' OR
        username like '%{$term}%' OR
        email like '%{$term}%' OR
        psk like '%{$term}%' OR
        status like '%{$term}%' OR
        user_type like '%{$term}%' OR
        terms_agreed like '%{$term}%' OR
        reg_date like '%{$term}%'
    )

    ");
    
   
    $query->execute();

    $result = $query->get_result();
    
    $usersData = array();

    

    while ($row = $result->fetch_assoc()) {
        $usersItem = array(
            'user_id' => $row['user_id'],
            'username' => $row['username'],
            'email' => $row['email'],
            'psk' => $row['psk'],
            'status' => $row['status'],
            'user_type' => $row['user_type'],
            'terms_agreed' => $row['terms_agreed'],
            'reg_date' => $row['reg_date'],
           
        );
        $usersData[] = $usersItem;
    }
    
    // Convert the data to JSON and send it as the response
    header('Content-Type: application/json');
    echo json_encode($usersData);
    
?>