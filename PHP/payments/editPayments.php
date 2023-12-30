<?php 

    include "../config.php";

    $id = $_POST['Id'];
    $TransCode = $_POST['TransCode'];
    $AccNo = $_POST['AccNo'];
    $AccName = $_POST['AccName'];
    $Amount = $_POST['Amount'];
    $Date = $_POST['Date'];
    $Type = $_POST['Type'];
   

    $query = $conn->prepare("UPDATE payments SET 
    `Trans. Code` = (?), `Acc. No.` = (?), `Acc. Name` = (?),
    Amount = (?), Date = (?), Type = (?) WHERE id = (?)");

    $query->bind_param("sssssss", $TransCode, $AccNo, $AccName, $Amount, $Date, $Type, $id);
    $query->execute();

    if ($query){
        echo 1;
    } else {
        echo 0;
    }

?>