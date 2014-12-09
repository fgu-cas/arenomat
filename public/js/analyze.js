$.fn.pressEnter = function(fn) {  

    return this.each(function() {  
        $(this).bind('enterPress', fn);
        $(this).keyup(function(e){
            if(e.keyCode == 13)
            {
              $(this).trigger("enterPress");
            }
        })
    });  
 }; 


$(document).ready(function() {
 $("[data-toggle='tooltip']").tooltip({ placement: "top" });

  // controls to send to server
  $(".webcam-control")
          .slider({
            tooltip: 'always'
          });

  // websockets
  socket = io.connect(window.location.host);

  socket.on('frame', function(frame) {
//    $('#vision').arena('setData', frame);
  });

/*
$('#slice_angle').pressEnter(function () {
    $('#vision').arena('slice', $('#slice_angle').val());
});
*/

});

