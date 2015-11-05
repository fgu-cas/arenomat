require('descriptive-statistics');
exports = module.exports = {
  name: "First entrance time",
  _time: [],

  add: function (frame, params, session) {
    if (frame.cv[0] && frame.cv[0].zones) {

//console.log(this._time[session], frame.cv[0].zones);

    for(i in frame.cv[0].zones) {
        if (frame.cv[0].zones[i] && !this._time[session]) {
            this._time[session] = frame.elapsedTime;
        }
    }
}
  },

  result: function (params, session) {
//console.log(this._time);
     return this._time[session];
  },
  parameters: []

}