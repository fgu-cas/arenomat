require('descriptive-statistics');
exports = module.exports = {
  name: "Mean distance from center",
  _sum: {},
  _count: {},
  add: function (frame, params, session) {
      if (frame.cv && frame.cv[0] && frame.cv[0].position && frame.cv[0].position.x) {
	var dist = Math.sqrt(Math.pow(frame.cv[0].position.x - 300, 2) + Math.pow(frame.cv[0].position.y - 300, 2));

	if (!this._sum[session]) this._sum[session] = 0;
	this._sum[session] += dist;
	if (!this._count[session]) this._count[session] = 0;
        this._count[session]++;
      }
  },
  result: function (params, session) {
    console.log(session, this._sum);
     return (this._sum[session] / this._count[session] / config.camHeight * config.arenaWidth).toFixed(2);
  },
  parameters: []
}
