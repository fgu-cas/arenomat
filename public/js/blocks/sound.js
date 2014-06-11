Blockly.Language.sound = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(190);

    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/sound.png", 16, 16)).appendTitle("Sound")
    this.appendDummyInput("").appendTitle(new Blockly.FieldDropdown([["dog.mp3", "dog.mp3"], ["click.mp3", "click.mp3"], ["delete.mp3", "delete.mp3"]]), "filename")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('sound');
  }
};

Blockly.JavaScript.sound = function() {
  var argument0 = this.getTitleValue('filename') || '0';

  if (!Blockly.JavaScript.definitions_['sound']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('sound', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.sound.functionName = functionName;
    var func = [];
    func.push('var playing; function ' + functionName + '(filename) {');
    func.push('  arenomat.mp3.set(filename);');
    func.push('}');
    Blockly.JavaScript.definitions_['sound'] = func.join('\n');
  }
  var code = Blockly.JavaScript.sound.functionName + '("' + argument0 + '");\n';
  return code;
};