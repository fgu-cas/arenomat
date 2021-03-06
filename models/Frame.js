var mongoose = require("mongoose-paginate"),
        Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

var FrameSchema = new mongoose.Schema({
  session: {type: ObjectId, required: true, ref: 'Session'},
  createdAt: {type: Date, default: Date.now},
  tracked: Boolean,
  cv: [],
  actions: {},
  elapsedTime: Number,
  distance: Number,
  output: {},
  zones: [],
  shocked: Number,
  webcam: String,
});

mongoose.model('Frame', FrameSchema);
