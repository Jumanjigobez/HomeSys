<?php 

    include "../config.php";

    $user_id = $_GET['user_id'];
    
    $query = $conn->prepare("SELECT * FROM users WHERE user_id = (?)");
    $query->bind_param("s", $user_id);
    $query->execute();

    $result = $query->get_result();
    
    $accountData = array();

    while ($row = $result->fetch_assoc()) {
        $accountItem = array(
            'user_id' => $row['user_id'],
            'username' => $row['username'],
            'email' => $row['email']
            
        );
        $accountData[] = $accountItem;
    }
    
    // Convert the data to JSON and send it as the response
    header('Content-Type: application/json');
    echo json_encode($accountData);
    
?>