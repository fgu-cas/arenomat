var mongoose = require("mongoose-paginate");

var ExperimentSchema = new mongoose.Schema({
  name: String,
  code: String,
  xml: String,
});

mongoose.model('Experiment', ExperimentSchema);

console.log('exp');
