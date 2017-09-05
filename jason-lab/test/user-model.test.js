const mongoose = require('mongoose');
const {expect} = require('chai');

const User = require('../model/user');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/401-users';
mongoose.connection.db || mongoose.connect(MONGODB_URI);


describe('find by id', function() {
  before(function(){
    return (
      new User({
        nickName: 'find me',
        created: new Date()
      })
        .save()
        .then(saved => this.findMe = saved)
    );
  });
  it('can find by ID', function(){
    return User.findById(this.findMe._id)
      .then(found => {
        expect(found.nickName).to.equal('find me');
      });
  });
});
