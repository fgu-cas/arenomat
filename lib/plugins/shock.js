module.exports = Shock;

var five = require("johnny-five");

function Shock() {
  this.timeout = null;
  this.pins = [new five.Pin(32).low(), new five.Pin(47).low(), new five.Pin(45).low()];
}

// shocker (2 - 7 = 0.2mA - 0.7mA, 9 = relay) - pins 32, 47, 45
Shock.prototype.on = function () {
    var bin = ('00' + (current - 1).toString(2)).slice(-3); // padded binary string 3bits

    console.log('shock: ' + bin, current);

    for (var i = 0; i < 3; i++) {
      this.pins[i][bin[i] == '1' ? 'high' : 'low'](); // calling Pin.high() = 1 or Pin.low() = 0
    }

    actualFrame.actions.shocking = current;
}


Shock.prototype.off = function () {
    this.on(1); // 1 - 1 = 0 :)
}

Shock.prototype.pulse = function (current, delay) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.on(current);

    this.timeout = setTimeout(function () {
      this.off();
    }.bind(this), delay);
}

