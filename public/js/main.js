var socket, oldtime;
var activeArea = [false];
var cam_counter = 0;
var cv_counter = 0;
var done = false;
var old, position = {x: 0, y: 0};
var actualFrame = {};

var image = new Image();
var timer;
var oldValue;

var brightnesstimer;
var controlOldVal;


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



function getSettings() {
  // load current settings
  $.get('/settings', function(data) {
    data.status.split("\n").filter(function(n) {
      return !!n
    }).map(function(n) {
      return n.split(':');
    })
            .forEach(function(val) {
              $('#' + val[0]).slider('setValue', +val[1]);
            });

    for (var key in data.settings) {
      if (data.settings[key].slider)
        $('#settings_' + key).slider('setValue', [+data.settings[key].split(',')[0], +data.settings[key].split(',')[1]]);
    }
  });
}

function delayControl(control, value) {
  clearTimeout(brightnesstimer);
  brightnesstimer = setTimeout(function() {
    $.get('/settings/' + control + '/' + value, function(data) {
    });
  }, 200);
}

function delayShow(value) {
  clearTimeout(timer);
  timer = setTimeout(function() {
    $.get('/frames/' + value, function(data) {
//          if (data.tracked) {
      for (var n = 0; n < 7; n++) {
        var t = '';
        if (data.cv[n]) {
          t = data.cv[n].position.x + ', ' + data.cv[n].position.y;
        }
        $('#object_' + (n + 1)).text(t);

        $('#output').text(JSON.stringify(data.output));
//}
      }
      $("#image").attr("src", 'data:image/jpeg;base64,' + data.webcam);
    });
  }, 200);
}


$(document).ready(function() {
 $("[data-toggle='tooltip']").tooltip({ placement: "top" });

  $("#settings_shock").on("slide slideStop", function(slideEvt) {
    $("#shock_val").text(slideEvt.value / 10 + 'mA');
  });

  // controls to send to server
  $(".webcam-control")
          .slider({
            tooltip: 'always'
          });

  $(".webcam-control").on('slide slideStop', function(slideEvt) {
    console.log(slideEvt.value);
    if (controlOldVal !== slideEvt.value) {
      controlOldVal = slideEvt.value;

      delayControl($(this).data('webcam'), slideEvt.value);
    }
  });

  var webcamctx = $('#webcam').get(0).getContext("2d");
  var vision = $('#vision').arena();

  // websockets
  socket = io.connect(window.location.host);

  socket.on('frame', function(frame) {
//if (location.hash == '#tcamera') {
    // sount fps
    var now = Date.now();
    var fps = (1000 / (now - oldtime)).toFixed(0);
    $('#fps').text(fps).css('color', (fps < 15) ? 'red' : 'green');
    oldtime = now;

    // update counters
    var success_rate = (cv_counter / cam_counter * 100).toFixed(2);

    $('#cam_counter').text(cam_counter);
    $('#cv_counter').text(cv_counter);
    $('#success_rate').text(success_rate + '%');

    // elapsed time in mins and secs
    var mins = Math.floor(frame.elapsedTime / 60);
    var secs = frame.elapsedTime - mins * 60;
    var length = 0;

    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var lengthdom = $(xml).find('value[name="length"]');
    if (lengthdom[0]) {
      length = +lengthdom[0].innerText || 0;
    }

    // end of experiment check, if ended up show the modal window with info
    if (length > 0 && frame.elapsedTime > length*60  && !done) {
      done = true;
	$('#elapsedTime').css('background', '#d9534f');
      $('#modal .modal-content').html('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h4 class="modal-title" id="myModalLabel">Session timeout</h4></div><div class="modal-body"><div class="row"><div class="col-md-12"><div class="alert alert-danger"><i class="fa fa-exclamation-triangle fa-3x"></i> <big>Session has reached it\'s specified time!</big></div><br /><div class="alert alert-warning"><p>The experiment is still going on, don\'t worry.</p><p>But maybe you should have look and stop it soon.</p></div></div></div></div>');
      $('#modal').modal('show');
    }

    // update elapsed time and icon statuses
    $('#elapsedTime').text(mins + ':' + secs.toFixed(2));

    // shock info
    $('#shock_val').css('color', (frame.actions.shocking > 1) ? '#d9534f' : 'green');
    $('#isShocking *, #isShocking').css('background', (frame.actions.shocking > 1) ? '#d9534f' : '').css('color', (frame.actions.shocking > 1) ? 'white' : 'green');
    $('.webcam-panel-body').css('background', (frame.actions.shocking > 1) ? '#d9534f' : '');

    // status icons
    $('#isArduino i').css({color: (frame.isArduino) ? 'green' : 'red'});
    $('#isWebcam i').css({color: (frame.isWebcam) ? 'green' : 'red'});

    // update all output variables
    if (frame.isRunning) {
      var tbody = $('#custom_variables').empty();
      if (frame.output) {
        tbody.append('<tr><th>name</th><th>value</th></tr>');
        tbody.append('<tr><td>distance</td><td>' + Math.round(frame.distance) + '</td></tr>');
        tbody.append('<tr><td># of shocks</td><td>' + frame.shocked + '</td></tr>');
        $.each(frame.output, function(key, value) {
          tbody.append('<tr><td>' + key + '</td><td>' + value + '</td></tr>');
        });
      }
    }
    actualFrame = frame.webcam;

    // set counters
    cam_counter++;
    if (frame.tracked)
      cv_counter++;

    // show areas
    $('#vision').arena('setData', frame);
//}
  });


$('#slice_angle').pressEnter(function () {
    $('#vision').arena('slice', $('#slice_angle').val());
});
$('#rotate_angle').pressEnter(function () {
    $('#vision').arena('rotateZone', $('#rotate_angle').val());
});

  $('#rotate').click(function() {
    $('#vision').arena('rotateZone', $('#rotate_angle').val());
  });
  $('#flip').click(function() {
    $('#vision').arena('flipZone');
  });
  $('#slice').click(function() {
    $('#vision').arena('slice', $('#slice_angle').val());
  });
  $('#rectangle').click(function() {
alert('rectangle');
  });

  // add zone
  $('#addZone').click(function() {
    $('#vision').arena('addZone', 0);
  });

  // loop for image show
  setInterval(function() {
    if (actualFrame && (actualFrame.length > 0)) {
      if (window.location.hash == '#tcamera') {
        image.src = 'data:image/jpeg;base64,' + actualFrame;
        webcamctx.drawImage(image, 0, 0);
        actualFrame = null;
      }
    }
  }, 30);

  // TABS
  // load via hash
  if (location.hash) {
    $('a[href=' + location.hash + ']').tab('show');
  }

  // save to hash
  $(document.body).on("click", ".nav a[data-toggle]", function(event) {
    if (this.getAttribute("href") && this.getAttribute("href").substring(0, 1) !== '/')
      location.hash = this.getAttribute("href");
  });

  // refresh Blocky after it's tab selection
  $(document).on('shown.bs.tab', 'a#blogic', function(e) {
    Blockly.mainWorkspace.render();
//   console.log(e.target) // activated tab
  });

  // removes modal window contents, to make it actualize next time when called
  $(document).on('hidden.bs.modal', '.modal', function() {
    $(this).removeData('bs.modal');
    $(this).find('.modal-body').html('');
  });


  // for stats
  $("#ex6").slider({
    tooltip: 'always'
  }).on('slide', function(slideEvt) {
    if (oldValue !== slideEvt.value) {
      oldValue = slideEvt.value;
      delayShow(slideEvt.value);
    }
  });


  $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
  $('.tree li.parent_li > span').on('click', function(e) {
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

  getSettings();
  //delayShow(1);

});

// load tab via hash
$(window).on('popstate', function() {
  var anchor = location.hash || $("a[data-toggle=tab]").first().attr("href");
  $('a[href=' + anchor + ']').tab('show');
});
