'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Job = require(__dirname + '/../model/job');
const jwtAuth = require(__dirname + '/../lib/jwt');

var jobRouter = module.exports = exports = express.Router();


jobRouter.get('/active', jwtAuth, (req, res, next) => {
  Job.find({isArchived:false, userId:req.user._id}, (err, data) => {
    if (err) return next(new Error(err));
    res.status(200).json(data);
  });
});

jobRouter.get('/archived', jwtAuth, (req, res, next) => {
  Job.find({isArchived:true, userId:req.user._id}, (err, data) => {
    if (err) return next(new Error(err));
    res.status(200).json(data);
  });
});

//TODO check a user owns job be for modifying
jobRouter.post('/', jsonParser, jwtAuth, (req, res, next) => {
  var newJob = new Job(req.body);
  newJob.userId = req.user._id;
  newJob.save((err, data) => {
    if (err) return next(new Error(err));
    res.status(200).json(data);
  });
});

jobRouter.put('/:id', jsonParser, jwtAuth, (req, res, next) => {
  var jobData = req.body;
  if (req.user._id != req.body.userId) return next(new Error('not authorized'))
  Job.update({ _id: req.params.id }, jobData, (err) => {
    if (err) return next(new Error(err));
    res.status(200).json({ msg: 'success' });
  });
});

jobRouter.delete('/:id', jwtAuth, (req, res, next) => {
  Job.remove({ _id: req.params.id, userId: req.user._id }, (err,data) => {
    if (err) return next(new Error(err));
    res.status(200).json({ msg: 'success' });
  });
});
