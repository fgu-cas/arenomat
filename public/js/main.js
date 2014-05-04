var socket;
        var old, position = { x: 0, y: 0 };
        var cam_counter = 0;
        var cv_counter = 0;
        var activeArea = [ false ];


  $(document).ready(function() {
    socket = io.connect(window.location.host);


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

  // init load event
  // fake input file
  // TODO: jquery style
  var loadInput = document.getElementById('load');
  loadInput.addEventListener('change', load, false);
  document.getElementById('codeLoad').onclick = function() {
        loadInput.click();
  };



        $("#codeStart").click(function() {
            var code = Blockly.Generator.workspaceToCode('JavaScript');
            socket.emit('codeStart', code);
        });
        $("#codeSave").click(function() {
            save();
        });

        $("#codeLoad").click(function() {
            load();
        });
        $("#codeClear").click(function() {
            clear();
        });

        $("#codeStop, #elapsedTime").click(function() {
            socket.emit('codeStop');
        });

        var oldtime = 0;

        socket.on('shocking', function(shocking) {
            $('#shocking').css('background',(shocking > 0) ? 'red !important' : 'black !important');
            $('#shocking').text(shocking/10);
        });
        socket.on('activeArea', function(data) {
            activeArea = data;
        });

        socket.on('webcam', function(base64Image) {
                var now = Date.now();
                $('#cam_counter').text(cam_counter);
var fps = (1000/(now - oldtime)).toFixed(0);
                $('#fps').text(fps);
 $('#fps').css('color', (fps < 15) ? 'red' : 'green');

                $('#cv_counter').text(cv_counter);

    var perc = (cv_counter / cam_counter * 100).toFixed(1);
$('.progress-bar').css('width', perc+'%').text(perc);

                $('#cam').attr('src', base64Image);
                oldtime = now;
                cam_counter++;
        });
        socket.on('position', function(pos) {
                position = pos;
                if (!position.x && !position.y && old) {
                        var c = document.getElementById("object");
                        var ctx = c.getContext("2d");
                        ctx.arc(old[old.length - 1].x+5, old[old.length - 1].y+5, 10, 0, Math.PI*2, true);
                        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                        ctx.fill();
                }
                else {
                        if (!old)
                                old = [position];

                        cv_counter++;

                        if (old[old.length -1].x != position.x && old[old.length - 1].y != position.y) {

                        var c = document.getElementById("object");
                        var ctx = c.getContext("2d");
                        ctx.canvas.width = ctx.canvas.width;
//                      ctx.clearRect(old.x, old.y, 10, 10);
                        ctx.arc(position.x+5, position.y+5, 10, 0, Math.PI*2, true);
                        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
                        ctx.fill();


                        ctx.beginPath();
                        ctx.globalAlpha = 1;
                        for(var i = 1; i < old.length; i++) {
                        ctx.moveTo(old[i-1].x, old[i-1].y);
                            ctx.lineTo(old[i].x, old[i].y);
                        }
                        ctx.strokeStyle = '#2ba6cb';
                        ctx.stroke();


                        old.push(position);

                        if (old.length > 200) old.shift();

    $('#areas').canvasAreaDraw();

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

