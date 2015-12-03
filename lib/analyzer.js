var fs = require('fs');

function Analyzer(params) {
  var analyzersPath = __dirname + '/analyzers';
  this.analyzers = {};
  this.modules = [];
  this.params = params;
  this.lastTime = false;
  fs.readdirSync(analyzersPath).forEach(function(file) {
    var className = file.split('.').shift();
    console.log('Arenomat analyzer: ' + file);
    if (className != '_') {
        this.analyzers[className] = new require('' + analyzersPath + '/' + file)(config);
    }
  }.bind(this));
}

Analyzer.prototype.setParameters = function (params) {
    this.params = params;
}

Analyzer.prototype.parameters = function () {
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


Analyzer.prototype.add = function(doc) {
  if (doc.tracked && doc.cv[0] && doc.cv[0].position) {
    for(var j in this.analyzers) {
        var a = this.analyzers[j];
	    //console.log(doc.session, j, this.lastTime);
        a.add(doc);
    }
 }
}

Analyzer.prototype.names = function() {
  var names = [];

  for(var j in this.analyzers) {
    var a = this.analyzers[j];
    names.push(a.name);
  }

  return names;
}

Analyzer.prototype.result = function() {
  var res = [];
  for(var j in this.analyzers) {
    var a = this.analyzers[j];
    res.push(a.result());
  }
  return res;
}

module.exports = Analyzer;