'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const morgan = require('morgan');
const errorHandler = require('./lib/error_handler');


const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost/dev_db';

mongoose.connect(dbUrl);


const authRoutes = require('./route/auth_routes');
const jobsRoutes = require('./route/jobs_routes');
const eventRoutes = require('./route/event_router.js');


//app.use(morgan());
app.use('/', authRoutes);
app.use('/jobs', jobsRoutes);
app.use('/events', eventRoutes);

//TODO on / routes say res.json({message:'One Minute Away API V1'})

app.use((req, res) => {
  res.status(404).json({message: 'not found'});
});

app.use(errorHandler);


app.listen(process.env.PORT || 3000, () => {
  console.log('up on 3000');
});
