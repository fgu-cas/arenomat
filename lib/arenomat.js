/**
 * Arduino class
 */

function Arenomat() {
  var pluginsPath = __dirname + '/plugins';
  fs.readdirSync(pluginsPath).forEach(function(file) {
    var className = file.split('.').shift();
    console.log('Arenomat plugin: ' + file);
    this[className] = require('' + pluginsPath + '/' + file);
  }.bind(this));
}

Arenomat.prototype.stop = function () {
    this.shock.off();
    this.feed.disable();
    this.turntable.stop();
    this.turntable.angle = 0;
}

exports = module.exports = new Arenomat();
exports.Arenomat = Arenomat;