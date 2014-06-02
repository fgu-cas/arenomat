var mongoose = require("mongoose-paginate");

var ExperimentSchema = new mongoose.Schema({
  name: String,
  code: String,
  xml: String,
  zones: []
});

mongoose.model('Experiment', ExperimentSchema);
