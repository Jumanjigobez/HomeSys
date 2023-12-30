<?php 

    include "../config.php";

    $query = $conn->prepare("SELECT * FROM appointments");
    $query->execute();

    $result = $query->get_result();
    
    $appointmentsData = array();

    

    while ($row = $result->fetch_assoc()) {
        $appointmentsItem = array(
            'id' => $row['id'],
            'Name' => $row['Name'],
            'Address' => $row['Address'],
            'Phone' => $row['Phone'],
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