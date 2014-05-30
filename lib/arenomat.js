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

exports = module.exports = new Arenomat();
exports.Arenomat = Arenomat;