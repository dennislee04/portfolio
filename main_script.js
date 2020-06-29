$(document).ready(function(){
    // console.log("document ready");

    $("#frontEnd p").click(function(){
        $(this).siblings().slideToggle();
    });

    $("#backEnd p").hover(
        function() {
            $(this).siblings().slideToggle();
        }, function() {
            $(this).siblings().slideToggle();
        }
      );

});