require('descriptive-statistics');
exports = module.exports = {
  name: "Total distance (AF)",
  oldTime: false,
  old: { x: 0, y: 0 },
  sum: 0,
  add: function (frame, params) { 
      var dist = 0;
	if (!this.oldTime || (frame.elapsedTime > this.oldTime + params['resolution'])) {
	  dist = Math.sqrt(Math.pow(frame.cv[0].position.x - this.old.x, 2) + Math.pow(frame.cv[0].position.y - this.old.y, 2));
	  this.oldTime = frame.elapsedTime;
	  this.old = frame.cv[0].position;
	  if (dist > 0) this.sum += dist;
	  console.log(this.sum, this.oldTime, this.old, dist);
	}
    

  },

  result: function (params) { 
    return (this.sum / config.camHeight * config.arenaWidth).toFixed(2);
  },

  parameters: [ { name: 'resolution', units: 's' } ]

}
