/**
 * Arduino class
 */
function Config() {
    return {
	camWidth: 800, // px
	camHeight: 600, // px
	arenaWidth: 0.800 // m
    }
}

exports = module.exports = new Config();
exports.Config = Config;