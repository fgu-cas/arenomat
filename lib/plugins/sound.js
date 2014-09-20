var Speaker = require('speaker');
var baudio = require('baudio');

function Sound() {
  if (false === (this instanceof Sound)) {
    return new Sound();
  }

  this.running = false;
  this.b = null;
}

// sound stimulation
Sound.prototype.play = function(length, callback) {
  if (!this.running) {
    this.running = true;


  this.b = baudio(function(t, i) {
    if (t > length*2) this.b.end()

    return callback(t, i);
    }.bind(this)
  );

this.b.pipe(new Speaker().on('close', function() {
        this.running = false;
        }.bind(this)
          ));
  }
}

Sound.prototype.stop = function () {
    if (this.b) this.b.end();
}

exports = module.exports = new Sound();
exports.Sound = Sound;