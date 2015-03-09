require('descriptive-statistics');
exports = module.exports = {
  analyze: function (data) {
    var old = 0;

    return Math.floor(data.map(function (frame) {
	if (frame.cv && frame.cv[0] && frame.cv[0].zones) {
        var change = frame.cv[0].zones[0] != old;
	old = frame.cv[0].zones[0];
        return change;
	}
	return 0;
    }).sum / 2);
  },
  parameters: {}
}
