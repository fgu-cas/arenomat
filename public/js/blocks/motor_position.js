Blockly.Language.motor_position = {
  init: function() {
    this.setColour(10);
    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/motor_position.png", 16, 16)).appendTitle("Arena angle")
    this.setOutput(true, 'Number');
    this.setTooltip('return number of ambient humidity');
  }
};

Blockly.JavaScript.motor_position = function() {
  var argument0 = this.getTitleValue('PIN') || '0';

  if (!Blockly.JavaScript.definitions_['motor_position']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
            'motor_position', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.motor_position.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(PIN) {');
    func.push('  return arenomat.turntable.position();');
    func.push('}');
    Blockly.JavaScript.definitions_['motor_position'] = func.join('\n');
  }
  var code = Blockly.JavaScript.motor_position.functionName +
          '(' + argument0 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
