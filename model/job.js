'use strict';

const mongoose = require('mongoose');

const Job = new mongoose.Schema({
  typeId: 'number',
  title: 'string',
  company: 'string',
  url: 'string',
  isClosed: 'string',
  isToday: 'string',
  status: 'string',
  description: 'string',
  statusValue: 'number'
});

module.exports = mongoose.model('job', Job);
