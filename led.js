
var five = require("johnny-five"),
  board, led, timer;

board = new five.Board();

function go() {
    clearTimeout(timer);

    led.on();

    timer = setTimeout(function () { 
	led.off();
        setTimeout(function () { go(); }, 1);
    }, 5);
}

board.on("ready", function() {

  // Create a standard `led` hardware instance
  led = new five.Led({
    pin: 13
  });

  go();
});
