<?php 

    include "../config.php";

    $user_id = $_GET['user_id'];
    
    $query = $conn->prepare("SELECT * FROM todo WHERE user_id = (?)");
    $query->bind_param("s", $user_id);
    $query->execute();

    $result = $query->get_result();
    
    $todoData = array();

    while ($row = $result->fetch_assoc()) {
        $todoItem = array(
            'id' => $row['id'],
            'task' => $row['Task'],
            'status' => $row['Status']
        );
        $todoData[] = $todoItem;
    }
    
    // Convert the data to JSON and send it as the response
    header('Content-Type: application/json');
    echo json_encode($todoData);
    
?>