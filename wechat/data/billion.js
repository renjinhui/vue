'use strict';

const mongo = require('./mongo');
const dbTwo = require('./dbTwo');
const dbBillion = require('./dbBillion');
const invite = require('./invite');

let billionGuessSchema = new mongo.Schema({
  uid: Number,
  day: Number,
  hour: Number,
  minute: Number
});
let billionInviteSchema = new mongo.Schema({
  uid: {
    type: Number,
    unique: true
  },
  hashid: String,
  unionid: String,
  status: {
    type: Number,
    default: 0
  },
  helper: {
    type: Array,
    default: []
  }
});
let billionRelationSchema = new mongo.Schema({
  unionid: String,
  friendHashid: String,
  friendUnionid: String,
  status: {
    type: Number,
    default: 0
  },
  qualified: {
    type: Number,
    default: 0
  }
});
const BillionGuess = mongo.model('BillionGuess', billionGuessSchema);
const BillionInvite = mongo.model('BillionInvite', billionInviteSchema);
const BillionRelation = mongo.model('BillionRelation', billionRelationSchema);

exports.getUserPassport = (username) => dbTwo.query('SELECT * FROM user_secret WHERE mobile=?', [username]);

exports.findUserEventLog = (uid) => {
  return BillionGuess.find({
    'uid': uid
  }).exec();
};

exports.updateUserEventLog = (uid, userEventLog) => {
  return BillionGuess.update({
    'uid': uid
  }, userEventLog, {
    upsert: true
  }).exec();
};

exports.addUserInvite = (uid, unionid) => {
  return BillionInvite.create({
    'uid': uid,
    'hashid': invite.createInvite(undefined, uid).url,
    'unionid': unionid
  });
};

exports.getInviteByHashid = (hashid) => {
  return BillionInvite.find({
    'hashid': hashid
  }).exec();
};

exports.updateInvite = (hashid, invite) => {
  return BillionInvite.update({
    'hashid': hashid
  }, invite).exec();
};

exports.updateRelation = (unionid, relation) => {
  return BillionRelation.update({
    'unionid': unionid
  }, relation, {
    upsert: true
  }).exec();
};

exports.findRelation = (unionid) => {
  return BillionRelation.find({
    'unionid': unionid
  }).exec();
};

exports.getUserPassportByUid = (uid) => dbTwo.query('SELECT * FROM user_secret WHERE uid=?', [uid]);

exports.getLoginLog = (uid) => {
  return dbBillion.query('SELECT * FROM wechat_login_log WHERE uid=?', [uid]);
};

exports.insertLoginLog = (uid, username, unionid) => {
  return dbBillion.query('INSERT IGNORE INTO wechat_login_log (uid, mobile, wechat_openid) VALUES (?, ?, ?)', [uid, username, unionid]);
};

exports.insertInviteLog = (uid, unionid, nickname, headimgurl) => {
  let headimgurlSecure = headimgurl || 'https://weixin.souyidai.com/images/logo.jpg';
  return dbBillion.query('INSERT INTO wechat_invite_fans (invite_uid, wechat_openid, wechat_nickname, wechat_face_url) VALUES (?, ?, ?, ?)', [uid, unionid, nickname, headimgurlSecure]);
};
