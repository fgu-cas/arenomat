require('descriptive-statistics');
exports = module.exports = {
  name: "Mean distance from center",
  _sum: 0,
  _count: 0,
  add: function (frame) {
      if (frame.cv && frame.cv[0] && frame.cv[0].position && frame.cv[0].position.x) {
	var dist = Math.sqrt(Math.pow(frame.cv[0].position.x - 300, 2) + Math.pow(frame.cv[0].position.y - 300, 2));
	this._sum += dist;
        this._count++;
      }
  },
  result: function () {
     return (this._sum / this._count / config.camHeight * config.arenaWidth).toFixed(2);;
  },
  parameters: []
}
