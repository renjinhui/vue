'use strict';
const qa = require('./serve-qa');

let event = {
  //subscribe: '亲，终于把你盼来了！点击<a href="{{account}}">【注册】</a>立享<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2F&response_type=code&scope=snsapi_base&state=index#wechat_redirect">【新手专享】</a>，30天年化收益9.88%哦！，\n\n今年的平安夜，搜易贷会给你发圣诞红包和礼物哦~回复【圣诞】看看怎么玩[勾引]',
  // subscribe: '亲，终于把你盼来了！点击<a href="{{account}}">【注册】</a>立享<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2F&response_type=code&scope=snsapi_base&state=index#wechat_redirect">【新手专享】</a>，30天年化收益9.88%哦！，\n\n下面这些常见问题，输入数字编号可自助查看啦：\n1. 搜易贷与搜狐什么关系？\n2. 投资新手专享项目的规则是什么？\n3. 新手专享项目的利息如何计算？\n4. 收益回款到账时间是什么时候？\n如果有更多问题，可微信直接咨询，接客时间9:00-18:00随时恭候～',
  subscribe: '终于等到你啦！感谢您关注搜易贷-狐狸慧赚服务号。重要消息公布：搜易贷与华夏银行北京分行合作的资金存管系统已经上线。\n搜易贷是狐狸金服旗下网贷平台，狐狸慧赚是狐狸金服旗下一站式互联网综合理财平台。狐狸金服将致力于为您提供最优的金融服务，让金融变得更简捷。如您遇到任何疑问，请联系我们：\n客服电话：400-8989-666\n官方网址：<a href="https://m.huli.com?t=2">www.huli.com</a>\n',
  news_guide: [{
    title: 'P2P新手必读，为什么我的收益少了？',
    description: '对啊，为什么呢？！！为什么呢？！！为什么呢？？？',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4cArbSgfv0wgYJ9to7oicBiaVXJjKRZ0roLBpR4ic4J5AmJJeCtGWMyhzkNNaVXdzsVCJp14QEnaBaWQ/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=206116927&idx=1&sn=1378d51ee42c3bf2fbdc547235907485#rd'
  }],
  newyear: [{
    title: '安静的美男子们“拼星星”祝搜易贷投资小伙伴新春快乐咯~\(≧▽≦)/~',
    description: '祝搜易贷投资用户 羊年大吉！ 岁岁有收益！！ 多财又多易！！！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4crgsEcDIpduBiaIf8wZE8bltthicP4XJsz7pMHSRCqBLrx5oGVM8GUF4o1nRKib5ibXfpbBNsaHAMDibw/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=203596060&idx=1&sn=4fd12f774aa1a2e9425afd9eb05e47f0#rd'
  }],
  baozhang: [{
    title: '重磅新闻｜搜易贷推出风险保障金制度 引领P2P行业安全新标准',
    description: '为了能够更及时有效的发挥风险保障金的效用，搜易贷自掏腰包一次性预存2千万人民币作为初始保障金。',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fnwznjPHTyyicc9J7oicIfmUn8SN6rYydIwdy0KE40IZRr0lS4Rn63FA0eRSuvp9e3MGDxYg5Wo6bg/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=204205783&idx=1&sn=926af4cf1cb3a9c01422c06c5b628dba#rd'
  }],
  kefu: '[愉快]Hi~来到这里，应该是遇到什么困难了吧？打个电话就会有可爱的姑娘为你提供帮助哟： 4008 989 666 （时间：9:00-18:00） 客服邮箱： kefu@souyidai.com 企业QQ： 4008 989 666',
  faq: '[坏笑]Easy为你准备三个常见问题的锦囊哟~ 回复【新手】、【投资】、【借款】可得[勾引]',
  media_report: [{
    title: '赶紧的吧，巨头进军P2P被央视围观了，CCTV有时候还挺靠谱的说！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fOeWaomehQTaYnszt266bFtwLrIQ7HZ5Rhmnec49F6KENW3icvxrK03hRcQ2HfmVuheTz9DuzEgyg/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=200922359&idx=1&sn=667dbf332172e8abda7dccebb2ffe950#rd'
  }, {
    title: '新浪科技 ︳首付贷：P2P市场的刚需',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fOeWaomehQTaYnszt266bFnDA6JfPLfR8Biaxkz6via9QoRpE0iaTyX6B47yYv65JpNK2IfuJL6uicLw/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=200922359&idx=2&sn=e7f3f0ba1a963e557c6a96296b7be718#rd'
  }, {
    title: '网易新闻 ︳搜易贷多管齐下打造“最放心”网贷平台',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fOeWaomehQTaYnszt266bFkMG65SQt9TuTDJeacHyHxFJyAhT5chmq5RWsHIdZlEUiaibDeURVtrWw/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=200922359&idx=3&sn=33f4261bedb2bb7564fe828c7b36285a#rd'
  }, {
    title: '搜狐焦点 ︳从搜易贷看互联网大佬进军P2P优势何在',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fOeWaomehQTaYnszt266bFZ6dfyQqkibtmlwoKibX4gXTm0tFMTXYOErwd63qOuHJ45MVYb5TqCAibg/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=200922359&idx=4&sn=dc6172bc48c32f1a97dd547517abd6ef#rd'
  }, {
    title: '财经网 ︳蒋轩：互联网行业应由内生力推动革新 保护游戏参与者',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fOeWaomehQTaYnszt266bFAaj6EriclKwb0iaRSLDvqEnM4OBc1S9qE5nybicclriaWGDxFwpsABOszg/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=200922359&idx=5&sn=1cb3bc91fbe872d183c4f2ba3ad9f033#rd'
  }, {
    title: '人民网 ︳O2O借贷平台搜易贷上线 欲建"互联网信贷新标准"',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fOeWaomehQTaYnszt266bFJibIVg0UJVticvkNj1HlN5AiaQVoqXicuic314MRQdx0ubnQNUcMmPfaAHw/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=200922359&idx=6&sn=3457cdcab568b7af8cf4606e3de23ee5#rd'
  }, {
    title: '投资界 ︳张朝阳也玩P2P网贷了？搜狐旗下公司搜易贷近日上线',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fOeWaomehQTaYnszt266bFwvic8m6hMgx6asicxFkKZPLK2NdicjObulFS01b8dZNicUJhRwR1Pus0YQ/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=200922359&idx=7&sn=5079c03f50859046c6412c57aeef0805#rd'
  }],
  about_us: [{
    title: '关于搜易贷 | 搜狐集团旗下互联网金融平台！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fGEjfPhnqNhECYIeGmqIk6qb0NvAyhBnXYdE0ZHZncQRBWdnHhVUk8s53fb0jBmSib50zqhEO0sicA/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=200921214&idx=1&sn=064a100aefa48ee4c039450e7a3ea777#rd'
  }, {
    title: '管理团队 | 您的信赖是我们前进的动力！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fGEjfPhnqNhECYIeGmqIk6NMcNvCPXQicINM8fgjNGcJoCWhCeWaLibBUM0cqPyjx6SjBMNibYx3gmw/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=200921214&idx=2&sn=3205ee6f2a57c3ac8dee2e927f49d4a2#rd'
  }, {
    title: '品牌大片 | 搜易贷，我信赖！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fGEjfPhnqNhECYIeGmqIk6JzMyIguOJlClhdm74RlWbjwqD6FAuunoMVw3CwnEk1PksDCD0QtqYA/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=200921214&idx=3&sn=db0b91500b4b50aaab5dcdbfbb81cb60#rd'
  }],
  annual: [{
    title: '搜易贷2014年度业绩报告重磅来袭！',
    description: '点【阅读原文】进入Easyer特别为您精心准备的年报！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4d6fEo2Nz6B90Phdx7faVHYia9mxK0M14oB89MeYS1NoS6Yrrico6dibuUXfSWJ6eaWvD05Tfm1MFCNw/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=203599963&idx=1&sn=22fbed83ba36bdb1620c422f83ec0702#rd'
  }],
  jingcai: [{
    title: '福利｜快来领搜易贷定制记事本和投资红包！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4d621pGqS88kt3TdUVVcN2Oy19x87ePp3qVIupaN3VxX6MfxeARFyEhgNBeE1oky0Fn48zLyaGE2w/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=204210879&idx=1&sn=a5010d19fe1ef2291397c95a91939bd2#rd'
  }, {
    title: '三月钜献｜一张图教你看懂“定期宝”',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4d621pGqS88kt3TdUVVcN2Otw5ODqYmOKWIp3NV2QnBc0S3CfLgrUGf0GosxUCTPPPs1yD7icGibPSA/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=204210879&idx=2&sn=681787e03ddd7e5093b182f11188a126#rd'
  }, {
    title: '新闻｜搜易贷推出“懒人”投资神器“定期宝”',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4d621pGqS88kt3TdUVVcN2OJ0lp8sKdHLRz3quPIbUx2icGhJwlVYk1icDbqQbAPZGyPtMpUVLmv3KQ/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=204210879&idx=3&sn=fe71ebee15d23f232bf8dac3934ead74#rd'
  }],
  woshou: [{
    title: '报名开始！搜易贷深圳投资人握手会~',
    description: '春天来了，Easyer将在4月前往南方，与投资小伙伴进行一场面对面的握手会，零距离交流。期待你的加入~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4ea4RnvkFpyn7ZLScNnBLWUPvKhlLp4iaMUFdWs0KJa8XDVu581j5ywGicCb2nWxrzeeWvQvZ4KNGibQ/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=204485722&idx=1&sn=86fce1c024c3d042f59b2d219b4c7075#rd'
  }],
  regist: '绑定微信订阅号跟您的搜易贷账号，在微信充值、投资更方便哦！\n\n已经有搜易贷账户，请<a href="{{account_bind}}">点击这里</a>绑定。\n\n新用户<a href="{{account_regist}}">点击这里</a>注册。',
  Q1: [{
    title: '搜易贷2015年第一季度运营报告！',
    description: '你关心的，都在这里~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4chlfLniaz1zMvzptNcsQ7luCMZtCvxYNN2J4y9z6vS9S4IB9x7Bo70rKvMT6yIsTWKY1FXzxaqPGQ/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=205942392&idx=1&sn=fae511b13182ccfdac60f53221160e26#rd'
  }],
  app: [{
    title: '出大事了！搜易贷来了个大美人~',
    description: '才入夏就发这种福利真的好吗！！！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4etlgtrssSSOSbXrmC7QjtjnZImOjOyYpkv52TeQ9vic8zspEeOOTmUCMYIRZdU7FpR5AVfFicwO7icQ/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=205824522&idx=1&sn=9ea3efafec0bb2ce434ea852044d4633#rd'
  }],
  rangnifa: [{
    title: '看到朋友圈X东的广告了么？',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4cM1Fs0ou78Xx2nrHXb0yv4WZTuVwWy0cIiaKG2UPOLMPrMbd113nrWwZqLKdnhy4Z3d7OgXbxw1Cw/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=206236942&idx=1&sn=ffd931e71da4722a4cbaab0b7b0afd18#rd'
  }, {
    title: '世界这么大，我想要加息！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4cM1Fs0ou78Xx2nrHXb0yv4uNq4bC7NmiaVN6XJVV8POZLp4XAOtnnicrFicQedPyLjETbhgoBicUibRAA/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=206236942&idx=2&sn=f3b15e942e03a6afa5f6d1f8a1e1d75c#rd'
  }, {
    title: 'YaoYao切克闹~煎饼果子来一套！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4cM1Fs0ou78Xx2nrHXb0yv437NIUk4Viciccy8B1ORia3E9Jic0tUPqlHWKT4QB3qvoiaX7I9Vcv3w5x0Q/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=206236942&idx=3&sn=13df69fee4c25e96744582724fca7f47#rd'
  }, {
    title: '投500送18现金！“邀请好友+”GO!',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4cM1Fs0ou78Xx2nrHXb0yv4j5M7xtWRxCJW6PHet9xJTJPF8L0ACjMLvSricl2wMibPMrt5ib5KACnCg/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=206236942&idx=4&sn=0dded0c9402c413a9bc40cdfc6a912a2#rd'
  }],
  zujinbao: [{
    title: '搜易贷大佬们在杭州发生了什么？更多秘照流出~',
    description: '快来围观啊！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4cPoySE5dE1VfmwiaKfVJibQdxqdOficsBjJR9cUWlBNeXag5CLWsu8yOVxaEa0UXQNXWSzktGDdpn2Q/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=206833625&idx=1&sn=df011a12ce70ce014a8eda878a46d837#rd'
  }],
  haoyangmao: [{
    title: '股民不哭！搜易贷有羊毛撸~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4diaRd0ibia2QwQFVicrzFqhk82wZy2ZHeLDFBZ0GITROmGiaTOxick67CLOq0gOibuwXmLHjWSlDpnYdNmQ/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=207008951&idx=1&sn=f23084ef23e5b4490eed802a9a2e40a8#rd'
  }, {
    title: '【通知】搜易贷平台默认充值额度大幅度提升啦！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4diaRd0ibia2QwQFVicrzFqhk82WHBKQz46r6aHmeFhBab78GPZfLXictBjOmG7r1jNlfmnzAqt7P6aFqQ/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=207008951&idx=2&sn=dd50e796f00406f104396c3a5a826dc4#rd'
  }],
  baiwan: [{
    title: '【测试】你靠啥get到100万哒？',
    description: '别轻易玩，会上瘾~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fJpq0aFbX6xeAQqqgJCibwtklTrlNJibCa4qlPwJXRu4nt0RE2nD8fzrt6QhicL0sWygCqVZjt3xicicg/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=207410682&idx=1&sn=aeaeb85d8a4b71fb166354229df22b86#rd'
  }],
  Q2: [{
    title: '搜易贷2015年第2季度运营报告！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fHR2TRBuL6m0IqIREnrS8D98eS14skKZDiaWE5XTHP6zAd2Jtt1RusOV1liacU1UWnukR4dOibAs1MA/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=208825156&idx=1&sn=c115993f35143377f77c3e0e23e2c435#rd'
  }],
  shake: [{
    title: '【年中大福利】这次捞金的姿势很销魂哦~',
    description: '尖叫声在哪里！！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4dCRNL3l1UtDSBooghxK9uQJLWCbyUiaUfO3lZc6kiaZc7jMaZM6CRjgbWzIK9DMP4NdPXEiaVZuOz4g/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=209334966&idx=1&sn=77c6896c5535a4d3d679a0b4481cc91f#rd'
  }]
};

event.question_answer = qa.qa_index;
module.exports = event;
