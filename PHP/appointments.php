<?php 

    include 'config.php';

    $Name = $_POST['Name'];
    $Address = $_POST['Address'];
    $Phone = $_POST['Phone'];
    $Date = $_POST['Date'];
    $Type = $_POST['Type'];
    $Status = $_POST['Status'];
    

    if(!empty($Name)&&!empty($Address)&&!empty($Phone)&&!empty($Date)&&!empty($Type)&&!empty($Status)){
        $query = $conn->prepare("INSERT INTO appointments (
            Name, Address, Phone, Date, Type, Status
            ) VALUES (?, ?, ?, ?, ?, ?)");

        $query->bind_param("ssssss",
        $Name, $Address, $Phone, $Date, $Type, $Status);

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