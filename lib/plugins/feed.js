var five = require("johnny-five");
var Fun = require("function-enhancements");

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
  this.sensor = new five.Pin('A14');
  this.status = false;
  this.timer = null;

  this.disable();

 this.sensor.on("data", function() {
//    console.log(this.value);
  });
}

Feed.prototype.enable = function() {
  this.status = true;
  this.en.low();
  console.log('enable');
}
Feed.prototype.disable = function() {
  this.status = false;
  this.en.high();
  console.log('disable');
}

Feed.prototype.step = function(callback) {
  console.log('step: ' + this.status);
  if (!this.status) {
    this.enable();

    this.motor.rpm(400000).ccw().step(3200 / 24 * 47 / 9, function() {

   var val = this.sensor.value;
   console.log(val);

   if (val < 900) {
   console.log('searching for a pellet');
   this.disable();
   this.step();
   }
   else {


      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
        console.log('wait');
        this.disable();
      }.bind(this), 1000);
}
    }.bind(this));
  }
}


Feed.prototype.it = function() {
  this.step();
}

exports = module.exports = new Feed();
exports.Feed = Feed;