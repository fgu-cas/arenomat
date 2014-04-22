Blockly.Language.message = {
	helpUrl: 'http://www.example.com/',
	init: function() {
		this.setColour(190);
		this.appendDummyInput("")
				.appendTitle("message")
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.appendValueInput("value", Text)
		this.setTooltip('message');
	}
};
Blockly.JavaScript.message = function() {
	var argument0 = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_COMMA) || 'false';

	if (!Blockly.JavaScript.definitions_['message']) {
		var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
				'message', Blockly.Generator.NAME_TYPE);
		Blockly.JavaScript.message.functionName = functionName;
		var func = [];
		func.push('function ' + functionName + '(message) {');
		func.push('  // alert(message)');
		func.push('}');
		Blockly.JavaScript.definitions_['message'] = func.join('\n');
	}
	var code = Blockly.JavaScript.message.functionName +
			'(' + argument0 + ');\n';
	return code;

};