<?php
    include("dbConnection.php");
    $data=stripslashes(file_get_contents("php://input"));
    $mydata=json_decode($data,true);
    $id=$mydata["id"];
    $name=$mydata["name"];
    $email=$mydata["email"];
    $password=$mydata["password"];
    if(!empty($name) && !empty($email) && !empty($password)){
        $sql="INSERT INTO student(id,name, email, password) VALUES ('$id','$name','$email','$password') ON DUPLICATE KEY update name='$name',email='$email',password='$password'";
        if($con->query($sql)==TRUE){
            echo "Student Saved Successfully....!";
        }else{
            echo "Unable to add Student...!";
        }
    }else{
        echo "Fill the Fields First...!";
    }
?>