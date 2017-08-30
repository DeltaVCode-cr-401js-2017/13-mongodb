const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const User = require('../model/user');
const debug = require('debug')('app:route');


const router = module.exports = new Router();

router.post('/api/chat', jsonParser, function(req, res, next){
  debug('POST: /api/chat');
  new User(req.body).save()
    .then(user => res.json(user))
    .catch(err => next(err));
});
router.get('/api/chat/:id', jsonParser, function(req, res, next){
  debug('GET: /api/chat');
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => next(err));
});
router.put('/api/chat/:id', jsonParser, function(req, res, next){
  debug('PUT: /api/chat');
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json(user))
    .catch(err => next(err));
});
router.delete('/api/chat:id', function(req, res, next){
  debug('DELETE: /api/chat');

  User.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});
