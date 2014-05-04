var socket, actualFrame;
        var old, position = { x: 0, y: 0 };
        var cam_counter = 0;
        var cv_counter = 0;
        var activeArea = [ false ];
    var image = new Image();


  $(document).ready(function() {


// arena image
        var c = document.getElementById("arena");
        var ctx = c.getContext("2d");
// center
        ctx.arc(ctx.canvas.width/2, ctx.canvas.height/2, 5, 0, Math.PI*2);
        ctx.stroke();

// mask
ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
ctx.beginPath();
ctx.arc(ctx.canvas.width/2, ctx.canvas.height/2, ctx.canvas.height/2, 0, 2 * Math.PI);
ctx.rect(ctx.canvas.width, 0, -ctx.canvas.width, ctx.canvas.height);
ctx.fill();


        var objectc = document.getElementById("object");
        var objectctx = objectc.getContext("2d");

        var oldtime = 0;

	socket = io.connect(window.location.host);

        socket.on('shocking', function(shocking) {
            $('#shocking').text(shocking/10).css('background',(shocking > 0) ? 'red !important' : 'black !important');
        });

        socket.on('activeArea', function(data) {
            activeArea = data;
        });

        socket.on('webcam', function(base64Image) {
                var now = Date.now();

                $('#cam_counter').text(cam_counter);
                $('#cv_counter').text(cv_counter);

		var fps = (1000/(now - oldtime)).toFixed(0);
                $('#fps').text(fps).css('color', (fps < 15) ? 'red' : 'green');

if (actualFrame != base64Image) {
    image.src = 'data:image/jpeg;base64,' + actualFrame;
    actualFrame = 0;
objectctx.drawImage(image, 0, 0);

		actualFrame = base64Image;
}

                oldtime = now;
                cam_counter++;


        });

        socket.on('position', function(pos) {
                position = pos;


                if (!position.x && !position.y && old) {
                        objectctx.arc(old[old.length - 1].x+5, old[old.length - 1].y+5, 10, 0, Math.PI*2, true);
                        objectctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                        objectctx.fill();
                }
                else {
                        if (!old)
                                old = [position];


                        cv_counter++;

                        if (old[old.length -1].x != position.x && old[old.length - 1].y != position.y) {

//                        objectctx.canvas.width = ctx.canvas.width;

//                      objectctx.clearRect(old.x, old.y, 10, 10);
                        objectctx.arc(position.x+5, position.y+5, 10, 0, Math.PI*2, true);
                        objectctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
                        objectctx.fill();


                        objectctx.beginPath();
                        objectctx.globalAlpha = 1;
                        for(var i = 1; i < old.length; i++) {
                        objectctx.moveTo(old[i-1].x, old[i-1].y);
                            ctx.lineTo(old[i].x, old[i].y);
                        }
                        objectctx.strokeStyle = '#2ba6cb';
                        objectctx.stroke();


                        old.push(position);

                        if (old.length > 200) old.shift();

//    $('#areas').canvasAreaDraw();

                    }
                }

        });
        socket.on('elapsedTime', function(elapsedTime) {
                $('#elapsedTime').text(elapsedTime.toFixed(2));
        });

    if(location.hash) {
       $('a[href=' + location.hash + ']').tab('show');
    }
  $(document.body).on("click", "a[data-toggle]", function(event) {
    location.hash = this.getAttribute("href");
  });

    $('#areas').canvasAreaDraw();
});

  $(window).on('popstate', function() {
    var anchor = location.hash || $("a[data-toggle=tab]").first().attr("href");
    $('a[href=' + anchor + ']').tab('show');
  });

