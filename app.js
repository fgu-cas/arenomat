var sys = require("util"),
		path = require("path"),
		url = require("url"),
		fs = require("fs"),
		cv = require('opencv'),
		app = require('http').createServer(handler),
		io = require('socket.io').listen(app),
		fs = require('fs')
io.set('log level', 1); // reduce logging
//var vc = new cv.VideoCapture("http://192.168.0.100/webcam/?action=stream&type=.mjpg")
var vc = new cv.VideoCapture(0)

var lowThresh = 100;
var highThresh = 200;
var minArea = 100;
var maxArea = 400;

app.listen(80)

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
					var point = contours.point(i, 0);
					
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
}

intervalId = setInterval(function() {
	frameRead(intervalId)
}, 100);
