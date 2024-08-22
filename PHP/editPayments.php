<?php 

    include "../config.php";

    $id = $_POST['Id'];
    $TransCode = $_POST['TransCode'];
    $AccNo = $_POST['AccNo'];
    $AccName = $_POST['AccName'];
    $Amount = $_POST['Amount'];
    $Date = $_POST['Date'];
    $Type = $_POST['Type'];
   
    function formatToLocaleString($value) {
        // Remove any commas from the string
        $number = str_replace(',', '', $value);
        
        // Convert the string to a float
        $number = (float)$number;
        
        // Format the number with commas as thousands separators
        $formattedNumber = number_format($number,2, '.', ',');

        return (string)$formattedNumber;
    }

   
    $formatedAmount = formatToLocaleString($Amount);

    $query = $conn->prepare("UPDATE payments SET 
    `Trans. Code` = (?), `Acc. No.` = (?), `Acc. Name` = (?),
    Amount = (?), Date = (?), Type = (?) WHERE id = (?)");

    $query->bind_param("sssssss", $TransCode, $AccNo, $AccName, $formatedAmount, $Date, $Type, $id);
    $query->execute();

    if ($query){
        echo 1;
    } else {
        echo 0;
    }

?>