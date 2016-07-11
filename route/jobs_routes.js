'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Job = require(__dirname + '/../model/job');
const jwtAuth = require(__dirname + '/../lib/jwt');

var jobRouter = module.exports = exports = express.Router();


//TODO return only jobs that belong to user
jobRouter.get('/active', jwtAuth, (req, res, next) => {
  Job.find({isArchived:false}, (err, data) => {
    if (err) return next(new Error(err));
    res.status(200).json(data);
  });
});

//TODO return only jobs that belong to user
jobRouter.get('/archived', jwtAuth, (req, res, next) => {
  Job.find({isArchived:true}, (err, data) => {
    if (err) return next(new Error(err));
    res.status(200).json(data);
  });
});

//TODO check a user owns job be for modifying
jobRouter.post('/', jsonParser, jwtAuth, (req, res, next) => {
  var newJob = new Job(req.body);
  newJob.save((err, data) => {
    if (err) return next(new Error(err));
    res.status(200).json(data);
  });
});

//TODO check a user owns job be for modifying
jobRouter.put('/:id', jsonParser, jwtAuth, (req, res, next) => {
  var jobData = req.body;
  delete jobData._id;
  Job.update({ _id: req.params.id }, jobData, (err) => {
    if (err) return next(new Error(err));
    res.status(200).json({ msg: 'success' });
  });
});

//TODO check a user owns job be for modifying
jobRouter.delete('/:id', jwtAuth, (req, res, next) => {
  Job.remove({ _id: req.params.id }, (err) => {
    if (err) return next(new Error(err));
    res.status(200).json({ msg: 'success' });
  });
});
