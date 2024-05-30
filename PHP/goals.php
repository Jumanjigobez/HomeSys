<?php 

    include 'config.php';

    $user_id = $_GET['user_id'];
    $Goal = $_POST['goal'];
    $status = "Pending";
    

    if(!empty($Goal)){
        $query = $conn->prepare("INSERT INTO goals (Goal, Status, user_id) VALUES (?, ?, ?)");
        $query->bind_param("sss",$Goal, $status, $user_id);

        // $query2 = $conn->prepare("SELECT * FROM goals WHERE user_id = (?)");
        // $query2->bind_param("s",$user_id);
        // $query2->execute();

        // $result = $query2->get_result();

        // $num = mysqli_num_rows($result);

       
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