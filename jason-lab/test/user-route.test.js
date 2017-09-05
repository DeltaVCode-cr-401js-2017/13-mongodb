const app = require('../server');
const request = require('supertest')(app);
const {expect} = require('chai');

const User = require('../model/user');

describe('userroutes', function (){
  describe('POST /api/user', function (){
    describe('with a body', function (){
      after(function (){
        return User.remove(this.testUser);
      });
      it('should return a user', function() {
        return request
          .post('/api/user')
          .send({nickName: 'test user'})
          .expect(200)
          .expect(res => {
            expect(res.body.nickName).to.equal('test user');
            expect(res.body.created).to.not.be.undefined;
          });
      });
      it('should return 400 bad request if no body', function(){
        return request
          .post('/api/user')
          .expect(() => {
            expect(400);
          });
      });
    });
  });
  describe('PUT', function(){
    before(function(){
      return new User({ nickName: 'nerdbetter'})
        .save()
        .then(user => this.putUser = user);
    });
    after(function (){
      return User.remove(this.putUser);
    });
    it('should update a user by id', function(){
      return request
        .put(`/api/user/${this.putUser._id}`)
        .send({nickName:'updated'})
        .expect(200)
        .expect(res=>{
          expect(res.body._id).to.equal(this.putUser._id.toString());
          expect(res.body.nickName).to.equal('updated');
        });
    });
    it('should return 404 if missing id', function(){
      return request
        .put('/api/user/missing')
        .expect(404);
    });
  });
  describe('GET /api/user', function(){
    describe('with an invalid id', function() {
      it('should return 404', function(){
        return request
          .get('/api/user/missing')
          .expect(404);
      });
    });
    describe('with a valid id', function(){
      before(function(){
        return new User({ nickName: 'get-me'})
          .save()
          .then(user => this.testUser = user);
      });
      after(function (){
        return User.remove(this.testUser);
      });

      it('should GET a user', function() {
        return request
          .get(`/api/user/${this.testUser._id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.nickName).to.equal(this.testUser.nickName);
          });
      });
    });
  });
  describe('DELETE /api/user', function(){
    describe('deletes a user', function(){
      before(function(){
        return Promise.all([
          new User({nickName: 'delete'}).save().then(user => this.deleteMe = user),
          new User({nickName: 'save'}).save().then(user => this.saveMe = user)
        ]);
      });
      after(function(){
        return User.remove({});
      });
      it('should only delete deleteMe', function(){
        console.log('deleteMe', this.deleteMe);
        let deleteMe = `/api/user/${this.deleteMe._id}`;
        return request
          .delete(deleteMe)
          .expect(204)
          .then(() => {
            return Promise.all([
              request
                .get(deleteMe)
                .expect(404),
              request
                .get(`/api/user/${this.saveMe._id}`)
                .expect(200),
            ]);
          });
      });
    });
  });
});
