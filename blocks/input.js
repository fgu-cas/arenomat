
Blockly.Language.area = {
	init: function() {
		this.setColour(10);
		this.appendDummyInput("")
				.appendTitle("Area")
		this.appendDummyInput("")
				.appendTitle(new Blockly.FieldImage("http://localhost/blockly/apps/graph/ds1820.png", 64, 64))
				.appendTitle("PIN#")
				.appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"]]), "PIN")
		this.setOutput(true, Number);
		this.setTooltip('return number of ambient temperature in');
	}
};
Blockly.JavaScript.area = function() {
	var argument0 = this.getTitleValue('PIN') || '0';

	if (!Blockly.JavaScript.definitions_['area']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'area', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.area.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(PIN) {');
		func.push(' return sense.area(PIN); ');
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
		this.setOutput(true, Number);
		this.setTooltip('return time');
	}
};
Blockly.JavaScript.time = function() {
	var argument0 = this.getTitleValue('PIN') || '0';

	if (!Blockly.JavaScript.definitions_['time']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'time', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.time.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(PIN) {');
		func.push('  // return GPIO - a');
		func.push('}');
		Blockly.JavaScript.definitions_['time'] = func.join('\n');
	}
	var code = Blockly.JavaScript.time.functionName +
			'(' + argument0 + ')';
	return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Language.motor_position = {
	helpUrl: 'http://www.seeedstudio.com/wiki/Project_Seven_-_Temperature',
	init: function() {
		this.setColour(10);
		this.appendDummyInput("")
				.appendTitle("Light Sensor")
		this.appendDummyInput("")
				.appendTitle(new Blockly.FieldImage("http://localhost/blockly/apps/graph/photoresistor.png", 64, 64))
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


Blockly.Language.range = {
	init: function() {
		this.setColour(10);
		this.appendDummyInput("")
				.appendTitle("Range Sensor")
		this.appendDummyInput("")
				.appendTitle(new Blockly.FieldImage("http://localhost/blockly/apps/graph/range.png", 64, 64))
		this.setOutput(true, Number);
		this.setTooltip('return number of ambient humidity');
	}
};

Blockly.JavaScript.range = function() {
	var argument0 = this.getTitleValue('PIN') || '0';

	if (!Blockly.JavaScript.definitions_['range']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'range', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.range.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(PIN) {');
		func.push('  // return GPIO - a');
		func.push('}');
		Blockly.JavaScript.definitions_['range'] = func.join('\n');
	}
	var code = Blockly.JavaScript.range.functionName +
			'(' + argument0 + ')';
	return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};