<?php 

    include "../config.php";

    $id = $_POST['Id'];
    $title = $_POST['Title'];
    $description = $_POST['Description'];
    $type = $_POST['Type'];
    $date = $_POST['Date_Started'];
    $status = $_POST['Status'];
    $link = $_POST['Link'];

    $query = $conn->prepare("UPDATE projects SET 
    Title = (?), Description = (?), Type = (?),
    `Date Started` = (?), Status = (?), Link = (?) WHERE id = (?)");

    $query->bind_param("sssssss", $title, $description, $type, $date, $status, $link, $id);
    $query->execute();

    if ($query){
        echo 1;
    } else {
        echo 0;
    }

?>