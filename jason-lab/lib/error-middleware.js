'use strict';

// eslint-disable-next-line no-unused-vars
module.exports = function (err, req, res, next) {
  if (err.name === 'ValidationError') {
    console.warn(err.message);
    return res.sendStatus(400);
  }
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    console.warn(err.message);
    return res.sendStatus(404);
  }

  console.error(err);
  res.sendStatus(500);
};
