'use strict';
const Event = require('../model/event');

module.exports = function (job, cb) {
  let value;
  Event.find({
    jobId: job[0]._id
  }, (err, events) => {
    if (err) return err;
    value = events.reduce((p, c) => {
      return p + c.value;
    }, 0);
    job.statusValue = value;
    cb(job);
  });
};
