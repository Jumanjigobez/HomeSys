<?php 

    include "../config.php";

    $query = $conn->prepare("SELECT * FROM todo");
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