
Blockly.Language.zone = {
  init: function() {
    this.setColour(10);
    this.appendValueInput("object")
      .appendTitle(new Blockly.FieldImage("img/zone.png", 16, 16))

    this.appendValueInput("zone").setCheck('Number')
      .appendTitle("is in zone")
    this.setInputsInline(true);
    //.appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"]]), "PIN");
    this.setOutput(true, "Boolean");
    this.setTooltip('return zone activity');
  }
};

Blockly.JavaScript.zone = function() {
  var argument0 = Blockly.JavaScript.valueToCode(this, 'object', Blockly.JavaScript.ORDER_COMMA) || 0;
  var argument1 = Blockly.JavaScript.valueToCode(this, 'zone', Blockly.JavaScript.ORDER_COMMA) || 0;

  if (!Blockly.JavaScript.definitions_['zone']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'zone', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.zone.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(object, zone) {');
    func.push(' if (actualFrame.cv[object] && actualFrame.cv[object].zones) { ');
    func.push('    return actualFrame.cv[object].zones[zone] || false; ');
    func.push(' }');
    func.push(' return false;');
    func.push('}');
    Blockly.JavaScript.definitions_['zone'] = func.join('\n');
  }
  var code = Blockly.JavaScript.zone.functionName +
    '(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};