require('descriptive-statistics');
exports = module.exports = {
  name: "Circular variance (AF)",
  _sum: 0,
  _count: 0,
  _fis: [],
  add: function (frame, params) {
//    var r = Math.sqrt(Math.pow(frame.cv[0].position.x - 300, 2) + Math.pow(frame.cv[0].position.y - 300, 2));
    var fi = Math.atan2(frame.cv[0].position.y - 300, frame.cv[0].position.x - 300) / Math.PI * 180;
    this._sum += fi;
    this._count++;
    this._fis.push(fi);
  },
  result: function (params) {
    var mean = this._sum / this._count;
    var variance = 0;

    this._fis.forEach(function (fi) {
	variance += Math.pow(fi - mean, 2);
    });
console.log(mean, variance, this._count);2
    return variance / this._count;
  },
  parameters: [ ]

}