var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');

function MP3() {
  if (false === (this instanceof MP3)) {
    return new MP3();
  }

  this.running = false;
}

// sound stimulation
MP3.prototype.play = function(filename) {
  if (!this.running) {
    this.running = true;

    fs.createReadStream(__dirname + '/../../sounds/' + filename)
      .pipe(new lame.Decoder())
      .on('format', function(format) {
        this.pipe(
          new Speaker(format).on('close', function() {
          this.running = false;
        }.bind(this)
          ));
      });
  }
}

exports = module.exports = new MP3();
exports.MP3 = MP3;