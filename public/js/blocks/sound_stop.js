Blockly.Language.sound_stop = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(190);

    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/sound.png", 16, 16)).appendTitle("Sound stop")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('sound');
  }
};

Blockly.JavaScript.sound_stop = function() {
  if (!Blockly.JavaScript.definitions_['sound_stop']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('sound_stop', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.sound_stop.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '() {');
    func.push('  arenomat.sound.stop();');
    func.push('}');
    Blockly.JavaScript.definitions_['sound_stop'] = func.join('\n');
  }
  var code = Blockly.JavaScript.sound_stop.functionName + '();\n';
  return code;
};