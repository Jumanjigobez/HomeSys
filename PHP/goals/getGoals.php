<?php 

    include "../config.php";

    $user_id = $_GET['user_id'];

    $query = $conn->prepare("SELECT * FROM goals WHERE user_id = (?)");
    $query->bind_param("s",$user_id);
    $query->execute();

    $result = $query->get_result();
    
    $goalData = array();

    while ($row = $result->fetch_assoc()) {
        $goalItem = array(
            'id' => $row['id'],
            'goal' => $row['Goal'],
            'status' => $row['Status']
        );
        $goalData[] = $goalItem;
    }
    
    // Convert the data to JSON and send it as the response
    header('Content-Type: application/json');
    echo json_encode($goalData);
    
?>