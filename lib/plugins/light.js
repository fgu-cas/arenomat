var five = require("johnny-five");

function Light() {
  this.led = new five.Led(13);
  this.status = false;
}

Light.prototype.on = function () {
  console.log('led on');
  this.led.on();
}

Light.prototype.off = function () {
  console.log('led off');
  this.led.off();
}

Light.prototype.pulse = function (delay) {
  if (!this.status) {
    this.on();
    this.status = true;
  
  this.led.board.wait(delay, function () {
    if (this.status) this.off();
    this.status = false;
  }.bind(this));

  }
}

exports = module.exports = new Light();
exports.Light = Light;