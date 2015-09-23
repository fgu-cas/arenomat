require('descriptive-statistics');
exports = module.exports = {
  name: "Directional mean (AF)",
  _sum: 0,
  _count: 0,
  _fis: [],
  add: function (frame, params) {
//    var r = Math.sqrt(Math.pow(frame.cv[0].position.x - 300, 2) + Math.pow(frame.cv[0].position.y - 300, 2));
    var fi = Math.atan2(frame.cv[0].position.y - 300, frame.cv[0].position.x - 300) / Math.PI * 180;
    this._sum += fi;
    this._count++;
  },
  result: function (params) {
    return  this._sum / this._count;
  },
  parameters: [ ]

}