var mongoose = require("mongoose-paginate");

var SessionSchema = new mongoose.Schema({
  name: String,
  code: String,
  xml: String,
  zones: {}
});

mongoose.model('Session', SessionSchema);
