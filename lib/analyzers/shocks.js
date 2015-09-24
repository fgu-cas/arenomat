require('descriptive-statistics');
exports = module.exports = {
  name: "Shocks",
  _old: false,
  _count: 0,

  add: function (doc, params) {  
    entry = doc.shocked;

    if (this._old != entry) {
        if (entry > 0) this._count++;

        this._old = entry;
    }
  },
  result: function (params) { 
    return Math.round(this._count / 2);
  },

  parameters: []

}