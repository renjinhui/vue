'use strict';
const app = require('./app');

const t = Math.random();
const menu = {
  subMenu: {
    button: [{
      name: '易·投资',
      sub_button: [{
        type: 'click',
        name: '注册/绑定',
        key: 'regist'
      }, {
        type: 'view',
        name: '我要投资',
        url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2F&response_type=code&scope=snsapi_base&state=invest#wechat_redirect'
      }, {
        type: 'view',
        name: '我的账户',
        url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2F&response_type=code&scope=snsapi_base&state=usercenter#wechat_redirect'
      }, {
        type: 'click',
        name: '投资生猛技能',
        key: 'invest_quick'
      }, {
        type: 'view',
        name: '精彩荐文',
        url: 'http://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MzA5MDk1ODkzNQ==#wechat_webview_type=1&wechat_redirect'
      }]
    }, {
      type: 'view',
      name: '搜易贷100亿',
      url: 'https://weixin.souyidai.com/10billion/h5/'
    }, {
      name: 'SoEasy',
      sub_button: [{
        type: 'click',
        name: '为你服务',
        key: 'kefu'
      }, {
        type: 'view',
        name: '关于搜易贷',
        url: 'https://weixin.souyidai.com/m/about'
      }]
    }]
  },
  serveMenu: {
    button: [{
      name: '我要理财',
      sub_button: [{
        type: 'view',
        name: '注册有礼',
        url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+app.service.appid+'&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2Fauthlink&response_type=code&scope=snsapi_base&state=huliregist#wechat_redirect'
      }, {
        type: 'view',
        name: '我要投资',
        url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+app.service.appid+'&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2Fauthlink&response_type=code&scope=snsapi_base&state=huliinvest#wechat_redirect'
      }, {
        type: 'view',
        name: '下载APP',
        url: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.souyidai.investment.android&ckey=CK1289998290989'
      }, {
        type: 'view',
        name: '关于搜易贷',
        url: 'https://m.souyidai.com/#/sydIntro'
      }]
    }, {
      name: '我的账户',
      sub_button: [{
        type: 'view',
        name: '我的资产',
        url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+app.service.appid+'&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2Fauthlink&response_type=code&scope=snsapi_base&state=my_money_new#wechat_redirect'
      }, {
        type: 'view',
        name: '邀请好友',
        url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+app.service.appid+'&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2Fauthlink&response_type=code&scope=snsapi_base&state=huliinvite#wechat_redirect'
      }, {
        type: 'view',
        name: '账号管理',
        url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+app.service.appid+'&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2Fhuliaccount&response_type=code&scope=snsapi_base&state=huliaccount#wechat_redirect'
      }, {
        type: 'click',
        name: '常见问题',
        key: 'question_answer'
      }]
    }, {
      type: 'click',
      name: '呼叫客服',
      key: 'customer_service'
    }]
  }
};

module.exports = menu;



/*{
  type: 'view',
  name: '关于搜易贷',
  url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+app.service.appid+'&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2Fauthlink&response_type=code&scope=snsapi_base&state=hulicompany#wechat_redirect'
}*/
/*serveMenu: {
    button: [{
      name: '进入搜易贷',
      sub_button: [{
        type: 'view',
        name: '新手专享',
        url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2F&response_type=code&scope=snsapi_base&state=index#wechat_redirect'
      }, {
        type: 'view',
        name: '搜易贷100亿',
        url: 'https://weixin.souyidai.com/10billion/h5/'
      }]
    }, {
      name: '我的账户',
      sub_button: [{
        type: 'view',
        name: '我的资金',
        url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2F&response_type=code&scope=snsapi_base&state=my_money#wechat_redirect'
      }, {
        type: 'view',
        name: '我的投资',
        url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2F&response_type=code&scope=snsapi_base&state=my_invest#wechat_redirect'
      }, {
        type: 'click',
        name: '注册/登录',
        key: 'serve_passport'
      }, {
        type: 'view',
        name: '安全中心',
        url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2F&response_type=code&scope=snsapi_base&state=safe_center#wechat_redirect'
      }]
    }, {
      name: 'SoEasy',
      sub_button: [{
        type: 'view',
        name: '下载APP',
        url: 'https://events.souyidai.com/static/app/index_3.html'
      }, {
        type: 'view',
        name: '安全保障',
        url: 'https://m.souyidai.com/1.1/security'
      }, {
        type: 'view',
        name: '关于搜易贷',
        url: 'https://weixin.souyidai.com/m/about'
      }, {
        type: 'click',
        name: '在线客服',
        key: 'customer_service'
      }]
    }]
  }*/

  //// url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2Fmy_money_new&response_type=code&scope=snsapi_base&state=my_money_new#wechat_redirect'
