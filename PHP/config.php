<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Header: *');
    header('Access-Control-Allow-Method: *');
    
    // CREATE DATABASE `homesys`
    // CREATE TABLE `homesys`.`login` ( `id` INT NOT NULL AUTO_INCREMENT ,  `username` VARCHAR(255) NOT NULL ,  `psk` VARCHAR(255) CHARACTER SET cp1251 COLLATE cp1251_general_cs NOT NULL ,    PRIMARY KEY  (`id`)) ENGINE = InnoDB;
    // CREATE TABLE `homesys`.`todo` ( `#` INT NOT NULL AUTO_INCREMENT ,  `Task` VARCHAR(255) NOT NULL ,  `Status` VARCHAR(255) NOT NULL ,    PRIMARY KEY  (`#`)) ENGINE = InnoDB;
    // CREATE TABLE `homesys`.`personal_timetable` ( `id` INT NOT NULL ,  `Start` VARCHAR(100) NOT NULL ,  `End` VARCHAR(100) NOT NULL ,  `Mon` VARCHAR(100) NOT NULL ,  `Tue` VARCHAR(100) NOT NULL ,  `Wed` VARCHAR(100) NOT NULL ,  `Thur` VARCHAR(100) NOT NULL ,  `Fri` VARCHAR(100) NOT NULL ,    PRIMARY KEY  (`id`)) ENGINE = InnoDB;
    // CREATE TABLE `homesys`.`class_timetable` ( `id` INT NOT NULL ,  `Start` VARCHAR(100) NOT NULL ,  `End` VARCHAR(100) NOT NULL ,  `Mon` VARCHAR(100) NOT NULL ,  `Tue` VARCHAR(100) NOT NULL ,  `Wed` VARCHAR(100) NOT NULL ,  `Thur` VARCHAR(100) NOT NULL ,  `Fri` VARCHAR(100) NOT NULL ,    PRIMARY KEY  (`id`)) ENGINE = InnoDB;
    // CREATE TABLE `homesys`.`projects` ( `id` INT NOT NULL AUTO_INCREMENT ,  `Title` VARCHAR(255) NOT NULL ,  `Description` VARCHAR(255) NOT NULL ,  `Type` VARCHAR(255) NOT NULL ,  `Date Started` DATE NOT NULL ,  `Status` VARCHAR(255) NOT NULL ,  `Link` VARCHAR(255) NOT NULL ,    PRIMARY KEY  (`id`)) ENGINE = InnoDB;
    // CREATE TABLE `homesys`.`contacts` ( `id` INT NOT NULL AUTO_INCREMENT ,  `Name` VARCHAR(255) NOT NULL ,  `Address` VARCHAR(255) NOT NULL ,  `Phone` VARCHAR(100) NOT NULL ,  `Email` VARCHAR(255) NOT NULL ,  `Type` VARCHAR(200) NOT NULL ,    PRIMARY KEY  (`id`)) ENGINE = InnoDB;
    // CREATE TABLE `homesys`.`appointments` ( `id` INT NOT NULL AUTO_INCREMENT ,  `Name` VARCHAR(255) NOT NULL ,  `Address` VARCHAR(255) NOT NULL ,  `Phone` VARCHAR(50) NOT NULL ,  `Date` DATE NOT NULL ,  `Type` VARCHAR(100) NOT NULL ,  `Status` VARCHAR(100) NOT NULL ,    PRIMARY KEY  (`id`)) ENGINE = InnoDB;
    // CREATE TABLE `homesys`.`payments` ( `id` INT NOT NULL AUTO_INCREMENT ,  `Trans. Code` VARCHAR(255) NOT NULL ,  `Acc. No.` VARCHAR(255) NOT NULL ,  `Acc. Name` VARCHAR(255) NOT NULL ,  `Amount` VARCHAR(255) NOT NULL ,  `Date` DATE NOT NULL ,  `Type` VARCHAR(100) NOT NULL ,    PRIMARY KEY  (`id`)) ENGINE = InnoDB;
    // CREATE TABLE `homesys`.`events` ( `id` INT NOT NULL AUTO_INCREMENT ,  `Name` VARCHAR(255) NOT NULL ,  `Venue` VARCHAR(255) NOT NULL ,  `Date` DATE NOT NULL ,  `Contact` VARCHAR(255) NOT NULL ,  `Type` VARCHAR(100) NOT NULL ,  `Status` VARCHAR(100) NOT NULL ,    PRIMARY KEY  (`id`)) ENGINE = InnoDB;
    // CREATE TABLE `homesys`.`goals` ( `#` INT NOT NULL AUTO_INCREMENT ,  `Goal` VARCHAR(255) NOT NULL ,  `Status` VARCHAR(255) NOT NULL ,    PRIMARY KEY  (`#`));
    
    $conn = mysqli_connect("localhost", "root", "","homesys");
    
    // if($conn){
    //     $username = $_POST['username'];
    //     $psk = $_POST['password'];

    //     echo $username;

    // }else{
    //     echo "Database Error";
    // }
//     $psk = password_hash("Admin",PASSWORD_DEFAULT);

//    mysqli_query($conn, "insert into login (username, psk) values('admin','$psk')")
?>