function distance(point1, point2) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
}


function MeanDistance(params) {

  if (!(this instanceof MeanDistance)) {
    return new MeanDistance(params);
  }

  this.params = params;

  this.distance = 0;
    this.count =0;

this.parameters = [ ];
this.name = "Mean distance [m]";
this.description = "Mean distance in meters";

};


MeanDistance.prototype.add = function add(frame) {
    this.distance += distance(frame.cv[0].position, { x: config.camWidth / 2, y: config.camHeight / 2});
    this.count++;
}

MeanDistance.prototype.result = function result() {
    return (this.distance / this.count / config.camWidth * config.arenaWidth).toFixed(2);
}


module.exports = MeanDistance;
