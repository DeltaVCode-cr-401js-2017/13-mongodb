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
