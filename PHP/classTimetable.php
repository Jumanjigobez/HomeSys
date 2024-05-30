<?php 

    include 'config.php';

    $Start = $_POST['Start'];
    $SPeriod = $_POST['SPeriod'];
    $End = $_POST['End'];
    $EPeriod = $_POST['EPeriod'];
    $Mon = $_POST['Mon'];
    $Tue = $_POST['Tue'];
    $Wed = $_POST['Wed'];
    $Thur = $_POST['Thur'];
    $Fri = $_POST['Fri'];

    $user_id = $_GET['user_id'];

    if(!empty($Start)&&!empty($SPeriod)&&!empty($End)&&!empty($EPeriod)&&!empty($Mon)&&!empty($Tue)&&!empty($Wed)&&!empty($Thur)&&!empty($Fri)){
        $query = $conn->prepare("INSERT INTO class_timetable (
            Start, SPeriod, End, EPeriod, Mon, Tue, Wed, Thur, Fri, user_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        $query->bind_param("ssssssssss",
        $Start,$SPeriod, $End, $EPeriod, $Mon, $Tue, $Wed, $Thur, $Fri, $user_id);

        $query->execute();//Execute the query

        if($query){
            echo 1;
        }else{
            echo "Oops, Something is wrong with database";
        }
      
    }else{
        echo "All Fields should not be Blank";
    }

?>