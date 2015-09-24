require('descriptive-statistics');
exports = module.exports = {
  name: "First shock time",

  _time: -1,

  add: function (frame, params) {
    if (frame.shocked && this._time == -1) {
        this._time = frame.elapsedTime;
    }
  },

  result: function (params) {
     return this._time;
  },


  parameters: []

}