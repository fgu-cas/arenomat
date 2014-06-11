Blockly.Language.distance = {
  init: function() {
    this.setColour(10);

    this.appendDummyInput("")
      .appendTitle(new Blockly.FieldImage("img/distance.png", 16, 16))

    this.appendValueInput("object1")//.setCheck('Number')
      .appendTitle("distance of")
    this.appendValueInput("object2")//.setCheck('Number')
      .appendTitle("from")
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('return distance activity');
  }
};

Blockly.JavaScript.distance = function() {
  var argument0 = Blockly.JavaScript.valueToCode(this, 'object1', Blockly.JavaScript.ORDER_COMMA) || 0;
  var argument1 = Blockly.JavaScript.valueToCode(this, 'object2', Blockly.JavaScript.ORDER_COMMA) || 0;

  if (!Blockly.JavaScript.definitions_['distance']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'distance', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.distance.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(object1, object2) {');
    func.push(' if (actualFrame.cv[object1] && actualFrame.cv[object2]) { ');
    func.push('    return Math.sqrt(Math.pow(actualFrame.cv[object1].position.x - actualFrame.cv[object2].position.x, 2) + Math.pow(actualFrame.cv[object1].position.y - actualFrame.cv[object2].position.y, 2));');
    func.push(' }');
    func.push(' return false;');
    func.push('}');
    Blockly.JavaScript.definitions_['distance'] = func.join('\n');
  }
  var code = Blockly.JavaScript.distance.functionName +
    '(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};