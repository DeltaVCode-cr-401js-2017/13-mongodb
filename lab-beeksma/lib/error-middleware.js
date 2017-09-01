'use strict';

module.exports = function (err, req, res, next) {
  console.error(err);
  if (err. name === 'ValidationError'){
    return res.sendStatus(400);
  }
  if (err.name === 'CastError' && err.kind == 'ObjectId'){
    return res.sendStatus(404);
  }
  res.sendStatus(500);
  next();
};
