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

    var success_rate = (cv_counter / cam_counter * 100).toFixed(2);
console.log(success_rate);
    $('#cam_counter').text(cam_counter);
    $('#cv_counter').text(cv_counter);
    $('#success_rate').text(success_rate + '%');
    $('#elapsedTime').text(frame.elapsedTime.toFixed(2) + 's').css('background', (frame.isRunning) ? 'red' : 'green');
//console.log(frame.output);
    $('#isShocking span').text((frame.actions.shocking) / 10 + 'mA');
    $('#isShocking i').css('color', (frame.actions.shocking > 1) ? 'red' : 'green');
    $('#isArduino i').css({color: (frame.isArduino) ? 'green' : 'red'});
    $('#isWebcam i').css({color: (frame.isWebcam) ? 'green' : 'red'});

    var tbody = $('#custom_variables').empty();
    if (frame.output) {
      tbody.append('<tr><th>name</th><th>value</th></tr>');
      $.each(frame.output, function(key, value) {
        tbody.append('<tr><td>' + key + '</td><td>' + value + '</td></tr>');
      });
    }

    actualFrame = frame.webcam;

    cam_counter++;
    if (frame.tracked)
      cv_counter++;

    $('#vision').arena('setData', frame);
//}
  });

  $('#addZone').click(function() {
    $('#vision').arena('addZone', 0);
  });

  setInterval(function() {
    if (actualFrame && (actualFrame.length > 0)) {
      if (window.location.hash == '#tcamera') {
        image.src = 'data:image/jpeg;base64,' + actualFrame;
        webcamctx.drawImage(image, 0, 0);
        actualFrame = null;
      }
    }
  }, 10);

  // TABS
  // load via hash
  if (location.hash) {
    $('a[href=' + location.hash + ']').tab('show');
  }
  // save to hash
  $(document.body).on("click", "a[data-toggle]", function(event) {
    if (this.getAttribute("href").substring(0, 1) !== '/')
      location.hash = this.getAttribute("href");
  });

  $(document).on('shown.bs.tab', 'a#blogic', function(e) {
    Blockly.mainWorkspace.render();
//   console.log(e.target) // activated tab
  });

});

// load tab via hash
$(window).on('popstate', function() {
  var anchor = location.hash || $("a[data-toggle=tab]").first().attr("href");
  $('a[href=' + anchor + ']').tab('show');
});


$(function () {
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
        }
        e.stopPropagation();
    });
});

$('body').on('hidden.bs.modal', '.modal', function () {
    $(this).removeData('bs.modal');
});