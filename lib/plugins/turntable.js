var five = require("johnny-five");

function Turntable() {
  this.motor = new five.Motor({
    pins: {
      pwm: 11,
      dir: 6,
      cdir: 5,
      threshold: 1
    }
  });

  this.angle = 0;

  board.io.attachEncoder(0, 20, 20); // counter 0, counterA = pin 20, counterB = pin 20

  board.io.on('encoder-report-0', function(pos) {
    this.angle = pos;
  }.bind(this));

}

Turntable.prototype.rotate = function(dir, speed) {
  if (!speed) {
    this.motor.stop();
    return;
  }

  if (dir == 'CCW') {
    this.motor.reverse(speed);
  } else {
    this.motor.forward(speed);
  }
}

Turntable.prototype.position = function() {
  return this.angle / 2; // using one pin for both counters, so divide by two
}

exports = module.exports = new Turntable();
exports.Turntable = Turntable;