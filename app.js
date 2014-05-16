var camWidth = 640, camHeight = 480;

var five = require("johnny-five");
var board = new five.Board();

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

process.addListener('uncaughtException', function (err, stack) {
    console.log('Caught exception: '+err+'\n'+err.stack);
    console.log('\u0007'); // Terminal bell
});





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
          console.log('area: ' + data);
    zones = data;
  });
});



// EXPERIMENT
var code = false;
var mLoop, mSetup; // global copy of custom script functions

var isArduino = false, isWebcam = false;

var isRunning = false;
var startTime = 0;

var arduino = {
    light: {},
    feeder: {},
    shock: {}
}

var zones = [];
var actualFrame;
var first = true;

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


if (vc) {
    isWebcam = true;
    console.log('webcam: ok');


stream.read();
}



stream.on("data", function(im) {
  stream.pause();

 actualFrame = {
    timestamp: new Date(),
    elapsedTime: 0,
    isArduino: isArduino,
    isWebcam: isWebcam,
    cv: [],
    actions: { shocking: 0 },
    webcam: im.toBuffer().toString('base64')
  }

  blobDetector(im);

  if (isRunning && code) {
    actualFrame.elapsedTime = (new Date().getTime() / 1000) - startTime;
    actualFrame.output = {};
    if (first) {
	first = false;
	eval(code);

	mLoop = loop;
	mSetup = setup;
	mSetup();
    }
    mLoop();
  }
//console.log(actualFrame.output);
//  new Frame(actualFrame).save();

  // no need to save in db
//  actualFrame.isRunning = isRunning;

  io.set('log level', 2);
  io.sockets.emit('frame', actualFrame);
  io.set('log level', 5); // logging level to 5
 


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


  // matrix clone for image processing
  check.convertGrayscale();
  check = check.threshold(240, 255);
  check.dilate(7);

  contours = check.findContours();

  if (contours.size() > 0) {

    actualFrame.tracked = true;
    var points = [];
    for (var n = 0; n < contours.size(); n++) {
      mu = contours.moments(n);

      points.push({x: Math.round(mu.m10 / mu.m00), y: Math.round(mu.m01 / mu.m00), area: contours.area(n)});
    }

    points.sort(function(a, b) {
      return a.area - b.area;
    });

    for (var n = 0; n < points.length; n++) {
      if (!actualFrame.cv[n])
        actualFrame.cv[n] = {};
      actualFrame.cv[n].position = points[n];

      for (var i = 0; i < zones.length; i++) {
        if (!actualFrame.cv[n].zones)
          actualFrame.cv[n].zones = {};
        actualFrame.cv[n].zones[i] = in_poly(zones[i], points[n]);
      }
    }
  }
}


function play(mp3) { 
console.log('play: ' + mp3);
return fs.createReadStream(mp3)
  .pipe(new lame.Decoder())
  .on('format', function (format) {
    this.pipe(new Speaker(format));
  });
}

board.on('error', function() {
  console.log('not ready!');
});

board.on("ready", function() {
 console.log('board ready');
 isArduino = true;

 arduino.light = new five.Led(12);
 arduino.feeder = five.Stepper({
  type: five.Stepper.TYPE.DRIVER,
  stepsPerRev: 200,
  pins: {
    step: 54,
    dir: 55
  }
 });
 arduino.shock = new five.Led(13);
});


exports = module.exports = app