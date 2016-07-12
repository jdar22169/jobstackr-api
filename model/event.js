'use strict';

const mongoose = require('mongoose');

const Event = new mongoose.Schema({
  jobId: 'string',
  typeId: 'string',
  note: 'string'
});

module.exports = mongoose.model('event', Event);
