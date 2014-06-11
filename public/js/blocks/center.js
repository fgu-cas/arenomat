Blockly.Language.center = {
  init: function() {
    this.setColour(10);
    this.appendDummyInput("")
      .appendTitle(new Blockly.FieldImage("img/center.png", 16, 16))
      .appendTitle("center")

    this.setOutput(true, "Position");
    this.setTooltip('return center activity');
  }
};
Blockly.JavaScript.center = function() {
  if (!Blockly.JavaScript.definitions_['center']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'center', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.center.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '() {');
    func.push(' return -1; ');
    func.push('}');
    Blockly.JavaScript.definitions_['center'] = func.join('\n');
  }
  var code = Blockly.JavaScript.center.functionName + '()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};