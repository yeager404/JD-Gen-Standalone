const mongoose = require('mongoose');

const Response = new mongoose.Schema({
  email:{
    type: String,
    required: true
  },
  resume:{
    type:String,
    required: true
  }
});

module.exports = mongoose.model('Response', Response);