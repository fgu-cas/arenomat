var five = require("johnny-five");


function Feed() {
  this.motor = five.Stepper({
    type: five.Stepper.TYPE.DRIVER,
    stepsPerRev: 3200,
    pins: {
      step: 54,
      dir: 55
    }
  });
  this.en = new five.Pin(38);
  this.sensor = new five.Pin('A13');

  this.status = false;

  this.disable();
}

Feed.prototype.enable = function () {
    this.status = true;
    this.en.low();
}
Feed.prototype.disable = function () {
    this.status = false;
    this.en.high();
}

Feed.prototype.it = function () {
    console.log('feeding: ' + this.status);

    if (!this.status) {
      this.enable();

      this.motor.rpm(40).cw().step(3200 / 25 * 47 / 9, function () { // 200 steps, 16 microstepp = 3200 / per round ... 25 holes per round, 47/9 = 47 big wheel, 9 small wheel
    	   this.disable();
/*
            var val = this.sensor.value;
            console.log(val);

            if (val < 950) {
              console.log('searching for a pellet');
              setTimeout(function () { this.set(true) }.bind(this), 1);
            }
*/
      }.bind(this));
    }
}

exports = module.exports = new Feed();
exports.Feed = Feed;