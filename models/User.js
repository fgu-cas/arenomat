var mongoose = require("mongoose-paginate");

var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

mongoose.model('User', UserSchema);
