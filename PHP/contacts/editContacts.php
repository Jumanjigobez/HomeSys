<?php 

    include "../config.php";

    $id = $_POST['Id'];
    $Name = $_POST['Name'];
    $Address = $_POST['Address'];
    $Phone = $_POST['Phone'];
    $Email = $_POST['Email'];
    $Type = $_POST['Type'];
   

    $query = $conn->prepare("UPDATE contacts SET 
    Name = (?), Address = (?), Phone = (?),
    Email = (?), Type = (?) WHERE id = (?)");

    $query->bind_param("ssssss", $Name, $Address, $Phone, $Email, $Type, $id);
    $query->execute();

    if ($query){
        echo 1;
    } else {
        echo 0;
    }

?>