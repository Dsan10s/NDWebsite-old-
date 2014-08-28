var mongoose = require('mongoose');

var AdminSchema = new mongoose.Schema({
  username: String, 
  password: String
});

module.exports = AdminSchema;