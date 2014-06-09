var mongoose = require("mongoose-paginate")
  , timestamps = require('mongoose-timestamp');

var SessionSchema = new mongoose.Schema({
  name: String,
  code: String,
  xml: String,
  zones: {}
});

SessionSchema.plugin(timestamps);
mongoose.model('Session', SessionSchema);
