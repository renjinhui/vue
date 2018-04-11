'use strict';

const mongo = require('./mongo');
const dbFour = require('./dbFour');

let timemachineSchema = new mongo.Schema({
  uid: Number,
  hashid: String,
  status: {
    type: Number,
    default: 0
  },
  helper: {
    type: Array,
    default: []
  },
  coupon: {
    type: Array,
    default: []
  },
  level: Number
});
const Timemachine = mongo.model('Timemachine', timemachineSchema);

// 查询用户活动by hashid
exports.findEventByHashId = (hashid) => {
  return Timemachine.find({
    'hashid': hashid
  }).exec();
};
// 更新用户活动by hashid
exports.updateEventByHashId = (hashid, userEvent) => {
  return Timemachine.findOneAndUpdate({
    'hashid': hashid
  }, userEvent).exec();
};
//添加用户event记录
exports.addEvent = (uid, hashid, level) => {
  return Timemachine.find({
    'hashid': hashid
  })
  .exec()
  .then((userEvent) => {
    if (userEvent.length === 0) {
      Timemachine.create({
        'uid': uid,
        'hashid': hashid,
        'level': level
      });
      return true;
    } else {
      return userEvent;
    }
  });
};
//查询用户时光红包数据
exports.getUserDataByUid = (uid) => {
  let userTotalData = [];
  return dbFour.query('SELECT * FROM timemachine WHERE uid=?', [uid])
    .then((userData) => {
      if (userData.length === 0) {
        return [];
      }
      userTotalData = userData;
      let params = [userData[0].ubid_amount, userData[0].invite_num, userData[0].rate_by_weighting, userData[0].coupon_used, userData[0].receipt_sum];
      return dbFour.query('SELECT max(percent*(ubid_amount<=?)) AS ubid_amount_rank, max(percent*(invite_num<=?)) AS invite_num_rank, max(percent*(rate_by_weighting<=?)) AS rate_by_weighting_rank, max(percent*(coupon_used<=?)) AS coupon_used_rank, max(percent*(receipt_sum<=?)) AS receipt_sum_rank FROM user_data_percent', params);
    })
    .then((userRank) => {
      if (userRank.length === 0) {
        return [];
      }
      for (let key in userRank[0]) {
        userTotalData[0][key] = userRank[0][key];
      }
      return userTotalData;
    })
};
//查询用户时光红包评分数据
exports.getUserRankByData = (userData) => {
  let params = [userData.ubid_amount, userData.invite_num, userData.rate_by_weighting, userData.coupon_used];
  return dbFour.query('SELECT max(percent*(ubid_amount<=?)) AS ubid_amount_rank, max(percent*(invite_num<=?)) AS invite_num_rank, max(percent*(rate_by_weighting<=?)) AS rate_by_weighting_rank, max(percent*(coupon_used<=?)) AS coupon_used_rank FROM user_data_percent', params);
};
