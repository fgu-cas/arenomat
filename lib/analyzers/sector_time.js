require('descriptive-statistics');
exports = module.exports = {
  name: "Sector time",
  add: function (doc, params) {  },
  result: function (params) { },
  analyze: function (data) {
    var old = 0;

    return Math.floor(data.map(function (frame) {
        var change = frame.shocked != old;
	old = frame.shocked;
        return change;
    }).sum / 2);
  },
  parameters: []

}