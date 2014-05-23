module.exports = Light;

var five = require("johnny-five");

function Light() {
  this.led = new five.Led(9);
}

Light.prototype.on = function () {
  this.led.on();
}
