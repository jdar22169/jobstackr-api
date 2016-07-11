'use strict';

const mongoose = require('mongoose');

const Event = new mongoose.Schema({
  jobId: {type:Number, required:true},
  typeId: {type:Number, required:true},
  note: String,
  date: Date
});

module.exports = mongoose.model('event', Event);
