<?php 

    include 'config.php';

    $Name = $_POST['Name'];
    $Address = $_POST['Address'];
    $Contacts = $_POST['Contacts'];
    $Date = $_POST['Date'];
    $Type = $_POST['Type'];
    $Status = $_POST['Status'];
    

    if(!empty($Name)&&!empty($Address)&&!empty($Contacts)&&!empty($Date)&&!empty($Type)&&!empty($Status)){
        $DateValue = ($Date !== ' ') ? $Date : " ";
        $query = $conn->prepare("INSERT INTO appointments (
            Name, Address, Contacts, Date, Type, Status
            ) VALUES (?, ?, ?, ?, ?, ?)");

        $query->bind_param("ssssss",
        $Name, $Address, $Contacts, $DateValue, $Type, $Status);

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