'use strict';

const Data = require('../../data');
const soeasyAPI = require('../../@syd/ramiel');

const API = new soeasyAPI();

//POST /guess 竞猜活动
exports.guess = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const day = req.body.day;
  const hour = req.body.hour;
  const minute = req.body.minute;
  let uid = 0;
  let resJSON = {};
  console.log('[billion]: user guess: %s', username);
  if (new Date().getTime() >= 1460304000000) {
    resJSON.errorCode = 2;
    resJSON.errorMessage = '活动已结束';
    res.send(resJSON);
    return;
  }
  API.login({
    username: username,
    password: password
  })
    .then((results) => {
      if (results.body.errorCode === 0) {
        uid = results.body.data.userId;
        return Data.billion.findUserEventLog(uid)
      } else {
        res.send(results.body);
        return;
      }
    })
    .then((userEvents) => {
      if (userEvents.length === 0) {
        return Data.billion.updateUserEventLog(uid, {
          uid: uid,
          day: day,
          hour: hour,
          minute: minute
        })
      } else {
        resJSON.errorCode = 1;
        resJSON.errorMessage = '您已参与过竞猜活动啦!'; //已参与用户
        res.send(resJSON);
      }
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    })
    .then((result) => {
      resJSON.errorCode = 0;
      resJSON.resCode = 2; //成功参与用户
      console.warn(result);
      console.log('[billion]: user score: %s', username);
      res.send(resJSON);
      if (result.upserted.length) {
        API.giveCoupon({
          uid: uid,
          channelName: 'WXBYJCJF'
        });
      }
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    });
};

//POST /guess/userVaild 用户校验
exports.userVaild = (req, res) => {
  const username = req.body.username;
  console.log('[billion]: user vaild: %s', username);
  let resJSON = {};
  if (new Date().getTime() >= 1460304000000) {
    resJSON.errorCode = 2;
    resJSON.errorMessage = '活动已结束';
    res.send(resJSON);
    return;
  }
  Data.billion.getUserPassport(username)
    .then((users) => {
      if (users.length === 0) {
        resJSON.errorCode = 0;
        resJSON.resCode = 0; //未注册用户
        res.send(resJSON);
        return;
      }
      let userPassport = users[0];
      return Data.billion.findUserEventLog(userPassport.uid)
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    })
    .then((userEvents) => {
      if (userEvents.length === 0) {
        resJSON.errorCode = 0;
        resJSON.resCode = 1; //可参与用户
      } else {
        resJSON.errorCode = 0;
        resJSON.resCode = 3; //已参与用户
      }
      res.send(resJSON);
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    });
};

//GET /api/sydIndexData 交易数据
exports.sydIndexData = (req, res) => {
  API.sydIndexData()
    .then((results) => {
      res.send({
        errorCode: results.body.errorCode,
        data: {
          turnover: results.body.data.turnover
        }
      });
    });
};

//GET /api/investRankList 排行榜
exports.investRankList = (req, res) => {
  let resJSON = {};
  API.investRankList(10)
    .then((results) => {
      const objFilter = (el, index) => {
        return {
          nickName: el.nickName,
          phone: el.phone,
          total: el.total
        }
      };
      resJSON.errorCode = results.body.errorCode;
      resJSON.data = {
        today: results.body.data.today.map(objFilter)
      };
      res.send(resJSON);
    })
    .catch((err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    });
};

//POST /invite/login 邀请好友登录
exports.inviteLogin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const unionid = req.cookies.syd_event_id;
  let uid = 0;
  let resJSON = {};
  console.log('[billion]: user invite: %s unionid: %s', username, unionid);
  API.login({
    username: username,
    password: password
  })
    .then((results) => {
      if (results.body.errorCode === 0) {
        uid = results.body.data.userId;
        res.cookie('syd_auth_verify', results.body.data.userId + '|' + results.body.data.accessToken, {
          expires: 0,
          domain: '.souyidai.com'
        });
        Data.billion.addUserInvite(uid, unionid);
        Data.billion.insertLoginLog(uid, username, unionid);
        resJSON.errorCode = 0;
        resJSON.resCode = 2;
        resJSON.hashid = Data.invite.createInvite(undefined, uid).url;
        res.send(resJSON);
      } else {
        res.send(results.body);
        return;
      }
    })
};

//POST /invite/userVaild 邀请活动用户校验
exports.inviteUserVaild = (req, res) => {
  const username = req.body.username;
  console.log('[billion]: invite user vaild: %s', username);
  let resJSON = {};
  Data.billion.getUserPassport(username)
    .then((users) => {
      resJSON.errorCode = 0;
      resJSON.resCode = users.length;
      res.send(resJSON);
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    });
};

//POST /invite/relation 邀请活动 关系链
exports.inviteRelation = (req, res) => {
  const hashid = req.body.hashid;
  const unionid = req.cookies.syd_event_id;
  console.log('[billion]: invite user rel: %s unionid: %s', hashid, unionid);
  let resJSON = {};
  if (!unionid) {
    resJSON.errorCode = 1;
    resJSON.errorMessage = '微信认证失败';
    res.send(resJSON);
    return;
  }
  Data.billion.getInviteByHashid(hashid)
    .then((inviter) => {
      if (!inviter.length) {
        resJSON.errorCode = 1;
        resJSON.errorMessage = '邀请人不存在';
        res.send(resJSON);
        return;
      }
      return Data.user.findByUnionId(inviter[0].unionid)
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    })
    .then((users) => {
      if (!users.length) {
        resJSON.errorCode = 1;
        resJSON.errorMessage = '微信账户不存在';
        res.send(resJSON);
        return;
      }
      resJSON.errorCode = 0;
      resJSON.headimgurl = users[0].headimgurl;
      updateRelation(hashid, unionid, users[0].unionid);
      res.send(resJSON);
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    });
};

//POST /invite/relation/active 邀请活动 激活关系链
exports.inviteRelationActive = (req, res) => {
  const unionid = req.cookies.syd_event_id;
  let relation = {};
  console.log('[billion]: invite user rel active: %s', unionid);
  let resJSON = {};
  Data.billion.findRelation(unionid)
    .then((rels) => {
      if (!rels.length) {
        resJSON.errorCode = 1;
        resJSON.errorMessage = '不存在邀请关系';
        res.send(resJSON);
        return;
      }
      relation = rels[0];
      resJSON.hashid = relation.friendHashid;
      if (!relation.qualified) {
        resJSON.errorCode = 1;
        resJSON.errorMessage = '你之前已关注过搜易贷微信啦,不能成为别人的新粉丝';
        res.send(resJSON);
        return;
      }
      if (relation.status) {
        resJSON.errorCode = 1;
        resJSON.errorMessage = '你已经成为别人的粉丝了,不能再成为其他人的新粉丝';
        res.send(resJSON);
        return;
      }
      return Data.user.findByUnionId(relation.friendUnionid);
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    })
    .then((users) => {
      if (!users.length) {
        resJSON.errorCode = 1;
        resJSON.errorMessage = '微信账户不存在';
        res.send(resJSON);
        return;
      }
      resJSON.errorCode = 0;
      resJSON.headimgurl = users[0].headimgurl;
      relation.status = 1;
      return Data.billion.updateRelation(unionid, relation);
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    })
    .then((results) => {
      console.log('[billion]: invite rel active success: %s update: %j', unionid, results);
      activeRelation(relation.friendHashid, unionid);
      res.send(resJSON);
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    });
};

const updateRelation = (hashid, unionid, friendUnionid, status) => {
  let relation = {
    unionid: unionid,
    friendHashid: hashid,
    friendUnionid: friendUnionid,
    status: status || 0,
    qualified: 0
  };
  Data.billion.findRelation(unionid)
    .then((rels) => {
      if (!rels.length) {
        return Data.user.findByUnionId(unionid);
      }
      relation = rels[0];
      if (!relation.status) {
        relation.friendHashid = hashid;
        Data.billion.updateRelation(unionid, relation);
        return;
      }
    })
    .then((users) => {
      if (!users.length) {
        relation.qualified = 1;
      }
      let user = users[0];
      if (!user.openid_sub) {
        relation.qualified = 1;
      } else if (new Date(user.subscribe_time).getTime() <= 1460476800000 && !user.subscribe) {
        relation.qualified = 1;
      } else if (new Date(user.subscribe_time).getTime() > 1460476800000 ) {
        relation.qualified = 1;
      }
      Data.billion.updateRelation(unionid, relation);
    });
};

const activeRelation = (hashid, unionid) => {
  let uid = 0;
  Data.invite.getInvite(hashid)
    .then((results) => {
      uid = JSON.parse(results).uid;
      Data.billion.getInviteByHashid(hashid)
        .then((invites) => {
          if (!invites.length) {
            return;
          }
          let invite = invites[0];
          invite.helper.push(unionid);
          Data.billion.updateInvite(hashid, invite)
        });
      return Data.user.findByUnionId(unionid)
    }, (err) => {
      console.trace(err);
      console.log('[billion]: invite rel active log faild: %s unionid: %j reason: %s', hashid, unionid, 'redis 失败');
    })
    .then((users) => {
      if (!users.length) {
        console.log('[billion]: invite rel active log faild: %s unionid: %j reason: %s', hashid, unionid, 'mongo 失败');
        return;
      }
      Data.billion.insertInviteLog(uid, unionid, users[0].nickname, users[0].headimgurl);
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    });
};

//POST http://events.souyidai.com/tenbillion/zero/list/
exports.stateOfZeros = (req, res) => {
  const url = 'https://events.souyidai.com/tenbillion/zero/list/';
  API.request(url, {temp: 1}, { Cookie: `syd_auth_verify=${req.cookies.syd_auth_verify}` }, 'POST')
  .then((results) => {
    res.send(results.body);
  }, (error) => {
    res.send(error.body);
  });
};

//POST https://events.souyidai.com/tenbillion/zero10/exchange
exports.exchange = (req, res) => {
  const url = 'https://events.souyidai.com/tenbillion/zero10/exchange';
  API.request(url, {temp: 1}, { Cookie: `syd_auth_verify=${req.cookies.syd_auth_verify}` }, 'POST')
  .then((results) => {
    res.send(results.body);
  }, (error) => {
    res.send(error.body);
  });
};

//POST https://m.souyidai.com/1.1/score/total
exports.getScore = (req, res) => {
  const url = 'https://m.souyidai.com/1.1/score/total';
  API.request(url, {temp: 1}, { Cookie: `syd_auth_verify=${req.cookies.syd_auth_verify}` }, 'POST')
  .then((results) => {
    res.send(results.body);
  }, (error) => {
    res.send(error.body);
  });
}

//POST https://events.souyidai.com/tenbillion/wechat/invite
exports.getInvestedFriends = (req, res) => {
  const url = 'https://events.souyidai.com/tenbillion/wechat/invite';
  API.request(url, {temp: 1}, { Cookie: `syd_auth_verify=${req.cookies.syd_auth_verify}` }, 'POST')
  .then((results) => {
    res.send(results.body);
  }, (error) => {
    res.send(error.body);
  });
}

// POST https://events.souyidai.com/tenbillion/wechat/fans
exports.getWechatFans = (req, res) => {
  const url = 'https://events.souyidai.com/tenbillion/wechat/fans';
  API.request(url, {temp: 1}, { Cookie: `syd_auth_verify=${req.cookies.syd_auth_verify}` }, 'POST')
  .then((results) => {
    res.send(results.body);
  }, (error) => {
    res.send(error.body);
  });
}

//POST https://events.souyidai.com/tenbillion/total
exports.getTotalPrize = (req, res) => {
  const url = 'https://events.souyidai.com/tenbillion/total';
  API.request(url, {temp: 1}, { Cookie: `syd_auth_verify=${req.cookies.syd_auth_verify}` }, 'POST')
  .then((results) => {
    res.send(results.body);
  }, (error) => {
    res.send(error.body);
  });
}

exports.getLoginLog = (req, res) => {
  const uid = req.cookies.syd_auth_verify.split('|')[0];
  Data.billion.getLoginLog(uid)
    .then((users) => {
      if (users.length) {
        res.send({
          errorCode: 0,
          data: 1
        })
      } else {
        res.send({
          errorCode: 0,
          data: 0
        })
      }
    }, (err) => {
      console.trace(err);
      res.send({
        errorCode: 1,
        errorMessage: '系统繁忙'
      });
    })
}

exports.insertLoginLog = (req, res) => {
  const uid = req.cookies.syd_auth_verify.split('|')[0];
  let unionid = null;
  let mobile = '';
  Data.billion.getUserPassportByUid(uid)
    .then((users) => {
      mobile = users[0].mobile;
      Data.billion.addUserInvite(uid, unionid);
      Data.billion.insertLoginLog(uid, mobile, unionid);
      res.send({
        errorCode: 0
      })
    }, (err) => {
      console.trace(err);
      res.send({
        errorCode: 1,
        errorMessage: '系统繁忙'
      });
    })
}
