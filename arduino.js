/**
* Arduino class
*/
arduino = {
    // sound stimulation
    mp3: {
      playing: false,
      set: function(filename) { 
        var that = this;
	if (!this.playing) { 
          this.playing = true; 

          fs.createReadStream(__dirname + "/sounds/" + filename).pipe(new lame.Decoder()).on('format', function (format) {
            this.pipe(
              new Speaker(format).on("close", function () { 
                this.playing = false 
              }.bind(this))
            )
          })
        }
      }
    },

    // light stimulation
    light: {
      timeout: false,
      led: new five.Led(9),
      set: function (delay) {
	this.led.on(); 

          console.log('light: on', this.state);
        this.board.wait(delay, function() { 
          console.log('light: off', this.state);
            this.led.off(); 
        }.bind(this));
      }
    },

    // nesquik feeder
    feeder: {
      feeding: false,
      motor: five.Stepper({
        type: five.Stepper.TYPE.DRIVER,
        stepsPerRev: 3200,
          pins: {
           step: 54,
           dir: 55
        }
      }),
      en: new five.Pin(38).high(),
      sensor: new five.Pin("A13"),
      //ping: new five.Ping(7),
      set: function(force) {
console.log('feeding: ' + this.feeding);

        if (!this.feeding) {
          this.en.low();
          this.feeding = true;

          this.motor.rpm(40).cw().step(3200/25*47/9*100, function() { // 200 steps, 16 microstepp = 3200 / per round ... 25 holes per round, 47/9 = 47 big wheel, 9 small wheel
    	      this.feeding = false;
//              this.en.high();

//  	    if (val < 950) {
//              console.log('searching for a pellet');
//	      this.set(true);
//            }

/*
            var val = that.sensor.value;
            console.log(val);


*/
           }.bind(this));
        }
      },
    },

    // shocker (2 - 7 = 0.2mA - 0.7mA, 9 = relay) - pins 32, 47, 45
    shock: {
        timeout: null,
	pins: [ new five.Pin(32).low(), new five.Pin(47).low(), new five.Pin(45).low() ],
        on: function (current) {
          var bin = ("00" + (current - 1).toString(2)).slice(-3); // padded binary string 3bits

          console.log('shock: ' + bin, current);

	  for(var i = 0; i < 3; i++) this.pins[i][bin[i] == "1" ? "high" : "low"](); // calling Pin.high() = 1 or Pin.low() = 0

	  actualFrame.actions.shocking = current;
        },
        off: function () {
	    this.on(1); // 1 - 1 = 0 :)
        },
	set: function (current, delay) {
          if (this.timeout) clearTimeout(this.timeout);

          this.on(current);

          this.timeout = setTimeout(function() { 
             this.off();
          }.bind(this), delay);
        }
    },

    // arena turntable
    turntable: {
      motor: new five.Motor({
        pins: {
          pwm: 11,
          dir: 6,
          cdir: 5,
          threshold: 1
        }
      }),
      set: function (dir, speed) {
        if (speed == 0) {
          this.motor.stop();	
          return;
        }

	if (dir == 'CCW') {
          this.motor.reverse(speed);
        }
        else {
          this.motor.forward(speed);
        }
      }
    }
}
