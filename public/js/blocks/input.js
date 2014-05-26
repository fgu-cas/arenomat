
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


Blockly.Language.position = {
  init: function() {
    this.setColour(10);
    this.appendValueInput("object")
      .appendTitle(new Blockly.FieldImage("img/position.png", 16, 16))

this.setInputsInline(true);
    this.appendDummyInput("").appendTitle(new Blockly.FieldDropdown([["x", "x"], ["y", "y"], ["area", "area"]]), "axis");
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




Blockly.Language.time = {
  init: function() {
    this.setColour(10);
    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/time.png", 16, 16)).appendTitle("Time");
    this.setOutput(true, 'Number');
    this.setTooltip('return time');
  }
};
Blockly.JavaScript.time = function() {
  if (!Blockly.JavaScript.definitions_['time']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('time', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.time.functionName = functionName;

    var func = [];
    func.push('function ' + functionName + '() {');
    func.push('  return (new Date().getTime() / 1000) - startTime;');
    func.push('}');
    Blockly.JavaScript.definitions_['time'] = func.join('\n');
  }
  var code = Blockly.JavaScript.time.functionName + '()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Language.motor_position = {
  helpUrl: 'http://www.seeedstudio.com/wiki/Project_Seven_-_Temperature',
  init: function() {
    this.setColour(10);
    this.appendDummyInput("").appendTitle("Motor position").appendTitle(new Blockly.FieldImage("img/motor_position.png", 32, 32))
    this.setOutput(true, 'Number');
    this.setTooltip('return number of ambient humidity');
  }
};

Blockly.JavaScript.motor_position = function() {
  var argument0 = this.getTitleValue('PIN') || '0';

  if (!Blockly.JavaScript.definitions_['motor_position']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'motor_position', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.motor_position.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(PIN) {');
//    func.push('  console.log(arenomat.turntable.position());');
    func.push('  return arenomat.turntable.position();');
    func.push('}');
    Blockly.JavaScript.definitions_['motor_position'] = func.join('\n');
  }
  var code = Blockly.JavaScript.motor_position.functionName +
    '(' + argument0 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
