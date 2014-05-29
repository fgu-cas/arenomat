camWidth = 800, camHeight = 600;

var Arena = {}

Arena.prototype.rotatePoint = function (point, origin, angle) {
    var angle = angle * Math.PI / 180.0;
    return {
        x: Math.cos(angle) * (point.x-origin.x) - Math.sin(angle) * (point.y-origin.y) + origin.x,
        y: Math.sin(angle) * (point.x-origin.x) + Math.cos(angle) * (point.y-origin.y) + origin.y
    };
}

Arena.prototype.inPoly = function (poly, pt) {
//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/is-point-in-poly [v1.0]
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
      ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
        && (c = !c);
    return c;
  }

Arena.prototype.zoneDetector = function (points) {
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
  return this;
}

Arena.prototype.blobDetector = function (check) {
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

  }

  return this;
}

exports = module.exports = Arena