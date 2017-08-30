const mongoose = require('mongoose');
const { Schema } = mongoose;



const userSchema = Schema({
  nickName: {type: String},
  fullName: {type: String},
  created: {type: Date, required: true, default: Date.now }
});

module.exports = mongoose.models.user || mongoose.model('user', userSchema);
