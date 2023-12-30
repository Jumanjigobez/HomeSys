<?php 

    include 'config.php';

    $Title = $_POST['Title'];
    $Description = $_POST['Description'];
    $Type = $_POST['Type'];
    $Date_Started = $_POST['Date_Started'];
    $Status = $_POST['Status'];
    $Link = $_POST['Link'];
    

    if(!empty($Title)&&!empty($Description)&&!empty($Type)&&!empty($Date_Started)&&!empty($Status)&&!empty($Link)){
        $query = $conn->prepare("INSERT INTO projects (
            Title, Description, Type, `Date Started`, Status, Link
            ) VALUES (?, ?, ?, ?, ?, ?)");

        $query->bind_param("ssssss",
        $Title, $Description, $Type, $Date_Started, $Status, $Link);

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