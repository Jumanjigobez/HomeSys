<?php 

    include "../config.php";

    $Id = $_POST['Id'];
    $Start = $_POST['Start'];
    $SPeriod = $_POST['SPeriod'];
    $End = $_POST['End'];
    $EPeriod = $_POST['EPeriod'];
    $Mon = $_POST['Mon'];
    $Tue = $_POST['Tue'];
    $Wed = $_POST['Wed'];
    $Thur = $_POST['Thur'];
    $Fri = $_POST['Fri'];
   

    $query = $conn->prepare("UPDATE class_timetable SET 
        Start = (?),SPeriod = (?), End = (?), EPeriod = (?), Mon = (?), Tue = (?), Wed = (?), Thur = (?), Fri = (?) 
        WHERE id = (?)"
    );
    $query->bind_param("ssssssssss", $Start,$SPeriod, $End, $EPeriod, $Mon, $Tue, $Wed, $Thur, $Fri, $Id);
    $query->execute();

    if ($query){
        echo 1;
    } else {
        echo 0;
    }

?>