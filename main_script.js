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

});