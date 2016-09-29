'use strict';
const mongoose = require('mongoose');
const Event = new mongoose.Schema({
  userId: 'string',
  jobId: 'string',
  typeId: 'string',
  note: 'string',
  value: 'number'
},
{timestamps:true});

module.exports = mongoose.model('event', Event);
