'use strict';

const mongo = require('./mongo');
const dbTwo = require('./dbTwo');

let eventNewSchema = new mongo.Schema({
  uid: Number,
  status: {
    type: Number,
    default: 0
  }
});
const EventNew = mongo.model('EventNew', eventNewSchema);

exports.getUserPassport = (username) => dbTwo.query('SELECT * FROM user_secret WHERE mobile=?', [username])

exports.findUserEventLog = (uid) => {
  return EventNew.find({
    'uid': uid
  }).exec();
};

exports.updateUserEventLog = (uid, userEventLog) => {
  return EventNew.update({
    'uid': uid
  }, userEventLog, {
    upsert: true
  }).exec();
};
