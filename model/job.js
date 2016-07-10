'use strict';

const mongoose = require('mongoose');

const Job = new mongoose.Schema({
  typeId: 'integer',
  title: 'string',
  company: 'string',
  url: 'string',
  isClosed: 'string',
  isToday: 'string',
  status: 'string',
  description: 'string'
});

module.exports = mongoose.model('job', Job);
