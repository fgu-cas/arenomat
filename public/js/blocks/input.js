
Blockly.Language.zone = {
  init: function() {
    this.setColour(10);
    this.appendValueInput("object")
      .appendTitle(new Blockly.FieldImage("img/zone.png", 16, 16))

    this.appendValueInput("zone").setCheck('Number')
      .appendTitle("is in zone")
    //.appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"]]), "PIN");
    this.setOutput(true, "Boolean");
    this.setTooltip('return zone activity');
  }
};
Blockly.JavaScript.zone = function() {
  var argument0 = this.getTitleValue('PIN') || '0';

  if (!Blockly.JavaScript.definitions_['zone']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'zone', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.zone.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(zone) {');
    func.push(' return true; // activeZone[zone - 1]; ');
    func.push('}');
    Blockly.JavaScript.definitions_['zone'] = func.join('\n');
  }
  var code = Blockly.JavaScript.zone.functionName +
    '(' + argument0 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Language.subject = {
  init: function() {
    this.setColour(10);
    this.appendDummyInput("")
      .appendTitle(new Blockly.FieldImage("img/subject.png", 16, 16))
      .appendTitle("subject")

    this.setOutput(true, "Position");
    this.setTooltip('return subject activity');
  }
};
Blockly.JavaScript.subject = function() {
  var argument0 = this.getTitleValue('PIN') || '0';

  if (!Blockly.JavaScript.definitions_['subject']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'subject', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.subject.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(subject) {');
    func.push(' return activesubject[subject - 1]; ');
    func.push('}');
    Blockly.JavaScript.definitions_['subject'] = func.join('\n');
  }
  var code = Blockly.JavaScript.subject.functionName +
    '(' + argument0 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Language.robot = {
  init: function() {
    this.setColour(10);
    this.appendDummyInput("")
      .appendTitle(new Blockly.FieldImage("img/robot.png", 16, 16))
      .appendTitle("robot")

    this.setOutput(true, "Position");
    this.setTooltip('return robot activity');
  }
};
Blockly.JavaScript.robot = function() {
  var argument0 = this.getTitleValue('PIN') || '0';

  if (!Blockly.JavaScript.definitions_['robot']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'robot', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.robot.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(robot) {');
    func.push(' return activerobot[robot - 1]; ');
    func.push('}');
    Blockly.JavaScript.definitions_['robot'] = func.join('\n');
  }
  var code = Blockly.JavaScript.robot.functionName +
    '(' + argument0 + ')';
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
    func.push('  // return motorposition');
    func.push('}');
    Blockly.JavaScript.definitions_['motor_position'] = func.join('\n');
  }
  var code = Blockly.JavaScript.motor_position.functionName +
    '(' + argument0 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
