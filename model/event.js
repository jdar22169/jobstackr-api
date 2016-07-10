'use strict';

const mongoose = require('mongoose');

const Event = new mongoose.Schema({
  jobId: 'number',
  typeId: 'number',
  note: 'string'
});

module.exports = mongoose.model('event', Event);
