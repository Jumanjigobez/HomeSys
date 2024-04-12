<?php 

    include 'config.php';

    $Goal = $_POST['goal'];
    $status = "Pending";

    if(!empty($Goal)){
        $query = $conn->prepare("INSERT INTO goals (Goal, Status) VALUES (?, ?)");
        $query->bind_param("ss",$Goal, $status);

        $query2 = $conn->prepare("SELECT * FROM goals");
        $query2->execute();

        $result = $query2->get_result();

        $num = mysqli_num_rows($result);

       
        $query->execute();

        if($query){
            echo 1;
        }else{
            echo "Oops, Something is wrong with database";
        }
        
    }else{
        echo "Goal should not be Blank";
    }

?>