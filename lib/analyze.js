var fs = require('fs');

function Analyze() {
  var analyzersPath = __dirname + '/analyzers';
  this.analyzers = {};
  this.modules = [];
  this.params = {}
  fs.readdirSync(analyzersPath).forEach(function(file) {
    var className = file.split('.').shift();
    console.log('Arenomat analyzer: ' + file);
    if (className != '_') {
        this.analyzers[className] = require('' + analyzersPath + '/' + file);
    }
  }.bind(this));
}

Analyze.prototype.setParameters = function (params) {
    this.params = params;
}

Analyze.prototype.parameters = function () {
  var analysis = [], allparams = [], data = [], modules = [];

  for(var j in this.analyzers) {
    var a = this.analyzers[j];
    console.log('parameters', j);
    if (j != '_') {
	modules.push({ class: j, name: a.name });
    }
    for(var i = 0; i <= a.parameters.length; i++ ){
	if (a.parameters[i] && a.parameters[i].name) {
	    data[a.parameters[i].name] = a.parameters[i];
	}
    }
  }
    for(var i in data){
	allparams.push(data[i]);
    }
  return { modules: modules, parameters: allparams }
}


Analyze.prototype.add = function(doc) {
  if (doc.tracked) {
    for(var j in this.analyzers) {
        var a = this.analyzers[j];
        a.add(doc, this.params);
    }
  }
}

Analyze.prototype.names = function() {
  var names = [];

  for(var j in this.analyzers) {
    var a = this.analyzers[j];
    names.push(a.name);
  }

  return names;
}

Analyze.prototype.result = function() {
  var res = [];
  for(var j in this.analyzers) {
    var a = this.analyzers[j];
    res.push(a.result(this.params));
  }
  return res;
}

exports = module.exports = new Analyze();
exports.Analyze = Analyze;