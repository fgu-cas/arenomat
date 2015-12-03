function distance(point1, point2) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
}


function Thigmotaxis(params) {

  if (!(this instanceof Thigmotaxis)) {
    return new Thigmotaxis(params);
  }

  this.params = params;

  this.distance = 0;
    this.count =0;

this.parameters =  [ { name: "ratio", units: "%" } ];
this.name = "Thigmotaxis [%]";
this.description = "Percentage representation of subject beeing outside of the given circle";

};


Thigmotaxis.prototype.add = function add(frame) {
    var dist = distance(frame.cv[0].position, { x: config.camWidth / 2, y: config.camHeight / 2});
    var limit = config.camWidth * parseInt(this.params['ratio']) / 100;

    if (dist > limit) {
	this.outside++;
    }
    this.count++;
}

Thigmotaxis.prototype.result = function result() {
    return (this.outside / this.count * 100).toFixed(2);
}


module.exports = Thigmotaxis;
