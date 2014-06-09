var mongoose = require("mongoose-paginate");

var SessionSchema = new mongoose.Schema({
  name: String,
  code: String,
  xml: String,
  zones: {},
  createdAt: { type: Date, default: Date.now }
});

mongoose.model('Session', SessionSchema);
