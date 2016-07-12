'use strict';

const mongoose = require('mongoose');

const EventType = new mongoose.Schema({
  value: 'number',
  name: 'string',
  description: 'string'
});

module.exports = mongoose.model('eventtype', EventType);
