'use strict';
const config = require('../../config');
const Data = require('../../data');

module.exports = (message, type, api) => {
  const eventConfig = config[`${type}Event`];
  if (message.Event === 'subscribe') {
    let resText = eventConfig.subscribe;
    if (type === 'serve') {
      resText = resText.replace('{{account}}', `https://weixin.souyidai.com/m/regist?openid=${message.FromUserName}`);
    }
    api.getUser(message.FromUserName, (err, wxresult) => {
      if (err) {
        console.trace(err);
        return;
      }
      type === 'sub' ? wxresult.openid_sub = wxresult.openid : wxresult.openid_serve = wxresult.openid;
      Data.user.updateUserFromWeixin(wxresult)
        .then((results) => {
          console.log('[event]: name:%s results:%j', 'subscribeUpdate', results);
        }, (err) => {
          console.trace(err);
        });
    });
    return resText;
  }
  if (message.Event === 'unsubscribe') {
    api.getUser(message.FromUserName, (err, wxresult) => {
      if (err) {
        console.trace(err);
        return;
      }
      type === 'sub' ? wxresult.openid_sub = wxresult.openid : wxresult.openid_serve = wxresult.openid;
      Data.user.updateUserFromWeixin(wxresult)
        .then((results) => {
          console.log('[event]: name:%s results:%j', 'unSubscribeUpdate', results);
        }, (err) => {
          console.trace(err);
        });
    });
    return '';
  }
  //订阅号-绑定账户回复
  if (message.EventKey === 'regist') {
    let resText = eventConfig[message.EventKey];
    resText = resText.replace('{{account_bind}}', `https://weixin.souyidai.com/page/account?openid=${message.FromUserName}&type=sub`);
    resText = resText.replace('{{account_regist}}', `https://events.souyidai.com/info/221.htm?suc=110210005&client=wap&from=wechatmenu&name=invest002&openid=${message.FromUserName}&type=sub`);
    return resText;
  }
  return eventConfig[message.EventKey] || eventConfig['default'];
};
