<?php 

    include "../config.php";

    $term = $_POST['search_term'];

    $query = $conn->prepare("SELECT * FROM appointments where 
        Name like '%{$term}%' OR
        Address like '%{$term}%' OR
        Contacts like '%{$term}%' OR
        Date like '%{$term}%' OR
        Type like '%{$term}%' OR
        Status like '%{$term}%'
    ");
    
    $query->execute();

    $result = $query->get_result();
    
    $appointmentsData = array();

    

    while ($row = $result->fetch_assoc()) {
        $appointmentItem = array(
            'id' => $row['id'],
            'Name' => $row['Name'],
            'Address' => $row['Address'],
            'Contacts' => $row['Contacts'],
            'Date' => $row['Date'],
            'Type' => $row['Type'],
            'Status' => $row['Status'],
           
        );
        $appointmentsData[] = $appointmentItem;
    }
    
    // Convert the data to JSON and send it as the response
    header('Content-Type: application/json');
    echo json_encode($appointmentsData);
    
?>