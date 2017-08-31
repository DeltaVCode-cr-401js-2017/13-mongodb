const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Room = require('../model/chat-rooms');
const debug = require('debug')('app:room-route');


const router = module.exports = new Router();

router.post('/api/room', jsonParser, function(req, res, next){
  debug('POST: /api/room');
  new Room(req.body).save()
    .then(room => res.json(room))
    .catch(err => next(err));
});
router.get('/api/room/:id', jsonParser, function(req, res, next){
  debug(`GET: /api/room/${req.params.id}`);
  Room.findById(req.params.id)
    .populate('users')
    .then(room => {
      debug(`findById(${req.params.id})`, room);
      room ? res.json(room) : res.sendStatus(404);
    })
    .catch(err => next(err));
});
router.put('/api/room/:id', jsonParser, function(req, res, next){
  debug(`PUT: /api/room/${req.params.id}`);
  Room.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .populate('users')
    .then(room => res.json(room))
    .catch(err => next(err));
});
router.delete('/api/room/:id', function(req, res, next){
  debug('DELETE: /api/room/');

  Room.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});
