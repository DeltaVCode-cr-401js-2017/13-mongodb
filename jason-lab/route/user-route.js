const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const User = require('../model/user');
const debug = require('debug')('app:user-route');


const router = module.exports = new Router();

router.post('/api/user', jsonParser, function(req, res, next){
  debug('POST: /api/user');
  new User(req.body).save()
    .then(user => res.json(user))
    .catch(err => next(err));
});
router.get('/api/user/:id', jsonParser, function(req, res, next){
  debug('GET: /api/user');
  User.findById(req.params.id)
    .populate('users')
    .then(room => {
      debug(`findById(${req.params.id})`, room);
      room ? res.json(room) : res.sendStatus(404);
    })
    .catch(err => next(err));
});
router.put('/api/user/:id', jsonParser, function(req, res, next){
  debug(`PUT: /api/user/${req.params.id}`);
  User.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(user => res.json(user))
    .catch(err => next(err));
});
router.delete('/api/user/:id', function(req, res, next){
  debug(`DELETE: /api/user/${req.params.id}`);

  User.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});
