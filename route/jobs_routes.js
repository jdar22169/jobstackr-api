'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Job = require(__dirname + '/../model/job');
const errorHandle = require(__dirname + '/../lib/error_handler');
const jwtAuth = require(__dirname + '/../lib/jwt');

var jobRouter = module.exports = exports = express.Router();

jobRouter.get('/jobs', (req, res) => {
  Job.find({}, (err, data) => {
    if (err) return errorHandle(err, res);
    res.status(200).json(data);
  });
});

jobRouter.get('/jobs', jwtAuth, (req, res) => {
  Job.find({jobID: req.user._id}, (err, data) => {
    if (err) return errorHandle(err, res);
    res.status(200).json(data);
  });
});

jobRouter.post('/jobs', jsonParser, (req, res) => {
  var newJob = new Job(req.body);
  newJob.save((err, data) => {
    if (err) return errorHandle(err, res);
    res.status(200).json(data);
  });
});

jobRouter.put('/jobs/:id', jsonParser, (req, res) => {
  var jobData = req.body;
  delete jobData._id;
  Job.update({ _id: req.params.id }, jobData, (err) => {
    if (err) return errorHandle(err, res);
    res.status(200).json({ msg: 'success' });
  });
});

jobRouter.delete('/jobs/:id', (req, res) => {
  Job.remove({ _id: req.params.id }, (err) => {
    if (err) return errorHandle(err, res);
    res.status(200).json({ msg: 'success' });
  });
});
