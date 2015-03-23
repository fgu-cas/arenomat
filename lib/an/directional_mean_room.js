require('descriptive-statistics');
exports = module.exports = {
  name: "Directional mean (RF)",
  analyze: function (data) {
    var old = 0;

    return Math.floor(data.map(function (frame) {
        var change = frame.shocked != old;
	old = frame.shocked;
        return change;
    }).sum / 2);
  },
  parameters: [ ]

}