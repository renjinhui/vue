'use strict';
const event = {
  subscribe: '据说想放心投资的小伙伴都聚在这里，你的选择很靠谱哟~',
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
  kefu: 'Hi，来到这里应该是遇到什么问题了吧？搜易贷提供以下方式为你解决麻烦事！\n客服热线：4008 989 666（时间：9:00-18:00）\n微信服务号：souyidai888（时间：9:00-18:00）\n客服邮箱：kefu@souyidai.com\n企业QQ：4008 989 666',
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
  }],
  money: [{
    title: '我倾其全身1284元，买了一瓶水！',
    description: '吓死宝宝了',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4dwc7ynL8RF5q54dwpwuu3L53niakuymej82iaAr8WqmAr6LiaSXwWFeGlRY1OvMdZaLibtia0HhhPlMYg/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=209714365&idx=1&sn=b2d8f5b6b0c1a8a1b3dcf9a14bd6d439#rd'
  }],
  bear: [{
    title: '猎熊行动！8月数钱尽情玩耍~',
    description: '盛夏，起嗨！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4eoSH4hfia4PtldiafMe5FQtH0jDiawd6zpYGtOcMI1YUPFyUURXMjjiaCSA7knq7TD9yKrict1NzBxXpg/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=209931629&idx=1&sn=aad4c5e523215412178d7201418123b3#rd'
  }],
  sevenxi: [{
    title: '强拆！情侣党这么危险 代表月亮消灭你',
    description: '红包连拿3天？ 每天最多88元？ 我还有事 先走了',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fPGaq1FJQ6uA7FJA05XbGGomUmnr8wIlqhDMPUTWno9icibpcA1Imt8o0fomK7T9UkgWDXzVUrosxA/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=210266510&idx=1&sn=0b3e85f9d32b0db412ed6f9b4df8c690#rd'
  }],
  oneyear: [{
    title: '9月15日 零点 Let"s party！',
    description: '正确参与就送10元投资红包~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fdgrUgz9oKXDj2Ga1M6s88VSlDDH8abmV5I82Nm3Epr6pL0c8LrP6rib3e1r0Edwo0x0x3eDqhibJA/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=210752412&idx=1&sn=8f3873e5c35fa8e1fb1cc2dd62cd8f73#rd'
  }],
  movie: [{
    title: '终于等到你！',
    description: '有个恋爱想和你好好谈一下~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4c98DRPaUBxFQeuwPROVyQUjXmNQrYwmg2XB3vmmwg0e1C3EfZ4E23KeicUdTdPMHhPDuRDXDpPA3g/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=210532525&idx=1&sn=0c693828c7968a610085fe7657de1c78#rd'
  }],
  jibao: [{
    title: '搜易贷2015年第3季度运营报告！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fJF5ENIgnKQy8vZzP3SlxR8h3KrELE5ibylF5m4AU92c2mV4Z2PK0uLicI7y5a8XPBPANCXVeJlQIA/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=211532715&idx=1&sn=b83f2dc57c21d793e247231a70d502d4#rd'
  }, {
    title: '搜易贷2015年第2季度运营报告！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fJF5ENIgnKQy8vZzP3SlxRJDEME50xIVhYcu8SR5XjiaJLTxGWwCicPRgLI3SnKwBQY5ibJeLbnzMOw/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=210714825&idx=1&sn=cd93ca460324bb143d53002d923fbaf9#rd'
  }, {
    title: '搜易贷2015年第1季度运营报告！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fJF5ENIgnKQy8vZzP3SlxR5OKo5g3UfNLiansaIybgKw2wJsgmPWNVZVp5hFpFGFjVoMt6f43b3oA/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=210714825&idx=2&sn=f90d45d9184b9a002898b7bc282ae265#rd'
  }],
  invest_quick: [{
    title: '抢项目靠它 ｜生猛酷炫的“一键投资”技能！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4eXjFl6nKvvltibNkWYkThwB6wjQT5ricYZBCpaLhUuFfiabNZeY3nViblFyKFvSjxel3qqicbmDZ3NQmA/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=210715236&idx=1&sn=1d04a5efe63f580cceac593794416a15#rd'
  }, {
    title: '加息券｜你真的会用么？',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4eXjFl6nKvvltibNkWYkThwBeHPsPFSoeXJz44DIwBXXG7pYrTAMib3nw94cfPZkO5J1k9nDo2ibvxlA/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=210715236&idx=2&sn=2b6409efbc2136e7a19463c7ff9d34d8#rd'
  }, {
    title: 'P2P新手必读｜为什么我的收益少了？',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4eXjFl6nKvvltibNkWYkThwB1qY45C46EdNicJOeIdDcIOuPBEMF93y49mPTHaibrjTWaJgFxGNMH81A/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=210715236&idx=3&sn=e78344b6953a887a4157fd48f1650363#rd'
  }],
  song: [{
    title: '滋补一下你的“肾”',
    description: '玫瑰金什么的，最俗气了……人家才不会掏钱买买买呢',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4cjkDCjFibOkXUtQWE8sIJ4gMYM5RnTs6NiabkezweduZDzTwSxWzLjKh0RibY3rStpoZCPRlQLmkaxA/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=210951292&idx=1&sn=ab72f89ec48fa0374b7ec9f95aef9257#rd'
  }],
  five: [{
    title: '密码与红包',
    description: '惊天秘密 等你揭晓',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fXdw40ZJ35fGCpQGFXjTuNVhgF1aIiaTiaGMYNOATcqAzqt20FAxKxuZ1lhwq2QTDx0r3cbLVY0ePQ/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=400576820&idx=1&sn=91947189c3c9ad659bc2690649488a6f#rd'
  }],
  annual2016: [{
    title: '搜易贷2015年年度运营报告',
    description: '2016，再接再厉！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fILxKPhicJoL57HElbdFGlRGuRibLgVjQ2H3Lwd5xibb9qNoqo6OCEFygHaPozlz8wWrusribupxJAUQ/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=403168120&idx=1&sn=d4fa80be434b8b789e142ec9b4c9d2b0#rd'
  }],
  billion: [{
    title: '【狂欢1】100%中奖，猜对得更多 ',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4cIHcNw4iaViaazvPzN2XeZGT8qwtDFxvyvP6BZcxVMH9WgmjeDuIK9QIFfEBicHbVGqeia8cFbFkfKrA/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=404688959&idx=1&sn=659632a48a633b4fd035c4fdd1520894#rd'
  }, {
    title: '【狂欢2】送iPad Pro！！ ',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4cIHcNw4iaViaazvPzN2XeZGT2WZxjicuhiaickbzaHR8Bhncd0HOC5iaWZN98phkt59fepF1EWXQMnkpSg/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=404688959&idx=3&sn=7d52e25810b768a8cba451f73cb8483b#rd'
  }, {
    title: '【狂欢3】Top 10 天天赢壕礼 ',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4cIHcNw4iaViaazvPzN2XeZGT8DgfibzOgkdoSXRSTRhicge7GkZ5QbJlRGYfBYJCOfpokibk5VIEybymQ/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=404688959&idx=3&sn=7d52e25810b768a8cba451f73cb8483b#rd'
  }, {
    title: '【狂欢4】加息1% ',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4cIHcNw4iaViaazvPzN2XeZGTsvwmqiamFVEHlDBGQToSZDiaTug2Rpk86yVckTZSql2Fibf1eZOFlGh2A/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=404688959&idx=4&sn=eba9ff95eff892df64716fa47dc52b0a#rd'
  }, {
    title: '【狂欢5】百万奖励协奏曲！ ',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4cIHcNw4iaViaazvPzN2XeZGTYcBOghklLavWCWQXVeRlrg9znWFiaxk3JSDaM9qu5FNyTEt8y3pDOKw/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=404688959&idx=5&sn=2453974c993ee134c50c10f3ba11455c#rd'
  }]
};
module.exports = event;
