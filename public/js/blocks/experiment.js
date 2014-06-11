
Blockly.Language.experiment = {
  init: function() {
this.setMovable(false);
    this.setColour(50);
    this.appendDummyInput("")
      .appendTitle(new Blockly.FieldImage("img/experiment.png", 16, 16))
      .appendTitle("session")

    this.appendValueInput("name").appendTitle('name');
    this.appendValueInput("person").appendTitle('person');
    this.appendValueInput("goal").appendTitle('goal');
    this.appendValueInput("subject").appendTitle('subject');
    this.appendDummyInput("").appendTitle('zone type').appendTitle(new Blockly.FieldDropdown([["circle", "circle"], ["square", "square"]]), "zonetype");
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