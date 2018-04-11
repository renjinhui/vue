'use strict';

const soeasyAPI = require('../../@syd/ramiel');
const Data = require('../../data');

const API = new soeasyAPI();

const userDataFactory = (userData) => {
  //添加注册天数+
  userData.create_day = Math.ceil((new Date().getTime() - new Date(userData.create_time).getTime()) / (1000 * 60 * 60 * 24));
  //首次回款总和
  userData.first_receipt_total = userData.first_receipt_principal + userData.first_receipt_interest;
  //投资项目百分比
  userData.bid_percent = Math.round((userData.bid_amount / userData.ubid_amount) * 100);
  userData.credit_change_percent = Math.round((userData.credit_change_in / userData.ubid_amount) * 100);
  userData.dqb_percent = 100 - userData.bid_percent - userData.credit_change_percent;

  //评分表
  userData.ubid_amount_rank = Math.floor(50 + 0.5 * (Math.pow(userData.ubid_amount_rank, 2) / 100));
  userData.invite_num_rank = Math.floor(50 + 0.5 * (Math.pow(userData.invite_num_rank, 2) / 100));
  userData.rate_by_weighting_rank = Math.floor(50 + 0.5 * (Math.pow(userData.rate_by_weighting_rank, 2) / 100));
  userData.coupon_used_rank = Math.floor(50 + 0.5 * (Math.pow(userData.coupon_used_rank, 2) / 100));
  userData.invest_type_rank = 50;
  if (userData.yxb_status) {
    userData.invest_type_rank += 10;
  }
  if (userData.bid_amount > 0) {
    userData.invest_type_rank += 10;
  }
  if (userData.credit_change_in > 0) {
    userData.invest_type_rank += 10;
  }
  if (userData.hqb_hold_amount > 0) {
    userData.invest_type_rank += 10;
  }
  if ((userData.ubid_amount - userData.bid_amount - userData.credit_change_in) > 0) {
    userData.invest_type_rank += 10;
  }
  userData.rank_score = Math.floor(userData.ubid_amount_rank * 0.3 + userData.invite_num_rank * 0.1 + userData.rate_by_weighting_rank * 0.2 + userData.invest_type_rank * 0.2 + userData.coupon_used_rank * 0.2);
  //投资人标签
  userData.tagList = [];
  if (userData.rate_by_weighting >= 988) {
    userData.tagList.push('城会玩');
  }
  if (userData.receipt_sum >= 40000) {
    userData.tagList.push('土豪脸');
  }
  if (userData.coupon_used >= 16000) {
    userData.tagList.push('返利王');
  }
  if (userData.yxb_amount >= 100000) {
    userData.tagList.push('月月盈');
  }
  if (userData.bid_num >= 6) {
    userData.tagList.push('勤快人儿');
  }
  if (userData.ubid_amount >= 10000000) {
    userData.tagList.push('24K纯金');
  }
  if (userData.invite_num >= 5) {
    userData.tagList.push('壕做友');
  }
  return userData;
};

const getCouponLevel = (receipt_sum) => {
  let receipt_sum_num = 0;
  if (!parseInt(receipt_sum)) {
    return 1;
  } else {
    receipt_sum_num = parseInt(receipt_sum);
  }
  if (receipt_sum_num <= 7558) {
    return 1;
  }
  if (receipt_sum_num > 7558 && receipt_sum_num <= 67989) {
    return 2;
  }
  if (receipt_sum_num > 67989 && receipt_sum_num <= 300000) {
    return 3;
  }
  if (receipt_sum_num > 300000 && receipt_sum_num <= 500000) {
    return 4;
  }
  if (receipt_sum_num > 500000 && receipt_sum_num <= 1000000) {
    return 5;
  }
  if (receipt_sum_num > 1000000) {
    return 6;
  }
};

//POST / 查询用户数据接口
exports.getUserData = (req, res) => {
  let resJSON = {};
  const unionId = req.cookies.syd_event_id || '';
  const appCookie = req.cookies.syd_auth_verify || '';

  if (appCookie !== '') {
    //客户端入口
    const uid = appCookie.split('|')[0];
    console.log('[timemachine]: get user data user: %s from: %s', uid, 'app');
    Data.timemachine.getUserDataByUid(uid)
      .then((userData) => {
        if (userData.length === 0) {
          resJSON.errorCode = 0;
          resJSON.data = 1;
          resJSON.errorMessage = '用户不存在';
          return;
        }
        resJSON.errorCode = 0;
        resJSON.data = userDataFactory(userData[0]);
      })
      .catch((err) => {
        console.trace(err);
        resJSON.errorCode = 1;
        resJSON.errorMessage = '系统繁忙';
      })
      .done(() => {
        res.send(resJSON);
      });
  } else if (unionId !== '') {
    //微信入口
    console.log('[timemachine]: get user data user: %s from: %s', unionId, 'wechat');
    Data.user.findUserByUnionId(unionId)
      .then((users) => {
        if (users.length === 0) {
          resJSON.errorCode = 0;
          resJSON.data = 1;
          resJSON.errorMessage = '用户不存在';
          res.send(resJSON);
          return;
        }
        if (!users[0].enable) {
          resJSON.errorCode = 0;
          resJSON.data = 2;
          resJSON.errorMessage = '用户未登录';
          res.send(resJSON);
          return;
        }
        const uid = users[0].souyidai_uid;
        return Data.timemachine.getUserDataByUid(uid);
      }, (err) => {
        console.trace(err);
        resJSON.errorCode = 1;
        resJSON.errorMessage = '系统繁忙';
        res.send(resJSON);
      })
      .then((userData) => {
        if (userData.length === 0) {
          resJSON.errorCode = 0;
          resJSON.data = 1;
          resJSON.errorMessage = '用户不存在';
          res.send(resJSON);
          return;
        }
        resJSON.errorCode = 0;
        resJSON.data = userDataFactory(userData[0]);
        res.send(resJSON);
      }, (err) => {
        console.trace(err);
        resJSON.errorCode = 1;
        resJSON.errorMessage = '系统繁忙';
        res.send(resJSON);
      });
  } else {
    //未能识别身份
    console.log('[timemachine]: get user data user: %s from: %s', 'null', 'other');
    resJSON.errorCode = 0;
    resJSON.data = 2;
    resJSON.errorMessage = '用户未登录';
    res.send(resJSON);
  }
};

//POST /share 新建用户分享
exports.createUserEvent = (req, res) => {
  let resJSON = {};
  const uid = req.body.uid;
  const hashid = req.body.hashid;
  const level = getCouponLevel(req.body.receipt_sum);
  console.log('[timemachine]: user create: %s', uid);
  if (uid === '' || hashid === '') {
    resJSON.errorCode = 1;
    resJSON.errorMessage = '参数错误';
    res.send(resJSON);
    return;
  }
  Data.timemachine.addEvent(uid, hashid, level)
    .then((userEvent) => {
      if (userEvent.length === 1) {
        resJSON.data = userEvent[0];
      }
      resJSON.errorCode = 0;
      res.send(resJSON);
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    });
};

//POST /share/vaild 验证手机号并下发短信
exports.vaildUserName = (req, res) => {
  const username = req.body.username;
  console.log('[timemachine]: user vaild: %s', username);
  let resJSON = {};
  API.vaildUsername({
      username: username
    })
    .then((results) => {
      if (results.body.errorCode === 0) {
        console.log('[timemachine]: sms send: %s', username);
        API.sendSms({
          username: username
        });
      }
      resJSON.errorCode = results.body.errorCode;
      res.send(resJSON);
    })
    .catch((err) => {
      console.trace(err);
      resJSON.errorCode = 2;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    });
};

//POST /share/regist 注册
exports.regist = (req, res) => {
  console.log('[timemachine]: user reg user: %s', req.body.username);
  API.regist({
      username: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.password,
      smscode: req.body.smscode
    })
    .then((results) => {
      res.send(results.body);
    });
};

//POST /share/login 登录
exports.login = (req, res) => {
  console.log('[timemachine]: user reg login: %s', req.body.username);
  API.login(req.body)
    .then((results) => {
      res.send(results.body);
    });
};

//POST /share/help 帮助好友
exports.helpFriend = (req, res) => {
  const uid = parseInt(req.body.uid) || 0;
  const hashid = req.body.friendId || '';
  const couponPrefix = 'time';
  const couponArray = ['A', 'B', 'C'];
  console.log('[timemachine]: help fiend: %s help %s', uid, hashid);
  Data.timemachine.findEventByHashId(hashid)
    .then((events) => {
      if (events.length === 0) {
        res.send({
          errorCode: 1,
          errorMessage: '系统繁忙'
        });
        return;
      }
      let userEvent = events[0];
      if (userEvent.uid === uid) {
        res.send({
          errorCode: 2,
          errorMessage: '不可以帮自己拆红包哦'
        });
        return;
      }
      if (userEvent.helper.indexOf(uid) !== -1) {
        res.send({
          errorCode: 3,
          errorMessage: '已成功帮TA拆开红包！'
        });
        return;
      }
      if (userEvent.status < 3) {
        userEvent.status++;
        const channelName = couponPrefix + couponArray[userEvent.status - 1] + '-' + userEvent.level;
        userEvent.coupon.push(channelName);
        API.giveCoupon({
          uid: userEvent.uid,
          channelName: channelName
        });
      }
      userEvent.helper.push(uid);

      return Data.timemachine.updateEventByHashId(hashid, userEvent);
    }, (err) => {
      console.trace(err);
      res.send({
        errorCode: 1,
        errorMessage: '系统繁忙'
      });
    })
    .then((results) => {
      res.send({
        errorCode: 0
      });
    }, (err) => {
      console.trace(err);
      res.send({
        errorCode: 1,
        errorMessage: '系统繁忙'
      });
    });
};
