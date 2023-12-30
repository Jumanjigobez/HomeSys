<?php 

    include "../config.php";

    $id = $_POST['Id'];
    $Name = $_POST['Name'];
    $Venue = $_POST['Venue'];
    $Date = $_POST['Date'];
    $Contact = $_POST['Contact'];
    $Type = $_POST['Type'];
    $Status = $_POST['Status'];
   

    $query = $conn->prepare("UPDATE events SET 
    Name = (?), Venue = (?), Date = (?),
    Contact = (?), Type = (?), Status = (?) WHERE id = (?)");

    $query->bind_param("sssssss", $Name, $Venue, $Date, $Contact, $Type, $Status, $id);
    $query->execute();

    if ($query){
        echo 1;
    } else {
        echo 0;
    }

?>