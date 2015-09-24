require('descriptive-statistics');

var ratio = 0.8;
exports = module.exports = {
  name: "Thigmotaxis",
  _outside: 0,
  _count: 0,

  add: function (frame, params) {
	var dist = Math.sqrt(Math.pow(frame.cv[0].position.x - 300, 2) + Math.pow(frame.cv[0].position.y - 300, 2));
	if (dist > 300 * params.ratio) {
	    this._outside++;
	}
	this._count++;
  },

  result: function (params) { 
    return Math.round(this._outside / this._count * 100, 2);
  },

  parameters: [ { name: "ratio", units: "%" } ]
    
}
