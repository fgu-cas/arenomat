require('descriptive-statistics');
exports = module.exports = {
  name: "First shock time [s]",

  _time: {},

  add: function (frame, params, session) {
    if (frame.shocked && !this._time[session]) {
        this._time[session] = frame.elapsedTime;
    }
  },

  result: function (params, session) {
     return this._time[session] / 1000;
  },


  parameters: []

}