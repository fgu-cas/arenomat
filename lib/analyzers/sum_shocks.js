require('descriptive-statistics');

function analyze(data) {
    return data.map(function (frame) {
        return frame.shocked;
    }).sum;
}

exports = module.exports = analyze;
