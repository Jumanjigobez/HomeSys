<?php 

    include "../config.php";

    $id = $_POST['Id'];
    $title = $_POST['Title'];
    $description = $_POST['Description'];
    $type = $_POST['Type'];
    $date = $_POST['Date_Started'];
    $datef = $_POST['Date_Finished'];
    $status = $_POST['Status'];
    $link = $_POST['Link'];

    $query = $conn->prepare("UPDATE projects SET 
    Title = (?), Description = (?), Type = (?),
    `Date Started` = (?), `Date Finished` = (?), Status = (?), Link = (?) WHERE id = (?)");

    $query->bind_param("ssssssss", $title, $description, $type, $date, $datef, $status, $link, $id);
    $query->execute();

    if ($query){
        echo 1;
    } else {
        echo 0;
    }

?>