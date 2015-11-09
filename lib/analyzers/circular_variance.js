require('descriptive-statistics');
exports = module.exports = {
  name: "Circular variance (AF) [deg]",
  _sumx: {},
  _sumy: {},
  _count: {},
  add: function (frame, params, session) {
//    var r = Math.sqrt(Math.pow(frame.cv[0].position.x - 300, 2) + Math.pow(frame.cv[0].position.y - 300, 2));
    var fi = Math.atan2(frame.cv[0].position.y - 300, frame.cv[0].position.x - 300); // / Math.PI * 180;
   if (fi < 0) {
        fi += (2 * Math.PI);
    }

    if (!this._sumx[session]) this._sumx[session]  = 0;
    if (!this._sumy[session]) this._sumy[session]  = 0;
    if (!this._count[session]) this._count[session]  = 0;

    this._sumx[session] += Math.sin(fi);
    this._sumy[session] += Math.cos(fi);

    this._count[session]++;
  },
  result: function (params,session) {
    return Math.atan2(this._sumx[session] / this._count[session], this._sumy[session] / this._count[session]) / Math.PI * 180;
  },
  parameters: [ ]

}