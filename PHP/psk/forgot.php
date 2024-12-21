<?php 
    use PHPMailer\PHPMailer\PHPMailer;

    include "../config.php";


    $email = $_POST['email'];

    if(!empty($email)){
        $query = $conn->prepare("SELECT * FROM users WHERE email = (?)");
        $query->bind_param("s", $email);
        $query->execute();

        $result = $query->get_result();

        $num = mysqli_num_rows($result);

        if($num==0){
            echo 'No User Found! Please Create a New Account';
        }else{
            $row = $result->fetch_assoc();//will be used to get the username of the user

            $expFormat = mktime(date("H"), date("i"), date("s"), date("m"), date("d")+1, date("Y"));
            $expDate = date("Y-m-d H:i:s",$expFormat);

            $Token = md5(2418*2);
            $addToken = substr(md5(uniqid(rand(), 1)),3,10);

            $Token = $Token . $addToken;

            //Inserting to the Reset_Temp table
            $query = $conn->prepare("INSERT INTO reset_temp (email, token, expDate) VALUES (?, ?, ?)");
            $query->bind_param("sss",$email, $Token, $expDate);
            
            if($query->execute()){
               
                $output = '
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Password Reset Request</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            padding: 20px;
                            border: 1px solid #ccc;
                            border-radius: 5px;
                            background-color: #f9f9f9;
                        }
                        h1 {
                            text-align: center;
                            color: #333;
                        }
                        p {
                            margin: 10px 0;
                        }
                        
                        .btn {
                            text-decoration: none;
                            color: #fff;
                            font-weight: bold;
                            display: inline-block;
                            padding: 10px 20px;
                            background: black;
                            border-radius: 5px;
                        }
                    </style>
                    </head>
                    <body>
                        <div class="container">
                            <img src="https://homesys.000webhostapp.com/images/logo.png" alt="HomeSys" width="50" height="50"/>
                            <h1>Password Reset Request</h1>
                            <p>Dear ' . $row['username'] . ',</p>
                            <p>Please click the button below to reset your password:</p>
                            <p><a class="btn" href="https://homesys.000webhostapp.com/reset?token=' . $Token . '&email=' . $email . '" target="_blank" style="color: #fff;">RESET NOW</a></p>
                            <p>Please be sure to click or copy the link correctly. The link will <strong>expire</strong> after <strong>1 day</strong> for security reasons.</p>
                            <p>If you did not request this forgotten password email, no action is needed, your password will not be reset. However, you may want to log into your account and change your password as someone may have guessed it!</p>
                            <p>Thanks for using HomeSys 😉</p>
                            <br>
                            <p>Warm Regards</p>
                            <p>Juma Chaje</p>
                            <p>Founder, HomeSys</p>
                        </div>
                    </body>
                    </html>
                    ';

                $body = $output;
                $subject = "Password Recovery - HomeSys";
                
                $emailTo = $email;

                require_once '../phpmailer/Exception.php';
                require_once '../phpmailer/PHPMailer.php';
                require_once '../phpmailer/SMTP.php';

                $mail = new PHPMailer(true);
                try {
                
                    $mail->isSMTP();
                    $mail->Host = 'smtp.gmail.com';
                    $mail->SMTPAuth = true;
                    $mail->Username = 'jumagobe3@gmail.com';//your email
                    $mail->Password = '';//your email password
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                    $mail->Port = '587';
    
                    $mail->From = 'jumagobe3@gmail.com';
                    $mail->FromName = 'HomeSys';
                    $mail->addAddress($emailTo);
    
                    $mail->isHTML(true);
                    $mail->Subject = $subject;
                    $mail->Body = $body;

                    if($mail->send()){
                        echo 1;
                    }else{
                        echo "Somethings Wrong! Please Try Again";
                    }

                } catch (Exception $e) {
                    echo "Sorry! Authentication Error on our side.";
                    
                }
                

            

            }

    
        }

    }
    
?>