'use strict';

const express = require('express');
const Event = require(__dirname + '/../model/event.js');
const jwtAuth = require(__dirname + '/../lib/jwt.js');
const moment = require('moment');

var statRouter = module.exports = exports = express.Router();

statRouter.get('/totalApply', jwtAuth, (req, res, next) => {
  Event.find({typeId:0, userId:req.user._id}, (err,events) => {
    if(err) return next(new Error(err));
    var weeks = [{week0:[]}, {week1:[]}, {week2:[]}, {week3:[]}];
    for(var i=0; i<events.length;i++){
      var applyDate = moment(events[i].createdAt);
      var currentDate = moment();
      var weekAgo = moment().subtract(7, 'days');
      var twoWeeksAgo = moment().subtract(14, 'days');
      var threeWeeksAgo = moment().subtract(21, 'days');
      if(moment(applyDate).isBetween(weekAgo, currentDate, 'days', '(]')) weeks[0].week0.push(events[i]);
      if(moment(applyDate).isBetween(twoWeeksAgo, weekAgo, 'days', '(]')) weeks[1].week1.push(events[i]);
      if(moment(applyDate).isBetween(threeWeeksAgo, twoWeeksAgo, 'days', '[]')) weeks[2].week2.push(events[i]);
      if(moment(applyDate).isBefore(threeWeeksAgo, 'days')) weeks[3].week3.push(events[i]);
    }
    res.json(weeks);
  });
});

// statRouter.get('/jobValues', jwtAuth, (req,res,next) => {
//   Job.find({userId:req.user._id}, (err,jobs) => {
//     if(err) return next(new Error(err));
//     var weeks = [{week0:[]}, {week1:[]}, {week2:[]}, {week3:[]}];
//     for(var i=0; i<jobs.length;i++){
//
//     }
//   })
// })
