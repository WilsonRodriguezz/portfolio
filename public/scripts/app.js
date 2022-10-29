//Author: Wilson Rodriguez Arellano
//Student ID: 3012325205
//Date: 2022-10-23
//File name: app.js

//add new user 
$("#add_user").submit(function (event) {
    alert("Data inserted succesfully!");
})



//update user
$("#update_user").submit(function (event) {

    event.preventDefault();
    var unindexed_array = $("#update_user").serializeArray();

    var data = {};

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })
    console.log(data);

    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }
    $.ajax(request).done(function (response) {
        alert("Data updated succesfully!")
    })
})

//deleteUser

$ondelete = $("a.delete");
$ondelete.click(function () {
    var id = $(this).attr("data-id")

    var request = {
        "url": `http://localhost:3000/api/users/${id}`,
        "method": "DELETE"
    }

    if (confirm("Do you really want to delete this record?")) {
        $.ajax(request).done(function (response) {
            alert("Data deleted succesfully!");
            document.location.replace('http://localhost:3000/secure/list-users');
        })
    }

})


