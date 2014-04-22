


Blockly.Language.sound = {
	helpUrl: 'http://www.example.com/',
	init: function() {
		this.setColour(190);
		this.appendDummyInput("")
				.appendTitle(new Blockly.FieldDropdown([["1", "1.mp3"], ["2", "2"], ["3", "3"], ["4", "4"]]), "PIN")
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
		func.push('  gpio.write(PIN, in);');
		func.push('}');
		Blockly.JavaScript.definitions_['sound'] = func.join('\n');
	}
	var code = Blockly.JavaScript.sound.functionName +
			'(' + argument0 + ', ' + argument1 + ');\n';
	return code;
};



Blockly.Language.lamp = {
	helpUrl: 'http://www.example.com/',
	init: function() {
		this.setColour(190);
		this.appendDummyInput("")
			//	.appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]]), "PIN")
				.appendTitle("Trest")
		this.appendDummyInput("")
				//.appendTitle(new Blockly.FieldImage("http://localhost/blockly/apps/graph/lampa.png", 64, 64))
		this.appendValueInput("value")
				.setCheck('Boolean')
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setTooltip('Lampa');
	}
};

Blockly.JavaScript.lamp = function() {
	var argument0 = this.getTitleValue('PIN') || '0';
	var argument1 = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_COMMA) || 'false';

	if (!Blockly.JavaScript.definitions_['lamp']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'lamp', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.lamp.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(PIN, in) {');
		func.push('  gpio.write(PIN, in);');
		func.push('}');
		Blockly.JavaScript.definitions_['lamp'] = func.join('\n');
	}
	var code = Blockly.JavaScript.lamp.functionName +
			'(' + argument0 + ', ' + argument1 + ');\n';
	return code;
};

Blockly.Language.fan = {
	helpUrl: 'http://www.example.com/',
	init: function() {
		this.setColour(190);
		this.appendDummyInput("")
				//.appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]]), "PIN")
				.appendTitle("Nesquik")

		this.appendDummyInput("")
			//	.appendTitle(new Blockly.FieldImage("http://localhost/blockly/apps/graph/vetrak.png", 64, 64))

		this.appendValueInput("value")
				.setCheck('Boolean')
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setTooltip('Větrák');
	}
};

Blockly.JavaScript.fan = function() {
	var argument0 = this.getTitleValue('PIN') || '0';
	var argument1 = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_COMMA) || 'false';

	if (!Blockly.JavaScript.definitions_['fan']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'fan', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.fan.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(PIN, in) {');
		func.push('  gpio.write(PIN, in);');
		func.push('}');
		Blockly.JavaScript.definitions_['fan'] = func.join('\n');
	}
	var code = Blockly.JavaScript.fan.functionName +
			'(' + argument0 + ', ' + argument1 + ');\n';
	return code;
};


Blockly.Language.humidifier = {
	helpUrl: 'http://www.example.com/',
	init: function() {
		this.setColour(190);
		this.appendDummyInput("")
			//	.appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]]), "PIN")
				.appendTitle("Svetlo")
		this.appendDummyInput("")
			//	.appendTitle(new Blockly.FieldImage("http://localhost/blockly/apps/graph/profesor.png", 64, 64))
		this.appendValueInput("value", Number)
				.setCheck('Boolean')
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setTooltip('Zvlhčovač');
	}
};

Blockly.JavaScript.humidifier = function() {
	var argument0 = this.getTitleValue('PIN') || '0';
	var argument1 = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_COMMA) || 'false';

	if (!Blockly.JavaScript.definitions_['humidifier']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'humidifier', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.humidifier.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(PIN, in) {');
		func.push('  gpio.write(PIN, in);');
		func.push('}');
		Blockly.JavaScript.definitions_['humidifier'] = func.join('\n');
	}
	var code = Blockly.JavaScript.humidifier.functionName +
			'(' + argument0 + ', ' + argument1 + ');\n';
	return code;

};
