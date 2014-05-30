Blockly.Language.sound = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(190);

    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/sound.png", 16, 16)).appendTitle("Sound")
    this.appendDummyInput("").appendTitle(new Blockly.FieldDropdown([["dog.mp3", "dog.mp3"], ["click.mp3", "click.mp3"], ["delete.mp3", "delete.mp3"]]), "filename")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('sound');
  }
};

Blockly.JavaScript.sound = function() {
  var argument0 = this.getTitleValue('filename') || '0';

  if (!Blockly.JavaScript.definitions_['sound']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('sound', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.sound.functionName = functionName;
    var func = [];
    func.push('var playing; function ' + functionName + '(filename) {');
    func.push('  arenomat.mp3.set(filename);');
    func.push('}');
    Blockly.JavaScript.definitions_['sound'] = func.join('\n');
  }
  var code = Blockly.JavaScript.sound.functionName + '("' + argument0 + '");\n';
  return code;
};



Blockly.Language.light = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(190);

    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/light.png", 16, 16)).appendTitle("Light");
    this.appendDummyInput("").appendTitle(new Blockly.FieldTextInput("100"), "delay").appendTitle('ms');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Svetlo');
  }
};

Blockly.JavaScript.light = function() {
  var argument0 = this.getTitleValue('delay') || '0';

  if (!Blockly.JavaScript.definitions_['light']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('light', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.light.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(delay) {');
    func.push('  arenomat.light.pulse(delay);');
    func.push('}');
    Blockly.JavaScript.definitions_['light'] = func.join('\n');
  }
  var code = Blockly.JavaScript.light.functionName + '(' + argument0 + ');\n';
  return code;
};

Blockly.Language.turntable = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(190);

    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/turntable.png", 16, 16)).appendTitle("Turntable")
    this.appendDummyInput("").appendTitle(new Blockly.FieldDropdown([["CW", "CW"], ["CCW", "CCW"]]), "direction")
    this.appendDummyInput("").appendTitle(new Blockly.FieldDropdown([["stop", 0], ["0.25 RPM", 30], ["0.5 RPM", 90], ["0.75 RPM", 150], ["1 RPM", 210], ["2 RPM", 255]]), "velocity")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Arena');
  }
};

Blockly.JavaScript.turntable = function() {
  var argument0 = this.getTitleValue('direction') || '0';
  var argument1 = this.getTitleValue('velocity') || '0';

  if (!Blockly.JavaScript.definitions_['turntable']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'turntable', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.turntable.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(direction, velocity) {');
    func.push('  console.log("motor: " + velocity);');
    func.push('  arenomat.turntable.rotate(direction, velocity);');
    func.push('}');
    Blockly.JavaScript.definitions_['turntable'] = func.join('\n');
  }
  var code = Blockly.JavaScript.turntable.functionName + '("' + argument0 + '", ' + argument1 + ');\n';
  return code;
};


Blockly.Language.shock = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(0);
    this.appendDummyInput("")
      .appendTitle(new Blockly.FieldImage("img/shock.png", 16, 16)).appendTitle("Shock")
    this.appendDummyInput("")
      .appendTitle(new Blockly.FieldDropdown([["0.2mA", "2"], ["0.3mA", "3"], ["0.4mA", "4"], ["0.5mA", "5"], ["0.6mA", "6"], ["0.7mA", "7"]]), "current")
      .appendTitle(new Blockly.FieldDropdown([["300ms", "300"], ["500ms", "500"], ["1s", "1000"]]), "delay")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Shock');
  }
};

Blockly.JavaScript.shock = function() {
  var argument0 = this.getTitleValue('current') || '0';
  var argument1 = this.getTitleValue('delay') || '0';

  if (!Blockly.JavaScript.definitions_['shock']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('shock', Blockly.Generator.NAME_TYPE);

    Blockly.JavaScript.shock.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(current, delay) {');
    func.push('  arenomat.shock.pulse(current, delay);');
    func.push('}');
    Blockly.JavaScript.definitions_['shock'] = func.join('\n');
  }
  var code = Blockly.JavaScript.shock.functionName +
    '(' + argument0 + ',' + argument1 + ');\n';
  return code;

};

Blockly.Language.feeder = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/feeder.png", 16, 16)).appendTitle("Feeder")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Feeder');
  }
};

Blockly.JavaScript.feeder = function() {
  if (!Blockly.JavaScript.definitions_['feeder']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('feeder', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.feeder.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '() {');
    func.push('    arenomat.feed.it();');
    func.push('}');
    Blockly.JavaScript.definitions_['feeder'] = func.join('\n');
  }
  var code = Blockly.JavaScript.feeder.functionName + '();\n';
  return code;

};
Blockly.Language.message = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(190);
    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/message.png", 16, 16)).appendTitle("Message")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendValueInput("value", Text)
    this.setTooltip('message');
  }
};
Blockly.JavaScript.message = function() {
  var argument0 = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_COMMA) || 'false';

  if (!Blockly.JavaScript.definitions_['message']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('message', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.message.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(message) {');
    func.push('  console.log(message);');
    func.push('}');
    Blockly.JavaScript.definitions_['message'] = func.join('\n');
  }
  var code = Blockly.JavaScript.message.functionName +
    '(' + argument0 + ');\n';
  return code;

};



Blockly.Language.out = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(190);
    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/out.png", 16, 16)).appendTitle("out")

    this.appendDummyInput("").appendTitle(new Blockly.FieldTextInput(""), "key");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendValueInput("value", Text)
    this.setTooltip('out');
  }
};
Blockly.JavaScript.out = function() {
  var argument0 = this.getTitleValue('key') || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_COMMA) || 'false';

  if (!Blockly.JavaScript.definitions_['out']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName('out', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.out.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(key, value) {');
    func.push('  actualFrame.output[key] = value;');
    func.push('}');
    Blockly.JavaScript.definitions_['out'] = func.join('\n');
  }
  var code = Blockly.JavaScript.out.functionName + '("' + argument0 + '", ' + argument1 + ');\n';
  return code;

};



Blockly.Language.projector = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(190);
    this.appendDummyInput("").appendTitle(new Blockly.FieldImage("img/projector.png", 16, 16)).appendTitle("projector")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendValueInput("visible").setCheck('Boolean').appendTitle('visible');
    this.appendValueInput("zone").setCheck('Number').appendTitle('zone');
    this.setTooltip('projector');
  }
};
Blockly.JavaScript.projector = function() {
  var argument0 = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_COMMA) || 'false';

  if (!Blockly.JavaScript.definitions_['projector']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
      'projector', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.projector.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(projector) {');
    func.push('  console.log(projector)');
    func.push('}');
    Blockly.JavaScript.definitions_['projector'] = func.join('\n');
  }
  var code = Blockly.JavaScript.projector.functionName +
    '(' + argument0 + ');\n';
  return code;

};