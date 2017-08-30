'use strict';

module.exports = function(err,req,res,next){
  //invalid id
  if (err.name === 'Validation Error'){
    console.error(err.message);
    return res.sendStatus(400);
  }
  //no body in post
  if(req.method === 'POST' && !req.body.title){
    console.error(err.message);
    return res.sendStatus(400);
  }

  if(req.method === 'PUT'){
    console.error(err.message);
    return res.sendStatus(400);
  }

  if (err.name === 'CastError' && err.kind === 'ObjectId'){
    console.log('Method', req.method);
    console.error(err.message);
    return res.sendStatus(404);
  }

  console.error(err.message);
  res.sendStatus(500);
};
