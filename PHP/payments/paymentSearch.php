<?php 

    include "../config.php";

    $term = $_POST['search_term'];

    $query = $conn->prepare("SELECT * FROM payments where 
        Date like '%{$term}%' OR
        Type like '%{$term}%' OR
        `Trans. Code` like '%{$term}%' OR
        `Acc. No.` like '%{$term}%' OR
        `Acc. Name` like '%{$term}%' OR
        Amount like '%{$term}%'
        
        
    ");
    
    $query->execute();

    $result = $query->get_result();
    
    $PaymentsData = array();

    

    while ($row = $result->fetch_assoc()) {
        $PaymentsItem = array(
            'id' => $row['id'],
            'TransCode' => $row['Trans. Code'],
            'AccNo' => $row['Acc. No.'],
            'AccName' => $row['Acc. Name'],
            'Amount' => $row['Amount'],
            'Date' => $row['Date'],
            'Type' => $row['Type'],
           
        );
        $PaymentsData[] = $PaymentsItem;
    }
    
    // Convert the data to JSON and send it as the response
    header('Content-Type: application/json');
    echo json_encode($PaymentsData);
    
?>