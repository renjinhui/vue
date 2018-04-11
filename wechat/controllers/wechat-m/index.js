'use strict';

const Data = require('../../data');
const soeasyAPI = require('../../@syd/ramiel');
const wechatServe = require('../wechat-service');
const common = require('../../config/common');

const API = new soeasyAPI();

const userData = (syd_auth_verify, body) => {
  let data = {
    from: 'wechat'
  };
  let auth_cookie = syd_auth_verify || '';
  if (auth_cookie !== '') {
    data.uid = auth_cookie.split('|')[0];
    data.sydaccesstoken = auth_cookie.split('|')[1];
  }
  for (let i in body) {
    data[i] = body[i];
  };
  return data;
};

//登录拦截
exports.loginInterceptor = (req, res, next) => {
  let noNeedLoginPath = ['/regist', '/registsms', '/regist', '/regist_result', '/', '/more', '/share', '/about'];
  if (/share/.test(req.path)) {
    noNeedLoginPath.push(req.path);
  }
  if (!(noNeedLoginPath.indexOf(req.path) !== -1) && !req.cookies.hasOwnProperty('syd_auth_verify')) {
    res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2F&response_type=code&scope=snsapi_base&state=account_serve#wechat_redirect');
    return;
  }
  next();
};
//id5验证拦截
exports.id5AuthInterceptor = (req, res, next) => {
  const data = userData(req.cookies.syd_auth_verify, req.body);
  API.id5Status(data)
    .then((results) => {
      if (results.body.data.status === 3) {
        next();
      } else {
        res.redirect('/m/id5_tip');
      }
    });
};
//GET / 首页
exports.indexView = (req, res) => {
  const data = userData(req.cookies.syd_auth_verify, req.body);
  API.bidList(data)
    .then((results) => {
      res.render('m/index', results.body);
    });
};
//GET /more 更多项目
exports.moreView = (req, res) => {
  const data = userData(req.cookies.syd_auth_verify, {
    type: 'more'
  });
  API.bidList(data)
    .then((results) => {
      res.render('m/more', results.body);
    });
};
//GET /safe_center 安全中心
exports.safeCenterView = (req, res) => {
  const data = userData(req.cookies.syd_auth_verify, req.body);
  API.safeCenter(data)
    .then((results) => {
      res.render('m/safe_center', results.body);
    });
};
//GET /regist 注册页面
exports.registView = (req, res) => {
  req.session.mobile = null;
  res.render('m/regist');
};
//POST /registsms 注册操作-短信
exports.registSms = (req, res) => {
  if (req.session.mobile || req.body.kaptcha === req.session.captcha) {
    API.sendSms(req.body)
      .then((results) => {
        req.session.mobile = req.body.username;
        res.send(results.body);
      });
  } else {
    res.send({
      errorCode: 1,
      errorMessage: '图形验证码错误'
    });
  }
};
//POST /regist 注册操作-注册
exports.regist = (req, res) => {
  let resJson = {};
  const openid = req.body.openid || '';
  delete req.body.openid;
  API.regist(req.body)
    .then((results) => {
      resJson = results.body;
      if (openid !== '' && results.body.errorCode === 0) {
        const resData = results.body.data;
        let souyidaiUser = {};
        souyidaiUser.uid = resData.userId;
        souyidaiUser.username = req.body.username.substring(0, 3) + '*****' + req.body.username.substring(8, 11);
        return Data.user.addAndUpdateUser(openid, 'serve', souyidaiUser.uid, souyidaiUser.username);
      }
    })
    .then((results) => {
      if (results) {
        wechatServe.API.getUser(openid, (err, wxresult) => {
          wxresult.openid_serve = wxresult.openid;
          Data.user.updateUserFromWeixin(wxresult);
        });
      }
    })
    .catch((err) => {
      console.trace(err);
    })
    .done(() => {
      res.send(resJson);
    });
};
//GET /regist_result 注册结果页
exports.registResultView = (req, res) => {
  res.render('m/regist_result');
};
//GET /id5_auth 实名认证页
exports.id5AuthView = (req, res) => {
  res.render('m/id5');
};
//GET /id5_tip 实名认证提示页
exports.id5TipView = (req, res) => {
  res.render('m/id5_tip');
};
//POST /id5_auth 实名认证操作
exports.id5Auth = (req, res) => {
  const data = userData(req.cookies.syd_auth_verify, req.body);
  API.id5Auth(data)
    .then((results) => {
      res.send(results.body);
    });
};
//GET /my_money 资金概览
exports.myMoneyView = (req, res) => {
  const data = userData(req.cookies.syd_auth_verify, req.body);
  // API.capitalOverview(data)
  API.myaccountOverview(data)
    .then((results) => {
      res.render('m/my_money', {data: results.body.data[0]});
    });
};
//GET /my_money_total 我的资金 2016.5.23
exports.myMoneyTotalView = (req, res) => {
  const data = userData(req.cookies.syd_auth_verify, req.body);
  const url = '/app/1.4/mycapital/chart';
  const headers = common.appSign(url);
  headers.sydaccesstoken = data.sydaccesstoken;
  headers.uid = data.uid;

  common.request('http://app.huli.com' + url, data, headers)
    .then((results) => {
      res.render('m/my_money_total', {data: results.body.data});
    });
};

//GET /my_money/detail 资金详情
exports.myMoneyDetailView = (req, res) => {
  res.render('m/my_money_detail');
};
//POST /my_money/detail 资金详情列表
exports.myMoneyDetail = (req, res) => {
  const data = userData(req.cookies.syd_auth_verify, req.body);
  API.capitalDetail(data)
    .then((results) => {
      res.send(results.body);
    });
};
//GET /my_invest 我的投资-列表
exports.myInvestView = (req, res) => {
  const data = userData(req.cookies.syd_auth_verify, req.body);
  API.myInvestList(data)
    .then((results) => {
      res.render('m/my_invest', results.body);
    });
};
//GET /my_invest/:bid_id 我的投资-详情
exports.myInvestItemView = (req, res) => {
  const data = userData(req.cookies.syd_auth_verify, {
    bidId: req.params.bid_id
  });
  API.myInvestItem(data)
    .then((results) => {
      res.render('m/my_invest_item', results.body);
    });
};
//GET /invest/:bid_id 买入项目
exports.investView = (req, res) => {
  const data = userData(req.cookies.syd_auth_verify, {
    bidId: req.params.bid_id
  });
  API.bidProgress(data)
    .then((results) => {
      results.body.data.bidId = req.params.bid_id;
      res.render('m/invest', results.body);
    });
};
//POST /invest 买入项目 操作
exports.invest = (req, res) => {
  const data = userData(req.cookies.syd_auth_verify, req.body);
  API.bid(data)
    .then((results) => {
      res.send(results.body);
    });
};
//GET /invest_result 投资结果
exports.investResultView = (req, res) => {
  res.render('m/invest_result');
};
//GET /recharge 充值
exports.rechargeView = (req, res) => {
  res.render('m/recharge');
};
//POST /recharge 充值-操作
exports.recharge = (req, res) => {
  API.recharge(req.body, req.headers.cookie)
    .then((results) => {
      res.send(results.body);
    });
};
//POST /card_info 银行卡信息
exports.cardInfo = (req, res) => {
  API.cardInfo(req.body, req.headers.cookie)
    .then((results) => {
      res.send(results.body);
    });
};
//GET /bind_card 绑卡
exports.bindCardView = (req, res) => {
  res.render('m/bind_card');
};
//GET /share:unionid 分享
exports.shareView = (req, res) => {
  let userInfo = {
    name: '',
    head: ''
  };
  Data.user.findUserByUnionId(req.params.unionid)
    .then((users) => {
      if (users.length !== 0) {
        userInfo = {
          name: users[0].nickname,
          head: users[0].headimgurl
        };
      }
      const data = userData(req.cookies.syd_auth_verify, req.body);
      return API.bidList(data);
    }, (err) => {
      console.trace(err);
    })
    .then((results) => {
      results.body.userInfo = userInfo;
      res.render('m/share', results.body);
    });
};
//GET /invite 邀请好友
exports.inviteView = (req, res) => {
  const unionId = req.cookies.syd_wechat_id;
  Data.user.findUserByUnionId(unionId)
    .then((users) => {
      if (users.length === 0) {
        res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2F&response_type=code&scope=snsapi_base&state=account_serve#wechat_redirect');
        return;
      }
      const uid = users[0].souyidai_uid || '';
      res.render('invite/app', {
        uid: uid
      });
    }, (err) => {
      console.trace(err);
    });
};
//GET /about 关于搜易贷
exports.aboutView = (req, res) => {
  res.render('m/about_us');
};
