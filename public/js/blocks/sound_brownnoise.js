Blockly.Language.brownnoise = {
  init: function() {
    this.setColour(10);
    this.appendDummyInput("")
      .appendTitle(new Blockly.FieldImage("img/brownnoise.png", 16, 16))
      .appendTitle("Brown noise")

    this.setOutput(true, "Sample");
    this.setTooltip('return brownnoise activity');
  }
};
Blockly.JavaScript.brownnoise = function() {
  if (!Blockly.JavaScript.definitions_['brownnoise']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'brownnoise', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.brownnoise.functionName = functionName;
    var func = [];
    func.push('var lastOut = 0.0;');
    func.push('function ' + functionName + '() {');

    func.push('var white = Math.random() * 2 - 1;');
    func.push('            var out = (lastOut + (0.02 * white)) / 1.02;');
    func.push('            lastOut = out;');
    func.push('            out *= 3.5; // (roughly) compensate for gain');
    func.push(' 	return out; ');
    func.push('}');
    Blockly.JavaScript.definitions_['brownnoise'] = func.join('\n');
  }
  var code = Blockly.JavaScript.brownnoise.functionName + '()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};