'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const mongoose = require('mongoose');
process.env.MONGOLABL_URI = 'mongodb://localhost/job_test';
const Job = require(__dirname + '/../model/job');
const User = require(__dirname + '/../model/user');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'changeme';

require(__dirname + '/../server');

describe('Job routes', () => {
  let job1_at;
  let testUser;
  let token;
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
    });
    Job.create({
      name: 'Job1',
      isArchived: true
    }, (err, data) => {
      job1_at = data;
    });
    Job.create({
      name: 'Job2',
      isArchived: true
    }, () => {
    });
    Job.create({
      name: 'Job3',
      isArchived: false
    }, () => {
    });
    Job.create({
      name: 'Job4',
      isArchived: false
    }, () => {
      done();
    });
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all ACTIVE jobs', (done) => {
    request('localhost:3000')
      .get('/jobs/active')
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.length).to.eql(2);
        expect(res.body[0].isArchived).to.eql(false);
        done();
      });
  });

  it('should be able to retrieve all ARCHIVED jobs', (done) => {
    request('localhost:3000')
      .get('/jobs/archived')
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.length).to.eql(2);
        expect(res.body[0].isArchived).to.eql(true);
        done();
      });
  });


  it('should create a job entry with a POST request', (done) => {
    request('localhost:3000')
      .post('/jobs')
      .set('token', token)
      .send({
        title: 'Web Dev'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.title).to.eql('Web Dev');
        expect(res.body).to.have.property('_id');
        done();
      });
  });


  it('shoud be able to update a job', (done) => {
    request('localhost:3000')
      .put('/jobs/' + job1_at._id)
      .set('token', token)
      .send({
        name: 'new-test-beforeEach'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('success');
        done();
      });
  });

  it('should be able to delete a job', (done) => {
    request('localhost:3000')
      .delete('/jobs/' + job1_at._id)
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('success');
        done();
      });
  });
});
