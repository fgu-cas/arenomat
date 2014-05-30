camWidth = 800, camHeight = 600;
zones = [];
actualFrame = {};

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

process.addListener('uncaughtException', function(err, stack) {
  console.log('Caught exception: ' + err + '\n' + err.stack);
  console.log('\u0007'); // Terminal bell
});

var mongoose = require('mongoose-paginate');
var modelsPath = __dirname + '/models';
fs.readdirSync(modelsPath).forEach(function(file) {
  return require("" + modelsPath + "/" + file);
});

var routes = require('./routes');
var arena = require('./lib/arena');

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

//app.enable('view cache');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


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

    arenomat.shock.off();

    console.log('codeStop');
  });
  socket.on('codeSave', function(data) {
    console.log('codeSave: ' + data);
  });
  socket.on('zones', function(data) {
    zones = data;
  });
});



// EXPERIMENT
var code = false;
var mLoop, mSetup; // global copy of custom script functions

var isArduino = false, isWebcam = false;

var isRunning = false;
var startTime = 0, loopTime = 0;

var arduino;

var first = true;

var Frame = mongoose.model('Frame');

// WEBCAM
try {
  var vc = new cv.VideoCapture(0, camWidth, camHeight);
} catch (e) {
  try {
    var vc = new cv.VideoCapture(1, camWidth, camHeight);
  } catch (e) {
    console.log('no webcam');
  }
}

var stream = vc.toStream();

stream.on("data", function(im) {
  stream.pause();

  var cropped = im.roi((camWidth - camHeight) / 2, 0, camHeight, camHeight)
  var small = cropped.copy();
  var center = {x: camHeight / 2, y: camHeight / 2};
  small.resize(camHeight / 2, camHeight / 2);

  actualFrame = {
    timestamp: new Date(),
    elapsedTime: 0,
    isArduino: isArduino,
    isWebcam: isWebcam,
    cv: [],
    actions: {shocking: 0},
    webcam: small.toBuffer().toString('base64'),
    zones: zones
  }

  actualFrame.cv[-1] = {position: center};


  arena.blobDetector(cropped);
  arena.zoneDetector();

  if (isRunning && code) {
    var now = new Date().getTime() / 1000;

    actualFrame.elapsedTime = now - startTime;
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

  io.set('log level', 2);
  io.sockets.emit('frame', actualFrame);
  io.set('log level', 5); // logging level to 5

  process.nextTick(function() {
    stream.resume();
  });
});

board.on('error', function() {
  console.log('not ready!');
});

board.on("ready", function() {
  board.io.setSamplingInterval(40);


  console.log('board ready');
  isArduino = true;

  arenomat = require('./lib/arenomat.js');

  this.repl.inject({
    arenomat: arenomat
  });
});

http.listen(80, function() {
  console.log('Listening on port %d', http.address().port);
});

if (vc) {
  isWebcam = true;
  console.log('webcam: ok');
  stream.read();
}


exports = module.exports = app