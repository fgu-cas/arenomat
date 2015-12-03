function Shocks(params) {

  if (!(this instanceof Shocks)) {
    return new Shocks(params);
  }

  this.params = params;

  this.shocks = 0;

this.parameters = [  ]
this.name = "Shocks [num]";
this.description = "Number of shocks";

};


Shocks.prototype.add = function add(frame) {
    if (frame.shocked || frame.actions.shocking) {
        if (old == 0) {
            this.shocks++;
        }
	this.old = 1;
    } else {
	this.old = 0;
    }

}

Shocks.prototype.result = function result() {
    return this.shocks;
}


module.exports = Shocks;
