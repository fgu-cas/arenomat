


Blockly.Language.sound = {
	helpUrl: 'http://www.example.com/',
	init: function() {
		this.setColour(190);
		this.appendDummyInput("")
				.appendTitle(new Blockly.FieldDropdown([["1.mp3", "1.mp3"], ["2", "2"], ["3", "3"], ["4", "4"]]), "PIN")
				.appendTitle("Zvuk")
		this.appendDummyInput("")
		//.appendTitle(new Blockly.FieldImage("http://localhost/blockly/apps/graph/sounda.png", 64, 64))
		this.appendValueInput("value")
				.setCheck('Boolean')
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setTooltip('sound');
	}
};

Blockly.JavaScript.sound = function() {
	var argument0 = this.getTitleValue('PIN') || '0';
	var argument1 = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_COMMA) || 'false';

	if (!Blockly.JavaScript.definitions_['sound']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'sound', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.sound.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(PIN, in) {');
		func.push('  mp3play(PIN, in);');
		func.push('}');
		Blockly.JavaScript.definitions_['sound'] = func.join('\n');
	}
	var code = Blockly.JavaScript.sound.functionName +
			'(' + argument0 + ', ' + argument1 + ');\n';
	return code;
};



Blockly.Language.light = {
	helpUrl: 'http://www.example.com/',
	init: function() {
		this.setColour(190);
		this.appendDummyInput("")
				//	.appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]]), "PIN")
				.appendTitle("Svetlo")
		this.appendDummyInput("")
		//.appendTitle(new Blockly.FieldImage("http://localhost/blockly/apps/graph/lampa.png", 64, 64))
		this.appendValueInput("value")
				.setCheck('Boolean')
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setTooltip('Svetlo');
	}
};

Blockly.JavaScript.light = function() {
	var argument0 = this.getTitleValue('PIN') || '0';
	var argument1 = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_COMMA) || 'false';

	if (!Blockly.JavaScript.definitions_['light']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'light', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.light.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(PIN, in) {');
		func.push('  light(PIN, in);');
		func.push('}');
		Blockly.JavaScript.definitions_['light'] = func.join('\n');
	}
	var code = Blockly.JavaScript.light.functionName +
			'(' + argument0 + ', ' + argument1 + ');\n';
	return code;
};

Blockly.Language.turntable = {
	helpUrl: 'http://www.example.com/',
	init: function() {
		this.setColour(190);
		this.appendDummyInput("")
				.appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]]), "PIN")
				.appendTitle("Turntable")

		this.appendDummyInput("")
		//	.appendTitle(new Blockly.FieldImage("http://localhost/blockly/apps/graph/vetrak.png", 64, 64))

		this.appendValueInput("value")
				.setCheck('Boolean')
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setTooltip('Arena');
	}
};

Blockly.JavaScript.turntable = function() {
	var argument0 = this.getTitleValue('PIN') || '0';
	var argument1 = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_COMMA) || 'false';

	if (!Blockly.JavaScript.definitions_['turntable']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'turntable', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.turntable.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(PIN, in) {');
		func.push('  motor(PIN, in);');
		func.push('}');
		Blockly.JavaScript.definitions_['turntable'] = func.join('\n');
	}
	var code = Blockly.JavaScript.turntable.functionName +
			'(' + argument0 + ', ' + argument1 + ');\n';
	return code;
};


Blockly.Language.shock = {
	helpUrl: 'http://www.example.com/',
	init: function() {
		this.setColour(190);
		this.appendDummyInput("")
				.appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]]), "PIN")
				.appendTitle("Shock")
		this.appendDummyInput("")
		//	.appendTitle(new Blockly.FieldImage("http://localhost/blockly/apps/graph/profesor.png", 64, 64))
		this.appendValueInput("value", Number)
				.setCheck('Boolean')
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setTooltip('Shock');
	}
};

Blockly.JavaScript.shock = function() {
	var argument0 = this.getTitleValue('PIN') || '0';
	var argument1 = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_COMMA) || 'false';

	if (!Blockly.JavaScript.definitions_['shock']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'shock', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.shock.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(PIN, in) {');
		func.push('  gpio.write(PIN, in);');
		func.push('}');
		Blockly.JavaScript.definitions_['shock'] = func.join('\n');
	}
	var code = Blockly.JavaScript.shock.functionName +
			'(' + argument0 + ', ' + argument1 + ');\n';
	return code;

};

Blockly.Language.feeder = {
	helpUrl: 'http://www.example.com/',
	init: function() {
		this.setColour(190);
		this.appendDummyInput("")
//				.appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]]), "PIN")
				.appendTitle("Feeder")
		this.appendDummyInput("")
		//	.appendTitle(new Blockly.FieldImage("http://localhost/blockly/apps/graph/profesor.png", 64, 64))
		this.appendValueInput("value", Number)
				.setCheck('Boolean')
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setTooltip('Shock');
	}
};

Blockly.JavaScript.feeder = function() {
	var argument0 = this.getTitleValue('PIN') || '0';
	var argument1 = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_COMMA) || 'false';

	if (!Blockly.JavaScript.definitions_['feeder']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'feeder', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.humidifier.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(PIN, in) {');
		func.push('  feeder(PIN, in);');
		func.push('}');
		Blockly.JavaScript.definitions_['feeder'] = func.join('\n');
	}
	var code = Blockly.JavaScript.humidifier.functionName +
			'(' + argument0 + ', ' + argument1 + ');\n';
	return code;

};
