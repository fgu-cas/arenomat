var mongoose = require("mongoose-paginate");

var FrameSchema = new mongoose.Schema({
  session_id: String,
  timestamp: Number,
  tracked: Boolean,
  cv: [],
  actions: {},
  elapsedTime: Number,
  output: {},
  webcam: String,
});

mongoose.model('Frame', FrameSchema);
