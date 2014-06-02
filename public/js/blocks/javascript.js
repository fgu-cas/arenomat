Blockly.Language.javascript_setinterval = {
  helpUrl: '',
  init: function() {
    this.setColour(210);
    this.appendValueInput("interval")
      .setCheck("Number")
      .appendTitle("setInterval");
    this.appendStatementInput("callback");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};


Blockly.JavaScript.javascript_setinterval = function() {
  var statements_callback = Blockly.JavaScript.statementToCode(this, 'callback');
  var value_interval = Blockly.JavaScript.valueToCode(this, 'interval', Blockly.JavaScript.ORDER_COMMA);
  var code = 'setInterval( function(){\n';
  code += statements_callback;
  code += '}, ';
  code += value_interval;
  code += ');\n';
  return code;
};


Blockly.JavaScript.javascript_settimeout = function() {
  var statements_callback = Blockly.JavaScript.statementToCode(this, 'callback');
  var value_timeout = Blockly.JavaScript.valueToCode(this, 'timeout', Blockly.JavaScript.ORDER_COMMA);
  var code = 'setTimeout( function(){\n';
  code += statements_callback;
  code += '}, ';
  code += value_timeout;
  code += ');\n';
  return code;
};


Blockly.Language.javascript_settimeout = {
  helpUrl: '',
  init: function() {
    this.setColour(210);
    this.appendValueInput("timeout")
      .setCheck("Number")
      .appendTitle("setTimeout");
    this.appendStatementInput("callback");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
