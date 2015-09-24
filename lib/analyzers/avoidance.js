require('descriptive-statistics');
exports = module.exports = {
  name: "Maximum time avoided",
  _time: 0,
  _max: 0,

  add: function (frame, params) {
	if (!frame.shocked) {
	    this._time = frame.elapsedTime;
	}
	else {
	    if (this._time > this._max) this._max = this._time;
	    this._time = 0;
	}
  },

  result: function (params) {
     return this._max;
  },

  parameters: []

}