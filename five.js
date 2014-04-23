var five = require("johnny-five"),
  board, servo;

board = new five.Board();

board.on("ready", function() {
  servo = new five.Servo({
    pin: 12
  });

  // Inject the `servo` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    servo: servo
  });

});
