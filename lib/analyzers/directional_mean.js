function angle(point1, point2) {
    return Math.atan2(point1.y - point2.y, point1.x - point2.x) / Math.PI * 180;
}


function DirectionalMean(params) {

  if (!(this instanceof DirectionalMean)) {
    return new DirectionalMean(params);
  }

  this.params = params;

  this.lastTime = false;
  this.lastPosition = false;
  this.sum = 0;
  this.count = 0;

this.parameters = [ { name: 'resolution', default: 1, units: 's', description: 'Frame each x seconds will be counted' } ]
this.name = "Directional mean [deg]";
//this.description = "Total distance in meters";

};


DirectionalMean.prototype.add = function add(frame) {
   if (!this.lastTime || (frame.elapsedTime > this.lastTime +  parseInt(this.params['resolution']))) {
    this.lastTime = frame.elapsedTime;

    if (this.lastPosition) {
        this.sum += angle(frame.cv[0].position, this.lastPosition);
    }

    this.count++;
    this.lastPosition = frame.cv[0].position;
  }
}

DirectionalMean.prototype.result = function result() {
    return (this.sum / this.count).toFixed(2);
}


module.exports = DirectionalMean;
