Blockly.Language.shock = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(0);
    this.appendDummyInput("")
            .appendTitle(new Blockly.FieldImage("img/shock.png", 16, 16)).appendTitle("Shock")
    this.appendDummyInput("")
//      .appendTitle(new Blockly.FieldDropdown([["0.2mA", "2"], ["0.3mA", "3"], ["0.4mA", "4"], ["0.5mA", "5"], ["0.6mA", "6"], ["0.7mA", "7"]]), "current")
            .appendTitle(new Blockly.FieldDropdown([["300ms", "300"], ["500ms", "500"], ["1s", "1000"]]), "delay")

    this.appendDummyInput("").appendTitle('pause ').appendTitle(new Blockly.FieldTextInput("100"), "pause").appendTitle('s');


    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Shock');
  }
};

Blockly.JavaScript.shock = function() {
  var argument0 = this.getTitleValue('delay') || '0';
  var argument1 = this.getTitleValue('pause') || '0';
//console.log(argument0);
  if (!Blockly.JavaScript.definitions_['shock']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('shock', Blockly.Generator.NAME_TYPE);

    Blockly.JavaScript.shock.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(delay, pause) {');
    func.push('  arenomat.shock.pulse(delay, pause);');
    func.push('}');
    Blockly.JavaScript.definitions_['shock'] = func.join('\n');
  }
  var code = Blockly.JavaScript.shock.functionName +
          '(' + argument0 + ',' + argument1 + ');\n';
  return code;

};
