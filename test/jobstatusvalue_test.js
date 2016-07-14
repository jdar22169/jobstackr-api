// 'use strict';
// const mongoose = require('mongoose');
// const Job = require('../model/job');
// const Event = require('../model/event');
// const getValue = require('../lib/update_job_status_value');
//
// const chai = require('chai');
// const expect = chai.expect;
//
// mongoose.connect('mongodb://localhost/test_db');
// let job1;
// let job2;
//
// describe('unit test', () => {
//
//   beforeEach((done) => {
//     new Job({
//       title: 'Job 1'
//     }).save((err, data) => {
//       job1 = data;
//       new Job({
//         title: 'Job 2'
//       }).save((err, data) => {
//         if (err) console.log(err);
//         job2 = data;
//         new Event({
//           jobId: job1._id,
//           value: 1
//         }).save(() => {
//           new Event({
//             jobId: job2._id,
//             value: 1
//           }).save(() => {
//             new Event({
//               jobId: job2._id,
//               value: 2
//             }).save(() => {
//               new Event({
//                 jobId: job2._id,
//                 value: 3
//               }).save(() => {
//                 done();
//               });
//             });
//           });
//         });
//       });
//     });
//   });
//
//   afterEach((done) => {
//     Job.remove({}, function () {
//       Event.remove({}, function () {
//         done();
//       });
//     });
//   });
//
//   it('it should return value of 1 for job 1', (done) => {
//     getValue(job1, function (job) {
//       expect(job.statusValue).to.eql(1);
//       done();
//     });
//   });
//
//   it('it should return value of 6 for job 2', (done) => {
//     getValue(job2, function (job) {
//       expect(job.statusValue).to.eql(6);
//       done();
//     });
//   });
// });
