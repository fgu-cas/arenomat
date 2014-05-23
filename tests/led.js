
var five = require("johnny-five"),
  board, led;

board = new five.Board();

board.on("ready", function() {

  // Create a standard `led` hardware instance
  led = new five.Led({
    pin: 9
  });

  // "on" turns the led _on_
  led.on();

  // "off" turns the led _off_
  led.off();
led.pulse(500);
  // Turn the led back on after 3 seconds (shown in ms)
  this.wait(3000, function() {

    led.on();

  });
});
