Blockly.Language.pinknoise = {
  init: function() {
    this.setColour(10);
    this.appendDummyInput("")
      .appendTitle(new Blockly.FieldImage("img/pinknoise.png", 16, 16))
      .appendTitle("Pink noise")

    this.setOutput(true, "Sample");
    this.setTooltip('return pinknoise activity');
  }
};
Blockly.JavaScript.pinknoise = function() {
  if (!Blockly.JavaScript.definitions_['pinknoise']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'pinknoise', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.pinknoise.functionName = functionName;
    var func = [];
    func.push('var b0, b1, b2, b3, b4, b5, b6; b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;');
    func.push('function ' + functionName + '() {');

    func.push('        var white = Math.random() * 2 - 1;');
    func.push('        b0 = 0.99886 * b0 + white * 0.0555179;');
    func.push('        b1 = 0.99332 * b1 + white * 0.0750759;');
    func.push('        b2 = 0.96900 * b2 + white * 0.1538520;');
    func.push('        b3 = 0.86650 * b3 + white * 0.3104856;');
    func.push('        b4 = 0.55000 * b4 + white * 0.5329522;');
    func.push('        b5 = -0.7616 * b5 - white * 0.0168980;');
    func.push('        var out = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;');
    func.push('        b6 = white * 0.115926;');
    func.push(' 	return out; ');
    func.push('}');
    Blockly.JavaScript.definitions_['pinknoise'] = func.join('\n');
  }
  var code = Blockly.JavaScript.pinknoise.functionName + '()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};