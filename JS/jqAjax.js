
$(document).ready(function () {

    //Clear All Record

    $("#clearBtn").click(function (e) {
        e.preventDefault();  
        $("#myform")[0].reset();
        $("#saveBtn").text("Save");
    })

        //Insert And Update
        $("#saveBtn").click(function (e) { 
            e.preventDefault();
            let id=$("#stdid").val();
            let name=$("#name").val();
            let email=$("#email").val();
            let pass=$("#pass").val();
    
            let mydata={id,name,email,password:pass};
            $.ajax({
                type:"POST",
                url:"insert.php",
                data:JSON.stringify(mydata),
                success:function(res){
                    $("#myform")[0].reset();
                    $("#msg").html(res).addClass("alert alert-info mt-3");
                    AllStuRecords();
                    $("#saveBtn").text("Save");
                    setTimeout(() => {
                        $("#msg").removeClass("alert alert-info mt-3").html("");
                    }, 5000);
                }
            })
        });
    
    
    // Get All Records
    function AllStuRecords(){
        $.ajax({
            type:"GET",
            url:"read.php",
            dataType:"json",
            success:function (res) { 
                let output="" || undefined;
                res.map((val,ind)=>{
                    output+=`
                    <tr>
                        <td>${val.id}</td>
                        <td>${val.name}</td>
                        <td>${val.email}</td>
                        <td>${val.password}</td>
                        <td>
                            <button class="btn btn-success btn-sm btn-edit" data-sid=${val.id}>Edit</button>
                            <button class="btn btn-danger btn-sm btn-delete" data-sid=${val.id}>Delete</button>
                        </td>
                    </tr>
                    `;
                    $("#mydata").html(output);
                })
                DeleteRecord();
                GetSingleRecord();
            }
        })
    }

    AllStuRecords();
    

   //Delete Record 
   function DeleteRecord(){
        $(".btn-delete").click(function(){
            let id=$(this).attr("data-sid");
            let mythis=this;
            $.ajax({
                type:"POST",
                url:"delete.php",
                data:JSON.stringify({id:id}),
                success:function (res) {  
                    let msg="";
                    if(res==1){
                        msg="Record Deleted Successfully...!";
                        $("#msg").addClass("alert alert-info mt-3")
                        $(mythis).closest("tr").fadeOut(2000);
                        setTimeout(() => {
                            $("#msg").removeClass("alert alert-info mt-3");
                            $("#msg").html("");
                        }, 5000);
                    }else if(res==0){
                        msg="Unable to delete the Record";
                        $("#msg").addClass("alert alert-info mt-3")
                        setTimeout(() => {
                            $("#msg").removeClass("alert alert-info mt-3");
                            $("#msg").html("");
                        }, 5000);
                    }
                    $("#msg").html(msg);
                }
            })
        });
   }

   // GetSingle Record
   function GetSingleRecord(){
        $(".btn-edit").click(function(){
            let id=$(this).attr("data-sid");
            $.ajax({
                type:"POST",
                url:"edit.php",
                data:JSON.stringify({id:id}),
                dataType:"json",
                success:function (res) {
                    $("#stdid").val(res.id);
                    $("#name").val(res.name);
                    $("#email").val(res.email);
                    $("#pass").val(res.password);
                    $("#saveBtn").text("Update");
                }
            })
        });
   }
});