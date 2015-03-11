require('descriptive-statistics');

var ratio = 0.8;
exports = module.exports = {
  name: "Thigmotaxis",
  analyze: function (data) {
    return Math.round(data.map(function (frame) {
 if (frame.cv && frame.cv[0] && frame.cv[0].position && frame.cv[0].position.x) {

	var dist = Math.sqrt(Math.pow(frame.cv[0].position.x - 300, 2) + Math.pow(frame.cv[0].position.y - 300, 2));
	var val = (dist > 300 * ratio) ? 1 : 0;
	return val;
      }
return 0;
	// TODO: read width of arena from config
    }).sum / data.number * 100, 2);

  },
  parameters: [ { name: "ratio", units: "%" } ]
    
}
