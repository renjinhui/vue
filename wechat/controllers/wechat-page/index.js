'use strict';
const Data = require('../../data');
const wechatSub = require('../wechat-subscribe');
const wechatServe = require('../wechat-service');
const soeasyAPI = require('../../@syd/ramiel');
const common = require('../../config/common');
const request = require('request');

const API = new soeasyAPI();

//GET /account 帐号绑定页面
exports.accountView = (req, res) => {
  let accountInfo = {};
  Data.user.findUserByOpenId(req.query.openid)
    .then((results) => {
      if (results.length !== 0 && results[0].enable) {
        accountInfo.username = results[0].souyidai_username;
        accountInfo.enable = results[0].enable;
      } else {
        accountInfo.enable = false;
      }
      console.log('[account]: name:%s openid:%s type:%s accountInfo:%j', 'enterAccount', req.query.openid, req.query.type, accountInfo);
    }, (err) => {
      console.trace(err);
    })
    .then(() => {
      res.render('account/account_bind', {
        accountInfo: accountInfo
      });
    });
};
//POST /account 帐号绑定接口
exports.accountBind = (req, res) => {
  let resJSON = {};
  const openid = req.body.openid;
  const type = req.body.type;
  let loginData = {
    username: req.body.username,
    password: req.body.password
  };
  let souyidaiUser = {};
  console.log('[account]: name:%s openid:%s type:%s', 'accountBind', openid, type);
  API.login(loginData)
    .then((results) => {
      let body = results.body;
      if (body.errorCode === 0) {
        souyidaiUser.uid = body.data.userId;
        souyidaiUser.username = loginData.username.substring(0, 3) + '*****' + loginData.username.substring(8, 11);
        console.log('[account]: name:%s openid:%s type:%s username:%s uid:%s', 'accountBindData', openid, type, souyidaiUser.username, souyidaiUser.uid);
        return souyidaiUser;
      } else {
        resJSON = body;
        res.send(resJSON);
        return null;
      }
    })
    .then((results) => {
      if (results) {
        return Data.user.findUserByOpenId(openid);
      } else {
        return null;
      }
    })
    .then((results) => {
      if (results) {
        if (results.length !== 0) {
          let id = results[0]._id;
          return Data.user.updateUser(id, souyidaiUser);
        } else {
          return Data.user.addUser(openid, type, souyidaiUser.uid, souyidaiUser.username);
        }
      } else {
        return null;
      }
    })
    .then((results) => {
      if (results) {
        resJSON.errorCode = 0;
        resJSON.errorMessage = '绑定成功';
        res.send(resJSON);
        //异步拉取微信信息
        let api;
        type === 'sub' ? api = wechatSub.API : api = wechatServe.API;
        api.getUser(openid, (err, wxresult) => {
          type === 'sub' ? wxresult.openid_sub = wxresult.openid : wxresult.openid_serve = wxresult.openid;
          Data.user.updateUserFromWeixin(wxresult);
        });
      }
    })
    .catch((err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    });
};
//POST /account_disable 帐号取消绑定
exports.accountBindDisable = (req, res) => {
  let resJSON = {};
  const openid = req.body.openid;
  Data.user.disableUser(openid)
    .then((results) => {
      console.log('[account]: name:%s results:%j', 'accountBindDisable', results);
      resJSON.errorCode = 0;
      resJSON.errorMessage = '绑定解除';
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
    })
    .then(() => {
      res.send(resJSON);
    });
};
//GET /logout 退出跳转
exports.logOut = (req, res) => {
  res.clearCookie('syd_auth', {
    domain: '.souyidai.com'
  });
  res.clearCookie('syd_auth_verify', {
    domain: '.souyidai.com'
  });
  res.clearCookie('syd_name', {
    domain: '.souyidai.com'
  });
  res.clearCookie('syd_wechat_id', {
    domain: '.souyidai.com'
  });
  res.clearCookie('syd_wechat_name', {
    domain: '.souyidai.com'
  });
  res.redirect('/m');
};
//GET /invite 微信邀请-app页面
exports.inviteAppView = (req, res) => {
  res.render('invite/app.ejs', {
    uid: ''
  });
};
//GET /invite/:uid 微信邀请-app详情页面
exports.inviteAppDetailView = (req, res) => {
  let gift = {};
  gift.couponSum = 0;
  gift.couponList = [];
  gift.cashSum = 0;
  gift.cashList = [];
  gift.ticketList = [];
  const uid = req.params.uid;
  Data.invite.getGiftLogByUid(uid)
    .then((results) => {
      let giftList = results;
      for (let i = 0; i < giftList.length; i++) {
        giftList[i].mobile = giftList[i].remark.substring(0, 3) + '*****' + giftList[i].remark.substring(8, 11);
        giftList[i].give_time = giftList[i].give_time.toISOString().split('T')[0];
        if (giftList[i].gift_type === 1) {
          gift.couponSum = gift.couponSum + giftList[i].gift_amount / 100;
          gift.couponList.push(giftList[i]);
        } else if (giftList[i].gift_type === 2) {
          gift.cashSum = gift.cashSum + giftList[i].gift_amount / 100;
          gift.cashList.push(giftList[i]);
        } else {
          gift.ticketList.push(giftList[i]);
        }
      };
    })
    .catch((err) => {
      console.trace(err);
    })
    .done(() => {
      res.render('invite/detail.ejs', {
        gift: gift
      });
    });
};

// Post 邀请人奖励信息
exports.inviteRewardInfo = (req, res) => {
  const reqOrigin = req.get('origin');
  if (/(\.souyidai\.com)|(localhost)/.test(reqOrigin)) {
    res.header('Access-Control-Allow-Origin', reqOrigin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  let uid = req.body.uid;
  let type = req.body.type; //请求类型: 1-红包；2-返现；3-加息券

  if(!(uid && (type == 1 || type == 2 || type == 3 || type == 0))){
    res.send({
      errorCode: 1,
      errorMessage: '参数错误'
    })
    return;
  }

  let info = {};

  Data.invite.getRewardInfo(uid, type)
      .then(results => {
        info.errorCode = 0;
        info.list = [];
        results.forEach((item, i, arr)=>{
          var date = item.give_time.getFullYear() + '-' + addZ(item.give_time.getMonth()+1) + '-' + addZ(item.give_time.getDate());
          info.list.push({
            date: date,
            value: item.gift_amount / 100,
            mobile: item.remark.substring(0, 3) + '*****' + item.remark.substring(8, 11),
            type: item.gift_type
          })
        })
        res.send(info);
      })
      .catch((err) => {
        res.send({
          errorCode: 2,
          errorMessage: '系统繁忙'
        });
        console.trace(err);
      })
};
function addZ(n){ return n<10? '0'+n: ''+n}

//GET /invite_coupon/:inviteUrl 微信邀请-weixin
exports.inviteCouponView = (req, res) => {
  let inviteInfo = {};
  Data.invite.getInvite(req.params.inviteUrl)
    .then((results) => {
      inviteInfo = JSON.parse(results);
      inviteInfo.mobile = inviteInfo.mobile.substring(0, 3) + '*****' + inviteInfo.mobile.substring(8, 11);
    })
    .catch((err) => {
      console.trace(err);
      inviteInfo.mobile = '搜易贷';
    })
    .then(() => {
      res.render('invite/weixin.ejs', {
        inviteInfo: inviteInfo
      });
    });
};
//GET /invite_share/:mobile 微信邀请-weixin 分享页面
exports.inviteShareView = (req, res) => {
  const mobile = req.params.mobile;
  const inviteResult = Data.invite.createInvite(mobile);
  res.render('invite/share.ejs', {
    mobile: mobile,
    inviteUrl: inviteResult.url
  });
};
//POST /invite 微信邀请-app 邀请信息
exports.inviteAppInfo = (req, res) => {
  var reqOrigin = req.get('origin');
  if (/(\.souyidai\.com)/.test(reqOrigin)) {
    res.header('Access-Control-Allow-Origin', reqOrigin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  let resJSON = {};
  const uid = req.body.uid;
  const inviteResult = Data.invite.createInvite(undefined, uid);
  Data.invite.getGiftLogByUid(uid)
    .then((results) => {
      let giftList = results;
      let giftSum = 0;
      let ticketSum = 0;
      for (let i = 0; i < giftList.length; i++) {
        if (giftList[i].gift_type !== 3) {
          giftSum = giftSum + giftList[i].gift_amount / 100;
        } else {
          ticketSum++;
        }
      };
      resJSON.errorCode = 0;
      resJSON.inviteUrl = inviteResult.url;
      resJSON.giftSum = giftSum;
      resJSON.ticketSum = ticketSum;
    })
    .catch((err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
    })
    .done(() => {
      res.send(resJSON);
    });
};
//POST /invite_coupon 微信邀请-weixin 检查受邀人手机
exports.inviteCouponCheck = (req, res) => {
  let resJSON = {};
  API.vaildUsername(req.body)
    .catch((err) => {
      console.trace(err);
      resJSON.errorCode = 2;
      resJSON.errorMessage = '系统繁忙';
    })
    .done((results) => {
      resJSON = results.body;
      res.send(resJSON);
    });
};
//POST /invite_share 微信邀请-weixin 分享链接生成
exports.inviteShareGenerate = (req, res) => {
  let resJSON = {};
  if (req.body.uid && req.body.mobile) {
    resJSON.errorCode = 1;
    resJSON.errorMessage = '信息无效';
    res.send(resJSON);
  } else {
    const inviteResult = Data.invite.createInvite(req.body.mobile, req.body.uid);
    resJSON.errorCode = 0;
    resJSON.inviteUrl = inviteResult.url;
    res.send(resJSON);
  }
};

//POST /accountBindNew 帐号绑定接口
exports.accountBindNew = (req, res) => {
  let resJSON = {};
  const openid = req.body.openid;
  const type = req.body.type || 'serve';
  let souyidaiUser = {
    username: req.body.username.substring(0, 3) + '*****' + req.body.username.substring(8, 11),
    uid: req.body.uid,
    openid: openid
  };
  console.log('[account accountBindNew]: name:%s openid:%s type:%s', 'accountBindNew', openid, type);
  Data.user.unbindByOpenid(openid)
    .then((results) => {
      console.log('[account accountBindNew] unbindByOpenid. results:%s', results);
      Data.user.findUserByUid(souyidaiUser.uid)
        .then((results) => {
          if (results) {
            console.log(`[account accountBindNew]: results:${results}`);
            if(results.length){
              return Data.user.updateUserByUid(results[0]._id, souyidaiUser);
            }else{
              console.log(`[account accountBindNew]: add1-`, openid, type, souyidaiUser.uid, souyidaiUser.username);
              return Data.user.addUser(openid, type, souyidaiUser.uid, souyidaiUser.username);
            }
          } else {
              console.log(`[account accountBindNew]: add2-`, openid, type, souyidaiUser.uid, souyidaiUser.username);
              return Data.user.addUser(openid, type, souyidaiUser.uid, souyidaiUser.username);
          }
        })
        .then((results) => {
          if (results) {
            resJSON.errorCode = 0;
            resJSON.errorMessage = '绑定成功';
            res.send(resJSON);
            //异步拉取微信信息
            let api;
            type === 'sub' ? api = wechatSub.API : api = wechatServe.API;
            api.getUser(openid, (err, wxresult) => {
              type === 'sub' ? wxresult.openid_sub = wxresult.openid : wxresult.openid_serve = wxresult.openid;
              Data.user.updateUserFromWeixin(wxresult);
            });
          }
        })
        .catch((err) => {
          console.trace(err);
          resJSON.errorCode = 1;
          resJSON.errorMessage = '系统繁忙';
          res.send(resJSON);
        });
    })
};

exports.myAccountMoney = (req, res) => {
  let openid = req.body.openid;
  console.log(`[page myAccountMoney], openid:${openid} ,typeof openid: ${typeof openid} `);
  if(!openid || openid == 'undefined'){
    res.send({
      errorCode: 1,
      errorMessage: '请先登录绑定0'
    });
    return; 
  }

  Data.user.findUserByOpenId(openid)
    .then((results) => {
      console.log(`[page myAccountMoney],openid:${openid}, results-${results.length}: ${results[0]} -- ${results[1]}`);
      
      if(results && results.length){
        let len = results.length >= 2 ? 2 : results.length;
        let count = 0, uid = '';
        for(let i = 0; i < len; i++){
          let item = results[i];
          console.log(`[page myAccountMoney ${i}], openid_serve:${item.openid_serve}, enable:${item.enable}, souyidai_uid:${item.souyidai_uid}`);
          if(item.openid_serve === openid  && item.enable){
            count++;
            if(item.souyidai_uid){
              uid = item.souyidai_uid;
            }
          }
        }
        if(count && uid){
          console.log(`[page myAccountMoney] souyidai_uid:${uid}`)
          common.request('http://m.huli.com/wap/1.4/mycapital/chart', {}, {
                'cookie': `syd_auth=${uid}%7C%7C1%7C%7C%7C%7C1`
          })
          .then((results) => {
            res.send(results.body);
          });
        }else{
          res.send({
            errorCode: 1,
            errorMessage: '成功登录后即可查看'
          });
          return;
        }

      }else{
        res.send({
          errorCode: 1,
          errorMessage: '成功登录后即可查看'
        });
          console.log(`[page myAccountMoney]  1 len:0`)
        return;
          console.log(`[page myAccountMoney]  2 len:0`)
      }
      
    })
    .catch((err) => {
      res.send({
        errorCode: 1,
        errorMessage: '成功登录后即可查看'
      });
    })
  
};

exports.getInfoByUid = (req, res) => {
  Data.user.findUserByUid(req.query.uid)
    .then((results) => {
      res.send({
        data: results
      })
      return;
    })
}

const employees = require('./employees');
exports.annualLogin = (req, res) => {
  let resJSON = {};
  const employeeId = req.body.employeeId;
  const name = req.body.name;
  const openid = req.body.openid;
  const headimgurl = req.cookies.syd_wechat_headimg;
  console.log('[annualLogin]: employeeId: %s name: %s openid: %s headimgurl: %s', employeeId, name, openid, headimgurl);
  if (employees[employeeId]) {
    if (employees[employeeId] === name) {
      Data.annual.findLoginByOpenId(openid)
        .then((results) => {
          if (results.length !== 0) {
            resJSON.errorCode = 1;
            resJSON.errorMessage = '此微信号已绑定';
            res.send(resJSON);
          } else {
            return Data.annual.findLoginByEmployeeId(employeeId)
          }
        }, (err) => {
          console.trace(err);
        })
        .then((results) => {
          if (results.length !== 0) {
            resJSON.errorCode = 1;
            resJSON.errorMessage = '此员工号已绑定';
            res.send(resJSON);
          } else {
            Data.annual.updateLoginLog(openid, Object.assign({}, req.body, { headimgurl }));
            resJSON.errorCode = 0;
            resJSON.errorMessage = '登录成功';
            res.send(resJSON);
          }
        }, (err) => {
          console.trace(err);
        })
    } else {
      resJSON.errorCode = 1;
      resJSON.errorMessage = '工号与姓名不对应';
      res.send(resJSON);
    }
  } else {
    resJSON.errorCode = 1;
    resJSON.errorMessage = '信息有误';
    res.send(resJSON);
  }
}
