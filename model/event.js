'use strict';

const mongoose = require('mongoose');

const Event = new mongoose.Schema({
  jobId: 'integer',
  typeId: 'integer',
  note: 'string'
});

module.exports = mongoose.model('event', Event);
