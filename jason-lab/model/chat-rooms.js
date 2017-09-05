'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');
const debug = require('debug')('app:chat-room');

const roomSchema = Schema({
  roomName: {type: String},
  roomDescription: {type: String},
  created: {type: Date, required: true, default: Date.now },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
});

const Room = module.exports = mongoose.models.room || mongoose.model('room', roomSchema);

Room.findByIdAndAddUser = function(id, user){
  debug('findByIdAndAddUser');
  return Room.findById(id)
    .then(room => {
      user.roomID = room._id;
      return new User(user)
        .save()
        .then(savedUser => {
          debug(savedUser);
          room.users.push(savedUser._id);
          return room.save()
            .then(() => user);
        });
    });
};
