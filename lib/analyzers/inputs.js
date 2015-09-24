require('descriptive-statistics');
exports = module.exports = {
  name: "Entrances",
  _old: 0,
  _count: 0,

  add: function (doc, params) {
    entry = 0;
    for(i in doc.zones) {
	entry += doc.zones[i];
    }
    if (entry > 0) entry = 1;

    if (this._old != entry) {
	if (entry > 0) this._count++;

	this._old = entry;
    }
    
  },

  result: function (params) { 
    return this._count;
  },

  parameters: []
}
