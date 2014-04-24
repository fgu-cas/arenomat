
Blockly.Language.area = {
	init: function() {
		this.setColour(10);
		this.appendDummyInput("")
				.appendTitle("Area")
		this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/area.png", 32, 32))

		this.appendDummyInput("")
				.appendTitle("#")
				.appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"]]), "PIN");
		this.setOutput(true, "Boolean");
		this.setTooltip('return area activity');
	}
};
Blockly.JavaScript.area = function() {
	var argument0 = this.getTitleValue('PIN') || '0';

	if (!Blockly.JavaScript.definitions_['area']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'area', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.area.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(area) {');
		func.push(' return point.x; ');
		func.push('}');
		Blockly.JavaScript.definitions_['area'] = func.join('\n');
	}
	var code = Blockly.JavaScript.area.functionName +
			'(' + argument0 + ')';
	return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};



Blockly.Language.time = {
	init: function() {
		this.setColour(10);
		this.appendDummyInput("")
				.appendTitle("Time")
		this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/time.png", 32, 32))
		this.setOutput(true, Number);
		this.setTooltip('return time');
	}
};
Blockly.JavaScript.time = function() {
	if (!Blockly.JavaScript.definitions_['time']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'time', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.time.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '() {');
		func.push('  return (new Date().getTime() / 1000) - startTime;');
		func.push('}');
		Blockly.JavaScript.definitions_['time'] = func.join('\n');
	}
	var code = Blockly.JavaScript.time.functionName +
			'()';
	return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Language.motor_position = {
	helpUrl: 'http://www.seeedstudio.com/wiki/Project_Seven_-_Temperature',
	init: function() {
		this.setColour(10);
		this.appendDummyInput("")
				.appendTitle("Motor position")
		this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/motor_position.png", 32, 32))
		this.setOutput(true, Number);
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
