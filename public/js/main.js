var socket, oldtime;
var activeArea = [false];

$(document).ready(function() {
  var old, position = {x: 0, y: 0};
  var cam_counter = 0;
  var cv_counter = 0;
  var actualFrame = {};
  var image = new Image();
  var webcamctx = $('#webcam').get(0).getContext("2d");
  var vision = $('#vision').arena();

  // websockets
  socket = io.connect(window.location.host);

  socket.on('frame', function(frame) {
//if (location.hash == '#tcamera') {
    var now = Date.now();
    var fps = (1000 / (now - oldtime)).toFixed(0);
    $('#fps').text(fps).css('color', (fps < 15) ? 'red' : 'green');
    oldtime = now;


    $('#cam_counter').text(cam_counter);
    $('#cv_counter').text(cv_counter);
    $('#elapsedTime').text(frame.elapsedTime.toFixed(2) + 's').css('background', (frame.isRunning) ? 'red' : 'green');
//console.log(frame.output);
    $('#isShocking span').text(frame.actions.shocking / 10 + 'mA')
    $('#isShocking i').css('color', (frame.actions.shocking > 0) ? 'red' : 'green');
    $('#isArduino i').css({ color: (frame.isArduino) ? 'green' : 'red' });
    $('#isWebcam i').css({ color: (frame.isWebcam) ? 'green' : 'red' });

var tbody = $('#custom_variables').empty();
if (frame.output) {
    tbody.append('<tr><th>name</th><th>value</th></tr>');
$.each( frame.output, function( key, value ) {
    tbody.append('<tr><td>' + key + '</td><td>' + value + '</td></tr>');
});
}

    actualFrame = frame.webcam;

    cam_counter++;
    if (frame.tracked) cv_counter++;

    $('#vision').arena('setData', frame);
//}
  });

  setInterval(function() {
    if (actualFrame && (actualFrame.length > 0) && (window.location.hash == '#tcamera')) {
      image.src = 'data:image/jpeg;base64,' + actualFrame;

      webcamctx.drawImage(image, 0, 0);
      actualFrame = null;
    }
  }, 40);

  // TABS
  // load via hash
  if (location.hash) {
    $('a[href=' + location.hash + ']').tab('show');
  }
  // save to hash
  $(document.body).on("click", "a[data-toggle]", function(event) {
    location.hash = this.getAttribute("href");
  });
});

// load tab via hash
$(window).on('popstate', function() {
  var anchor = location.hash || $("a[data-toggle=tab]").first().attr("href");
  $('a[href=' + anchor + ']').tab('show');
});
