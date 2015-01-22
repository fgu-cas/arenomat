require('descriptive-statistics');

function analyze(data) {
    var old = 0;

    return Math.floor(data.map(function (frame) {
        var change = frame.shocked != old;
	old = frame.shocked;
        return change;
    }).sum / 2);
}

exports = module.exports = analyze;
