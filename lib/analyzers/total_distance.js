require('descriptive-statistics');
exports = module.exports = {
  name: "Total distance (AF) [m]",
  oldTime: {},
  old: { },
  sum: {},
  add: function (frame, params, session) { 
      var dist = 0;
	if (!this.oldTime[session] || (frame.elapsedTime > this.oldTime[session] + (1000.0 * params['resolution']))) {
	  dist = 0;
	  if (this.oldTime[session]) {
	    dist = Math.sqrt(Math.pow(frame.cv[0].position.x - this.old[session].x, 2) + Math.pow(frame.cv[0].position.y - this.old[session].y, 2));
	    }

	  this.oldTime[session] = frame.elapsedTime;
	  this.old[session] = frame.cv[0].position;

	  if (!this.sum[session]) this.sum[session] = 0;
	  if (dist > 0) this.sum[session] += dist;
	}
    

  },

  result: function (params, session) { 
    return (this.sum[session] / config.camHeight * config.arenaWidth).toFixed(2);
  },

  parameters: [ { name: 'resolution', units: 's' } ]

}
