require('descriptive-statistics');

function analyze(data) {
    var old = 0;

    return data.map(function (frame) {
        var change = frame.shocked != old;
	old = frame.shocked;
        return change;
    }).sum;
}

exports = module.exports = analyze;
