'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Job = require(__dirname + '/../model/job');
const errorHandle = require(__dirname + '/../lib/error_handler');
const jwtAuth = require(__dirname + '/../lib/jwt');

var jobRouter = module.exports = exports = express.Router();


//GET job/active Archive = f
jobRouter.get('/active', jwtAuth, (req, res) => {
  Job.find({isArchived:false}, (err, data) => {
    if (err) return errorHandle(err, res);
    res.status(200).json(data);
  });
});

//GET job/active Archive = t
jobRouter.get('/archived', jwtAuth, (req, res) => {
  Job.find({isArchived:true}, (err, data) => {
    if (err) return errorHandle(err, res);
    res.status(200).json(data);
  });
});


jobRouter.post('/', jsonParser, jwtAuth, (req, res) => {
  var newJob = new Job(req.body);
  newJob.save((err, data) => {
    if (err) return errorHandle(err, res);
    res.status(200).json(data);
  });
});


jobRouter.put('/:id', jsonParser, jwtAuth, (req, res) => {
  var jobData = req.body;
  delete jobData._id;
  Job.update({ _id: req.params.id }, jobData, (err) => {
    if (err) return errorHandle(err, res);
    res.status(200).json({ msg: 'success' });
  });
});

jobRouter.delete('/:id', jwtAuth, (req, res) => {
  Job.remove({ _id: req.params.id }, (err) => {
    if (err) return errorHandle(err, res);
    res.status(200).json({ msg: 'success' });
  });
});
