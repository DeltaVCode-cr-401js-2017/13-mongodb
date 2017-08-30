'use strict';

const express = require('express');
const debug = require('debug')('app:server');

const app = express();

const PORT = process.env.PORT || 3000;

if (!module.parent){
  app.listen(PORT, () => debug(`Listening on ${PORT}`));
}

module.exports = app;
