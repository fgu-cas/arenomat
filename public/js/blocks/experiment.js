
Blockly.Language.experiment = {
  init: function() {
    this.setColour(50);
    this.appendDummyInput("")
      .appendTitle(new Blockly.FieldImage("img/experiment.png", 16, 16))
      .appendTitle("experiment")

    this.appendValueInput("name").appendTitle('name');
    this.appendValueInput("person").appendTitle('person');
    this.appendValueInput("goal").appendTitle('goal');
    this.appendValueInput("subject").appendTitle('subject');
    this.appendValueInput("length").setCheck('Number').appendTitle('length');
    this.appendValueInput("day").setCheck('Number').appendTitle('day');
    this.appendValueInput("comment").appendTitle('comment');
    this.appendStatementInput("setup").appendTitle('setup');
    this.appendStatementInput("loop").appendTitle('loop');
//this.appendDummyInput("").appendTitle(new Blockly.FieldTextInput("100"), "delay").appendTitle('ms');
    this.setInputsInline(false);

    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = 'date: ' + d.getFullYear() + '/' +
      (month < 10 ? '0' : '') + month + '/' +
      (day < 10 ? '0' : '') + day;

    this.appendDummyInput("")
      .appendTitle(output)
//				.appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"]]), "PIN");
    //this.setOutput(true, "Boolean");
    this.setTooltip('return experiment activity');
  }
};
Blockly.JavaScript.experiment = function() {
  var loopblock = Blockly.JavaScript.statementToCode(this, 'loop');
  var setupblock = Blockly.JavaScript.statementToCode(this, 'setup');

  if (!Blockly.JavaScript.definitions_['experiment']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('experiment', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.experiment.functionName = functionName;
    var func = [];
    func.push('function setup() { ' + setupblock + '}');
    func.push('function loop() { ' + loopblock + '}');
    Blockly.JavaScript.definitions_['experiment'] = func.join('\n');
  }
  var code = '';//Blockly.JavaScript.experiment.functionName + '()';
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
  if (!Blockly.JavaScript.definitions_['subject']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'subject', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.subject.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(subject) {');
    func.push(' return 0; ');
    func.push('}');
    Blockly.JavaScript.definitions_['subject'] = func.join('\n');
  }
  var code = Blockly.JavaScript.subject.functionName + '()';
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
  if (!Blockly.JavaScript.definitions_['robot']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'robot', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.robot.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(robot) {');
    func.push(' return 1; ');
    func.push('}');
    Blockly.JavaScript.definitions_['robot'] = func.join('\n');
  }
  var code = Blockly.JavaScript.robot.functionName + '()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Language.center = {
  init: function() {
    this.setColour(10);
    this.appendDummyInput("")
      .appendTitle(new Blockly.FieldImage("img/center.png", 16, 16))
      .appendTitle("center")

    this.setOutput(true, "Position");
    this.setTooltip('return center activity');
  }
};
Blockly.JavaScript.center = function() {
  if (!Blockly.JavaScript.definitions_['center']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'center', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.center.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(center) {');
    func.push(' return -1; ');
    func.push('}');
    Blockly.JavaScript.definitions_['center'] = func.join('\n');
  }
  var code = Blockly.JavaScript.center.functionName + '()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
