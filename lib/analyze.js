var fs = require('fs');

exports = module.exports = {
 analyze: function (data) {
  var analyzersPath = __dirname + '/analyzers';
  var analysis = {};
  fs.readdirSync(analyzersPath).forEach(function(file) {
    var className = file.split('.').shift();
    console.log('Arenomat analyzer: ' + file);
    if (className != '_') {
        var analyzerfile = require('' + analyzersPath + '/' + file);
	console.log(analysis[className] = analyzerfile.analyze(data));
    }
  }.bind(this));

  return analysis;
 },

parameters: function() {
  var analyzersPath = __dirname + '/analyzers';
  var analysis = [], allparams = [], data = [];
  fs.readdirSync(analyzersPath).forEach(function(file) {
    var className = file.split('.').shift();
    var analyzerfile = require('' + analyzersPath + '/' + file);
    if (className != '_') {
	analysis.push({ class: className, name: analyzerfile.name });
    }
    for(var i=0; i<=analyzerfile.parameters.length; i++ ){
	if (analyzerfile.parameters[i] && analyzerfile.parameters[i].name) {
	    data[analyzerfile.parameters[i].name] = analyzerfile.parameters[i];
	}
    }
  }.bind(this));

console.log('data', data);
    for(var i in data){
console.log(data[i]);
	allparams.push(data[i]);
    }

  return { modules: analysis, parameters: allparams }
}
}
