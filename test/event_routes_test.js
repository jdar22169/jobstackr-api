'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;

const Event = require('../model/event.js');
const Job = require('../model/job.js');
const User = require(__dirname + '/../model/user');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'changeme';
const mongoose = require('mongoose');
const dbPort = process.env.MONGOLAB_URI;
process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
require('../server.js');

describe('Event Route Tests', () => {
  let job1;
  let job2;
  let testUser;
  let token;
  let testEvent;
  beforeEach((done) => {
    let newUser = new User({
      username: 'testuser',
      password: '$2a$08$pMewnngJdnSYxMz6dVcl8.H6PSiCqGCEP8Gri5zA6asB/qChSFMHq',
      email: 'test@test.com'
    });
    newUser.save((err, user) => {
      testUser = user;
      token = jwt.sign({
        _id: testUser._id
      }, secret);
      Job.create({
        name: 'Job1',
        isArchived: true,
        userId: testUser._id
      }, (err, data) => {
        job1 = data;
        Job.create({
          name: 'Job2',
          userId: testUser._id,
          isArchived: false
        }, (err, data) => {
          job2 = data;
          Event.create({
            jobId: job1._id
          });
          Event.create({
            jobId: job1._id
          });
          Event.create({
            jobId: job2._id
          });
          Event.create({
            jobId: job2._id
          });
          Event.create({
            jobId: job2._id
          }, (err, data) => {
            testEvent = data;
            done();
          });
        });
      });
    });

  });

  afterEach((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should post a new event', (done) => {
    request('localhost:3000')
      .post('/events')
      .set('token', token)
      .send({
        jobId: 1,
        typeId: 1,
        note: 'test'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.note).to.eql('test');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should delete an event', (done) => {
    request('localhost:3000')
      .delete('/events/' + testEvent._id)
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.message).to.eql('You have successfully deleted event');
        done();
      });
  });

if (process.env.TRAVIS != 1) {
  it('should update an event', (done) => {
    testEvent.note = 'testnote';
    request('localhost:3000')
      .put('/events')
      .send(testEvent)
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.message).to.eql('You have successfully updated event');
        done();
      });
  });
}

  //TODO write route and activate test
  it('should get events with archived parent jobs', (done) => {
    request('localhost:3000')
      .get('/events/archived')
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.length).to.eql(2);
        done();
      });
  });

  it('should get events with ACTIVE parent jobs', (done) => {
    request('localhost:3000')
      .get('/events/active')
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.length).to.eql(3);
        done();
      });
  });
});
