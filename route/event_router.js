'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();

const Event = require('../model/event.js');
const Job = require('../model/job.js');
const jwtAuth = require(__dirname + '/../lib/jwt');
const updateStatusValue = require('../lib/update_job_status_value');

const eventRouter = module.exports = express.Router();

eventRouter.get('/active', jwtAuth, (req, res, next) => {
  let jobsArray = [];
  Job.find({
    isArchived: false,
    userId: req.user._id
  }, (err, jobs) => {
    if (err) return next(new Error(err));
    jobsArray = jobs.map(function (job) {
      let results = [];
      results.push(job._id);
      return results;
    });
    Event.find()
      .where('jobId')
      .in(jobsArray)
      .exec(function (err, events) {
        res.json(events);
      });
  });
});

eventRouter.get('/archived', jwtAuth, (req, res, next) => {
  let jobsArray = [];
  Job.find({
    isArchived: true,
    userId: req.user._id
  }, (err, jobs) => {
    if (err) return next(new Error(err));
    jobsArray = jobs.map(function (job) {
      let results = [];
      results.push(job._id);
      return results;
    });
    Event.find()
      .where('jobId')
      .in(jobsArray)
      .exec(function (err, events) {
        res.json(events);
      });
  });
});

eventRouter.post('/', bodyParser, jwtAuth, (req, res, next) => {

  let newEvent = new Event(req.body);

  newEvent.save((err, events) => {
    console.log("new event", events);
    console.log("--------------------");
    if (err) return next(new Error(err));
    Job.find({
      _id: req.body.jobId
    }, (err, data) => {
      console.log("found", data);
      console.log("--------------------");
      updateStatusValue(data, function (job) {
        console.log("updated", job);
        console.log("--------------------");
        Job.findOneAndUpdate({
          _id: job[0]._id
        }, job[0], (err, data) => {
          console.log("saved job", data);
          console.log("--------------------");
          res.json(events);
        });
      });
    });

  });
});

eventRouter.put('/', bodyParser, jwtAuth, (req, res, next) => {
  Event.findOneAndUpdate({
    _id: req.body._id
  }, req.body, (err, event) => {
    if (err) return next(new Error(err));
    res.json({
      message: 'You have successfully updated event',
      data: event
    });
  });
});

eventRouter.delete('/:id', jwtAuth, (req, res, next) => {
  Event.findOneAndRemove({
    _id: req.params.id
  }, null, (err, events) => {
    if (err) return next(new Error(err));
    res.json({
      message: 'You have successfully deleted event',
      data: events
    });

  });
});
