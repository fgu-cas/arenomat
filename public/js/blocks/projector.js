Blockly.Language.projector = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(190);
    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/projector.png", 16, 16)).appendTitle("projector")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendValueInput("visible").setCheck('Boolean').appendTitle('visible');
    this.appendValueInput("zone").setCheck('Number').appendTitle('zone');
    this.setTooltip('projector');
  }
};
Blockly.JavaScript.projector = function() {
  var argument0 = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_COMMA) || 'false';

  if (!Blockly.JavaScript.definitions_['projector']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'projector', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.projector.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(projector) {');
    func.push('  console.log(projector)');
    func.push('}');
    Blockly.JavaScript.definitions_['projector'] = func.join('\n');
  }
  var code = Blockly.JavaScript.projector.functionName +
    '(' + argument0 + ');\n';
  return code;

};