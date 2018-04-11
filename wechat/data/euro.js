'use strict';

const mongo = require('./mongo');
const dbTwo = require('./dbTwo');

let euroMatchSchema = new mongo.Schema({
  matchNo: Number,
  matchStartTime: Date,
  matchEndTime: Date,
  team: {
    type: Array,
    default: []
  },
  result: {
    type: Number,
    default: 0
  }
});

let euroGuessSchema = new mongo.Schema({
  matchNo: Number,
  uid: Number,
  unionid: String,
  status: {
    type: Number,
    default: 0
  }
});

const EuroMatch = mongo.model('EuroMatch', euroMatchSchema);
const EuroGuess = mongo.model('EuroGuess', euroGuessSchema);

exports.getUserPassport = (username) => dbTwo.query('SELECT * FROM user_secret WHERE mobile=?', [username]);

exports.getMatchByDate = (date) => {
  let _time = 3;
  let _date = new Date(date);
  //如果是6-25日，上场结束时间是21:00，下场开始竞猜时间是23:00，所以间隔时间是2小时
  if(_date.getDate() == "25"){
    _time = 2;
  }

  return EuroMatch.find({
    'matchStartTime': {
      $lte: date
    },
    'matchEndTime': {
      $gt: new Date(date.getTime() - ( 3600 * 1000 * _time ))
    }
  }).exec();
};

exports.getMatchListByDate = (date) => {
  return EuroMatch.find({
    'matchStartTime': {
      $lte: date
    }
  }).exec();
};

exports.getMatchByNo = (matchNo) => {
  return EuroMatch.find({
    'matchNo': matchNo
  })
};

exports.getGuessByNo = (matchNo) => {
  return EuroGuess.find({
    'matchNo': matchNo
  }).exec();
};

exports.getGuessByUid = (uid) => {
  return EuroGuess.find({
    'uid': uid
  }).exec();
};

exports.getUserGuessByNo = (matchNo, uid) => {
  return EuroGuess.find({
    'matchNo': matchNo,
    'uid': uid
  }).exec();
};

exports.saveGuess = (uid, matchNo, unionid, status) => {
  return EuroGuess.create({
    'matchNo': matchNo,
    'uid': uid,
    'unionid': unionid,
    'status': status
  });
};

exports.getAllMatch = () => {
  return EuroMatch.find().exec()
};

exports.insertMatch = (matchs) => {
  return EuroMatch.insertMany(matchs)
};

exports.updateMatch = (matchNo, match) => {
  return EuroMatch.update({
    'matchNo': matchNo
  }, match).exec()
};

exports.deleteMatch = (matchNo) => {
  return EuroMatch.find({
    'matchNo': matchNo
  }).remove()
};
