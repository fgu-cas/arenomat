camWidth = 1280, camHeight = 720;
zones = [];


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


var Fun = require("function-enhancements");

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
  socket.on('zones', function(data) {
          console.log('area: ' + data);
    zones = data;
  });
});



// EXPERIMENT
var code = false;
var mLoop, mSetup; // global copy of custom script functions

var isArduino = false, isWebcam = false;

var isRunning = false;
var startTime = 0, loopTime = 0;

var arduino = {
    light: {},
    feeder: {},
    shock: {}
}

var actualFrame;
var first = true;

var Frame = mongoose.model('Frame');

// WEBCAM
try {
  var vc = new cv.VideoCapture(0, camWidth, camHeight);
} catch (e) {
  console.log('no webcam');
}

var stream = vc.toStream();



function rotate_point(point, origin, angle) {
    angle = angle * Math.PI / 180.0;
    return {
        x: Math.cos(angle) * (point.x-origin.x) - Math.sin(angle) * (point.y-origin.y) + origin.x,
        y: Math.sin(angle) * (point.x-origin.x) + Math.cos(angle) * (point.y-origin.y) + origin.y
    };
}


stream.on("data", function(im) {
  stream.pause();

  var cropped = im.roi((camWidth - camHeight)/2, 0, camHeight, camHeight)
  var small = cropped.copy();
  var center = { x: camHeight / 2, y: camHeight / 2 };
  small.resize(camHeight / 2, camHeight / 2);

 actualFrame = {
    timestamp: new Date(),
    elapsedTime: 0,
    isArduino: isArduino,
    isWebcam: isWebcam,
    cv: [],
    actions: { shocking: 0 },
    webcam: small.toBuffer().toString('base64'),
    zones: zones
  }

  actualFrame.cv[-1] = { position : center };


  blobDetector(cropped);

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

    points = points.slice(0, 2); // only the 2 biggest areas

    for (var n = 0; n < points.length; n++) {
      if (!actualFrame.cv[n])
        actualFrame.cv[n] = {};
      actualFrame.cv[n].position = points[n];

      for (var i = 0; i < zones.length; i++) {
        if (!actualFrame.cv[n].zones)
          actualFrame.cv[n].zones = {};
        if (zones[i])
          actualFrame.cv[n].zones[i] = in_poly(zones[i], points[n]);
      }
    }
  }
}


var five = require("johnny-five");
var board = new five.Board();

board.on('error', function() {
  console.log('not ready!');
});

board.on("ready", function() {
 console.log('board ready');
 isArduino = true;

/**
* Arduino class
*/
arduino = {
    // sound stimulation
    mp3: {
      playing: false,
      set: function(filename) { 
        var that = this;
	if (!this.playing) { 
          this.playing = true; 

          fs.createReadStream(__dirname + "/sounds/" + filename).pipe(new lame.Decoder()).on('format', function (format) {
            this.pipe(
              new Speaker(format).on("close", function () { 
                this.playing = false 
              }.bind(this))
            )
          })
        }
      }
    },

    // light stimulation
    light: {
      timeout: false,
      led: new five.Led(9),
      set: function (delay) {
	this.led.on(); 

          console.log('light: on', this.state);
        this.board.wait(delay, function() { 
          console.log('light: off', this.state);
            this.led.off(); 
        }.bind(this));
      }
    },

    // nesquik feeder
    feeder: {
      feeding: false,
      motor: five.Stepper({
        type: five.Stepper.TYPE.DRIVER,
        stepsPerRev: 3200,
          pins: {
           step: 54,
           dir: 55
        }
      }),
      en: new five.Pin(38).high(),
      sensor: new five.Pin("A13"),
      //ping: new five.Ping(7),
      set: function(force) {
console.log('feeding: ' + this.feeding);

        if (!this.feeding) {
          this.en.low();
          this.feeding = true;

          this.motor.rpm(40).cw().step(3200/25*47/9*100, function() { // 200 steps, 16 microstepp = 3200 / per round ... 25 holes per round, 47/9 = 47 big wheel, 9 small wheel
    	      this.feeding = false;
//              this.en.high();

//  	    if (val < 950) {
//              console.log('searching for a pellet');
//	      this.set(true);
//            }

/*
            var val = that.sensor.value;
            console.log(val);


*/
           }.bind(this));
        }
      },
    },

    // shocker (2 - 7 = 0.2mA - 0.7mA, 9 = relay) - pins 32, 47, 45
    shock: {
        timeout: null,
	pins: [ new five.Pin(32).low(), new five.Pin(47).low(), new five.Pin(45).low() ],
        on: function (current) {
          var bin = ("00" + (current - 1).toString(2)).slice(-3); // padded binary string 3bits

          console.log('shock: ' + bin, current);

	  for(var i = 0; i < 3; i++) this.pins[i][bin[i] == "1" ? "high" : "low"](); // calling Pin.high() = 1 or Pin.low() = 0

	  actualFrame.actions.shocking = current;
        },
        off: function () {
	    this.on(1); // 1 - 1 = 0 :)
        },
	set: function (current, delay) {
          if (this.timeout) clearTimeout(this.timeout);

          this.on(current);

          this.timeout = setTimeout(function() { 
             this.off();
          }.bind(this), delay);
        }
    },

    // arena turntable
    turntable: {
      motor: new five.Motor({
        pins: {
          pwm: 11,
          dir: 6,
          cdir: 5,
          threshold: 1
        }
      }),
      set: function (dir, speed) {
        if (speed == 0) {
          this.motor.stop();	
          return;
        }

	if (dir == 'CCW') {
          this.motor.reverse(speed);
        }
        else {
          this.motor.forward(speed);
        }
      }
    }
}

arduino.feeder.en.high();

if (vc) {
  isWebcam = true;
  console.log('webcam: ok');
  stream.read();
}


  this.repl.inject({
    arduino: arduino
  });
});


exports = module.exports = app