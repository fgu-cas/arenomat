Blockly.Language.repeat = {
  init: function() {
    this.setColour(50);
    this.appendDummyInput("")
      .appendTitle(new Blockly.FieldImage("img/repeat.png", 16, 16))
      .appendTitle("repeat");
    this.appendDummyInput("").appendTitle('every ').appendTitle(new Blockly.FieldTextInput("100"), "delay").appendTitle('s');

    this.appendStatementInput("code").appendTitle('code');
    this.setInputsInline(false);

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);

    this.setTooltip('repeat every X secs');
  }
};



Blockly.JavaScript.repeat = function() {
  var argument0 = this.getTitleValue('delay') || '0';
  var codeblock = Blockly.JavaScript.statementToCode(this, 'code');

  if (!Blockly.JavaScript.definitions_['repeat']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('repeat', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.repeat.functionName = functionName;
    var func = [];
    func.push('var var_' + functionName + ';');
    func.push('function ' + functionName + '(delay) {');

    func.push('  if ((var_' + functionName + ' == null) || ((new Date().getTime() / 1000) - var_' + functionName + ' > delay)) {');
    func.push('      var_' + functionName + ' = (new Date().getTime() / 1000);');

    func.push(codeblock);

    func.push('} }');
    Blockly.JavaScript.definitions_['repeat'] = func.join('\n');
  }
  var code = Blockly.JavaScript.repeat.functionName + '(' + argument0 + ');\n';
  return code;
}