<?php 

    include 'config.php';

    $TransCode = $_POST['TransCode'];
    $AccNo = $_POST['AccNo'];
    $AccName = $_POST['AccName'];
    $Amount = $_POST['Amount'];
    $Date = $_POST['Date'];
    $Type = $_POST['Type'];
    
    $user_id = $_GET['user_id'];

    function formatToLocaleString($value) {
        // Remove any commas from the string
        $number = str_replace(',', '', $value);
        
        // Convert the string to a float
        $number = (float)$number;
        
        // Format the number with commas as thousands separators
        $formattedNumber = number_format($number,2, '.', ',');

        return (string)$formattedNumber;
    }

    if(!empty($TransCode)&&!empty($AccNo)&&!empty($AccName)&&!empty($Amount)&&!empty($Date)&&!empty($Type)){

        $DateValue = ($Date !== ' ') ? $Date : null;
        $formatedAmount = formatToLocaleString($Amount);

        $query = $conn->prepare("INSERT INTO payments (
            `Trans. Code`, `Acc. No.`, `Acc. Name`,Amount, Date, Type, user_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?)");

        $query->bind_param("sssssss",
        $TransCode, $AccNo, $AccName, $formatedAmount, $DateValue, $Type, $user_id);

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