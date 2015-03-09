var fs = require('fs');

exports = module.exports = {
 analyze: function (data) {
  var analyzersPath = __dirname + '/analyzers';
  var analysis = {};
  fs.readdirSync(analyzersPath).forEach(function(file) {
    var className = file.split('.').shift();
    console.log('Arenomat analyzer: ' + file);
    var analyzerfile = require('' + analyzersPath + '/' + file);
console.log(analysis[className] = analyzerfile.analyze(data));
  }.bind(this));

  return analysis;
 },

parameters: function() {
  var analyzersPath = __dirname + '/analyzers';
  var analysis = {};
  fs.readdirSync(analyzersPath).forEach(function(file) {
    console.log(parameters.push(require('' + analyzersPath + '/' + file).parameters()));
  }.bind(this));

  return analysis;
}
}
