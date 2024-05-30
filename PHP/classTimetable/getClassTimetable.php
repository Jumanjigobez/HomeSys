<?php 

    include "../config.php";

    $user_id = $_GET['user_id'];

    $query = $conn->prepare("SELECT * FROM class_timetable WHERE user_id = (?)");
    $query->bind_param("s", $user_id);
    $query->execute();

    $result = $query->get_result();
    
    $timetableData = array();

    while ($row = $result->fetch_assoc()) {
        $timetableItem = array(
            'id' => $row['id'],
            'Start' => $row['Start'],
            'SPeriod' => $row['SPeriod'],
            'End' => $row['End'],
            'EPeriod' => $row['EPeriod'],
            'Mon' => $row['Mon'],
            'Tue' => $row['Tue'],
            'Wed' => $row['Wed'],
            'Thur' => $row['Thur'],
            'Fri' => $row['Fri'],
        );
        $timetableData[] = $timetableItem;
    }
    
    // Convert the data to JSON and send it as the response
    header('Content-Type: application/json');
    echo json_encode($timetableData);
    
?>