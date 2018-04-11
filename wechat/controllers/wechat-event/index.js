'use strict';

const soeasyAPI = require('../../@syd/ramiel');
const Data = require('../../data');

const API = new soeasyAPI();

let userMap = (userArray) => {
  let map = {};
  for (let i = 0; i < userArray.length; i++) {
    map[userArray[i].unionid] = {
      picture: userArray[i].headimgurl || 'http://weixin.souyidai.com/7xi/res/share.png',
      username: userArray[i].nickname || '搜易贷'
    };
  }
  return map;
};

//GET / 首页
exports.indexView = (req, res) => {
  let data = {};
  const cookie = req.cookies.syd_auth_verify || '';
  console.log('[shake]: enter index user: %s', req.cookies.syd_auth_verify);
  if (req.cookies.syd_auth_verify === undefined && req.headers.hasOwnProperty('uid')) {
    cookie = req.headers.uid + '|' + req.headers.sydaccesstoken;
    res.cookie('syd_auth_verify', req.headers.uid + '|' + req.headers.sydaccesstoken, {
      expires: 0,
      domain: '.souyidai.com',
      secure: true
    });
  }
  API.shakeChance(data, 'syd_auth_verify=' + cookie)
    .then((results) => {
      res.render('event/index', results.body);
    });
};

//GET /index_wechat 首页
exports.indexWechatView = (req, res) => {
  let data = {
    unionid: req.cookies.syd_event_id
  };
  console.log('[shake]: enter wechat index user: %s', data.unionid);
  API.shakeUserStatus(data)
    .then((results) => {
      res.render('event/index_wechat', results.body);
    });
};

//POST / 首页数据
exports.indexData = (req, res) => {
  let data = {};
  console.log('[shake]: user prices user: %s', req.cookies.syd_auth_verify);
  API.shakeGoods(data, 'syd_auth_verify=' + req.cookies.syd_auth_verify)
    .then((results) => {
      res.send(results.body);
    });
};

//GET /shake 摇一摇页面
exports.shakeView = (req, res) => {
  console.log('[shake]: enter shake user: %s', req.cookies.syd_auth_verify || req.cookies.syd_event_id);
  res.render('event/shake');
};

//POST /shake 摇一摇数据
exports.shakeDo = (req, res) => {
  let data = {};
  const cookies = req.cookies.syd_auth_verify;
  if (req.body.unionid !== '') {
    data = req.body;
    cookies = '';
  }
  console.log('[shake]: shake do user: %s', req.cookies.syd_auth_verify || req.body.unionid);
  API.shakeDo(data, 'syd_auth_verify=' + cookies)
    .then((results) => {
      res.send(results.body);
    });
};

//GET /shake/gift 摇一摇结果
exports.shakeGiftView = (req, res) => {
  console.log('[shake]: enter shake gift user: %s', req.cookies.syd_auth_verify || req.cookies.syd_event_id);
  req.session.mobile = null;
  res.render('event/shake_gift', req.query);
};

//GET /shake/gift_wechat 摇一摇结果 微信版本
exports.shakeGiftWechatView = (req, res) => {
  console.log('[shake]: enter shake gift wechat user: %s', req.cookies.syd_auth_verify || req.cookies.syd_event_id);
  req.session.mobile = null;
  res.render('event/shake_gift_wechat', req.query);
};

//POST /shake/user_status
exports.shakeUserStatus = (req, res) => {
  console.log('[shake]: check user status user: %s', req.cookies.syd_event_id);
  API.shakeUserStatus(req.body)
    .then((results) => {
      res.send(results.body);
    });
};

//POST /shake/regist 摇一摇注册成功
exports.shakeRegist = (req, res) => {
  let data = req.body;
  console.log('[shake]: shake regist user: %j', data);
  API.shakeRegist(data)
    .then((results) => {
      res.send(results.body);
    });
};

//POST /shake/share 摇一摇分享
exports.shakeShare = (req, res) => {
  let data = {};
  console.log('[shake]: shake share user: %s', req.cookies.syd_auth_verify || req.cookies.syd_event_id);
  API.shakeShare(data, 'syd_auth_verify=' + req.cookies.syd_auth_verify)
    .then((results) => {
      res.send(results.body);
    });
};

//GET /shake/result_wechat 摇一摇 注册结果页
exports.shakeResultView = (req, res) => {
  console.log('[shake]: shake regist result user: %s', req.cookies.syd_auth_verify || req.cookies.syd_event_id);
  res.render('event/result_wechat');
};

//GET /c/user/show 活动 用户状态
exports.cUserShow = (req, res) => {
  console.log('[christmas]: user show user: %s', req.cookies.syd_event_id);
  res.send({
    errorCode: 1,
    errorMessage: '活动已结束'
  });
  // API.cUserShow(req.query, 'syd_event_id=' + req.cookies.syd_event_id)
  //   .then((results) => {
  //     resData = results.body;
  //     let unionIdArray = [];
  //     if (resData.data.hasOwnProperty('friend_uid')) {
  //       unionIdArray = [resData.data.friend_uid, resData.data.uid];
  //     } else {
  //       unionIdArray = [resData.data.uid];
  //     }
  //     return Data.user.findUserByUnionIdArray(unionIdArray);
  //   })
  //   .then((users) => {
  //     if (resData.data.hasOwnProperty('friend_uid')) {
  //       if (users.length === 1) {
  //         users[1] = users[0];
  //       }
  //       const map = userMap(users);
  //       resData.data.friend_picture = map[resData.data.friend_uid].picture;
  //       resData.data.friend_username = map[resData.data.friend_uid].username;
  //       resData.data.picture = map[resData.data.uid].picture;
  //       resData.Data.username = map[resData.data.uid].username;
  //     } else {
  //       const map = userMap(users);
  //       resData.data.picture = map[resData.data.uid].picture;
  //       resData.Data.username = map[resData.data.uid].username;
  //     }
  //     res.send(resData);
  //   });
};

//GET /c/user/reward 活动 奖品信息
exports.cUserReward = (req, res) => {
  console.log('[christmas]: user reward user: %s', req.cookies.syd_event_id);
  API.cUserReward(req.query, 'syd_event_id=' + req.cookies.syd_event_id)
    .then((results) => {
      res.send(results.body);
    });
};

//GET /c/user/reward/list 活动 好友助力明细
exports.cUserRewardList = (req, res) => {
  console.log('[christmas]: user reward list user: %s', req.cookies.syd_event_id);
  let resData = {};
  API.cUserRewardList(req.query, 'syd_event_id=' + req.cookies.syd_event_id)
    .then((results) => {
      let unionIdArray = [];
      resData = results.body;
      resData.data.list.map((item) => {
        unionIdArray.push(item.uid);
      });
      return Data.user.findUserByUnionIdArray(unionIdArray);
    })
    .then((users) => {
      const map = userMap(users);
      for (let i = 0; i < resData.data.list.length; i++) {
        resData.data.list[i].username = map[resData.data.list[i].uid].username;
        resData.data.list[i].picture = map[resData.data.list[i].uid].picture;
      }
      res.send(resData);
    }, (err) => {
      console.trace(err);
      res.send(resData);
    });
};

//POST /c/user/reward 活动 添加用户奖品
exports.cUserRewardAdd = (req, res) => {
  console.log('[christmas]: user reward add user: %s', req.cookies.syd_event_id);
  API.cUserRewardAdd(req.body, 'syd_event_id=' + req.cookies.syd_event_id)
    .then((results) => {
      res.send(results.body);
    });
};

//POST /c/user/play 活动 游戏记录
exports.cUserPlay = (req, res) => {
  console.log('[christmas]: user play user: %s', req.cookies.syd_event_id);
  API.cUserPlay(req.body, 'syd_event_id=' + req.cookies.syd_event_id)
    .then((results) => {
      res.send(results.body);
    });
};

//POST /c/user/bind 活动 验证手机号并下发短信
exports.cUserBind = (req, res) => {
  console.log('[christmas]: user bind user: %s', req.cookies.syd_event_id);
  let resJSON = {};
  if (req.body.captcha === req.session.captcha) {
    API.vaildUsername({
        username: req.body.phone
      }).then((results) => {
        resJSON.errorCode = 0;
        resJSON.data = {
          is_bind: results.body.errorCode
        };
        if (results.body.errorCode === 0) {
          API.sendSms({
            username: req.body.phone
          });
        }
        res.send(resJSON);
      })
      .catch((err) => {
        console.trace(err);
        resJSON.errorCode = 2;
        resJSON.errorMessage = '系统繁忙';
        res.send(resJSON);
      });
  } else {
    resJSON.errorCode = 0;
    resJSON.data = {
      is_bind: 2
    };
    res.send(resJSON);
  }
};

//POST /c/user/play 活动 注册
exports.cUserReg = (req, res) => {
  console.log('[christmas]: user reg user: %s', req.cookies.syd_event_id);
  API.regist({
    username: req.body.phone,
    password: req.body.password,
    confirmPassword: req.body.password,
    smscode: req.body.captcha
  }).then((results) => {
    res.send(results.body);
  });
};

//POST /c/user/resend 活动 重发短信
exports.cUserResend = (req, res) => {
  console.log('[christmas]: user resend user: %s', req.cookies.syd_event_id);
  API.sendSms({
    username: req.body.phone
  }).then((results) => {
    res.send(results.body);
  });
};

//POST /c/init 活动 初始化
exports.cInit = (req, res) => {
  console.log('[christmas]: user init user: %s', req.cookies.syd_event_id);
  API.cInit(req.body, 'syd_event_id=' + req.cookies.syd_event_id)
    .then((results) => {
      res.send(results.body);
    });
};

//POST /eventNew
exports.eventNew = (req, res) => {
  console.log('[eventNew]: user: %s', req.body.username);
  let resJSON = {};
  if (new Date().getTime() >= 1459439999000) {
    resJSON.errorCode = 2;
    resJSON.errorMessage = '活动已结束';
    res.send(resJSON);
    return;
  }
  Data.eventNew.getUserPassport(req.body.username)
    .then((users) => {
      if (users.length === 0) {
        resJSON.errorCode = 0;
        resJSON.resCode = 0; //未注册用户
        res.send(resJSON);
        return;
      }
      let userPassport = users[0];
      if (new Date(userPassport.create_time).getTime() >= 1458835200000) {
        Data.eventNew.findUserEventLog(userPassport.uid)
          .then((userEvents) => {
            if (userEvents.length === 0) {
              Data.eventNew.updateUserEventLog(userPassport.uid, {
                  uid: userPassport.uid,
                  status: 1
                })
                .then(() => {
                  resJSON.errorCode = 0;
                  resJSON.resCode = 2; //可参与用户
                  console.log('[eventNew]: user coupon: %s', userPassport.mobile);
                  API.giveCoupon({
                    uid: userPassport.uid,
                    channelName: 'QJRHJ05'
                  });
                  res.send(resJSON);
                }, (err) => {
                  console.trace(err);
                  resJSON.errorCode = 1;
                  resJSON.errorMessage = '系统繁忙';
                  res.send(resJSON);
                });
            } else {
              resJSON.errorCode = 0;
              resJSON.resCode = 3; //已参与用户
              res.send(resJSON);
            }
          }, (err) => {
            console.trace(err);
            resJSON.errorCode = 1;
            resJSON.errorMessage = '系统繁忙';
            res.send(resJSON);
          });
      } else {
        resJSON.errorCode = 0;
        resJSON.resCode = 1; //老注册用户
        res.send(resJSON);
      }
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    });
};
