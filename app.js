camWidth = 800, camHeight = 600;
zones = [];
actualFrame = {};
settings = {
    subject_area: '1000,2000',
    robot_area: '3000,4000',
    threshold: '200,255',
    shock: 2
};
shocked = 0;
var distance = 0;
sessionId = -1;


var five = require("johnny-five");

board = new five.Board();

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

//mongoose
//mongoose.set('debug', true)
var URI = "mongodb://localhost/arenomat";
mongoose.connect(URI, function(err) {
  if (err) {
    throw err;
  }
  return console.log('Connected to database');
});

var Frame = mongoose.model('Frame');
var Session = mongoose.model('Session');

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

http.listen(80, function() {
  console.log('Listening on port %d', http.address().port);
});




// sockets
io.sockets.on('connection', function(socket) {
  console.log('connection');
  socket.on('codeStart', function(data) {
    code = data.code;
    console.log('codeStart: ' + code);

    arenomat.stop();

    var session = new Session(data);
    session.save();

    sessionId = session._id;
console.log(sessionId);

    isRunning = true;
    first = true;
    distance = 0;
    startTime = new Date().getTime() / 1000;


  });
  socket.on('codeStop', function() {
    isRunning = false;
    shocking = 0;

    arenomat.stop();

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
var timeout;

var first = true;

// WEBCAM
try {
  var vc = new cv.VideoCapture(0);
  vc.setWidth(camWidth);
  vc.setHeight(camHeight);
} catch (e) {
  try {
    var vc = new cv.VideoCapture(1);
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
if (actualFrame.cv && actualFrame.cv[0]) {
  var oldx = actualFrame.cv[0].position.x || 0;
  var oldy = actualFrame.cv[0].position.y || 0;
}
  actualFrame = {
    session: sessionId,
    timestamp: new Date().toISOString(),
    elapsedTime: 0,
    isArduino: isArduino,
    isWebcam: isWebcam,
    isRunning: isRunning,
    cv: [],
    actions: {shocking: 0},
    webcam: small.toBuffer().toString('base64'),
    zones: zones,
    shocked: shocked
  }

  actualFrame.cv[-1] = {position: center};


  arena.blobDetector(cropped);
  arena.zoneDetector();

//console.log(actualFrame.cv[0]);
if (actualFrame.cv[0]) {

  distance += 0+Math.sqrt(Math.pow(actualFrame.cv[0].position.x - oldx, 2) + Math.pow(actualFrame.cv[0].position.y - oldy, 2));
console.log('Distance: ' + distance, Math.pow(actualFrame.cv[0].x - oldx, 2));
}
  actualFrame.distance = distance;

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

//    if (timeout) clearTimeout(timeout);
//    timeout = setTimeout(function () { mLoop(); }.bind(this), 1);
mLoop();

    var frame = new Frame(actualFrame);
frame.webcam = 0;
console.log(frame);
if (frame.cv[0] && frame.cv[0].zones) console.log(frame.cv[0].zones);
if (frame.cv[0] && frame.cv[0].position) console.log(frame.cv[0].position);
    frame.save();
  }

  io.set('log level', 0);
  io.sockets.emit('frame', actualFrame);
//  io.set('log level', 5); // logging level to 5

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


if (vc) {
  isWebcam = true;
  console.log('webcam: ok');
  stream.read();
}


exports = module.exports = app;