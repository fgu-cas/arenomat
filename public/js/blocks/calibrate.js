Blockly.Language.calibrate = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/calibrate.png", 16, 16)).appendTitle("calibrate")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('calibrate');
  }
};

Blockly.JavaScript.calibrate = function() {
  if (!Blockly.JavaScript.definitions_['calibrate']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('calibrate', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.calibrate.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '() {');
    func.push('    arenomat.feed.calibrate();');
    func.push('}');
    Blockly.JavaScript.definitions_['calibrate'] = func.join('\n');
  }
  var code = Blockly.JavaScript.calibrate.functionName + '();\n';
  return code;

};