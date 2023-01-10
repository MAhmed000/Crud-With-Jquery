<?php
    include("dbConnection.php");
    $data=stripslashes(file_get_contents("php://input"));
    $mydata=json_decode($data,true);
    $id=$mydata["id"];
    $sql="SELECT * FROM student where id={$id}";
    if(!empty($id)){
        $result=$con->query($sql);
        $row=$result->fetch_assoc();
    }else{
        $row="Unable to find the row to delete....!";
    }
    echo json_encode($row);
?>