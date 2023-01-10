<?php
    include("./dbConnection.php");
    $data=stripslashes(file_get_contents("php://input"));
    $mydata=json_decode($data,true);
    $id=$mydata["id"];
    $sql="DELETE FROM student WHERE id={$id}";
    if(!empty($id)){
        if($con->query($sql)==TRUE){
            echo 1;
        }else{
            echo 0;
        }
    }else{
        echo "Provide The Student Id for Delete Record...!";
    }
?>