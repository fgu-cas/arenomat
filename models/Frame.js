var mongoose = require("mongoose-paginate");

var FrameSchema = new mongoose.Schema({
  session_id: String,
  tracked: Boolean,
  cv: [],
  output: [],
  webcam: String,
  date: {type: Date, default: Date.now}
});

mongoose.model('Frame', FrameSchema);
