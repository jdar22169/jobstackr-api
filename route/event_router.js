'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();

const Event = require('../model/event.js');
const Job = require('../model/job.js');
const jwtAuth = require(__dirname + '/../lib/jwt');


const eventRouter = module.exports = express.Router();

eventRouter.get('/active', jwtAuth, (req,res, next) => {
  let jobsArray = [];
  Job.find({isArchived: false, userId:req.user._id}, (err, jobs) => {
    if (err) return next(new Error(err));
    jobsArray = jobs.map(function(job){
      let results = [];
      results.push(job._id);
      return results;
    });
    Event.find()
    .where('jobId')
    .in(jobsArray)
    .exec(function(err,events){
      res.json(events);
    });
  });
});


eventRouter.get('/archived', jwtAuth,(req, res, next) => {
  let jobsArray = [];
  Job.find({isArchived: true, userId:req.user._id}, (err, jobs) => {
    if (err) return next(new Error(err));
    jobsArray = jobs.map(function(job){
      let results = [];
      results.push(job._id);
      return results;
    });
    Event.find()
    .where('jobId')
    .in(jobsArray)
    .exec(function(err,events){
      res.json(events);
    });
  });
});


//TODO check that a user is only modifying an event they that belongs to a job they own (middle ware???)
//TODO implement jobstatusvalue middle ware
eventRouter.post('/', bodyParser, jwtAuth, (req, res, next) => {
  let newEvent = new Event(req.body);
  newEvent.save((err, events) => {
    if (err) return next(new Error(err));
    res.json(events);
  });
});


//TODO check that a user is only modifying an event they that belongs to a job they own (middle ware???)
//TODO implement jobstatusvalue middle ware
eventRouter.put('/', bodyParser, jwtAuth, (req, res, next) => {
  Event.findOneAndUpdate({_id:req.body._id}, req.body, (err,event) => {
    if (err) return next(new Error(err));
    res.json({message: 'You have successfully updated event', data:event});
  });
});

//TODO check that a user is only modifying an event they that belongs to a job they own (middle ware???)
//TODO implement jobstatusvalue middle ware
eventRouter.delete('/:id', jwtAuth, (req, res, next) => {
  Event.findOneAndRemove({_id:req.params.id}, null, (err,events) => {
    if (err) return next(new Error(err));
    res.json({message: 'You have successfully deleted event', data:events});

  });
});
