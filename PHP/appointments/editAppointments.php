<?php 

    include "../config.php";

    $id = $_POST['Id'];
    $Name = $_POST['Name'];
    $Address = $_POST['Address'];
    $Phone = $_POST['Phone'];
    $Date = $_POST['Date'];
    $Type = $_POST['Type'];
    $Status = $_POST['Status'];
   

    $query = $conn->prepare("UPDATE appointments SET 
    Name = (?), Address = (?), Phone = (?),
    Date = (?), Type = (?), Status = (?) WHERE id = (?)");

    $query->bind_param("sssssss", $Name, $Address, $Phone, $Date, $Type, $Status, $id);
    $query->execute();

    if ($query){
        echo 1;
    } else {
        echo 0;
    }

?>