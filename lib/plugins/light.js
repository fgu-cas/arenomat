var five = require("johnny-five");

function Light() {
  this.led = new five.Led(9);
  this.status = false;
  this.timer = false;
}

Light.prototype.on = function () {
  this.status = true;
  this.led.on();
}

Light.prototype.off = function () {
  this.status = false;
  this.led.off();
}

Light.prototype.pulse = function (delay) {
  var that = this;
  if (this.timer) clearTimeout(this.timer);

  if (!this.status) {
    this.on();
  }

  this.timer = setTimeout(function () {
    if (this.status) {
      this.off(); 
    } 
  }.bind(this), delay);
}
  
exports = module.exports = new Light();
exports.Light = Light;