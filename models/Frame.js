var mongoose = require("mongoose-paginate"),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var FrameSchema = new mongoose.Schema({
  session: { type: ObjectId, required: true, ref: 'Session' },
  timestamp: String,
  tracked: Boolean,
  cv: [],
  actions: {},
  elapsedTime: Number,
  output: {},
  webcam: String,
});

mongoose.model('Frame', FrameSchema);
