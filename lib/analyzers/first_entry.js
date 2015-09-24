require('descriptive-statistics');
exports = module.exports = {
  name: "First entrance time",
  _time: -1,

  add: function (frame, params) {
    for(i in frame.zones) {
        if (frame.zones[i] && this._time == -1) {
            this._time = frame.elapsedTime;
        }
    }
  },

  result: function (params) {
     return this._time;
  },
  parameters: []

}