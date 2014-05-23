module.exports = Feed;

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
  this.enable = new five.Pin(38).high();
  this.sensor = new five.Pin('A13');
  this.feeding = false;
}

Feed.prototype.it = function () {
    console.log('feeding: ' + this.feeding);

    if (!this.feeding) {
      this.enable.low();
      this.feeding = true;

      this.motor.rpm(40).cw().step(3200 / 25 * 47 / 9 * 100, function () { // 200 steps, 16 microstepp = 3200 / per round ... 25 holes per round, 47/9 = 47 big wheel, 9 small wheel
        this.feeding = false;
                 this.enable.high();

        //          if (val < 950) {
        //              console.log('searching for a pellet');
        //            this.set(true);
        //            }

        /*
            var val = that.sensor.value;
            console.log(val);


*/
      }.bind(this));
    }
}
