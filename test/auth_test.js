'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const User = require('../model/user');
const mongoose = require('mongoose');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'changeme';
const dbPort = process.env.MONGOLAB_URI;

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';

require('../server');

describe('User authorization should', () => {
  let testUser;
  beforeEach((done) => {
    let newUser = new User({
      username: 'testuser',
      password: '$2a$08$pMewnngJdnSYxMz6dVcl8.H6PSiCqGCEP8Gri5zA6asB/qChSFMHq',
      phoneNumber: '555555555',
      email: 'test@test.com',
      routes: []
    });
    newUser.save((err, user) => {
      testUser = user;
      done();
    });
  });
  afterEach((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('allow a known user to login and send a correct token', (done) => {

    request('localhost:3000')
      .get('/signin')
      .auth('testuser', 'testuser')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.token).to.eql(jwt.sign({
          _id: testUser._id
        }, secret));
        done();
      });
  });

  it('allow a new user to be created and send a token back', (done) => {
    request('localhost:3000')
      .post('/signup')
      .set('Content-Type', 'application/json')
      .send({
        username: 'user',
        password: 'password',
        phoneNumber: '555555555',
        email: 'test@test.com'
      })
      .end((err, res) => {
        User.find({
          username: 'user'
        }, (err, user) => {
          if (err) return err;
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.token).to.eql(jwt.sign({
            _id: user[0]._id
          }, secret));
          done();
        });
      });
  });


});
