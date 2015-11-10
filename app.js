zones = [];
actualFrame = {};
settings = {
  subject_area: '100,2000',
  robot_area: '3000,4000',
  threshold: '200,255',
  shock: 2
};
shocked = 0;
arenaAngle = 0;
var distance = 0;
sessionId = -1;

function tohex(str) {
    var hex = '';
    for(var i=0;i<str.length;i++) {
	hex += ''+str.charCodeAt(i).toString(16);
    }
    return hex;
}

config = require('./config');
camWidth = config.camWidth, camHeight = config.camHeight;

console.log(config);
var express = require('express');
var session = require('express-session');
var flash = require('connect-flash');

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

var SP = require("serialport")
var SerialPort = SP.SerialPort;
var five = require("johnny-five");
var serialports = [];

SP.list(function (err, ports) {
console.log(ports);
  serialports = ports;
  ports.forEach(function(port) {
    console.log(port.comName, port.pnpId, port.manufacturer, port);
  });
});
	var port = new SerialPort('/dev/ttyACM0', {
	    baudrate: 115200,
	    buffersize: 128
	});

  port.on('data', function(data) {
//    console.log('data received: ' + tohex(''+data));
  });

board = new five.Board({
  port: port
});

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
//var URI = "mongodb://147.231.40.138/arenomat";
mongoose.connect(URI, function(err) {
  if (err) {
    throw err;
  }
  return console.log('Connected to database');
});

var Frame = mongoose.model('Frame');
var Session = mongoose.model('Session');
var User = mongoose.model('User');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

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
app.use(flash());
app.use(session({secret: 'keyboard cat'}))
app.use(passport.initialize());
app.use(passport.session());



  /* Handle Login POST */
  routes.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true
  }));


app.use('/', routes);

  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  })

  // use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
console.log(email, password);
      User.findOne({email: email}, function (err, user) {
    console.log(err, user);
        if (err) { return done(err) }
        if (!user) {
          return done(null, false, { message: 'Unknown user' })
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'Invalid password' })
        }
        return done(null, user)
      })
    }
  ))

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
    console.log('codeStart', data);

    arenomat.stop();

    var session = new Session(data);
    session.save();

    sessionId = session._id;
    console.log(sessionId, data);

    isRunning = true;
    first = true;
    arenaAngle = 0;
    shocked = 0;
    distance = 0;
    startTime = new Date().getTime() / 1000;

settings['shock'] = 2;
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
    vc.setWidth(camWidth);
    vc.setHeight(camHeight);
  } catch (e) {
    console.log('no webcam');
// When opening a file, the full path must be passed to opencv
var vc = new cv.VideoCapture(path.join(__dirname, 'public', 'media', 'motion.mov'));

  }
}

var stream = vc.toStream();

stream.on("data", function(im) {
  stream.pause();


  var cropped = im.roi((camWidth - camHeight) / 2, 0, camHeight, camHeight)
  var small = cropped.copy();
  var center = {x: camHeight / 2, y: camHeight / 2};
  small.resize(camHeight / 2, camHeight / 2);
  if (actualFrame.tracked) {
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

//console.log(board.io.firmware.name);
  // detect/track position
  arena.blobDetector(cropped);
  
  // detect object in zones
  arena.zoneDetector();

  // distance counting
  if (actualFrame.tracked && oldx && oldy) {
    distance = distance + (+Math.sqrt(Math.pow(actualFrame.cv[0].position.x - oldx, 2) + Math.pow(actualFrame.cv[0].position.y - oldy, 2)));
  }
  distance += 0;
  actualFrame.distance = distance / config.camHeight * config.arenaWidth;

  // core - running the code
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

    // main custom program loop
    mLoop();

    // save frame to db
    var frame = new Frame(actualFrame);
    frame.webcam = 0;
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
  board.io.setSamplingInterval(100);

  console.log('board ready');
  isArduino = true;

  arenomat = require('./lib/arenomat.js');


    var beat = new five.Led({pin: 13});
    board.loop( 4000, function() {
	beat.toggle();
    });


//  arenomat.beat();

});


if (vc) {
  isWebcam = true;
  console.log('webcam: ok');
  stream.read();
}


exports = module.exports = app;