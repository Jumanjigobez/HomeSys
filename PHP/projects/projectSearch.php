<?php 

    include "../config.php";

    $term = $_POST['search_term'];

    $query = $conn->prepare("SELECT * FROM projects where 
        Title like '%{$term}%' OR
        Description like '%{$term}%' OR
        Type like '%{$term}%' OR
        'Date Started' like '%{$term}%' OR
        'Date Finished' like '%{$term}%' OR
        Status like '%{$term}%' OR
        Link like '%{$term}%'
    ");
    
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
            'Date_Finished' => $row['Date Finished'],
            'Status' => $row['Status'],
            'Link' => $row['Link'],
           
        );
        $projectsData[] = $projectsItem;
    }
    
    // Convert the data to JSON and send it as the response
    header('Content-Type: application/json');
    echo json_encode($projectsData);
    
?>