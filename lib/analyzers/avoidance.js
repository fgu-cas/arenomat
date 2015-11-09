require('descriptive-statistics');
exports = module.exports = {
  name: "Maximum time avoided [s]",
  _time: {},
  _max: {},

  add: function (frame, params, session) {
	if (!frame.shocked) {
	    this._time[session] = frame.elapsedTime;
	}
	else {
	    if (this._time[session] > this._max[session]) this._max[session] = this._time[session];
	    this._time[session] = 0;
	}
  },

  result: function (params, session) {
     return this._max[session] / 1000;
  },

  parameters: []

}