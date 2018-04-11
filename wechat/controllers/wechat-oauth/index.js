'use strict';

const config = require('../../config');
const OAuth = require('wechat-oauth');
const request = require('request');
const Data = require('../../data');
const soeasyAPI = require('../../@syd/ramiel');
const common = require('../../config/common');

const API = new soeasyAPI();
const client = new OAuth(config.weixin.service.appid, config.weixin.service.appsecret, (openid, callback) => {
  Data.redis.getCache(`wechat:service:oauth_token:${openid}`)
    .then((oauthToken) => {
      callback(null, JSON.parse(oauthToken));
    })
    .catch((err) => {
      console.trace(err);
      callback(err);
    });
}, (openid, oauthToken, callback) => {
  Data.redis.setCache(`wechat:service:oauth_token:${openid}`, JSON.stringify(oauthToken))
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      console.trace(err);
      callback(err);
    });
});

//url 生成
exports.urlGenerate = (url, state, scope) => {
  return client.getAuthorizeURL(url, state, scope);
};
//GET /oauth 用户信息授权接收
exports.OAuth = (req, res) => {
  client.getAccessToken(req.query.code, (err, result) => {
    if (err) {
      console.trace(err);
      res.redirect(oAuthUrlConfig(req.query.state, { openid: 'error' }));
      return;
    }
    const oAuthUrl = oAuthUrlConfig(req.query.state, result.data);
    console.log('[oauth]: state:%s openid:%s unionid:%s scope:%s create_at:%s', req.query.state, result.data.openid, result.data.unionid, result.data.scope, result.data.create_at);
    if (result.data.scope === 'snsapi_userinfo') {
      client.getUser(result.data.openid, (err, userInfo) => {
        if (err) {
          console.trace(err);
          res.redirect(oAuthUrl);
          return;
        }
        res.cookie('syd_event_id', userInfo.unionid, {
          expires: 0,
          domain: '.souyidai.com'
        });
        res.cookie('syd_wechat_name', userInfo.nickname, {
          expires: 0,
          domain: '.souyidai.com'
        });
        res.cookie('syd_wechat_headimg', userInfo.headimgurl, {
          expires: 0,
          domain: '.souyidai.com'
        });
        userInfo.openid_serve = userInfo.openid;
        Data.user.updateUserFromWeixin(userInfo);
        Data.user.findEnableUserByUnionId(userInfo.unionid)
          .then((users) => {
            if (users.length === 0) {
              res.redirect(oAuthUrl);
              return;
            }
            const user = users[0];
            res.cookie('syd_auth_id', user.souyidai_uid, {
              expires: 0,
              domain: '.souyidai.com'
            });
            res.cookie('syd_auth_name', user.souyidai_username, {
              expires: 0,
              domain: '.souyidai.com'
            });
            res.redirect(oAuthUrl);
          }, (err) => {
            console.trace(err);
            res.redirect(oAuthUrl);
            return;
          });
      });
    } else {
      Data.user.findEnableUserByOpenId(result.data.openid)
        .then((users) => {
          if (users.length === 0) {
            res.redirect(oAuthUrl);
            return;
          }
          const user = users[0];
          res.cookie('syd_wechat_id', user.unionid, {
            expires: 0,
            domain: '.souyidai.com'
          });
          res.cookie('syd_wechat_name', user.nickname, {
            expires: 0,
            domain: '.souyidai.com'
          });
          const loginData = {
            url: oAuthUrl,
            uid: user.souyidai_uid
          };
          API.wxLogin(loginData)
            .then((results) => {
              if (results.body.errorCode !== 0) {
                res.redirect(oAuthUrl);
                return;
              }
              console.log('[oauth]: unionid:%s uid:%s ', user.unionid, user.souyidai_uid);
              res.redirect(results.body.data);
            })
            .catch((err) => {
              console.trace(err);
              res.redirect(oAuthUrl);
              return;
            });
        }, (err) => {
          console.trace(err);
          res.redirect(oAuthUrl);
          return;
        });
    }
  });
};

//GET /oauth/authlink 获取我的资金信息
exports.authLink = (req, res) => {
  client.getAccessToken(req.query.code, (err, result) => {
    if (err) {
      console.trace(err);
      res.redirect(oAuthUrlConfig(req.query.state, { openid: 'error' }));
      return;
    }

    const oAuthUrl = oAuthUrlConfig(req.query.state, result.data);
    console.log('[oauth authlink]: state:%s openid:%s unionid:%s scope:%s create_at:%s, oAuthUrl:%s', req.query.state, result.data.openid, result.data.unionid, result.data.scope, result.data.create_at, oAuthUrl);
    return res.redirect(oAuthUrl + result.data.openid);
  })
};

exports.huliAccount = (req, res) => {
  client.getAccessToken(req.query.code, (err, result) => {
    if (err) {
      console.trace(err);
      res.redirect(oAuthUrlConfig(req.query.state, { openid: 'error' }));
      return;
    }
    
    const openid = result.data.openid;
    // 判断是否绑定过账号
    Data.user.findUserByOpenId(openid)
    .then((results) => {
      console.log(`[oauth huliAccount] openid: ${openid}, result-length: ${results.length}, result[0]:${results[0]}, result[1]:${results[1]}`);
      let isbind = false, name = '';
      for(let i = 0; i < results.length; i++){
        let item = results[i];
        if(item.openid_serve !== undefined && item.enable){
          isbind = true;
          name = item.souyidai_username;
        }
      }
      console.log(`[oauth huliAccount] isbind:${isbind}`)
      if(isbind){
        res.redirect(`https://m.huli.com/#/unbind_wx?openid=${openid}&name=${name}&t=${Math.random()}`);
      }else{
        res.redirect(`https://m.huli.com/#/login?openid=${openid}&t=${Math.random()}`);
      }
    })
    .catch((err) => {
      console.log(`[oauth huliAccount] err: ${err}`)
      res.redirect(`https://m.huli.com`);
    });
  })
};

exports.getUrl = (req, res) => {

  client.getUserByCode(req.query.code, (err, result) => {
    if (err) {
      console.trace(err);
      res.send({
        errorCode: 1,
        errorMessage: '服务器出错了'
      })
      return;
    }
    
    const userInfo = result;
    console.log('[oauth geturl]: state:%s openid:%s ', req.query.state, userInfo.openid);

    let url = "http://h5.flyfinger.com/2017/huli/years3/index.html?nickname=";
    res.redirect(url + encodeURIComponent(userInfo.nickname));
  })

};

exports.threeParty = (req, res) => {
  client.getUserByCode(req.query.code, (err, result) => {
    const oAuthErrorUrl = 'https://weixin.souyidai.com/threeparty/game.html';
    if (err) {
      console.trace(err);
      res.redirect(oAuthErrorUrl);
      return;
    }
    
    const userInfo = result;
    console.log('[oauth threeparty]: state:%s openid:%s ', req.query.state, userInfo.openid);

    // let userUrl = 'http://api.e.souyidai.com/activity/code/wechatuser';
    let userUrl = 'http://weixinwaibao.souyidai.com/threeparty/wechatuser';
    let state = req.query.state.split('|'),
        inviteOpenid = state[1] == 'wx'? '' : state[1],
        oAuthUrl = oAuthUrlConfig(state[0], result);

    if(state[1] == 'wx'){
      // 插入已从公众号进入接口
      common.request('http://weixinwaibao.souyidai.com/threeparty/clickinfo', {
        openid: userInfo.openid,
        mobile: '',
        type: '2',
        result: '1',
        remark: 'threeparty'
      })
      .then((results) => {
        console.log(`[oauth threeparty] results:${results}`);
        addUser();
      });
    }else{
      addUser();
    }
    
    function addUser(){
      request.get({ 
          url: userUrl + '?userjson='+encodeURIComponent(JSON.stringify(userInfo)),
          encoding: 'utf8',
          gzip: true
      }, (err, response, body) => {
          switch(state[0]){
            case 'threeparty1':
            case 'threeparty2':
                oAuthUrl += userInfo.openid;
                break;
            case 'threeparty3':
                oAuthUrl += userInfo.openid + '&inviteopenid=' + inviteOpenid;
                break;
          }
          try{
              body = JSON.parse(body);
              if(body.errcode){
                  res.redirect(oAuthErrorUrl);
                  return;
              }
              if(response.statusCode === 200  &&  body.errorCode == 0){
                  res.redirect(oAuthUrl);
              }else{
                  res.redirect(oAuthErrorUrl);
              }
          }catch(ex){
              res.send({
                  errorMessage: 'error'
              })
          }
      });
    }
    
  })
}

exports.threePartyTask = (req, res) => {
  const inviteopenid = req.query.inviteopenid;
  res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+config.weixin.service.appid+'&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2Fwxactivity&response_type=code&scope=snsapi_userinfo&state=threeparty3|'+inviteopenid+'#wechat_redirect');
};

const oAuthUrlConfig = (state, oAuthInfo) => {
  const t = Math.random();
  const urlList = {
    'account_sub': 'https://weixin.souyidai.com/page/account?type=sub&openid=',
    'account_serve': 'https://weixin.souyidai.com/page/account?type=serve&openid=',
    'account_regist': 'https://weixin.souyidai.com/m/regist?type=serve&openid=',
    'invest': 'https://m.souyidai.com/invest?client=wap&from=wechatmenu&name=invest001',
    'recharge': 'https://m.souyidai.com/account/recharge?client=wap&from=wechatmenu&name=invest005',
    'usercenter': 'https://m.souyidai.com/account',
    'index': 'https://weixin.souyidai.com/m',
    'my_money': 'https://weixin.souyidai.com/m/my_money',
    'my_invest': 'https://weixin.souyidai.com/m/my_invest',
    'safe_center': 'https://weixin.souyidai.com/m/safe_center',
    'regist_result': 'https://weixin.souyidai.com/m/regist_result',
    'shake': 'https://weixin.souyidai.com/event/index_wechat',
    'christmas': 'https://weixin.souyidai.com/christmas',
    'christmas_help': 'https://weixin.souyidai.com/christmas?is_help=1&friend_uid=',
    'invite': 'https://weixin.souyidai.com/m/invite',
    'billion': 'https://weixin.souyidai.com/10billion/#!/invite',
    'billion_help': 'https://weixin.souyidai.com/10billion/#!/invite/help/',
    'billion_guide': 'https://weixin.souyidai.com/10billion/#!/invite/guide?hashid=',
    'light': 'https://weixin.souyidai.com/10billion/app/views/shareMillion.html',
    'euro2016': 'https://events.souyidai.com/static/euro2016/',
    'annual2017': 'https://weixin.souyidai.com/annual2017/?openid=',
    'my_money_new': 'http://m.huli.com/#/myaccount?t=' + t + '&openid=',
    'ninegame': 'https://events.huli.com/static/redpacket/main.html?openid=',
    'hulilogin': 'https://m.huli.com/#/login?t=' + t + '&openid=',
    'huliregist': 'https://m.huli.com/#/home?t=' + t + '&openid=',
    'huliinvite': 'https://m.huli.com/#/invite?t=' + t + '&openid=',
    'hulicompany': 'https://m.huli.com/#/companyIntro?t=' + t,
    'huliinvest': 'https://m.huli.com/#/invest?t=' + t,
    'threeparty1': 'https://weixin.souyidai.com/threeparty/index.html?openid=',
    'threeparty2': 'https://weixin.souyidai.com/threeparty/task.html?openid=',
    'threeparty3': 'https://weixin.souyidai.com/threeparty/task.html?openid='
  };
  if (/account/.test(state)) {
    return urlList[state] + oAuthInfo.openid;
  }
  if (/christmas_help/.test(state)) {
    const friendUid = state.replace('christmas_help_', '');
    return urlList['christmas_help'] + friendUid;
  }
  if (/billion_help/.test(state)) {
    const hashid = state.replace('billion_help_', '');
    return urlList['billion_help'] + hashid;
  }
  if (/billion_guide/.test(state)) {
    const hashid = state.replace('billion_guide_', '');
    return urlList['billion_guide'] + hashid;
  }
  if (/annual2017/.test(state)) {
    return urlList['annual2017'] + oAuthInfo.openid;
  }
  return urlList[state];
};

const oAuthErrorUrlConfig = (state) => {
  const errorUrl = {
    'ninegame': 'https://events.huli.com/static/redpacket/'
  }

  return errorUrl[state];
}
