'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;

const Event = require('../model/events.js');
const mongoose = require('mongoose');
const dbPort = process.env.MONGOLAB_URI;
process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
require('../server.js');

describe('Event Route Tests', () => {
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  // it('should get a list of events', (done) => {
  //   request('localhost:3000')
  //   .get('/jobs/events')
  //   .end((err,res) => {
  //     expect(err).to.eql(null);
  //     expect(Array.isArray(res.body)).to.eql(true);
  //     done();
  //   });
  // });
  it('should post a new event', (done) => {
    request('localhost:3000')
    .post('/jobs/events')
    .send({jobId: 1, typeId: 1, note: 'test'})
    .end((err,res) => {
      expect(err).to.eql(null);
      expect(res.body.note).to.eql('test');
      expect(res.body).to.have.property('_id');
      done();
    });
  });
  describe('need data to test', () => {
    let testEvent;
    beforeEach((done) => {
      let newEvent = new Event({jobId:1, typeId: 1, note:'test'});
      newEvent.save((err,event) => {
        testEvent = event;
        done();
      });
    });
    it('should update an event', (done) => {
      request('localhost:3000')
      .put('/jobs/events')
      .send(testEvent)
      .end((err,res) => {
        expect(err).to.eql(null);
        expect(res.body.message).to.eql('You have successfully updated event');
        done();
      });
    });
    it('should delete an event', (done) => {
      request('localhost:3000')
      .delete('/jobs/events/' + testEvent._id)
      .end((err,res) => {
        expect(err).to.eql(null);
        expect(res.body.message).to.eql('You have successfully deleted event');
        done();
      });
    });
  });
});
