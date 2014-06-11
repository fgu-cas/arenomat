
Blockly.Language.turntable = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(190);

    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/turntable.png", 16, 16)).appendTitle("Turntable")
    this.appendDummyInput("").appendTitle(new Blockly.FieldDropdown([["CW", "CW"], ["CCW", "CCW"]]), "direction")
    this.appendDummyInput("").appendTitle(new Blockly.FieldDropdown([["stop", "0"], ["0.25 RPM", "30"], ["0.5 RPM", "90"], ["0.75 RPM", "150"], ["1 RPM", "210"], ["2 RPM", "255"]]), "velocity")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Arena');
  }
};

Blockly.JavaScript.turntable = function() {
  var argument0 = this.getTitleValue('direction') || '0';
  var argument1 = this.getTitleValue('velocity') || '0';

  if (!Blockly.JavaScript.definitions_['turntable']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'turntable', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.turntable.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(direction, velocity) {');
    func.push('  console.log("motor: " + velocity);');
    func.push('  arenomat.turntable.rotate(direction, +velocity);');
    func.push('}');
    Blockly.JavaScript.definitions_['turntable'] = func.join('\n');
  }
  var code = Blockly.JavaScript.turntable.functionName + '("' + argument0 + '", ' + argument1 + ');\n';
  return code;
};
