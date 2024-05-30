<?php 

    include 'config.php';

    $Name = $_POST['Name'];
    $Venue = $_POST['Venue'];
    $Date = $_POST['Date'];
    $Contact = $_POST['Contact'];
    $Type = $_POST['Type'];
    $Status = $_POST['Status'];
    
    $user_id = $_GET['user_id'];

    if(!empty($Name)&&!empty($Venue)&&!empty($Date)&&!empty($Contact)&&!empty($Type)&&!empty($Status)){
        
        $query = $conn->prepare("INSERT INTO events (
            Name, Venue, Date, Contact, Type, Status, user_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?)");

        $query->bind_param("sssssss",
        $Name, $Venue, $Date, $Contact, $Type, $Status, $user_id);

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