$(document).ready(function(){
    // console.log("document ready");

    $("#header a").hover(
        function() {
            $(this).css("color", "blue");
        }, function() {
            $(this).css("color", "white");
        }
    );

    $("#frontEnd p").click(function(){
        $(this).siblings().slideToggle();
    });

    $("#backEnd p").click(function(){
        $(this).siblings().slideToggle();
    });

    $("#snowboard").hover(
        function() {
            $(this).attr("src", "img/snowboarding_mountain2.jpg");
        }, function() {
            $(this).attr("src", "img/snowboarding_mountain.jpg");
        }
    );

    $("#topIcon").hover(
        function() {
            $("#topButtonMessage").css("visibility", "visible");
            $("#topButtonMessage").css("width", "10px");
            $("#topButtonMessage").css("height", "10px");
        }, function() {
            $("#topButtonMessage").css("visibility", "hidden");
            $("#topButtonMessage").css("width", "0px");
            $("#topButtonMessage").css("height", "0px");
        }
    );

    $("#sidenav a").hover(
        function() {
            $(this).css("background-color", "#484848");

        }, function() {
            $(this).css("background-color", "");
        }
    );

});