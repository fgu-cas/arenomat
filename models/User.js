var mongoose = require("mongoose-paginate");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

mongoose.model('User', UserSchema);
