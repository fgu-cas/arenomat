Blockly.Language.robot = {
  init: function() {
    this.setColour(10);
    this.appendDummyInput("")
      .appendTitle(new Blockly.FieldImage("img/robot.png", 16, 16))
      .appendTitle("robot")

    this.setOutput(true, "Position");
    this.setTooltip('return robot activity');
  }
};
Blockly.JavaScript.robot = function() {
  if (!Blockly.JavaScript.definitions_['robot']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'robot', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.robot.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '() {');
    func.push(' return 1; ');
    func.push('}');
    Blockly.JavaScript.definitions_['robot'] = func.join('\n');
  }
  var code = Blockly.JavaScript.robot.functionName + '()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};