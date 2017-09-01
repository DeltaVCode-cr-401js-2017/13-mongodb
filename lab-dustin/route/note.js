'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Note = require('../model/note');
const debug = require('debug')('note:route');

const router = module.exports = new Router();

router.post('/api/note',jsonParser,function(req,res,next){
  req.body.created = new Date();
  new Note(req.body).save()
    .then(note => res.json(note))
    .catch(next);
});

router.put('/api/note/:id',jsonParser,function(req,res,next){
  console.log('HITTING PUT REQUEST');
  Note.findById(req.params.id)
    .then(note => res.json(note))
    .catch(next);
});

router.get('/api/note/:id',function(req,res,next){
  Note.findById(req.params.id)
    .then(note => res.json(note))
    .catch(next);
});
