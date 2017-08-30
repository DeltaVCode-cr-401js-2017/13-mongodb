'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('event:route');
const Event = require('../model/event');

const router = module.exports = new Router();

router.get('/api/event/:id', function(req,res,next){
  debug('GET /api/event');
  Event.findById(req.params.id)
  .then(item => res.json(item))
  .catch(next);
});

router.post('/api/event', jsonParser, function (req,res,next){
  debug('POST /api/event');
  new Event (req.body).save()
    .then(item => res.json(item))
    .catch(next);
});

router.put('/api/event/:id', jsonParser, function(req,res,next){
  debug('PUT /api/event');
  console.log(req.body);
  if(!req.body || Object.keys(req.body).length === 0){
    console.log('no body');
    return Promise.reject(res.sendStatus(400));
  }
  Event.findById(req.params.id, function(err,item){
    if (err) {
      return res.sendStatus(404);
    }
    else {
      for (var prop in Event.schema.paths) {
        if ((prop !== '_id') && (prop !== '__v')) {
          if (req.body[prop] !== undefined) {
            item[prop] = req.body[prop];
          }
        }
      }
      item.save()
      .then(item => res.json(item))
      .catch(next);
    }
  });
});
