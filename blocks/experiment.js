
Blockly.Language.experiment = {
	init: function() {
		this.setColour(50);
		this.appendDummyInput("")
				.appendTitle(new Blockly.FieldImage("img/experiment.png", 16, 16))
				.appendTitle("experiment")

this.appendValueInput("name").appendTitle('name');
this.appendValueInput("subject").appendTitle('subject');
this.appendValueInput("length").setCheck('Number').appendTitle('length');
this.appendValueInput("day").setCheck('Number').appendTitle('day');
this.appendValueInput("comment").appendTitle('comment');
this.appendStatementInput("code").appendTitle('code');
//this.appendDummyInput("").appendTitle(new Blockly.FieldTextInput("100"), "delay").appendTitle('ms');
this.setInputsInline(false);

var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var output = 'date: ' + d.getFullYear() + '/' +
    (month<10 ? '0' : '') + month + '/' +
    (day<10 ? '0' : '') + day;

		this.appendDummyInput("")
				.appendTitle(output)
//				.appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"]]), "PIN");
		//this.setOutput(true, "Boolean");
		this.setTooltip('return experiment activity');
	}
};
Blockly.JavaScript.experiment = function(block) {
	var argument0 = this.getTitleValue('PIN') || '0';
	var codeblock = ''; //Blockly.JavaScript.statementToCode(block, 'code');


	if (!Blockly.JavaScript.definitions_['experiment']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName('experiment', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.experiment.functionName = functionName;
		var func = [];
		func.push
		func.push('function ' + functionName + '(experiment) {');
		func.push(' return true; ');
		func.push('}');
		Blockly.JavaScript.definitions_['experiment'] = func.join('\n');
	}
	var code = codeblock + '\n' + Blockly.JavaScript.experiment.functionName +
			'(' + argument0 + ')';
	return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
