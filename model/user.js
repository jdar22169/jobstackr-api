'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const secret = process.env.SECRET || 'changeme';
const jwt = require('jsonwebtoken');

const Route = new mongoose.Schema({
  nickname: {type: String, required: true},
  route_id: {type: String, required: true},
  stop_id: {type: String, required: true}
});

const User = new mongoose.Schema({
  email: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  routes: {type: [Route], required: false}
});


User.methods.hashPassword = function() {
  return bcrypt.hashSync(this.password, 8);
};

User.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

User.methods.generateToken = function() {
  return jwt.sign({_id: this._id}, secret);
};

module.exports = mongoose.model('user', User);
