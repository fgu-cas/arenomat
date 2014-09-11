Blockly.Language.position = {
  init: function() {
    this.setColour(10);
    this.appendDummyInput("")
            .appendTitle(new Blockly.FieldImage("img/position.png", 16, 16))
            .appendTitle("get")
    this.appendDummyInput("").appendTitle(new Blockly.FieldDropdown([["x", "x"], ["y", "y"], ["area", "area"]]), "axis");
    this.appendDummyInput("").appendTitle("of")
    this.appendValueInput("object")


    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('return position attribute');
  }
};

Blockly.JavaScript.position = function() {
  var argument0 = Blockly.JavaScript.valueToCode(this, 'object', Blockly.JavaScript.ORDER_COMMA) || 0;
  var argument1 = this.getTitleValue('axis') || 'x';

  if (!Blockly.JavaScript.definitions_['position']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
            'position', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.position.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(object, attr) {');
    func.push(' if (actualFrame.cv[object] && actualFrame.cv[object].position) { ');
    func.push('    return actualFrame.cv[object].position[attr] || false; ');
    func.push(' }');
    func.push(' return false;');
    func.push('}');
    Blockly.JavaScript.definitions_['position'] = func.join('\n');
  }
  var code = Blockly.JavaScript.position.functionName +
          '(' + argument0 + ', "' + argument1 + '")';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

