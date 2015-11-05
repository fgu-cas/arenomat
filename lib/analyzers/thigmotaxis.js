require('descriptive-statistics');

var ratio = 0.8;
exports = module.exports = {
  name: "Thigmotaxis",
  _outside: {},
  _count: {},

  add: function (frame, params, session) {
	var dist = Math.sqrt(Math.pow(frame.cv[0].position.x - 300, 2) + Math.pow(frame.cv[0].position.y - 300, 2));
        if (!this._outside[session]) this._outside[session] = 0;
	if (dist > 300 * params.ratio) {
	    this._outside[session]++;
	}
        if (!this._count[session]) this._count[session] = 0;
	this._count[session]++;
  },

  result: function (params, session) { 
    return Math.round(this._outside[session] / this._count[session] * 100, 2);
  },

  parameters: [ { name: "ratio", units: "%" } ]
    
}
