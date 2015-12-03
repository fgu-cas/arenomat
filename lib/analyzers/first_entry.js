function FirstEntry(params) {

  if (!(this instanceof FirstEntry)) {
    return new FirstEntry(params);
  }

  this.params = params;

  this.time = 0;

this.parameters = [  ]
this.name = "First entry [s]";
this.description = "Time to first entry into arena";

};


FirstEntry.prototype.add = function add(frame) {
    for(i in frame.cv[0].zones) {
        if (frame.cv[0].zones[i] && !this.time) {
            this.time = frame.elapsedTime;
        }
    }
}

FirstEntry.prototype.result = function result() {
    return this.time;
}


module.exports = FirstEntry;
