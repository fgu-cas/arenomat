Blockly.Language.sound = {
	helpUrl: 'http://www.example.com/',
	init: function() {
		this.setColour(190);
				
		this.appendDummyInput("").appendTitle("Sound")
		this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/sound.png", 32, 32))
		this.appendDummyInput("").appendTitle(new Blockly.FieldDropdown([["beep.mp3", "beep.mp3"], ["click.mp3", "click.mp3"], ["delete.mp3", "delete.mp3"]]), "filename")

		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setTooltip('sound');
	}
};

Blockly.JavaScript.sound = function() {
	var argument0 = this.getTitleValue('filename') || '0';

	if (!Blockly.JavaScript.definitions_['sound']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'sound', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.sound.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(filename) {');
		func.push('  console.log("play: " + filename);');
		func.push('  play("media/" + filename);');
		func.push('}');
		Blockly.JavaScript.definitions_['sound'] = func.join('\n');
	}
	var code = Blockly.JavaScript.sound.functionName +
			'("' + argument0 + '");\n';
	return code;
};



Blockly.Language.light = {
	helpUrl: 'http://www.example.com/',
	init: function() {
		this.setColour(190);
		this.appendDummyInput("").appendTitle("Light")
		this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/light.png", 32, 32))
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setTooltip('Svetlo');
	}
};

Blockly.JavaScript.light = function() {
	if (!Blockly.JavaScript.definitions_['light']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'light', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.light.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '() {');
		func.push('  led.toggle();');
		func.push('}');
		Blockly.JavaScript.definitions_['light'] = func.join('\n');
	}
	var code = Blockly.JavaScript.light.functionName + '();\n';
	return code;
};

Blockly.Language.turntable = {
	helpUrl: 'http://www.example.com/',
	init: function() {
		this.setColour(190);
		this.appendDummyInput("").appendTitle("Turntable")
		this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/turntable.png", 32, 32))
		this.appendDummyInput("").appendTitle(new Blockly.FieldDropdown([["0.25 RPM", "0.25"], ["0.5 RPM", "0.5"], ["0.25 RPM", "0.25"], ["1 RPM", "1"], ["2 RPM", "2"]]), "velocity")

		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setTooltip('Arena');
	}
};

Blockly.JavaScript.turntable = function() {
	var argument0 = this.getTitleValue('velocity') || '0';

	if (!Blockly.JavaScript.definitions_['turntable']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'turntable', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.turntable.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(velocity) {');
		func.push('  console.log("motor: " + velocity);');
		func.push('}');
		Blockly.JavaScript.definitions_['turntable'] = func.join('\n');
	}
	var code = Blockly.JavaScript.turntable.functionName +
			'(' + argument0 + ');\n';
	return code;
};


Blockly.Language.shock = {
	helpUrl: 'http://www.example.com/',
	init: function() {
		this.setColour(0);
		this.appendDummyInput("")
				.appendTitle("Shock")
		this.appendDummyInput("")
		    .appendTitle(new Blockly.FieldImage("img/shock.png", 32, 32))
		this.appendDummyInput("")
				.appendTitle(new Blockly.FieldDropdown([["0.2mA", "2"], ["0.3mA", "3"], ["0.4mA", "4"], ["0.5mA", "5"], ["0.6mA", "6"], ["0.7mA", "7"]]), "current")
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setTooltip('Shock');
	}
};

Blockly.JavaScript.shock = function() {
	var argument0 = this.getTitleValue('current') || '0';
//	var argument1 = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_COMMA) || 'false';

	if (!Blockly.JavaScript.definitions_['shock']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'shock', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.shock.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(current) {');
		func.push('  console.log("shock: " + current);');
		func.push('}');
		Blockly.JavaScript.definitions_['shock'] = func.join('\n');
	}
	var code = Blockly.JavaScript.shock.functionName +
			'(' + argument0 + ');\n';
	return code;

};

Blockly.Language.feeder = {
	helpUrl: 'http://www.example.com/',
	init: function() {
		this.setColour(120);
		this.appendDummyInput("").appendTitle("Feeder")
		this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/feeder.png", 32, 32))

		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setTooltip('Feeder');
	}
};

Blockly.JavaScript.feeder = function() {
	if (!Blockly.JavaScript.definitions_['feeder']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'feeder', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.feeder.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '() {');
		func.push('  servo.max();');
		func.push('  board.wait(1000, function() { servo.min(); });');
		func.push('}');
		Blockly.JavaScript.definitions_['feeder'] = func.join('\n');
	}
	var code = Blockly.JavaScript.feeder.functionName + '();\n';
	return code;

};
