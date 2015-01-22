var mongoose = require("mongoose-paginate"),
        Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

var SessionSchema = new mongoose.Schema({
  name: String,
  day: String,
  subject: String,
  person: String,
  code: String,
  xml: String,
  shocked: Number,
  distance: Number,
  zones: {},
  analyze: {},
  createdAt: {type: Date, default: Date.now},
  frames: [{type: Schema.Types.ObjectId, ref:'Frame'}] 
});

SessionSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    Frames.remove({session: this._id}).exec();
    next();
});

mongoose.model('Session', SessionSchema);
