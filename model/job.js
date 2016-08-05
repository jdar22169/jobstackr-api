'use strict';

const mongoose = require('mongoose');

const Job = new mongoose.Schema({
  typeId: 'string',
  title: 'string',
  userId: 'string',
  company: 'string',
  url: 'string',
  isClosed: 'boolean',
  isToday: 'boolean',
  description: 'string',
  statusValue: { type: Number, default: 0 },
  isArchived: 'boolean'
});

module.exports = mongoose.model('job', Job);
