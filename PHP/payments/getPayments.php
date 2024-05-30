<?php 

    include "../config.php";

    $user_id = $_GET['user_id'];

    $query = $conn->prepare("SELECT * FROM payments WHERE user_id = (?) ORDER BY Date DESC");
    $query-> bind_param("s", $user_id);
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