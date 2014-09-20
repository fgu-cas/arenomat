var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');

function MP3() {
  if (false === (this instanceof MP3)) {
    return new MP3();
  }

  this.running = false;
  this.speaker = null;
    this.file = null;
}

// sound stimulation
MP3.prototype.play = function(filename) {
console.log(this.running, filename);
  if (!this.running) {
    this.running = true;

    var that = this;
    this.file = fs.createReadStream(__dirname + '/../../sounds/' + filename);


    this.file.pipe(new lame.Decoder())
      .on('format', function(format) {
	console.log(format);

	that.speaker = new Speaker(format).on('close', function() {
    	    that.running = false;
	});

        this.pipe(that.speaker);
      });
  }
}

MP3.prototype.stop = function () {
    this.running = false;
console.log(this.speaker);
    if (this.speaker) {
	this.speaker.close();
    }
}

exports = module.exports = new MP3();
exports.MP3 = MP3;