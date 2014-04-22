
Blockly.Language.temperature = {	
	init: function() {
		this.setColour(10);
		this.appendDummyInput("")
				.appendTitle("Temperature Sensor")
		this.appendDummyInput("")
				.appendTitle(new Blockly.FieldImage("http://localhost/blockly/apps/graph/ds1820.png", 64, 64))
				.appendTitle("PIN#")
				.appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"]]), "PIN")
		this.setOutput(true, Number);
		this.setTooltip('return number of ambient temperature in ℃');
	}
};
Blockly.JavaScript.temperature = function() {
	var argument0 = this.getTitleValue('PIN') || '0';

	if (!Blockly.JavaScript.definitions_['temperature']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'temperature', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.temperature.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(PIN) {');
		func.push(' return sense.temperature(PIN); ');
		func.push('}');
		Blockly.JavaScript.definitions_['temperature'] = func.join('\n');
	}
	var code = Blockly.JavaScript.temperature.functionName +
			'(' + argument0 + ')';
	return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};



Blockly.Language.humidity = {
	init: function() {
		this.setColour(10);
		this.appendDummyInput("")
				.appendTitle("Humidity Sensor")
		this.appendDummyInput("")
				.appendTitle(new Blockly.FieldImage("http://localhost/blockly/apps/graph/dht.png", 64, 64))
				.appendTitle("PIN#")
				.appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"]]), "PIN")
		this.setOutput(true, Number);
		this.setTooltip('return number of ambient humidity');
	}
};
Blockly.JavaScript.humidity = function() {
	var argument0 = this.getTitleValue('PIN') || '0';

	if (!Blockly.JavaScript.definitions_['humidity']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'humidity', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.humidity.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(PIN) {');
		func.push('  // return GPIO - a');
		func.push('}');
		Blockly.JavaScript.definitions_['humidity'] = func.join('\n');
	}
	var code = Blockly.JavaScript.humidity.functionName +
			'(' + argument0 + ')';
	return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.Language.light = {
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

Blockly.JavaScript.light = function() {
	var argument0 = this.getTitleValue('PIN') || '0';

	if (!Blockly.JavaScript.definitions_['light']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'light', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.light.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(PIN) {');
		func.push('  // return GPIO - a');
		func.push('}');
		Blockly.JavaScript.definitions_['light'] = func.join('\n');
	}
	var code = Blockly.JavaScript.light.functionName +
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