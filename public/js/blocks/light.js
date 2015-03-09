Blockly.Language.light = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(190);

    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/light.png", 16, 16)).appendTitle("Light");
    this.appendDummyInput("").appendTitle(new Blockly.FieldTextInput("100"), "delay").appendTitle('s');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Svetlo');
  }
};

Blockly.JavaScript.light = function() {
  var argument0 = this.getTitleValue('delay') || '0';

  if (!Blockly.JavaScript.definitions_['light']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('light', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.light.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(delay) {');
    func.push('  arenomat.light.pulse(delay * 1000);');
    func.push('}');
    Blockly.JavaScript.definitions_['light'] = func.join('\n');
  }
  var code = Blockly.JavaScript.light.functionName + '(' + argument0 + ');\n';
  return code;
};