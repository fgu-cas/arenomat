var five = require("johnny-five");

function Shock() {
  this.timeout = null;
  this.time = null;
  this.current = 0;
  this.pins = [new five.Pin(32).low(), new five.Pin(47).low(), new five.Pin(45).low()];
  this.off();
}

// shocker (2 - 7 = 0.2mA - 0.7mA, 9 = relay) - pins 32, 47, 45
Shock.prototype.on = function(current) {
  var bin = ('00' + (current).toString(2)).slice(-3); // padded binary string 3bits

  console.log('shock: ' + bin, current);

  for (var i = 0; i < 3; i++) {
    this.pins[i][bin[i] == '1' ? 'high' : 'low'](); // calling Pin.high() = 1 or Pin.low() = 0
  }

  this.current = current;
  actualFrame.actions.shocking = current;
}


Shock.prototype.off = function() {
  this.on(0);
}

Shock.prototype.pulse = function(delay, pause) {
  current = +settings['shock'];
  pause = +pause;
  delay = +delay;

//  if (current != this.current) {
if  (actualFrame.tracked) {

 if ((this.time == null) || ((new Date().getTime() / 1000) - this.time > pause)) {
    this.time = (new Date().getTime() / 1000);
    shocked++;
    this.current = current;


    this.on(current);

    if (this.timeout) {
	clearTimeout(this.timeout);
    }

console.log('delay: ' + delay);
    this.timeout = setTimeout(function() {
      this.off();
  actualFrame.actions.shocking  =  this.current = 0;
console.log('time', new Date().getTime()/1000 - this.time);
    }.bind(this), +delay);
//  }
}
}
}

exports = module.exports = new Shock();
exports.Shock = Shock;