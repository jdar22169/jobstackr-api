'use strict';
const mongoose = require('mongoose');



const Event = new mongoose.Schema({
  jobId: 'string',
  typeId: 'string',
  note: 'string',
  value: 'number'
});


// Event.statics.createEvent(event){
//   let newEvent = new this(event)
//   this.find({_id:event.jobId}, (err,data)=>{
//     console.log(data);
//   })
// }
//
//
// Event.post('save', function (event) {
//   console.log();
//   // Job.find({_id:event.jobId}, (err,data) => {
//   //   updateStatusValue(data, function(job){
//   //      console.log(job);
//   //   })
//   // });
// //
// });



module.exports = mongoose.model('event', Event);
