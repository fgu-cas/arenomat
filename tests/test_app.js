
var five = require("johnny-five"),
  board;

board = new five.Board();

board.on("ready", function() {
console.log('ok');
    var arduino = require('./arduino.js');
//    var arduino = new Arduino();
    //arduino.light.on(10);
    //console.log(Arduino, arduino);
    
});