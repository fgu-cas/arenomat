var 	sys = require("util"),
	path = require("path"),
	url = require("url"),
	fs = require("fs"),
	cv = require('opencv'),
	app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	fs = require('fs'),
	five = require("johnny-five"),
	lame = require('lame'),
	Speaker = require('speaker'),
	board = new five.Board(),

	isRunning = false,
	code = false,

	startTime = 0,

	a_light,
	a_feeder,
	a_shock;

function play(mp3) { 
fs.createReadStream(mp3)
  .pipe(new lame.Decoder())
  .on('format', function (format) {
    this.pipe(new Speaker(format));
  });
}

io.set('log level', 1); // reduce logging

var areas = [ 5, 2, 1, 3 ];

app.listen(80)
console.log("Listening");

intervalId = setInterval(function() {
    frameRead(intervalId)
}, 5000);
console.log("cv");

board.on("ready", function() {
    console.log('board ready');

 
    io.sockets.on('connection', function (socket) {
        socket.on('codeStart', function (data) {
	    isRunning = true;
	    startTime =  new Date().getTime() / 1000;
	    code = data;
	    console.log('codeStart: ' + data);
        });
        socket.on('codeStop', function () {
	    isRunning = false;
	    console.log('codeStop');
	});
    });

 a_light = new five.Led(13);
 a_feeder = new five.Servo({
  pin: 12,
  range: [ 0, 180 ],
  startAt: 0
});

var a_shock = [ new five.Led(8), new five.Led(9), new five.Led(10) ];

});



//var vc = new cv.VideoCapture("http://192.168.0.100/webcam/?action=stream&type=.mjpg")
var vc = new cv.VideoCapture(0)

var lowThresh = 100;
var highThresh = 200;
var minArea = 100;
var maxArea = 400;
var point;


function handler(request, response) {
	var my_path = url.parse(request.url).pathname;
	var full_path = path.join(process.cwd(), my_path);
	fs.exists(full_path, function(exists) {
		if (!exists) {
			response.writeHeader(404, {"Content-Type": "text/plain"});
			response.write("404 Not Found\n");
			response.end();
		}
		else {
			fs.readFile(full_path, "binary", function(err, file) {
				if (err) {
					response.writeHeader(500, {"Content-Type": "text/plain"});
					response.write(err + "\n");
					response.end();
				}
				else {
					response.writeHeader(200);
					response.write(file, "binary");
					response.end();
				}
			});
		}
	});
}
;

var RED = [0, 0, 255]; //B, G, R

function frameRead() {



//  cv.readImage('http://192.168.0.100/webcam/?action=snapshot&ext=.jpg', function(im){
	vc.read(function(err, im) {
		if (im && im.width() && im.height()) {
			if (intervalId)
				clearInterval(intervalId);

			// matrix clone for image processing
			check = im.copy();
			check.convertGrayscale();
			check.gaussianBlur([17, 17])
			check = check.threshold(254, 255);
			check.dilate(7);
//im = check.copy();
			check.canny(255, 255);

			contours = check.findContours();
			//im.drawAllContours(contours, RED);

			// filters contours by area
			if (contours.size() > 0) {
				for (var i = 0; i < contours.size(); i++) {
					var area = contours.area(i);
					if (area < minArea || area > maxArea)
						continue;

					// emits positions of the first point one
					// TODO: more accurate position
					point = contours.point(i, 0);
					
					//im.ellipse(point.x + 10, point.y + 10, 10, 10);
					im.drawContour(contours, i, RED);

					io.sockets.emit('position', point);
					io.sockets.emit('cv', 'data:image/jpeg;base64,' + check.toBuffer().toString('base64'));
					break;
				}
			}
			
			// webcam frame base64 encoded
			io.sockets.emit('webcam', 'data:image/jpeg;base64,' + im.toBuffer().toString('base64'));
			
			setTimeout(frameRead, 5);
		}
	});

	if (isRunning && code) {
	    io.sockets.emit('elapsedTime', (new Date().getTime() / 1000) - startTime);

            eval('function go() { ' + code + ' }');
	    go();

            console.log('eval: ok');
	}
}
