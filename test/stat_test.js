'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;

const Event = require('../model/event.js');
const Job = require('../model/job.js');
const User = require('../model/user.js');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'changeme';
const mongoose = require('mongoose');
const dbPort = process.env.MONGOLAB_URI;
process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
require('../server.js');

describe('Stat Route Tests', () => {
  let job1;
  let testUser;
  let token;
  let testEvent1;
  let testEvent2;
  let testEvent3;

  beforeEach((done) => {
    let newUser = new User({
      username:'testuser',
      password:'$2a$08$pMewnngJdnSYxMz6dVcl8.H6PSiCqGCEP8Gri5zA6asB/qChSFMHq'
    });
    newUser.save((err,user) => {
      testUser = user;
      token = jwt.sign({
        _id: testUser._id
      }, secret);
      Job.create({
        name:'Job1',
        isArchived:false,
        userId:testUser._id
      }, (err,data) => {
        job1 = data;
        Event.create({
          jobId: job1._id,
          userId:testUser._id,
          createdAt:moment('2016-09-10'),
          typeId:'0'
        }, (err,data) => {
          testEvent1 = data;
        });
        Event.create({
          jobId:job1._id,
          userId:testUser._id,
          createdAt:moment(),
          typeId:'1'
        }, (err,data) => {
          testEvent2 = data;
        });
        Event.create({
          jobId:job1._id,
          userId:testUser._id,
          createdAt:moment(),
          typeId:'0'
        }, (err,data) => {
          testEvent3 = data;
          done();
        });
      });
    });
  });


  afterEach((done)=> {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should filter by createdAt', (done) => {
    request('localhost:3000')
    .get('/stats/activeStats')
    .set('token', token)
    .end((err,res)=> {
      expect(err).to.eql(null);
      expect(res.body[0].week0.length).to.eql(1);
      expect(res.body[0].week0[0].typeId).to.eql('0');
      expect(res.body[2].week2.length).to.eql(1);
      done();
    });
  });
});
