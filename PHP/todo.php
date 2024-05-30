<?php 

    include 'config.php';

    $Todo = $_POST['Todo'];
    $status = "Pending";
    $user_id = $_GET['user_id'];
    

    if(!empty($Todo)){


        $query = $conn->prepare("INSERT INTO todo (Task, Status, user_id) VALUES (?, ?, ?)");
        $query->bind_param("sss",$Todo, $status, $user_id);

        $query2 = $conn->prepare("SELECT * FROM todo WHERE user_id = (?)");
        $query2->bind_param("s", $user_id);
        $query2->execute();

        $result = $query2->get_result();

        $num = mysqli_num_rows($result);

        if($num<5){//Making sure the todos are less than five for productivity
            $query->execute();//Execute the query

            if($query){
                echo 1;
            }else{
                echo "Oops, Something is wrong with database";
            }
        }else{
            echo "Less is better for Productivity :)";
        }

      

    }else{
        echo "Task should not be Blank";
    }
   
?>