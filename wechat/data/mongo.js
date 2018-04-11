'use strict';

const config = require('../config');
const mongoose = require('mongoose');

mongoose.connect(config.mongo.uri, config.mongo.options);

module.exports = mongoose;
