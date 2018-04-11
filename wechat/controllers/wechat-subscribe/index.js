'use strict';
const config = require('../../config');
const wechat = require('wechat');
const Data = require('../../data');
const wechatAPI = require('wechat-api');
const messageCtrl = require('../wechat-message');

const api = new wechatAPI(config.weixin.subscribe.appid, config.weixin.subscribe.appsecret, (callback) => {
  Data.redis.getCache('wechat:subscribe:access_token')
    .then((acccessToken) => {
      callback(null, JSON.parse(acccessToken));
    })
    .catch((err) => {
      console.trace(err);
      callback(err);
    });
}, (acccessToken, callback) => {
  Data.redis.setCache('wechat:subscribe:access_token', JSON.stringify(acccessToken))
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      console.trace(err);
      callback(err);
    });
});
api.registerTicketHandle((type, callback) => {
  Data.redis.getCache(`wechat:subscribe:ticket_token:${type}`)
    .then((ticketToken) => {
      callback(null, JSON.parse(ticketToken));
    })
    .catch((err) => {
      console.trace(err);
      callback(err);
    });
}, (type, ticketToken, callback) => {
  Data.redis.setCache(`wechat:subscribe:ticket_token:${type}`, JSON.stringify(ticketToken))
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      console.trace(err);
      callback(err);
    });
});

//API
exports.API = api;
//GET / 校验微信服务接入签名
exports.checkSignature = (req, res) => {
  let signatureValid = wechat.checkSignature(req.query, config.weixin.subscribe.token);
  if (signatureValid) {
    res.send(req.query.echostr);
  } else {
    res.send('签名校验失败');
  }
};
//POST / 消息接收
exports.messageReplay = wechat(config.weixin.subscribe, (req, res, next) => {
  // 微信输入信息都在req.weixin上
  let message = req.weixin;
  let resMessage = messageCtrl[message.MsgType](message, 'sub', api);
  console.log('[message]: type:%s openid:%s msgtype:%s msgtime:%s content:%s event:%s eventkey:%s', 'sub', message.FromUserName, message.MsgType, message.CreateTime, message.Content || null, message.Event || null, message.EventKey || null);
  res.reply(resMessage);
  // 微信邀请活动提示
  // if (message.Event === 'subscribe') {
  //   let relation = {};
  //   const inviteUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2F&response_type=code&scope=snsapi_userinfo&state=light#wechat_redirect';
  //   let inviteGuideUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2F&response_type=code&scope=snsapi_userinfo&state=billion_guide_';
  //   api.getUser(message.FromUserName, (err, userInfo) => {
  //     if (err) {
  //       console.trace(err);
  //       console.log('[billion]: invite user subscribe check faild: %s', message.FromUserName);
  //       res.reply(resMessage);
  //       return;
  //     }
  //     Data.billion.findRelation(userInfo.unionid)
  //       .then((rels) => {
  //         if (!rels.length) {
  //           res.reply(resMessage);
  //           return;
  //         }
  //         relation = rels[0];
  //         inviteGuideUrl = inviteGuideUrl + (relation.friendHashid || '') + '#wechat_redirect';
  //         if (!relation.qualified) {
  //           resMessage = `你已经是搜易贷的老粉丝了，不能再成为别人的粉丝~不如点下<a href="${inviteUrl}">#点亮百亿财富计划#</a>，也来玩这个活动！`
  //           res.reply(resMessage);
  //         } else {
  //           return Data.user.findByUnionId(relation.friendUnionid)
  //         }
  //       }, (err) => {
  //         console.trace(err);
  //         res.reply(resMessage);
  //       })
  //       .then((users) => {
  //         if (!users.length) {
  //           return;
  //           res.reply(resMessage);
  //         }
  //         let user = users[0];
  //         if (relation.status) {
  //           resMessage = `你已经站队在${user.nickname || 'TA'}那边咯，不能再成为别人的粉丝。但你人缘辣么好~不如点下<a href="${inviteUrl}">#点亮百亿财富计划#</a>，也来玩这个活动！`;
  //         } else {
  //           resMessage = `别走！！\n帮${user.nickname || 'TA'}点一下<a href="${inviteGuideUrl}">#点亮百亿财富计划#</a>`;
  //         }
  //         res.reply(resMessage);
  //       }, (err) => {
  //         console.trace(err);
  //         res.reply(resMessage);
  //       });
  //   });
  // } else {
  //   res.reply(resMessage);
  // }
});
//GET /jssign jsSDK签名
exports.jsSignature = (req, res) => {
  let jsParam = {
    debug: req.query.debug || false,
    jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'closeWindow', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage'],
    url: req.query.url
  };
  let resJSON = {};
  api.getJsConfig(jsParam, (err, result) => {
    if (err) {
      resJSON.errorCode = 1;
      console.trace(err);
    } else {
      resJSON.errorCode = 0;
      resJSON.result = result;
    }
    res.send(resJSON);
  });
};
//GET /getmenu 获取自定义菜单
exports.getMenu = (req, res) => {
  // api.getMenu((err, result) => {
  //   if (err) {
  //     console.trace(err);
  //   }
  //   console.log('[API]: name:getMenu result:success');
  //   res.send(result);
  // });
  let img = `/root/tmp/${req.query.imgindex}.jpg`;
  api.uploadMaterial(img, 'image', (err, result) => {
    res.send(result);
  });
};
//GET /setmenu 设置自定义菜单
exports.setMenu = (req, res) => {
  let customMenu = config.menu.subMenu;
  api.createMenu(customMenu, (err, result) => {
    if (err) {
      console.trace(err);
    }
    console.log('[API]: name:setMenu result:%j', result);
    res.send(result);
  });
};
//GET /getuser 获取用户信息
exports.getUserInfo = (req, res) => {
  let userList = [];
  for (let i = 0; i < userList.length; i++) {
    api.getUser(userList[i], (err, result) => {
      console.log('openid:', result.openid, 'nickname:', result.nickname);
    });
  };
};
