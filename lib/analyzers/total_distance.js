function distance(point1, point2) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
}


function TotalDistance(params) {

  if (!(this instanceof TotalDistance)) {
    return new TotalDistance(params);
  }

  this.params = params;

  this.distance = 0;

  this.lastTime = false;
  this.lastPosition = false;

this.parameters = [ { name: 'resolution', default: 1, units: 's', description: 'Frame each x seconds will be counted' } ]
this.name = "Total distance (AF) [m]";
this.description = "Total distance in meters";

};


TotalDistance.prototype.add = function add(frame) {
   if (!this.lastTime || (frame.elapsedTime > this.lastTime +  parseInt(this.params['resolution']))) {
    this.lastTime = frame.elapsedTime;

    if (this.lastPosition) {
        this.distance += distance(frame.cv[0].position, this.lastPosition);
    }

    this.lastPosition = frame.cv[0].position;
  }
}

TotalDistance.prototype.result = function result() {
    return (this.distance / config.camWidth * config.arenaWidth).toFixed(2);
}


module.exports = TotalDistance;
