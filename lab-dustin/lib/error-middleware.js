'use strict';

module.exports = function(err,req,res,next){
  if (err.name === 'Validation Error'){
    console.error(err.message);
    res.sendStatus(400);
  }
  if (err.name === 'CastError' && err.kind === 'ObjectId'){
    console.error(err.message);
    res.sendStatus(404);
  }
  console.error(err);
  res.sendStatus(500);
};
