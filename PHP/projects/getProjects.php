<?php 

    include "../config.php";

    $query = $conn->prepare("SELECT * FROM projects");
    $query->execute();

    $result = $query->get_result();
    
    $projectsData = array();

    

    while ($row = $result->fetch_assoc()) {
        $projectsItem = array(
            'id' => $row['id'],
            'Title' => $row['Title'],
            'Description' => $row['Description'],
            'Type' => $row['Type'],
            'Date_Started' => $row['Date Started'],
            'Status' => $row['Status'],
            'Link' => $row['Link'],
           
        );
        $projectsData[] = $projectsItem;
    }
    
    // Convert the data to JSON and send it as the response
    header('Content-Type: application/json');
    echo json_encode($projectsData);
    
?>