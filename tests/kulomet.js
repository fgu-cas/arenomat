var five = require("johnny-five");

var board = new five.Board();

board.on("ready", function() {

  
    var stepper = new five.Stepper({
      type: five.Stepper.TYPE.DRIVER,
      stepsPerRev: 3200,
      pins: {
        step: 54,
        dir: 55
      }
    });

  // Make 10 full revolutions counter-clockwise at 180 rpm with acceleration and deceleration
  stepper.rpm(18000000).ccw().step(3200 / 24 * 47 / 9 * 10, function() {
    console.log("Done moving CCW");
  });
});

// @markdown
// - [A4988 Stepper Motor Driver Carrier](http://www.pololu.com/catalog/product/1182)
// - [100uf 35v electrolytic cap](http://www.amazon.com/100uF-Radial-Mini-Electrolytic-Capacitor/dp/B0002ZP530)
// - [Stepper Motor (4 wire, bipolar)](https://www.sparkfun.com/products/9238)
//
// ![docs/breadboard/stepper-driver-A4988.png](breadboard/stepper-driver-A4988.png)
//
// @markdown
