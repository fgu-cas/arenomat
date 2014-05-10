var camWidth = 800, camHeight = 600;

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
io.enable('browser client minification');  // send minified client
//io.enable('browser client etag');          // apply etag caching logic based on version number
io.enable('browser client gzip');          // gzip the file
io.set('log level', 1);                    // reduce logging

var cv = require('opencv');
var fs = require('fs');

var lame = require('lame');
var Speaker = require('speaker');


var mongoose = require('mongoose-paginate');
var modelsPath = __dirname + '/models';
fs.readdirSync(modelsPath).forEach(function(file) {
  return require("" + modelsPath + "/" + file);
});

var routes = require('./routes');


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
var URI = "mongodb://localhost/arenomat";
mongoose.connect(URI, function(err) {
    if (err) {
      throw err;
    }
    return console.log('Connected to database');
  });

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
    first = true;
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
    zones = data;
  });
});



var point;

// EXPERIMENT
var code = false;

var shocking = false;
var feeding = false;

var isRunning = false;
var startTime = 0;

var a_light, a_feeder, a_shock;

var activeArea = [0, 0, 0, 0], zones = [0, 0];

var actualFrame;
var first = true;

var im;

var Frame = mongoose.model('Frame');


// WEBCAM
try {
  var vc = new cv.VideoCapture(0);
//	vc.setWidth(camWidth);
//	vc.setHeigh(camHeight);
} catch (e) {
  console.log('no webcam');
}

var stream = vc.toStream();

stream.read();

stream.on("data", function(im) {
  stream.pause();

  var frame = blobDetector(im);

  frame.elapsedTime = 0;

  if (isRunning && code) {
    frame.elapsedTime = (new Date().getTime() / 1000) - startTime;

    if (first) {
	s = 'setup(); ';
	first = false;
    }
    eval('function go() { ' + code + ' ' + s + ' loop(); }');
    setTimeout(go, 1);
  }

  io.set('log level', 2);
  io.sockets.emit('frame', frame);
  io.set('log level', 5); // logging level to 5


    var oneFrame = new Frame(frame);
    oneFrame.save();

  process.nextTick(function() { stream.resume(); });
});

function blobDetector(check) {
//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/is-point-in-poly [v1.0]
  function in_poly(poly, pt) {
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
      ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
        && (c = !c);
    return c;
  }

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

    points.sort(function(a, b) {
      return a.area - b.area;
    });

    for (var n = 0; n < points.length; n++) {
      if (!frame.cv[n])
        frame.cv[n] = {};
      frame.cv[n].position = points[n];

      for (var i = 0; i < zones.length; i++) {
        if (!frame.cv[n].zones)
          frame.cv[n].zones = {};
        frame.cv[n].zones[i] = in_poly(zones[i], points[n]);
      }
    }
  }
  return frame;
}

exports = module.exports = app