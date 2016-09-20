'use strict';
const mongoose = require('mongoose');
const Event = new mongoose.Schema({
  date: 'number',
  jobId: 'string',
  typeId: 'string',
  note: 'string',
  value: 'number'
});

module.exports = mongoose.model('event', Event);
