function Arena() {
  this.blobs = [];
  this.points = [];
  this.center = { x: camHeight / 2, y: camHeight /2 };
}

Arena.prototype.rotatePoint = function(point, origin, angle) {
  var angle = angle * Math.PI / 180.0;
  return {
    x: Math.cos(angle) * (point.x - origin.x) - Math.sin(angle) * (point.y - origin.y) + origin.x,
    y: Math.sin(angle) * (point.x - origin.x) + Math.cos(angle) * (point.y - origin.y) + origin.y
  };
}

Arena.prototype.rotateZone = function(zone, angle) {
//console.log(actualFrame);
  if (actualFrame.zones && actualFrame.zones[zone]) {
    for (var n = 0; n < actualFrame.zones[zone].length; n++) {
      actualFrame.zones[zone][n] = this.rotatePoint(actualFrame.zones[zone][n], this.center, angle);
    }
  }
}

Arena.prototype.inPoly = function(poly, pt) {
//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/is-point-in-poly [v1.0]
  for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
    ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
      && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
      && (c = !c);
  return c;
}

Arena.prototype.zoneDetector = function() {
  if (actualFrame.zones) {
for (var n = 0; n < this.blobs.length; n++) {
  if (actualFrame.cv[n])
   for (var i = 0; i < actualFrame.zones.length; i++) {
    if (!actualFrame.cv[n].zones)
      actualFrame.cv[n].zones = {};
    if (actualFrame.zones[i])
      actualFrame.cv[n].zones[i] = this.inPoly(actualFrame.zones[i], this.blobs[n]);
  }
}
}

  return this;
}

Arena.prototype.distance = function (a, b) {
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

Arena.prototype.blobDetector = function(check) {
// matrix clone for image processing
  check.convertGrayscale();

  check = check.threshold(+settings['threshold'].split(',')[0], +settings['threshold'].split(',')[1]);
  check.dilate(7);
  contours = check.findContours();
  if (contours.size() > 0) {
    var points = [];
    for (var n = 0; n < contours.size(); n++) {
      mu = contours.moments(n);
      points.push({x: Math.round(mu.m10 / mu.m00), y: Math.round(mu.m01 / mu.m00), area: contours.area(n)});
    }

    points = points.filter(function (element) {
	return this.distance(element, this.center) < ((camHeight / 2) + 10);
    }.bind(this));

    points = points.filter(function (element) {
	return ((element.area >= +settings['subject_area'].split(',')[0]) && (element.area <= +settings['subject_area'].split(',')[1]));
    }.bind(this));

    points.sort(function(a, b) {
      return a.area - b.area;
    });

    points = points.slice(0, 2); // only the 2 biggest areas

    actualFrame.tracked = points.length;

    for (var n = 0; n < points.length; n++) {
      if (!this.blobs[n]) this.blobs[n] = { x: 0, y: 0 }
//      if (this.distance(points[n], this.blobs[n]) > 2) {

        if (!actualFrame.cv[n])
          actualFrame.cv[n] = {};

        actualFrame.cv[n].position = points[n];
      }
//    }

    this.blobs = points;

    return this;
  }
}

exports = module.exports = new Arena();
exports.Arena = Arena;