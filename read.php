<?php
    include("./dbConnection.php");
    $sql="SELECT * FROM student";
    $result=$con->query($sql);
    $data=array();
    if($result->num_rows>0){
        while($row=$result->fetch_assoc()){
            $data[]=$row;
        }
    }else{
        $data="";
    }
    echo json_encode($data);
?>