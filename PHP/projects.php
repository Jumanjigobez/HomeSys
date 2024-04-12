<?php 

    include 'config.php';

    $Title = $_POST['Title'];
    $Description = $_POST['Description'];
    $Type = $_POST['Type'];
    $Date_Started = $_POST['Date_Started'];
    $Date_Finished = $_POST['Date_Finished'];
    $Status = $_POST['Status'];
    $Link = $_POST['Link'];
    

    if(!empty($Title)&&!empty($Description)&&!empty($Type)&&!empty($Date_Started)&&!empty($Status)&&!empty($Link)){
        // $DateValue = ($Date_Started !== ' ') ? $Date_Started : null;
        // $DateValue2 = ($Date_Finished !== ' ') ? $Date_Finished : null;
        
        $query = $conn->prepare("INSERT INTO projects (
            Title, Description, Type, `Date Started`,`Date Finished`, Status, Link
            ) VALUES (?, ?, ?, ?, ?, ?, ?)");

        $query->bind_param("sssssss",
        $Title, $Description, $Type, $Date_Started, $Date_Finished, $Status, $Link);

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