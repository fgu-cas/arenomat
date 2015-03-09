require('descriptive-statistics');
exports = module.exports = {
  analyze: function (data) {
    return (data.map(function (frame) {
      if (frame.cv && frame.cv[0] && frame.cv[0].position && frame.cv[0].position.x) {
	var dist = Math.sqrt(Math.pow(frame.cv[0].position.x - 300, 2) + Math.pow(frame.cv[0].position.y - 300, 2));
	return dist;
      }
       return 0;
	// TODO: read width of arena from config
    }).sum / data.number / config.camHeight * config.arenaWidth).toFixed(2);
  },
  parameters: {}
}
