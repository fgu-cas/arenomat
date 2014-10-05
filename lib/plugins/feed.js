var five = require("johnny-five");
var Fun = require("function-enhancements");

function Feed() {
  this.angle = 0;
  this.eye = 0;
  this.status = false;
  this.timer = null;
  this.sensorvalue = 0;

  this.motor = five.Stepper({
    type: five.Stepper.TYPE.DRIVER,
    stepsPerRev: 3200,
    pins: {
      step: 54,
      dir: 55
    }
  });

  this.calibration = new five.Button(21);
  this.calibration.on("down", function() {
        this.eye = 1;
       }.bind(this));
  this.calibration.on("up", function() {
        this.eye = 0;
       }.bind(this));


  this.en = new five.Pin(38);
  this.sensor = new five.Pin('A14');

  this.disable();

 this.sensor.on("data", function() {
    this.sensorvalue = this.value;
    //console.log('feeder: sensorval = ' + this.sensorvalue);
  });
}


Feed.prototype.enable = function() {
  this.status = true;
  this.en.low();
  console.log('feeder: enable stepper');
}
Feed.prototype.disable = function() {
  this.status = false;
  this.en.high();
  console.log('feeder: disable stepper');
}

Feed.prototype.step = function() {
  var that = this;
  console.log('feeder: start step, actual is ' + this.status);
  if (!this.status) {
    this.enable();

    this.motor.rpm(400000).ccw().step(3200 / 24 * 47 / 9, function() {
      var val = this.sensorvalue;
      console.log('feeder: stop step, photosensor value: ' + val);

//      if (val < 900) {
//        console.log('searching for a pellet');
//this.status = false;
//        this.it();
//      } else {
        this.disable();
//      }
    }.bind(this));
  }
}

Feed.prototype.it = function () {
    this.step();
}

Feed.prototype.calibrate = function () {
console.log('calb ' + this.eye);
        this.enable();
        this.motor.ccw().rpm(400000).step(1, function() {
console.log('ok' + this.eye);
	    if (!this.eye) process.nextTick(this.calibrate.bind(this));
	    else this.disable();
	}.bind(this));
}


exports = module.exports = new Feed();
exports.Feed = Feed;