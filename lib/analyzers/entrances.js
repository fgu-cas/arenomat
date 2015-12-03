function Entrances(params) {

  if (!(this instanceof Entrances)) {
    return new Entrances(params);
  }

  this.params = params;

  this.old = 0;
  this.count = 0;

this.parameters = [  ]
this.name = "Entrances [num]";
this.description = "Number of entries in area";

};


Entrances.prototype.add = function add(frame) {
    var entry = 0;
    for(i in frame.cv[0].zones) {
        entry += frame.cv[0].zones[i];
    }
    if (entry > 0) entry = 1;

    if ((this.old != entry) && entry) {
	this.count++;
    }
}

Entrances.prototype.result = function result() {
    return this.count;
}


module.exports = Entrances;
