$(function(){
    $.ajax({
        type: "PUT",
        url: "http://127.0.0.1:3000/user",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({"username": "lisi", "password": "123"}),
        dataType: "json",
        success: function (result) {
            console.log(result)
        },
        error: function (result) {
            console.log(result.error)
        }
    });
})