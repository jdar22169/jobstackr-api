'use strict';

const mongoose = require('mongoose');

const Job = new mongoose.Schema({});

module.exports = mongoose.model('job', Job);
