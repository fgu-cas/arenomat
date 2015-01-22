var fs = require('fs');

function analyze(data) {
  var analyzersPath = __dirname + '/analyzers';
  var analysis = {};
  fs.readdirSync(analyzersPath).forEach(function(file) {
    var className = file.split('.').shift();
    console.log('Arenomat analyzer: ' + file);
    var analyzer = require('' + analyzersPath + '/' + file);
console.log(analysis[className] = analyzer(data));
  }.bind(this));

  return analysis;
}

exports = module.exports = analyze;
