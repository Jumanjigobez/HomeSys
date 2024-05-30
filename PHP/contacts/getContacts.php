<?php 

    include "../config.php";

    $user_id = $_GET['user_id'];

    $query = $conn->prepare("SELECT * FROM contacts WHERE user_id = (?)");
    $query->bind_param("s", $user_id);
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