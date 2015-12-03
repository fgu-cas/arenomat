function FirstShock(params) {

  if (!(this instanceof FirstShock)) {
    return new FirstShock(params);
  }

  this.params = params;

  this.time = 0;

this.parameters = [  ]
this.name = "First shock [s]";
this.description = "Time to first shock";

};


FirstShock.prototype.add = function add(frame) {
    if (frame.shocked || frame.actions.shocking) {
        if (frame.cv[0].zones[i] && !this.time) {
            this.time = frame.elapsedTime;
        }
    }
}

FirstShock.prototype.result = function result() {
    return this.time;
}


module.exports = FirstShock;
