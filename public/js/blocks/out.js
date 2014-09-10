Blockly.Language.out = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(190);
    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/out.png", 16, 16)).appendTitle("out")

    this.appendDummyInput("").appendTitle(new Blockly.FieldTextInput("variable"), "key");
    this.appendValueInput("value", "Text")
this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('out');
  }
};
Blockly.JavaScript.out = function() {
  var argument0 = this.getTitleValue('key') || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_COMMA) || 'false';

  if (!Blockly.JavaScript.definitions_['out']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('out', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.out.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(key, value) {');
    func.push('  actualFrame.output[key] = value;');
    func.push('}');
    Blockly.JavaScript.definitions_['out'] = func.join('\n');
  }
  var code = Blockly.JavaScript.out.functionName + '("' + argument0 + '", ' + argument1 + ');\n';
  return code;

};

