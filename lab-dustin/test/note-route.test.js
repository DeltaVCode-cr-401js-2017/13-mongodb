'use strict';

const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');
const Note = require('../model/note');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

describe('note routes',function(){
  describe('POST /api/note',function(){
    describe('with a valid id',function(){
      after(function(){
        return Note.remove({});
      });

      it('should return a note',function(){
        return request.post('/api/note')
          .send({ title: 'post note' })
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.equal('post note');
            expect(res.body.created).to.not.be.undefined;
        });
      });
    });
  });

  describe('GET /api/note',function(){
    describe('with an invalid id', function(){
      it('should return 404',function(){
        return request.get('/api/note/missing')
          .expect(404);
      });
    });
    describe('with a valid id',function(){
      /*
      before(function(done){
        new Note({title: 'get me', created: new Date()})
          .save()
          .then(note => {
            this.testNote = note;
            done();
          }).catch(err => {
            console.log(err);
            done(err);
          });
      });
      */
      after(function(){
        return Note.remove({});
      });
      it('should return a note',function(){
        return request.get(`/api/note/${this.testNote._id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.equal(this.testNote.title);
        });
      });
    });
  });
});
