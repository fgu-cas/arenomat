require('descriptive-statistics');

function _() {
    this.name = "_";
}

_.prototype.analyze = function(data) {
    return false;
}
_.prototype.parameters = function() {
    return  [ { name: 'time slices', units: ''} ]
}

_.prototype.add = function(doc) {
    console.log(doc);
}
_.prototype.result = function() {
    console.log('result _' );
}

exports = module.exports = new _();
exports._ = _;