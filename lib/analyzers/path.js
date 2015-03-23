require('descriptive-statistics');
exports = module.exports = {
  name: "Total distance (AF)",
  add: function (doc) { },
  result: function () { },

  analyze: function (data) {
    var old = false;
    var oldTime = false;
    var sum = 0;

    data.map(function (frame) {
      var dist = 0;
      if (frame.cv && frame.cv[0] && frame.cv[0].position && frame.cv[0].position.x) {
	if (!oldTime || (frame.elapsedTime > oldTime + 1)) {
	  dist = Math.sqrt(Math.pow(frame.cv[0].position.x - old.x, 2) + Math.pow(frame.cv[0].position.y - old.y, 2));
	  oldTime = frame.elapsedTime;
	  old = frame.cv[0].position;
	  console.log(sum, oldTime, old, dist);
	    if (dist > 0) sum += dist;
	}

      }
	return 0;
    }); 

    return (sum / config.camHeight * config.arenaWidth).toFixed(2);
  },
  parameters: [ { name: 'resolution', units: 's' } ]

}
