<?php 

    include "../config.php";

    $term = $_POST['search_term'];

    $query = $conn->prepare("SELECT * FROM contacts where 
        Name like '%{$term}%' OR
        Address like '%{$term}%' OR
        Phone like '%{$term}%' OR
        Email like '%{$term}%' OR
        Type like '%{$term}%' 
    ");
    
    $query->execute();

    $result = $query->get_result();
    
    $contactsData = array();

    

    while ($row = $result->fetch_assoc()) {
        $contactItem = array(
            'id' => $row['id'],
            'Name' => $row['Name'],
            'Address' => $row['Address'],
            'Phone' => $row['Phone'],
            'Email' => $row['Email'],
            'Type' => $row['Type'],
           
        );
        $contactsData[] = $contactItem;
    }
    
    // Convert the data to JSON and send it as the response
    header('Content-Type: application/json');
    echo json_encode($contactsData);
    
?>