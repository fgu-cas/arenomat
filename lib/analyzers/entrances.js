require('descriptive-statistics');
exports = module.exports = {
  name: "Entrances [1]",
  _old: {},
  _count: {},

  add: function (doc, params,session) {
    entry = 0;
    for(i in doc.cv[0].zones) {
	entry += doc.cv[0].zones[i];
    }
    if (entry > 0) entry = 1;

    if (this._old[session] != entry) {
	if (!this._count[session]) this._count = 0;

	this._count[session] += entry;

	this._old[session] = entry;
    }
    
  },

  result: function (params, session) { 
    return this._count[session];
  },

  parameters: []
}
