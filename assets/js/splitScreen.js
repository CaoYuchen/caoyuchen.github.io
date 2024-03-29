document.addEventListener('DOMContentLoaded', function() {
    var movewindow = document.querySelector('.header'),
        parent = document.querySelector('.splitview');

    if(parent){
        var topPanel = parent.querySelector('.top'),
            handle = parent.querySelector('.handle'),
            skewHack = 0,
            delta = 0;


        // If the parent has .skewed class, set the skewHack var.
        if (parent.className.indexOf('skewed') != -1) {
            skewHack = 1000;
        }

        movewindow.addEventListener('mousemove', function(event) {
            // Get the delta between the mouse position and center point.
            delta = (event.clientX - window.innerWidth / 2) * 0.5;

            // Move the handle.
            handle.style.left = event.clientX + delta + 'px';

            // Adjust the top panel width.
            topPanel.style.width = event.clientX + skewHack + delta + 'px';

            if(delta>=0){
                $("#csButton").addClass("btn-cs");
                $("#artButton").removeClass("btn-art");
            }
            else{
                $("#csButton").removeClass("btn-cs");
                $("#artButton").addClass("btn-art");
            }
        });

        $("#csButton").click(function(){
            handle.style.transition = "all 0.5s ease-out";
            topPanel.style.transition = "all 0.5s ease-out";
            // Move the handle.
            handle.style.left = window.innerWidth * 1.2 + 'px';
            // Adjust the top panel width.
            topPanel.style.width = window.innerWidth * 1.2 + skewHack + 'px';

            setTimeout(function () {
                window.location="/cs";
            }, 500);
        });

        $("#artButton").click(function(){
            handle.style.transition = "all 0.5s ease-out";
            topPanel.style.transition = "all 0.5s ease-out";
            // Move the handle.
            handle.style.left = -window.innerWidth * 0.2 + 'px';
            // Adjust the top panel width.
            topPanel.style.width = -window.innerWidth * 0.2 + skewHack + 'px';

            setTimeout(function () {
                window.location="/portfolio";
            }, 500);
        });
    }   
});