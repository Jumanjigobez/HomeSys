<?php 

    include 'config.php';

    $TransCode = $_POST['TransCode'];
    $AccNo = $_POST['AccNo'];
    $AccName = $_POST['AccName'];
    $Amount = $_POST['Amount'];
    $Date = $_POST['Date'];
    $Type = $_POST['Type'];
    

    if(!empty($TransCode)&&!empty($AccNo)&&!empty($AccName)&&!empty($Amount)&&!empty($Date)&&!empty($Type)){
        $query = $conn->prepare("INSERT INTO payments (
            `Trans. Code`, `Acc. No.`, `Acc. Name`,Amount, Date, Type
            ) VALUES (?, ?, ?, ?, ?, ?)");

        $query->bind_param("ssssss",
        $TransCode, $AccNo, $AccName, $Amount, $Date, $Type);

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