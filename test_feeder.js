
var five = require("johnny-five"),
  board;

board = new five.Board();

board.on("ready", function() {
  var motor =  five.Stepper({
    type: five.Stepper.TYPE.DRIVER,
    stepsPerRev: 3200,
    pins: {
      step: 60,
      dir: 61
    }
  });
var led = new five.Led(9);
led.on();

  var sensor = new five.Pin('A13');
sensor.on('data',  function () { 
    console.log(this.value);
});

    console.log('feeding: ' + this.feeding);

    motor.rpm(40).cw().step(3200 / 25 * 47 / 9 * 100 * 10000, function () { // 200 steps, 16 microstepp = 3200 / per round ... 25 holes per round, 47/9 = 47 big wheel, 9 small wheel
        this.feeding = false;
        //              this.en.high();

        //          if (val < 950) {
        //              console.log('searching for a pellet');
        //            this.set(true);
        //            }

        /*
            var val = that.sensor.value;
            console.log(val);


*/
      });
});