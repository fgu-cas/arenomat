var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');

var cv = require('opencv');

var lame = require('lame');
var Speaker = require('speaker');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var server = require('http').createServer(app)
var io = require('socket.io').listen(server);


var        isRunning = false,
        code = false,
        shocking = false,
        feeding = false,

        startTime = 0,

        a_light,
        a_feeder,
        a_shock;


//io.set('log level', 1); // reduce logging


// Set View Engine
app.engine('html', require('hogan-express'));
app.set('view options', {layout: true});
app.set('layout', 'layout');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('partials', { menu: 'menu', blockly: 'blockly' });

app.enable('view cache');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/experiments', users);
server.listen(80);

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

try {
    var vc = new cv.VideoCapture(0, 800, 600);
    var point;
} catch (e) {
    console.log('no webcam');
}

function frameRead() {
if (vc)
        vc.read(function(err, check) {
                if (check && check.width() && check.height()) {
                        if (intervalId)
                                clearInterval(intervalId);

                        // matrix clone for image processing
                        check.convertGrayscale();
                        // webcam frame base64 encoded
                        io.sockets.emit('webcam', 'data:image/jpeg;base64,' + check.toBuffer().toString('base64'));

                        check = check.threshold(240, 255);
                        check.dilate(7);
                        contours = check.findContours();
//                      im.drawAllContours(contours, RED);

                        // filters contours by area
                        if (contours.size() == 1) {
                                //var i = 0;
                                        //var area = contours.area(i);
                                        //if (area < minArea || area > maxArea)
                                        //      continue;

                                        // emits positions of the first point one
mu = contours.moments(0);
point = { x: mu.m10/mu.m00 , y: mu.m01/mu.m00 };

//                                      point = contours.point(0, 0);

                                        //im.ellipse(point.x + 10, point.y + 10, 10, 10);
                                        //im.drawContour(contours, i, RED);

                                        io.sockets.emit('position', point);
                                        activeArea[0] = in_poly(areas[0], point);
                                            io.sockets.emit('activeArea', activeArea);
                        }
                        else
                                        io.sockets.emit('position', { x: 0, y:0 });


                }
                        io.sockets.emit('shocking', shocking);
                        setTimeout(frameRead, 25);
        });

        if (isRunning && code) {
            io.sockets.emit('elapsedTime', (new Date().getTime() / 1000) - startTime);

            eval('function go() { ' + code + ' }');
        setTimeout(go, 10);

            //console.log('eval: ok');
        }
}

intervalId = setInterval(function() {
    frameRead(intervalId)
}, 1000);
console.log("cv");
