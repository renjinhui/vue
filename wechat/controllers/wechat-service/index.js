'use strict';
const config = require('../../config');
const wechat = require('wechat');
const wechatAPI = require('wechat-api');
const messageCtrl = require('../wechat-message');
const Data = require('../../data');
const soeasyAPI = require('../../@syd/ramiel');
const crypto = require('crypto');
const request = require('request');

const soeasyApi = new soeasyAPI();
const api = new wechatAPI(config.weixin.service.appid, config.weixin.service.appsecret, (callback) => {
  Data.redis.getCache('wechat:service:access_token')
    .then((acccessToken) => {
      callback(null, JSON.parse(acccessToken));
    })
    .catch((err) => {
      console.trace(err);
      callback(err);
    });
}, (acccessToken, callback) => {
  Data.redis.setCache('wechat:service:access_token', JSON.stringify(acccessToken))
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      console.trace(err);
      callback(err);
    });
});
api.registerTicketHandle((type, callback) => {
  Data.redis.getCache(`wechat:service:ticket_token:${type}`)
    .then((ticketToken) => {
      callback(null, JSON.parse(ticketToken));
    })
    .catch((err) => {
      console.trace(err);
      callback(err);
    });
}, (type, ticketToken, callback) => {
  Data.redis.setCache(`wechat:service:ticket_token:${type}`, JSON.stringify(ticketToken))
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
  console.log(req.query,  config.weixin);
  let signatureValid = wechat.checkSignature(req.query, config.weixin.service.token);
  if (signatureValid) {
    res.send(req.query.echostr);
  } else {
    res.send('签名校验失败');
  }
};
//POST / 消息接收
exports.messageReplay = wechat(config.weixin.service, (req, res, next) => {
  // 微信输入信息都在req.weixin上
  let message = req.weixin;
  console.log('[message]: type:%s openid:%s msgtype:%s msgtime:%s content:%s event:%s eventkey:%s', 'serve', message.FromUserName, message.MsgType, message.CreateTime, message.Content || null, message.Event || null, message.EventKey || null);
  if (message.EventKey === 'customer_service') {
    // api.sendText(message.FromUserName, '您好 请问有什么可以帮您？', (err, data) => {})
    res.transfer2CustomerService();
    return;
  }
  if (message.Event === 'SCAN' && message.EventKey === '2017') {
    res.reply('欢迎参加2017·狐力全开年会盛典! \n\n点击<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2F&response_type=code&scope=snsapi_userinfo&state=annual2017#wechat_redirect">年会签到</a>完成签到, 才能参与抽奖环节哦~. \n\n还可以回复"年会"开头的消息, 参与微信墙互动! 例如回复"年会 2017狐力全开", 将会发送2017狐力全开');
    return;
  }
  if (/头像/.test(message.Content)) {
    Data.user.findUserByOpenId(message.FromUserName)
      .then((users) => {
        console.log('[API] head image: openid:%s', message.FromUserName);
        if (users.length !== 0 && users[0].enable) {
          api.getUser(message.FromUserName, (err, result) => {
            if (err) {
              console.trace(err);
              res.reply('系统繁忙,请稍后再次尝试绑定');
            } else {
              const userData = {
                uid: users[0].souyidai_uid,
                url: result.headimgurl
              };
              soeasyApi.HeadUpload(userData)
                .then((results) => {
                  if (results.body.errorCode === 0) {
                    res.reply('头像上传成功,请刷新页面查看头像');
                  } else {
                    res.reply('系统繁忙,请稍后再次尝试绑定');
                  }
                })
                .catch((err) => {
                  console.trace(err);
                  res.reply('系统繁忙,请稍后再次尝试绑定');
                });
              Data.user.updateUserFromWeixin(result);
            }
          });
        } else {
          res.reply('您尚未登录,请点击菜单中的我的账户-登录按钮登录后再次回复');
        }
      });
  } else if (message.EventKey === 'serve_passport') {
    Data.user.findUserByOpenId(message.FromUserName)
      .then((results) => {
        if (results.length !== 0 && results[0].enable) {
          res.reply(`您当前处于登录状态，进入搜易贷请点击<a href="https://weixin.souyidai.com/m">【进入搜易贷】</a>。若需要退出登录请点击<a href="https://weixin.souyidai.com/page/account?openid=${message.FromUserName}&type=serve">【安全退出】</a>`);
        } else {
          res.reply(`您好！欢迎您来到搜狐旗下金融平台搜易贷，新用户请点击<a href="https://weixin.souyidai.com/m/regist?openid=${message.FromUserName}">【注册搜易贷】</a>；老用户请点击<a href="https://weixin.souyidai.com/page/account?openid=${message.FromUserName}&type=serve">【登录】</a>`);
        }
      });
  } else if (/年会/.test(message.Content)) {
    Data.user.findUserByOpenId(message.FromUserName)
      .then((results) => {
        const messageBody = {
          campaign_id: 476764,
          timestamp: new Date().getTime(),
          nonce: Math.random().toString(36).slice(2),
          from_src: message.ToUserName,
          account: message.FromUserName,
          account_type: 0,
          type: 0,
          content: message.Content.slice(2)
        };
        const shasum = crypto.createHash('sha1');
        const arr = ['bf6c04834e31e52764c3e08f98e8fc86', messageBody.timestamp, messageBody.nonce].sort();
        shasum.update(arr.join(''));
        messageBody.signature = shasum.digest('hex');
        if (results.length !== 0) {
          messageBody.name = results[0].nickname;
          messageBody.head = results[0].headimgurl;
        } else {
          messageBody.name = '搜易贷';
        }
        request({
          url: 'http://xianchang.qq.com/live/wall/forwardmsg',
          method: 'POST',
          form: messageBody
        });
        res.reply('发送成功!');
      });
  }else {
    res.reply(messageCtrl[message.MsgType](message, 'serve', api));
  }

  if(message.MsgType === "event" && message.Event === "subscribe"){
    let kfMsg = '已有狐狸金服账号，请<a href="'
    +'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+config.weixin.service.appid+'&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2Fauthlink&response_type=code&scope=snsapi_base&state=hulilogin#wechat_redirect' +
    '">点击这里</a>绑定；\n新朋友，请<a href="'
    +'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+config.weixin.service.appid+'&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2Fauthlink&response_type=code&scope=snsapi_base&state=huliregist#wechat_redirect' +
    '">点击这里</a>注册并绑定。现在注册成为会员，588元见面礼即刻到账。快开启财富之旅吧！';
    setTimeout(() => {
      sendKfMsg(message.FromUserName, kfMsg);
    }, 1000);
  }
});

// post 解绑账号
exports.unbindWx = (req, res) => {
  let openid = req.body.openid, message = '';
  Data.user.findUserByOpenId(openid)
    .then((results) => {
      console.log(`[serve 解绑帐号] openid: ${openid}, result-length: ${results.length}`);
      if(results && results.length){
          // let item = results[0];
          // console.log(`[serve 解绑帐号] souyidai_uid:${item.souyidai_uid}, souyidai_username:${item.souyidai_username}`);
          Data.user.unbindByOpenid(openid)
          .then((results) => {
            console.log('[serve 解绑帐号]: name:%s results:%j', 'accountBindDisable', results);
            message = `解绑成功!`;
          }, (err) => {
            console.trace(err);
            message = '解绑失败，系统繁忙！';
          })
          .then(() => {
            res.send({
              errorCode: 0,
              errorMessage: message
            });
          });
      }else{
        res.send({
          errorCode: 1,
          errorMessage: '未找到与该公众号相绑定的狐狸慧赚帐号！'
        })
      }
    });
};

//GET /jssign jsSDK签名
exports.jsSignature = (req, res) => {
  let jsParam = {
    debug: req.query.debug || false,
    jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'closeWindow', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'hideMenuItems'],
    url: decodeURIComponent(req.query.url || '').replace(/#.*/, '')
  };
  const reqOrigin = req.get('origin');
  /*if (/(\.huli\.com)|(\.souyidai\.com)|(\.xiaohujr\.com)/.test(reqOrigin)) {
    res.header('Access-Control-Allow-Origin', reqOrigin);
  }*/
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  let resJSON = {};
  api.getJsConfig(jsParam, (err, result) => {
    if (err) {
      resJSON.errorCode = 1;
      console.log(err);
    } else {
      resJSON.errorCode = 0;
      resJSON.result = result;
    }
    res.send(resJSON);
  });
};
//GET /getmenu 获取自定义菜单
exports.getMenu = (req, res) => {
  api.getMenu((err, result) => {
    if (err) {
      console.trace(err);
    }
    console.log('[API]: name:getMenu result:success');
    res.send(result);
  });
};
//GET /setmenu 设置自定义菜单
exports.setMenu = (req, res) => {
  let customMenu = config.menu.serveMenu;;
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
  let user = req.query.openid;
  api.getUser(user, (err, result) => {
    res.send(result);
  });
};
//POST /gettemplate 设置自定义菜单
exports.getTemplate = (req, res) => {
  api.getAllPrivateTemplate((err, result) => {
    if (err) {
      console.trace(err);
      return;
    }
    console.log('[API]: name:getTemplate result:%j', result);
    Data.template.addTemplate(result.template_list);
    res.send(result);
  });
};
//POST /message 发送模板消息
exports.sendMessage = (req, res) => {
  const uid = req.body.uid;
  const templateId = req.body.templateId;
  const url = req.body.url || '';
  const templateParams = paramsParse(req.body.templateParams);
  let resJson = {};
  let testAccount = {
    '2000000117': 'oRwNOt7n_QBIBRi7ghxsTdDFbyqw',
    '2000007314': 'oRwNOt359DOt6HcxZauco1ajZVl8'
  };
  console.warn(req.body);
  console.log(uid, 1111);
  Data.user.findUserByUid(uid)
    .then((users) => {
      console.log(users.length, ' user.length')
      let user;
      if (testAccount[uid]) {
        user = {
          openid_serve: testAccount[uid]
        };
      } else {
        if (users.length === 0) {
          resJson.errorCode = 1;
          resJson.errorMessage = '用户尚未绑定服务号';
          res.send(resJson);
          return;
        }
        user = users[0];
        console.log(user, !user.enable, ' user')
        if (!user.enable) {
          resJson.errorCode = 2;
          resJson.errorMessage = '用户关闭了服务号绑定';
          res.send(resJson);
          return;
        }
      }
      console.log(`[message send]: uid:${uid}`);
      // console.log('[message send]: uid:%s templateId:%s openid:%s  templateParams:%s  url:%s', uid, templateId, user.openid_serve, JSON.parse(templateParams), url);
      api.sendTemplate(user.openid_serve, templateId, url, templateParams, (err, result) => {
        console.log(err, ' send err')
        if (err) {
          console.trace(err);
          resJson.errorCode = 4;
          resJson.errorMessage = '发送失败(服务错误)';
          res.send(resJson);
          return;
        }
        console.log(JSON.stringify(resJson), ' resJson')
        resJson.errorCode = 0;
        resJson.data = result;
        Data.template.findTemplateBydId(templateId)
          .then((template) => {
            console.log(template, ' findTemplateBydId');
            if (template.length === 0) {
              resJson.data.content = 'template error';
              res.send(resJson);
              return;
            }
            resJson.data.content = template[0].content.replace(/\{\{([^}}]+)?\}\}/g, (s0, s1) => {
              let key = s1.replace('.DATA', '');
              return templateParams.hasOwnProperty(key) ? templateParams[key].value : '';
            });
            res.send(resJson);
          }, (err) => {
            console.trace(err);
            resJson.data.content = 'db error';
            res.send(resJson);
            return;
          });
      });
    }, (err) => {
      console.trace(err);
      resJson.errorCode = 3;
      resJson.errorMessage = '发送失败(数据库错误)';
      res.send(resJson);
      return;
    });
};

/*exports.sendMessage = (req, res) => {
  const uid = req.body.uid;
  const templateId = req.body.templateId;
  const url = req.body.url || '';
  const templateParams = paramsParse(req.body.templateParams);
  let resJson = {};
  let testAccount = {
    '2000000117': 'oRwNOt7n_QBIBRi7ghxsTdDFbyqw',
    '2000007314': 'oRwNOt359DOt6HcxZauco1ajZVl8'
  };
  console.warn(req.body);
  Data.user.findUserByUid(uid)
    .then((users) => {
      let user;
      if (testAccount[uid]) {
        user = {
          openid_serve: testAccount[uid]
        };
      } else {
        if (users.length === 0) {
          resJson.errorCode = 1;
          resJson.errorMessage = '用户尚未绑定服务号';
          res.send(resJson);
          return;
        }
        user = users[0];
        if (!user.enable) {
          resJson.errorCode = 2;
          resJson.errorMessage = '用户关闭了服务号绑定';
          res.send(resJson);
          return;
        }
      }
      console.log('[message send]: uid:%s templateId:%s openid:%s', uid, templateId, user.openid_serve);
      api.sendTemplate(user.openid_serve, templateId, url, templateParams, (err, result) => {
        if (err) {
          console.trace(err);
          resJson.errorCode = 4;
          resJson.errorMessage = '发送失败(服务错误)';
          res.send(resJson);
          return;
        }
        resJson.errorCode = 0;
        resJson.data = result;
        Data.template.findTemplateBydId(templateId)
          .then((template) => {
            if (template.length === 0) {
              resJson.data.content = 'template error';
              res.send(resJson);
              return;
            }
            resJson.data.content = template[0].content.replace(/\{\{([^}}]+)?\}\}/g, (s0, s1) => {
              let key = s1.replace('.DATA', '');
              return templateParams.hasOwnProperty(key) ? templateParams[key].value : '';
            });
            res.send(resJson);
          }, (err) => {
            console.trace(err);
            resJson.data.content = 'db error';
            res.send(resJson);
            return;
          });
      });
    }, (err) => {
      console.trace(err);
      resJson.errorCode = 3;
      resJson.errorMessage = '发送失败(数据库错误)';
      res.send(resJson);
      return;
    });
};*/


const paramsParse = (templateParams) => {
  let params = {};
  let data = {};
  try {
    params = JSON.parse(templateParams);
  } catch (err) {
    console.trace(err);
  }
  for (let key in params) {
    data[key] = {
      value: params[key]
    };
  }
  return data;
};
//GET /getqrcode 获取二维码
exports.getQRCode = (req, res) => {
  //场景 'billion'
  const sence = req.query.senceid;
  api.createLimitQRCode(sence, (err, result) => {
    res.send(result);
  });
};

// 发送客服消息
function sendKfMsg(openid, text){
  api.sendText(openid, text, (err, data) => {
    console.log(`[sendKfMsg] openid:${openid}, text:${text}, err:${err}, data:${data}`);
  })
}
