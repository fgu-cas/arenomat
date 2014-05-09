var camWidth = 800, camHeight = 600;

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

var mongoose = require('mongoose-paginate');

var cv = require('opencv');
var fs = require('fs');

var lame = require('lame');
var Speaker = require('speaker');





// Set View Engine
app.engine('html', require('hogan-express'));
app.set('view options', {layout: true});
app.set('layout', 'layout');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('partials', {
  menu: 'menu',
  blockly: 'blockly',
  assets: 'assets',
  foot: 'foot'
});

app.enable('view cache');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


http.listen(80, function() {
  console.log('Listening on port %d', http.address().port);
});

//mongoose
//mongoose.set('debug', true)
mongoose.connect("mongodb://localhost/arenomat");
var Frame = mongoose.model('Frames');

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;



// sockets
io.sockets.on('connection', function(socket) {
  console.log('connection');
  socket.on('codeStart', function(data) {
    isRunning = true;
    startTime = new Date().getTime() / 1000;
    code = data;
    console.log('codeStart: ' + data);
  });
  socket.on('codeStop', function() {
    isRunning = false;
    shocking = 0;
    console.log('codeStop');
  });
  socket.on('codeSave', function(data) {
    console.log('codeSave: ' + data);
  });
  socket.on('area', function(data) {
//          console.log('area: ' + data);
    areas = data;
  });
});


// Video processing

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/is-point-in-poly [v1.0]

function in_poly(poly, pt) {
  for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
    ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
      && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
      && (c = !c);
  return c;
}


// WEBCAM
try {
  var vc = new cv.VideoCapture(0);
//	vc.setWidth(camWidth);
//	vc.setHeigh(camHeight);
} catch (e) {
  console.log('no webcam');
}

var point;

// main frame loop start
if (vc) {
  intervalId = setInterval(function() {
    console.log("cv");
    frameRead(intervalId)
  }, 1000);
}


// EXPERIMENT
var code = false;

var shocking = false;
var feeding = false;

var isRunning = false;
var startTime = 0;

var a_light, a_feeder, a_shock;

var activeArea = [0, 0, 0, 0], areas = [0, 0];

var actualFrame;

var im;


function opencv(check) {

  var frame = {
    timestamp: new Date(),
    cv: []
  }

  frame.webcam = check.toBuffer().toString('base64');
  // matrix clone for image processing
  check.convertGrayscale();
  check = check.threshold(240, 255);
  check.dilate(7);
  contours = check.findContours();

  if (contours.size() > 0) {

    frame.tracked = true;
    var points = [];
    for (var n = 0; n < contours.size(); n++) {
      mu = contours.moments(n);

      points.push({x: Math.round(mu.m10 / mu.m00), y: Math.round(mu.m01 / mu.m00), area: contours.area(n)});
    }
    console.log(n, points);

    points.sort(function(a, b) {
      return a.area - b.area;
    });

    for (var n = 0; n < points.length; n++) {
      if (!frame.cv[n])
        frame.cv[n] = {};
      frame.cv[n].position = points[n];

      for (var i = 0; i < areas.length; i++) {
        if (!frame.cv[n].zones)
          frame.cv[n].zones = {};
        frame.cv[n].zones[i] = in_poly(areas[i], points[n]);
      }
    }
  }
  return frame;
}

// one frame - looped
function frameRead() {
  if (vc) {
    vc.read(function(err, check) {
      if (intervalId)
        clearInterval(intervalId);

      if (check && check.width() && check.height()) {
        var frame = opencv(check);

        io.set('log level', 2);
//console.log(frame);

        io.sockets.emit('frame', frame);
        io.set('log level', 5); // logging level to 5
      }
      setTimeout(frameRead, 15);
    });
  }

  if (isRunning && code) {
    io.sockets.emit('elapsedTime', (new Date().getTime() / 1000) - startTime);

    eval('function go() { ' + code + ' }');
    setTimeout(go, 100);

    //console.log('eval: ok');
  }
}
