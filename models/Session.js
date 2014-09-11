var mongoose = require("mongoose-paginate");

var SessionSchema = new mongoose.Schema({
  name: String,
  code: String,
  xml: String,
  shocked: Number,
  distance: Number,
  zones: {},
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Session', SessionSchema);
