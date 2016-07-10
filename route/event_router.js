'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const Event = require('../model/events.js');

const eventRouter = module.exports = express.Router();

eventRouter.post('/jobs/events', bodyParser, (req,res,next) => {
  let newEvent = new Event(req.body);
  newEvent.save((err, events) => {
    if(err) return next(err);
    res.json(events);
  });
});

eventRouter.get('/jobs/events/:typeId', (req,res,next) => {
  Event.find({typeId:req.params.typeId}, (err,events) => {
    if(err) return next(err);
    res.json(events);
  });
});

eventRouter.get('/jobs/events/:jobId', (req,res,next) => {
  Event.find({jobId:req.params.jobId}, (err,events) => {
    if(err) return next(err);
    res.json(events);
  });
});

eventRouter.get('/:jobId/:typeId', (req,res,next) => {
  Event.find({jobId:req.params.jobId, typeId: req.params.typeId}, (err,events) => {
    if(err) return next(err);
    res.json(events);
  });
});

eventRouter.put('/jobs/events', bodyParser, (req,res,next) => {
  Event.findOneAndUpdate({_id:req.body._id}, req.body, (err,event) => {
    if(err) return next(err);
    res.json({message: 'You have successfully updated event'});
  });
});

eventRouter.delete('/jobs/events/:id', (req,res,next) => {
  Event.findOneAndRemove({_id:req.params.id}, null, (err,event) => {
    if(err) return next(err);
    res.json({message: 'You have successfully deleted event'});
  });
});
