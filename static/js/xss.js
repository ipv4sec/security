var ModifyUserDescription = function() {
    var userDescription = $("#changedDescription").val();
    $.ajax({
        type: "POST",
        url: "/user/" + location.href.split("=")[1],
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({"description": userDescription}),
        dataType: "json",
        success: function () {
            GetUserDescription()
        },
        error: function (result) {
            alert(result.error)
        }
    });
}

var GetUserDescription = function () {
    $("#myId").html(location.href.split("=")[1]);
    $.ajax({
        type: "GET",
        url: "/user/" + location.href.split("=")[1],
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#myDescription").html(result.description);
        },
        error: function (result) {
            alert(result.error)
        }
    });
}

$(function(){
    if (location.search.indexOf("?id=") !== 0 ) {
        window.location.href="/xss.html?id=1"
    }
    GetUserDescription()
});