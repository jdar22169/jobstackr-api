'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./lib/error_handler');
const morgan = require('morgan');



const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost/dev_db';

mongoose.connect(dbUrl);


const authRoutes = require('./route/auth_routes');
const jobsRoutes = require('./route/jobs_routes');
const eventRoutes = require('./route/event_router.js');

const linkRoutes = require('./route/link_routes.js');

app.use(morgan('dev'));
app.use(cors());
app.use('/', authRoutes);
app.use('/jobs', jobsRoutes);
app.use('/events', eventRoutes);
app.use('/link', linkRoutes);


app.use((req, res) => {
  res.status(404).json({message: 'not found'});
});

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log('up on '+ process.env.PORT || 3000);
});
