Blockly.Language.rotatezone = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(190);
    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/rotatezone.png", 16, 16)).appendTitle("rotate")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);

    this.setInputsInline(true);

    this.appendValueInput("zone").setCheck('Number').appendTitle('zone');
    this.appendValueInput("angle").setCheck('Number').appendTitle('deg');
    this.setTooltip('rotatezone');
  }
};
Blockly.JavaScript.rotatezone = function() {
  var argument0 = Blockly.JavaScript.valueToCode(this, 'zone', Blockly.JavaScript.ORDER_COMMA) || 'false';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'angle', Blockly.JavaScript.ORDER_COMMA) || 'false';

  if (!Blockly.JavaScript.definitions_['rotatezone']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'rotatezone', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.rotatezone.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(zone, angle) {');
    func.push(' if (actualFrame.zones && actualFrame.zones[zone]) arena.rotateZone(zone, angle);');
    func.push('}');
    Blockly.JavaScript.definitions_['rotatezone'] = func.join('\n');
  }
  var code = Blockly.JavaScript.rotatezone.functionName +
    '(' + argument0 + ', ' + argument1 + ');\n';
  return code;

};