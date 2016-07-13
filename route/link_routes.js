'use strict';

const express = require('express');
const scraperjs = require('scraperjs');
const bodyParser = require('body-parser').json();
const jwtAuth = require(__dirname + '/../lib/jwt');

const linkRouter = module.exports = express.Router();

linkRouter.post('/', bodyParser, (req, res, next) => {
    let url = req.body.url
  //let url = 'http://www.indeed.com/rc/clk?jk=3ccf8da92843d8ac&fccid=fe2d21eef233e94a '
  //let url ='http://www.indeed.com/viewjob?jk=fda1d6a5d57ec412&tk=1angq6lsmb98tcg9&from=web'
  scraperjs.StaticScraper.create(url)
    .scrape(function ($) {
      return {
        company: $("div#job_header span.company").text(),
        title: $("b.jobtitle font").text()
      };
    })
    .then(function (news) {
      console.log(news);
      res.json(news);
    });

  // let newEvent = new Event(req.body);
  // newEvent.save((err, events) => {
  //   if (err) return next(new Error(err));
  //   res.json(events);
  // });
});
