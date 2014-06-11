Blockly.Language.subject = {
  init: function() {
    this.setColour(10);
    this.appendDummyInput("")
      .appendTitle(new Blockly.FieldImage("img/subject.png", 16, 16))
      .appendTitle("subject")

    this.setOutput(true, "Position");
    this.setTooltip('return subject activity');
  }
};
Blockly.JavaScript.subject = function() {
  if (!Blockly.JavaScript.definitions_['subject']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'subject', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.subject.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '() {');
    func.push(' return 0; ');
    func.push('}');
    Blockly.JavaScript.definitions_['subject'] = func.join('\n');
  }
  var code = Blockly.JavaScript.subject.functionName + '()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
