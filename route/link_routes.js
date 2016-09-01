'use strict';

const express = require('express');
const scraperjs = require('scraperjs');
const bodyParser = require('body-parser').json();
// const jwtAuth = require(__dirname + '/../lib/jwt');

const linkRouter = module.exports = express.Router();

linkRouter.post('/', bodyParser, (req, res) => {
  let url = req.body.url;
  //let url = 'http://www.indeed.com/rc/clk?jk=3ccf8da92843d8ac&fccid=fe2d21eef233e94a '
  //let url ='http://www.indeed.com/viewjob?jk=fda1d6a5d57ec412&tk=1angq6lsmb98tcg9&from=web'
  scraperjs.StaticScraper.create(url)
    .scrape(function ($) {
      var obj = {}
      obj.company = $("span.company").map(function () {
        return $(this).text();
      }).get()[0];

       obj.title = $('#job-content font').text()

       return obj
      //return company
      //http://www.indeed.com/cmp/iMatch-Technical-Services/jobs/Front-End-Engineer-510b14f714e64ba1?q=angular
      // return {
      //   title: $('#job-content font').text(),
      //   company: $('#job-content > tbody > tr > td:nth-child(1) > div > span.company').text()
      //   //#job-content > tbody > tr > td:nth-child(1) > div > span.company
      //   //*[@id="job-content"]/tbody/tr/td[1]/div/span[1]
      //   ////*[@id="job-content"]/tbody/tr/td[1]/div/span[1]
      //   //company: $('span.company').text(),
      //   //title: $('job-content > tbody > tr > td:nth-child(1) > div > b > font').text()
      //   //#job-content > tbody > tr > td:nth-child(1) > div > b > font
      //   //#job-content > tbody > tr > td:nth-child(1) > div > b
      // };
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
