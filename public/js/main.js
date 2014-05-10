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
    var now = Date.now();
    var fps = (1000 / (now - oldtime)).toFixed(0);
    $('#fps').text(fps).css('color', (fps < 15) ? 'red' : 'green');
    oldtime = now;

    $('#shocking').text(shocking / 10).css('background', (shocking > 0) ? 'red !important' : 'black !important');

    $('#cam_counter').text(cam_counter);
    $('#cv_counter').text(cv_counter);

    $('#elapsedTime').text(frame.elapsedTime.toFixed(2));

    actualFrame = frame.webcam;

    cam_counter++;
    if (frame.tracked) cv_counter++;

    $('#vision').arena('setData', frame);
  });

  setInterval(function() {
    if (actualFrame && (window.location.hash == '#tcamera')) {
      image.src = 'data:image/jpeg;base64,' + actualFrame;
      webcamctx.drawImage(image, 0, 0);
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
