'use strict';

const Note = require('../model/note');
const mongoose = require('mongoose');
const { expect } = require('chai');

mongoose.Promise = Promise;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/401-notes';
mongoose.connection || mongoose.connection.db || mongoose.connect(MONGODB_URI);

describe('note model',function(){
  describe('save', function() {
    it('fails when title is missing',function(){
      let note = new Note({});

      return note.save()
        .catch(err => {
          console.log('la;slkfas')
          expect(err.name).to.equal('ValidationError');
        })
    })
    it('can be saved',function(){
      let note = new Note({
        title: 'to-do',
        created: new Date()
      }).save()
        .then(saved => {
          console.log(saved);
          expect(saved.title).to.equal('to-do');
          expect(saved.created).to.not.be.undefined;
      });
    });
  });

  describe('findById', function() {
    before(function() {
      return new Note({ title: 'find me', created: new Date() })
        .save().then(saved => this.findMe = saved);
    });

    it('can find by id', function () {
      return Note.findById(this.findMe._id);
    });
  });
});
