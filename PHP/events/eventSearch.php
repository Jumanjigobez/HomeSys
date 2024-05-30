<?php 

    include "../config.php";

    $term = $_POST['search_term'];

    $user_id = $_GET['user_id'];

    $query = $conn->prepare("SELECT * FROM events WHERE user_id = (?) AND
    ( 
        Name like '%{$term}%' OR
        Venue like '%{$term}%' OR
        Date like '%{$term}%' OR
        Contact like '%{$term}%' OR
        Type like '%{$term}%' OR
        Status like '%{$term}%'
    )

        ORDER BY Date DESC
    ");
    
    $query->bind_param("s", $user_id);
    $query->execute();

    $result = $query->get_result();
    
    $eventsData = array();

    

    while ($row = $result->fetch_assoc()) {
        $eventsItem = array(
            'id' => $row['id'],
            'Name' => $row['Name'],
            'Venue' => $row['Venue'],
            'Date' => $row['Date'],
            'Contact' => $row['Contact'],
            'Type' => $row['Type'],
            'Status' => $row['Status'],
           
        );
        $eventsData[] = $eventsItem;
    }
    
    // Convert the data to JSON and send it as the response
    header('Content-Type: application/json');
    echo json_encode($eventsData);
    
?>