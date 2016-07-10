'use strict';

const Job = require('../model/job');
const EventType = require('../model/eventtype');

const Event = require('../model/event');
const mongoose = require('mongoose');
process.env.MONGODB_URI = 'mongodb://localhost/test_db';
const chai = require('chai');
const expect = chai.expect;
const jobStatusValue = require('./../lib/job_status_value');

mongoose.createConnection('mongodb://localhost/test_db');

describe('Job Status Value unit', () => {
  let newjob;
  let etPhonescreen;
  let etApplied;
  beforeEach((done) => {
    newjob = new Job({
      title: 'Fullstack Javascript Developer',
      status: 'unapplied'
    });
    newjob.save((err, job) => {
      newjob = job;
    });

    etApplied = new EventType({
      name: 'Applied',
      value: 1
    });
    etApplied.save();

    etPhonescreen = new EventType({
      name: 'Phone Screen',
      value: 2
    });
    etPhonescreen.save(() => {
      done();
    });

  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should set status value 1 for job with only apply ', (done) => {
    let req = {};
    var event = new Event({
      jobId: newjob._id,
      typeId: etApplied._id
    });
    event.save(() => {
      req.body = newjob;
      jobStatusValue(req, null, ()=>{
        expect(req.body.statusValue).to.eql(1);
        done();
      });
    });
  });

  it('should set status value 1 for job with only apply ', (done) => {
    let req = {};
    var eventone = new Event({
      jobId: newjob._id,
      typeId: etPhonescreen._id
    });
    eventone.save();
    var eventtwo = new Event({
      jobId: newjob._id,
      typeId: etApplied._id
    });
    eventtwo.save(() => {
      req.body = newjob;
      jobStatusValue(req, null, ()=>{
        expect(req.body.statusValue).to.eql(3);
        done();
      });
    });
  });
});
