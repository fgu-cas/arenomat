Blockly.Language.sound = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(190);

    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/sound.png", 16, 16)).appendTitle("Sound generator")
    this.appendDummyInput("").appendTitle(new Blockly.FieldTextInput("100"), "length").appendTitle('s').appendTitle('by function');
    this.appendValueInput("value");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('sound');
  }
};

Blockly.JavaScript.sound = function() {
  var length = +this.getTitleValue('length') || 0;
//  var codeblock = Blockly.JavaScript.statementToCode(this, 'code');
  var value = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_COMMA) || '0';

  if (!Blockly.JavaScript.definitions_['sound']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('sound', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.sound.functionName = functionName;
    var func = [];
    func.push('var playing; function ' + functionName + '(length, callback) {');
    func.push('  arenomat.sound.play(length, callback);');
    func.push('}');
    Blockly.JavaScript.definitions_['sound'] = func.join('\n');
  }
  var code = Blockly.JavaScript.sound.functionName + '(' + length + ', function (t, i) { return ' + value  + '});\n';
  return code;
};