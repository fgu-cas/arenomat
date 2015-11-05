require('descriptive-statistics');
exports = module.exports = {
  name: "Shocks",
  _old: {},
  _count: {},

  add: function (doc, params, session) {  
    if (!this._count[session]) this._count[session] = 0;
    if (!this._old[session]) this._old[session] = 0;

    entry = doc.shocked;

    if (this._old[session] != entry) {
        if (entry > 0) this._count[session]++;

        this._old[session] = entry;
    }
  },
  result: function (params, session) { 
    return Math.round(this._count[session] / 2);
  },

  parameters: []

}