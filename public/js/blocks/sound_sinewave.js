Blockly.Language.sinewave = {
  init: function() {
    this.setColour(10);
    this.appendDummyInput("")
      .appendTitle(new Blockly.FieldImage("img/sinewave.png", 16, 16))
      .appendTitle("Sine wave")

    this.appendDummyInput("").appendTitle('freq ').appendTitle(new Blockly.FieldTextInput("100"), "freq").appendTitle('Hz');

    this.setOutput(true, "Sample");
    this.setTooltip('return sinewave activity');
  }
};
Blockly.JavaScript.sinewave = function() {
  if (!Blockly.JavaScript.definitions_['sinewave']) {
    var freq = +this.getTitleValue('freq') || 440;

    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'sinewave', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.sinewave.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(t, i) {');
    func.push('var tt = (Math.PI * 2 * ' + freq + ') / 44100;');
    func.push(' return Math.sin(i * tt); ');
    func.push('}');
    Blockly.JavaScript.definitions_['sinewave'] = func.join('\n');
  }
  var code = Blockly.JavaScript.sinewave.functionName + '(t, i)';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};