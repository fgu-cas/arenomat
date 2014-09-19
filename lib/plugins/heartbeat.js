var five = require("johnny-five");

function Heartbeat() {
  this.led = new five.Led(13);
  this.status = false;
  this.timer = false;
}

Heartbeat.prototype.on = function() {
  this.status = true;
  this.led.on();
}

Heartbeat.prototype.off = function() {
  this.status = false;
  this.led.off();
}

Heartbeat.prototype.pulse = function(delay) {
this.led.pulse(500);
}

exports = module.exports = new Heartbeat();
exports.Heartbeat = Heartbeat;