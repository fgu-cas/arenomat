require('descriptive-statistics');
exports = module.exports = {
  name: "Circular variance (AF)",
  _sum: {},
  _count: {},
  _fis: [],
  add: function (frame, params, session) {
//    var r = Math.sqrt(Math.pow(frame.cv[0].position.x - 300, 2) + Math.pow(frame.cv[0].position.y - 300, 2));
    var fi = Math.atan2(frame.cv[0].position.y - 300, frame.cv[0].position.x - 300) / Math.PI * 180;

    if (!this._sum[session]) this._sum[session]  = 0;
    if (!this._count[session]) this._count[session]  = 0;
    if (!this._fis[session]) this._fis[session] = [];


    this._sum[session] += fi;
    this._count[session]++;


    this._fis[session].push(fi);

//console.log(this._fis[session], this._count[session]);
  },
  result: function (params,session) {
    var mean = this._sum[session] / this._count[session];
    var variance = 0;

    if (this._fis[session])
    this._fis[session].forEach(function (fi) {
	variance += Math.pow(fi - mean, 2);
    });

    return variance / this._count[session];
  },
  parameters: [ ]

}