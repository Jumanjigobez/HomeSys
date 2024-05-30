<?php 

    include "../config.php";

    $user_id = $_GET['user_id'];

    $query = $conn->prepare("SELECT * FROM appointments WHERE user_id = (?) ORDER BY Date DESC");
    $query->bind_param("s", $user_id);
    $query->execute();

    $result = $query->get_result();
    
    $appointmentsData = array();

    

    while ($row = $result->fetch_assoc()) {
        $appointmentsItem = array(
            'id' => $row['id'],
            'Name' => $row['Name'],
            'Address' => $row['Address'],
            'Contacts' => $row['Contacts'],
            'Date' => $row['Date'],
            'Type' => $row['Type'],
            'Status' => $row['Status'],
           
        );
        $appointmentsData[] = $appointmentsItem;
    }
    
    // Convert the data to JSON and send it as the response
    header('Content-Type: application/json');
    echo json_encode($appointmentsData);
    
?>