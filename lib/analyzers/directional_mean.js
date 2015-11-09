require('descriptive-statistics');
exports = module.exports = {
  name: "Directional mean (AF) [deg]",
  _sum: [],
  _count: [],
  add: function (frame, params, session) {
    var fi = Math.atan2(frame.cv[0].position.y - 300, frame.cv[0].position.x - 300) / Math.PI * 180;

    if (!this._sum[session]) this._sum[session] = 0;
    this._sum[session] += fi;

    if (!this._count[session]) this._count[session] = 0;
    this._count[session]++;
  },
  result: function (params, session) {
    return  this._sum[session] / this._count[session];
  },
  parameters: [ ]

}