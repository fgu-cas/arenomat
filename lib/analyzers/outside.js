require('descriptive-statistics');

var ratio = 0.8;

function analyze(data) {
    return data.map(function (frame) {
    if (frame.cv.position && frame.cv.position[0] && frame.cv.position[0].x) {
	console.log(frame.cv.position[0].x);
	return Math.sqrt(Math.pow(frame.cv.position[0].x - 300, 2) + Math.pow(frame.cv.position[0].y - 300, 2)) > 300 * ratio;
    }
	// TODO: read width of arena from config
    }).sum / data.number;

    
}

exports = module.exports = analyze;
