Blockly.Language.time = {
  init: function() {
    this.setColour(10);
    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/time.png", 16, 16)).appendTitle("Time");
    this.setOutput(true, 'Number');
    this.setTooltip('return time');
  }
};
Blockly.JavaScript.time = function() {
  if (!Blockly.JavaScript.definitions_['time']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('time', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.time.functionName = functionName;

    var func = [];
    func.push('function ' + functionName + '() {');
    func.push('  return (new Date().getTime() / 1000) - startTime;');
    func.push('}');
    Blockly.JavaScript.definitions_['time'] = func.join('\n');
  }
  var code = Blockly.JavaScript.time.functionName + '()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};