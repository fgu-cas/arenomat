/**
 * Arduino class
 */
function Config() {
    return {
	camWidth: 800, // px
	camHeight: 600, // px
	arenaWidth: 800 // mm
    }
}

exports = module.exports = new Config();
exports.Config = Config;