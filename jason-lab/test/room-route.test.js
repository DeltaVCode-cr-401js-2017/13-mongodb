const app = require('../server');
const request = require('supertest')(app);
const {expect} = require('chai');

const Room = require('../model/chat-rooms');

describe('roomroutes', function (){
  describe('POST /api/room', function (){
    describe('with a body', function (){
      after(function (){
        return Room.remove(this.testRoom);
      });
      it('should return a room', function() {
        return request
          .post('/api/room')
          .send({roomName: 'test room'})
          .expect(200)
          .expect(res => {
            expect(res.body.roomName).to.equal('test room');
            expect(res.body.created).to.not.be.undefined;
          });
      });
      it('should return 400 bad request if no body', function(){
        return request
          .post('/api/room')
          .expect(() => {
            expect(400);
          });
      });
    });
  });
  describe('PUT', function(){
    before(function(){
      return new Room({ roomName: 'nerdbetter'})
        .save()
        .then(room => this.putRoom = room);
    });
    after(function (){
      return Room.remove(this.putRoom);
    });
    it('should update a note by id', function(){
      return request
        .put(`/api/room/${this.putRoom._id}`)
        .send({roomName:'updated'})
        .expect(200)
        .expect(res=>{
          expect(res.body._id).to.equal(this.putRoom._id.toString());
          expect(res.body.roomName).to.equal('updated');
        });
    });
    it('should return 404 if missing id', function(){
      return request
        .put('/api/note/missing')
        .expect(404);
    });
  });
  describe('GET /api/room', function(){
    describe('with an invalid id', function() {
      it('should return 404', function(){
        return request
          .get('/api/room/missing')
          .expect(404);
      });
    });
    describe('with a valid id', function(){
      before(function(){
        return new Room({ roomName: 'get-me'})
          .save()
          .then(room => this.testRoom = room);
      });
      after(function (){
        return Room.remove(this.testRoom);
      });

      it('should GET a room', function() {
        return request
        .get(`/api/room/${this.testRoom._id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.roomName).to.equal(this.testRoom.roomName);
        });
      });
    });
  });
  describe('DELETE /api/room', function(){
    describe('deletes a room', function(){
      before(function(){
        Promise.all([
          new Room({roomName: 'delete'}).save().then(room => this.deleteMe = room),
          new Room({roomName: 'save'}).save().then(room => this.saveMe = room)
        ]);
      });
      after(function(){
        return Room.remove({});
      });
      it('should only delete deleteMe', function(){
        return request
        .delete(`/api/room/${this.deleteMe._id}`)
        .expect(204)//not sure why I am not getting a 204
        .expect(res => {
          expect(res.deleteMe.roomName).to.equal(undefined);
        });
      });
      it('should still have saveMe', function(){
        return request
        .get(`/api/room/${this.saveMe._id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.roomName).to.equal(this.saveMe.roomName);
        });
      });
    });
  });
});
