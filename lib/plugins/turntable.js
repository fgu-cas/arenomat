module.exports = Turntable;

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
    
}

// arena turntable
Turntable.prototype.rotate = function (dir, speed) {
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


