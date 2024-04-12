<?php 

    include 'config.php';

    $Name = $_POST['Name'];
    $Venue = $_POST['Venue'];
    $Date = $_POST['Date'];
    $Contact = $_POST['Contact'];
    $Type = $_POST['Type'];
    $Status = $_POST['Status'];
    

    if(!empty($Name)&&!empty($Venue)&&!empty($Date)&&!empty($Contact)&&!empty($Type)&&!empty($Status)){
        
        $query = $conn->prepare("INSERT INTO events (
            Name, Venue, Date, Contact, Type, Status
            ) VALUES (?, ?, ?, ?, ?, ?)");

        $query->bind_param("ssssss",
        $Name, $Venue, $Date, $Contact, $Type, $Status);

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