$ (function(){
    loaddata();
    $("#productdisp").on("click", ".btn-danger", handleDelete);
    $("#productdisp").on("click", ".btn-warning", handleupdate);
    $("#updatesave").click(function(){
        var id= $("#upid").val();
        var name= $("#upname").val();
        var color= $("#upcolor").val();
        var price=$("#upprice").val();
        var department=$("#updepartment").val();
        var description=$("#updescription").val();
        $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/products/"+id,
            data: {name,color,price,department,description},
            method: "PUT",
            success: function(response){
                loaddata();
                $("#updatemodal").modal("hide");
            }
        });
    });
    $("#productdisp").on("click", ".btn-primary", function(){
        $("#addprobtn").modal("show");
    });
    $("#savenew").click(addnewproduct);
});
function handleupdate(){

    var btn = $(this);
    var parentID= btn.closest(".eproduct");
    let id= parentID.attr("data-id");
    $.get("https://usman-recipes.herokuapp.com/api/products/"+id, function(response){
        $(upid).val(response._id);
        $(upname).val(response.name);
        $(upcolor).val(response.color);
        $(upprice).val(response.price);
        $(updepartment).val(response.department);
        $(updescription).val(response.description);
        $("#updatemodal").modal("show");
    });
}
function addnewproduct(){
    var name= $("#name").val();
    var color= $("#color").val();
    var price= $("#price").val();
    var department= $("#department").val();
    var description= $("#description").val();
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products/",
        method:"POST",
        data: {name,color,price,department,description},
        success:function(response){
            console.log(response);
            loaddata();
            $("#addprobtn").modal("hide");
        }
    });

}
function handleDelete(){
    var btn = $(this);
    var parentID= btn.closest(".eproduct");
    let id= parentID.attr("data-id");
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products/"+id,
        method:"DELETE",
        success:function(){
            loaddata();
        }
    });
}
function loaddata(){
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products/",
        method:"GET",
        error:function(){
            var product = $("#productdisp");
            product.html("An error occured!");
        },
        success:function(response){
            console.log(response);
            var product = $("#productdisp");
            product.empty();
            for(var i = 0; i< response.length; i++)
            {
                var pro= response[i];
                // product.append(`<div class="eproduct"><p><strong>id: </strong> ${pro._id}</p><h3><strong>Name: </strong>${pro.name}</h3><p><strong>Color: </strong>${pro.color}</p><p><strong>Price: </strong>${pro.price}</p><p><strong>Department: </strong>${pro.department}</p><p><strong>Description: </strong>${pro.description}<button class="btn btn-danger float-right">Delete</ button></p></div> `);
                product.append(`<div class="eproduct" data-id="${pro._id}"><p>${pro._id}</p><h3>${pro.name}</h3><p><button id="delbtn" class="btn btn-danger float-right">Delete</button><button id="editbtn" class="btn btn-warning float-right">Edit</button>${pro.color}</p><p>${pro.price}</p><p>${pro.department}</p><p>${pro.description}</p></div> `);
            }

        }
    });

}