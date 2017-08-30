'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = Schema({
  title: {type: String, required: true},
  attendees: {type: Array},
  location: {type: String},
  created: {type: Date, required: true, default: Date.now },
});

module.exports = mongoose.models.event || mongoose.model('event',eventSchema);
