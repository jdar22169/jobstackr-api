'use strict';
const Event = require('../model/event');
const EventType = require('../model/eventtype');

var getEventTypeValue = function (eventTypes, id) {
  let results = eventTypes.filter(function(e) {
    return e._id == id;
  });
  return results;
};

module.exports = function (req, res, next) {
  EventType.find({}, (err, eventTypes) => {
    Event.find({
      jobId: req.body._id
    }, (err, events) => {
      if (err) return next(err);
      req.body.statusValue = events.reduce((p, c) => {
        return p + getEventTypeValue(eventTypes,c.typeId)[0].value;
      }, 0);
      next();
    });
  });
};
