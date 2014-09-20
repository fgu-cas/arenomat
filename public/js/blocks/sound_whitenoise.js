Blockly.Language.whitenoise = {
  init: function() {
    this.setColour(10);
    this.appendDummyInput("")
      .appendTitle(new Blockly.FieldImage("img/whitenoise.png", 16, 16))
      .appendTitle("whitenoise")

    this.setOutput(true, "Sample");
    this.setTooltip('return whitenoise activity');
  }
};
Blockly.JavaScript.whitenoise = function() {
  if (!Blockly.JavaScript.definitions_['whitenoise']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'whitenoise', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.whitenoise.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '() {');
    func.push(' return Math.random(); ');
    func.push('}');
    Blockly.JavaScript.definitions_['whitenoise'] = func.join('\n');
  }
  var code = Blockly.JavaScript.whitenoise.functionName + '()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};