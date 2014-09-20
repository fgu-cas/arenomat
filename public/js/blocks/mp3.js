Blockly.Language.mp3 = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(190);

    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/mp3.png", 16, 16)).appendTitle("Play")
    this.appendDummyInput("").appendTitle(new Blockly.FieldDropdown([["dog.mp3", "dog.mp3"], ["click.mp3", "click.mp3"], ["delete.mp3", "delete.mp3"], ["whitenoise.mp3", "whitenoise.mp3"]]), "filename")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('mp3');
  }
};

Blockly.JavaScript.mp3 = function() {
  var argument0 = this.getTitleValue('filename') || '0';

  if (!Blockly.JavaScript.definitions_['mp3']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('mp3', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.mp3.functionName = functionName;
    var func = [];
    func.push('var playing; function ' + functionName + '(filename) {');
    func.push('  arenomat.mp3.play(filename);');
    func.push('}');
    Blockly.JavaScript.definitions_['mp3'] = func.join('\n');
  }
  var code = Blockly.JavaScript.mp3.functionName + '("' + argument0 + '");\n';
  return code;
};