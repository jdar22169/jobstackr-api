'use strict';

const jwt = require('jsonwebtoken');
const User = require('../model/user');
const secret = process.env.SECRET || 'changeme';

module.exports = function(req, res, next) {
  let token = req.headers.token;
  let tokenErr = new Error('Failed to authorize');
  let decodedToken;

  if(!token) return next(tokenErr);

  try {
    decodedToken = jwt.verify(token, secret);
  } catch(e) {
    return next(tokenErr);
  }

  User.findOne({_id: decodedToken._id}, (err, user) => {
    if (!user || err) return next(tokenErr);
    req.user = user;
    next();
  });
};
