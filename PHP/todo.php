<?php 

    include 'config.php';

    $Todo = $_POST['Todo'];
    $status = "Pending";

    if(!empty($Todo)){
        $query = $conn->prepare("INSERT INTO todo (Task, Status) VALUES (?, ?)");
        $query->bind_param("ss",$Todo, $status);

        $query2 = $conn->prepare("SELECT * FROM todo");
        $query2->execute();

        $result = $query2->get_result();

        $num = mysqli_num_rows($result);

        if($num<5){//Making sure the todos are less than five for productivity
            $query->execute();//Execute the query 1

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