const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

require(__dirname + '/../server');
const mongoose = require('mongoose');

process.env.MONGOLABL_URI = 'mongodb://localhost/job_test';
const Job = require(__dirname + '/../model/job');

describe('The Dash_Job API', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should pass the schmoke test', () => {
    expect(true).to.eql(true);
  });

  it('should be able to retrieve all Jobs', (done) => {
    request('localhost:3000')
    .get('/jobs')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should create a job entry with a POST request', (done) => {
    request('localhost:3000')
    .post('/jobs')
    .send({ title: 'Web Dev' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.title).to.eql('Web Dev');
      expect(res.body).to.have.property('_id');
      done();
    });
  });

  describe('rest requests that require a job already in db', () => {

    beforeEach((done) => {
      Job.create({ name: 'test-beforeEach' }, (err, data) => {
        this.testJob = data;
        done();
      });
    });

    it('shoud be able to update a job', (done) => {
      request('localhost:3000')
      .put('/jobs/' + this.testJob._id)
      .send({ name: 'new-test-beforeEach' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('success');
        done();
      });
    });

    it('should be able to delete a job', (done) => {
      request('localhost:3000')
      .delete('/jobs/' + this.testJob._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('success');
        done();
      });
    });
  });
});
