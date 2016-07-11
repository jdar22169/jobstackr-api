'use strict';

const mongoose = require('mongoose');

const Job = new mongoose.Schema({
  typeId: 'string',
  title: 'string',
  company: 'string',
  url: 'string',
  isClosed: 'boolean',
  isToday: 'boolean',
  description: 'string',
  statusValue: 'number',
  isArchived: 'boolean'
});

module.exports = mongoose.model('job', Job);
