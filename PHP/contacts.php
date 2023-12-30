<?php 

    include 'config.php';

    $Name = $_POST['Name'];
    $Address = $_POST['Address'];
    $Phone = $_POST['Phone'];
    $Email = $_POST['Email'];
    $Type = $_POST['Type'];
    
    

    if(!empty($Name)&&!empty($Address)&&!empty($Phone)&&!empty($Email)&&!empty($Type)){
        $query = $conn->prepare("INSERT INTO contacts (
            Name, Address, Phone, Email, Type
            ) VALUES (?, ?, ?, ?, ?)");

        $query->bind_param("sssss",
        $Name, $Address, $Phone, $Email, $Type);

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