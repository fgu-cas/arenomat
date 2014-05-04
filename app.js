var camWidth = 800, camHeight = 600;


var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

var mongoose = require('mongoose');

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
app.set('partials', { menu: 'menu', blockly: 'blockly', head: 'head', foot: 'foot' });

app.enable('view cache');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/experiments', users);


http.listen(80, function() { 
    console.log('Listening on port %d', http.address().port);
});

//mongoose
mongoose.connect("mongodb://localhost/arenomat");

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
io.sockets.on('connection', function (socket) {
	console.log('connection');
        socket.on('codeStart', function (data) {
            isRunning = true;
            startTime =  new Date().getTime() / 1000;
            code = data;
            console.log('codeStart: ' + data);
        });
        socket.on('codeStop', function () {
            isRunning = false;
            shocking = 0;
            console.log('codeStop');
        });
        socket.on('codeSave', function (data) {
            console.log('codeSave: ' + data);
        });
        socket.on('area', function (data) {
//          console.log('area: ' + data);
            areas[0] = data;
        });
});


// Video processing

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/is-point-in-poly [v1.0]

function in_poly(poly, pt){
    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
        && (c = !c);
    return c;
}


// WEBCAM
try {
    var vc = new cv.VideoCapture(0);
    vc.setWidth(camWidth);
    vc.setHeigh(camHeight);

    var point;
} catch (e) {
    console.log('no webcam');
}

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

var activeArea = [ 0, 0, 0, 0 ], areas = [ 0, 0 ];

var im;

// one frame - looped
function frameRead() {
if (vc)
        vc.read(function(err, check) {
                if (check && check.width() && check.height()) {
                        if (intervalId)
                                clearInterval(intervalId);

			im = check.copy();
                        // matrix clone for image processing
                        check.convertGrayscale();
                        // webcam frame base64 encoded

                        check = check.threshold(240, 255);
                        check.dilate(7);
                        contours = check.findContours();

                      im.drawAllContours(contours, [255, 0, 0]);

                        // filters contours by area
                        if (contours.size() == 1) {
                                //var i = 0;
                                        //var area = contours.area(i);
                                        //if (area < minArea || area > maxArea)
                                        //      continue;

                                        // emits positions of the first point one
mu = contours.moments(0);
point = { x: Math.round(mu.m10/mu.m00) , y: Math.round(mu.m01/mu.m00) };

//                                      point = contours.point(0, 0);

                                        //im.ellipse(point.x + 10, point.y + 10, 10, 10);
                                        //im.drawContour(contours, i, RED);

                                        io.sockets.emit('position', point);
                                        activeArea[0] = in_poly(areas[0], point);
                                            io.sockets.emit('activeArea', activeArea);
                        }
                }

                if (shocking) io.sockets.emit('shocking', shocking);

io.set('log level', 1); // reduce logging
io.sockets.emit('webcam', im.toBuffer().toString('base64'));
io.set('log level', 5); // reduce logging

                        setTimeout(frameRead, 50);
        });

        if (isRunning && code) {
            io.sockets.emit('elapsedTime', (new Date().getTime() / 1000) - startTime);

            eval('function go() { ' + code + ' }');
        setTimeout(go, 100);

            //console.log('eval: ok');
        }
}
