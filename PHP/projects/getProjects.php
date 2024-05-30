<?php 

    include "../config.php";

    $user_id = $_GET['user_id'];

    $query = $conn->prepare("SELECT * FROM projects WHERE user_id = (?) ORDER BY `Date Started` Desc");
    $query->bind_param("s", $user_id);
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