'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const User = require('../model/user');
const basicHTTP = require('../lib/basic_auth');

const authRouter = module.exports = exports = express.Router();


authRouter.post('/signup', bodyParser, (req, res, next) => {
  let newUser = new User(req.body);
  let hashedPassword = newUser.hashPassword();
  newUser.password = hashedPassword;
  req.body.password = null;
  User.findOne({username: req.body.username}, (err, user) => {
    if (user) return next(new Error('User already exists' ));
    if (err) return next(new Error(err));
    newUser.save((err, user) => {
      if (err) return next(new Error(err));
      let obj = {};
      obj.token =  user.generateToken();
      obj.userId = user._id;
      res.json(obj);
    });
  });
});

authRouter.get('/signin', basicHTTP, (req, res, next) => {
  User.findOne({username: req.auth.username}, (err, user) => {
    if (err || !user) return next(new Error('user not found or error'
    ));
    if (!user.comparePassword(req.auth.password)) return next(new Error('Could not sign in'));
    let obj = {};
    obj.token =  user.generateToken();
    obj.userId = user._id;
    res.json(obj);
  });
});
