function Avoidance(params) {

  if (!(this instanceof Avoidance)) {
    return new Avoidance(params);
  }

  this.params = params;

  this.time = 0;
  this.max = 0;

this.parameters = [  ]
this.name = "Maximum time avoided [s]";
this.description = "The longest time without shock";

};


Avoidance.prototype.add = function add(frame) {
    if (frame.shocked || frame.actions.shocking) {
	var length = frame.elapsedTime - this.time;
	if (length > this.max) this.max = length;
	this.time = frame.elapsedTime;
    }
}

Avoidance.prototype.result = function result() {
    return this.max;
}


module.exports = Avoidance;
