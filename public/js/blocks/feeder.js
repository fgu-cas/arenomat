Blockly.Language.feeder = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/feeder.png", 16, 16)).appendTitle("Feeder")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Feeder');
  }
};

Blockly.JavaScript.feeder = function() {
  if (!Blockly.JavaScript.definitions_['feeder']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('feeder', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.feeder.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '() {');
    func.push('    arenomat.feed.it();');
    func.push('}');
    Blockly.JavaScript.definitions_['feeder'] = func.join('\n');
  }
  var code = Blockly.JavaScript.feeder.functionName + '();\n';
  return code;

};