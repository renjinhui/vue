'use strict';
const qa = require('./serve-qa');
let text = {
  // 'default': '嗨，暂时没有找到您想要的答案，您可以直接微信留言给我，我会第一时间回复您哒！接客时间9:00-18:00，您也可以拨打客服电话：4000-168-866联系我们。',
  'default': '您好，我们微信和400（4008-989-666）的人工服务时间为：9:00-18:00，欢迎您工作时间咨询，感谢支持。',
  '暖男': [{
    title: '安静的美男子们“拼星星”祝搜易贷投资小伙伴新春快乐咯~\(≧▽≦)/~',
    description: '祝搜易贷投资用户 羊年大吉！ 岁岁有收益！！ 多财又多易！！！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4crgsEcDIpduBiaIf8wZE8bltthicP4XJsz7pMHSRCqBLrx5oGVM8GUF4o1nRKib5ibXfpbBNsaHAMDibw/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=203596060&idx=1&sn=4fd12f774aa1a2e9425afd9eb05e47f0#rd'
  }],
  '妹纸|美女|妹子': [{
    title: '搜易贷的美女们要祝大家“新年快乐”',
    description: '好多照片……好多妹纸……美哭了……那个，看到最后有大大大大惊喜！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4cOJcN2EZqoDdyLsWuwpnGyL8ydDBjoglslSibIgsq56jEvK0BvxHoZNRoSmobcrp03CBH7Kb1OopQ/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=202436248&idx=1&sn=06ca6fd9473f2769dc5d0c4bdf1484f1#rd'
  }],
  '年会': [{
    title: '搜易贷“2016●猴赛雷”开年盛典，等你投出一票！',
    description: '哇，猴赛雷！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4eoHNic0J9QK9Y3yomZibFTEXL4FU2zBMPwIK4fTMbhhyOcJStqbggvriaM9GO8iaia9t1D7zsTnrxGjrg/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=403830686&idx=1&sn=1465fae90ba674cc5bf6bf1c876d031a#rd'
  }],
  'easy|Easy|EASY': [{
    title: '加Easy个人微信为好友，搜易贷最热乎的福利信息，抢先知道~',
    description: '我的微信号是Souyidai_Easy，等你哟~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4dh9YwyQMHrBtK8hTryfCmn8nl3LgqoozPGvCNgzsOjz4Iv6EuA9LmvZNvGsabUn3wFOHx6MDUfiaQ/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=203978621&idx=1&sn=e62225f351e102942a5c0c0a5097f57f#rd'
  }],
  '提现|取现': '您好，您的取现申请成功后，搜易贷会在1-2个工作日内处理您的提现需求，如遇节假日将顺延~',
  '机器人|自动回复|自动|机器': '被你发现了[坏笑]',
  '先息后本|还款|等额本息 ': [{
    title: '新手必读：「还款」及「收益」计算',
    description: '还款方式Q: 借款人还款计算方式有几种？A: 两种，等额本息和每月还息，最后还本。1、等额本息：等额本息还款',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4d7JWZjCZaEKXNupt0r1WmBJzic5ky68BBRQrUjd05ZCYxs8DfHx6KYkB4VHFjPbpOoZ39Ru4cAamw/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=200925112&idx=1&sn=b5fd365ab1815e558ebd8134aa5a487d#rd'
  }],
  '转让|债权转让': [{
    title: '搜易贷的「投资产品」有哪些？',
    description: '首付贷Q: “首付贷”是一个怎样的产品？A：焦点首付贷”是由搜狐焦点与搜易贷联合推出的一款创新互联网金融服务',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4d7JWZjCZaEKXNupt0r1WmBib3Bex3U2m0iaHh8cKovPPmP9C6l8QHeoQW8DyjBV11kzDjYrzoiaQmDg/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=200922761&idx=1&sn=1f0c34b1f8b38065b227410f1f1e77fa#rd'
  }],
  // '首付贷': [{
  //   title: '1分50秒满标！首付贷首次放标被秒抢~',
  //   description: '被人争抢的感觉真是太好啦~！',
  //   picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4ewjTX1YZlb9rKNN4QhgrEMTN0RlqkibwCVzw19e372JqTpITxutMBkorAgHFzNOoc1QH8vNWcfD5w/0',
  //   url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=200790896&idx=1&sn=b4d58c8ca9c4fc9cce1144250433b0b5#rd'
  // }],
  '借款|贷款': '你好，搜易贷借款最近有优惠活动哦~即日起到8月16日，在线提交借款申请的搜易贷老用户可享受借款费率8.8折优惠！想进一步了解[勾引]<a href="https://events.souyidai.com/info/wap/1009.htm?client=wap&from=wechatkeyword&name=jiekuan">戳人家</a>',
  // '投资': [{
  //   title: '搜易贷的「投资产品」有哪些？',
  //   description: '首付贷Q: “首付贷”是一个怎样的产品？A：焦点首付贷”是由搜狐焦点与搜易贷联合推出的一款创新互联网金融服务',
  //   picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4d7JWZjCZaEKXNupt0r1WmBib3Bex3U2m0iaHh8cKovPPmP9C6l8QHeoQW8DyjBV11kzDjYrzoiaQmDg/0',
  //   url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=200922761&idx=1&sn=1f0c34b1f8b38065b227410f1f1e77fa#rd'
  // }],
  '新手': [{
    title: '新手必读：「还款」及「收益」计算',
    description: '还款方式Q: 借款人还款计算方式有几种？A: 两种，等额本息和每月还息，最后还本。1、等额本息：等额本息还款',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4d7JWZjCZaEKXNupt0r1WmBJzic5ky68BBRQrUjd05ZCYxs8DfHx6KYkB4VHFjPbpOoZ39Ru4cAamw/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=200925112&idx=1&sn=b5fd365ab1815e558ebd8134aa5a487d#rd'
  }],
  '搜易贷|你们|好吗|在吗|了解': [{
    title: '关于搜易贷 | 搜狐集团旗下互联网金融平台！',
    description: '关于搜易贷搜易贷，搜狐集团旗下互联网金融平台。搜易贷由搜狐畅游（NASDAQ:CYOU）原CFO何捷先生创建',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fGEjfPhnqNhECYIeGmqIk6qb0NvAyhBnXYdE0ZHZncQRBWdnHhVUk8s53fb0jBmSib50zqhEO0sicA/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=200921214&idx=1&sn=064a100aefa48ee4c039450e7a3ea777#rd'
  }],
  '定期宝': [{
    title: '关于定期宝，你必须知道的8件事！',
    description: '​最近很多小伙伴在微信里打听定期宝的各种消息，Easy汇总了大家最关心的几个问题，统一回复下~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4cewpibx4yy6WUufQbDLTzRogGX7sfjBvNdrd3lGfo91yGE50452okD1GK9NVOSrJIeF6LQDcDygTw/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=204686767&idx=1&sn=3f140ff9092c00cb7db44f1e66bfbc21#rd'
  }],
  '活动': [{
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
  '报名': [{
    title: '报名开始！搜易贷深圳投资人握手会~',
    description: '春天来了，Easyer将在4月前往南方，与投资小伙伴进行一场面对面的握手会，零距离交流。期待你的加入~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4ea4RnvkFpyn7ZLScNnBLWUPvKhlLp4iaMUFdWs0KJa8XDVu581j5ywGicCb2nWxrzeeWvQvZ4KNGibQ/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=204485722&idx=1&sn=86fce1c024c3d042f59b2d219b4c7075#rd'
  }],
  '答案': '谢谢你回答Easy的提问[害羞]~获奖信息将在4月21日公布，Easy祝愿获奖的是你哟~么么哒！',
  '复联|妇联': '将Easy准备的<a href="http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=206074874&idx=1&sn=ebc84121d3eaf514ec5a9e9ec9a703e2#rd">【有个叫《复仇者联盟2》的电影想免费请你看一下！】</a>的图文消息转发到朋友圈，并写一下你的搜易贷投资级别（怎么写都随你哟[调皮]），截图后发回到这里，并留下手机号，即算参与！\n\n活动结束后，Easy会根据你自封的投资级别，挑选20个有趣的送出双！人！电！影！票！[勾引]',
  '520': {
    type: 'image',
    content: {
      mediaId: 'mAglnHG7fwLTTvCui5OeiCeCLZs60rxEB5niqCvCQ14'
    }
  },
  '我靠什么': [{
    title: '我靠什么get到100万「抠门」',
    description: '戳击【阅读原文】看你是靠什么赚到首个100万哒~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fJpq0aFbX6xeAQqqgJCibwtIfZvjS2XtaF6cDA4xia1Ohusc5VBFibSK5gCekt4728r3aibicU0LdIDkQ/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=207402529&idx=1&sn=5aa8baa6397402c92e88e657b6eef5b5#rd'
  }, {
    title: '我靠什么get到100万「逆境」',
    description: '戳击【阅读原文】看你是靠什么赚到首个100万哒~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fJpq0aFbX6xeAQqqgJCibwttXeX6XHic3vFicr6aDHhg2yEFjZQFcdu0CsJeez9GvZ1bQEnEW7njCXQ/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=207401310&idx=1&sn=a707bfc687ee56ecb1a6cf3214f504f4#rd'
  }, {
    title: '我靠什么get到100万「颜值」',
    description: '戳击【阅读原文】看你是靠什么赚到首个100万哒~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fJpq0aFbX6xeAQqqgJCibwtdchb4uL3IZYEpOHWjfWSpDej9VYXnicNa5wm1Yaia4NGicwX84yc1mI8Q/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=207400996&idx=1&sn=29588f3c4297ebff715485563ff0321f#rd'
  }, {
    title: '我靠什么get到100万「伙伴」',
    description: '戳击【阅读原文】看你是靠什么赚到首个100万哒~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fJpq0aFbX6xeAQqqgJCibwtb3KHcHBmr1QaZ1Siag8aJH1XPCOOqYSia2mX6FTLtg6Gk5mKdGChiazpQ/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=207400720&idx=1&sn=67c0f47a30c2a6023145f57bdcab8053#rd'
  }, {
    title: '我靠什么get到100万「孤独」',
    description: '戳击【阅读原文】看你是靠什么赚到首个100万哒~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fJpq0aFbX6xeAQqqgJCibwtqchpRl4t3iclc55Hx2Jqv6f9lhr7g0vibmAk6khZeribib7EHpjgKNVg7w/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=207400377&idx=1&sn=8b8d196ccbbd72669ad91c74d2a243b2#rd'
  }, {
    title: '我靠什么get到100万「选择」',
    description: '戳击【阅读原文】看你是靠什么赚到首个100万哒~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fJpq0aFbX6xeAQqqgJCibwtJW800pD5ICC6c0mPgic0aWibVBE34PYAoia2iaJMN8KrM1ichgicA6iak8Pcw/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=207400028&idx=1&sn=15d1576debb1ad789e8fbde804d248f6#rd'
  }, {
    title: '我靠什么get到100万「倔强」',
    description: '戳击【阅读原文】看你是靠什么赚到首个100万哒~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fJpq0aFbX6xeAQqqgJCibwtBk7cZSh9mic0TuZRTm3gWV9xG2AhcGpoTVg45xwGZBC0XsnwaaF2Szg/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=207399785&idx=1&sn=ba8956d09978d74be322fd2765411b48#rd'
  }, {
    title: '我靠什么get到100万「减肥」',
    description: '戳击【阅读原文】看你是靠什么赚到首个100万哒~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fJpq0aFbX6xeAQqqgJCibwtXZMURkefU8MiaCFhYCK8SvZjDQSic2odkvPibbtzL9ngYQP7LtibkEwnvQ/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=207399473&idx=1&sn=2f7c75e4d662be96d53e035bbeb6e75d#rd'
  }, {
    title: '我靠什么get到100万「视野」',
    description: '戳击【阅读原文】看你是靠什么赚到首个100万哒~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fJpq0aFbX6xeAQqqgJCibwtJOgxM63Ostfn7rcRnTGD1gPibF2fib6jGJSxUiafU0RELRxFLGK5hJTAQ/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=207399230&idx=1&sn=ccdf837879db28b542f25a6953481c1c#rd'
  }, {
    title: '我靠什么get到100万「远行」',
    description: '戳击【阅读原文】看你是靠什么赚到首个100万哒~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fJpq0aFbX6xeAQqqgJCibwt3y68nWNU5pph6w8qAQH7Z0O8ugKJlodtqwtK4Ods7icZOAdnqh40EhA/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=207398801&idx=1&sn=0340072358ccf7a94bbd9464e72ade91#rd'
  }, {
    title: '我靠什么get到100万「智慧」',
    description: '戳击【阅读原文】看你是靠什么赚到首个100万哒~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fJpq0aFbX6xeAQqqgJCibwtEqTiaNSWMTultBctawdr4nb5xwGwCpX4ZFpOdibxpxdOK0ZNJJPjDw7w/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=207405786&idx=1&sn=b3838dd180e87edf76c3eb5edcff27db#rd'
  }, {
    title: '我靠什么get到100万「领导」',
    description: '戳击【阅读原文】看你是靠什么赚到首个100万哒~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fJpq0aFbX6xeAQqqgJCibwtFFwG75Jt6mtrfEg7ojZ8rBiaS2zf0jQbzsAB55pCgn2woedb2o4reYA/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=207396871&idx=1&sn=7bb49ecb49c25cf62325ded0c90972d3#rd'
  }],
  //'加息': '3月25日-3月31日期间注册新用户的专享0.5%加息券，在微信订阅号中进行哦~搜索公众号“souyidai”去看看吧！',
  '牛': 'Wifi密码为“souyidai888”！留着人家的微信哟，有靠谱的投资项目第一时间告诉你~么么哒',
  '摇': [{
    title: '【年中大福利】这次捞金的姿势很销魂哦~',
    description: '尖叫声在哪里！！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4dCRNL3l1UtDSBooghxK9uQJLWCbyUiaUfO3lZc6kiaZc7jMaZM6CRjgbWzIK9DMP4NdPXEiaVZuOz4g/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=209334966&idx=1&sn=77c6896c5535a4d3d679a0b4481cc91f#rd'
  }],
  '最爽|花钱|经历': '好了，好了，告诉Easy你的故事吧~可以赢取价值399的银行家套装哟~',
  // '^1$': '搜易贷与搜狐什么关系？\n\n搜易贷属于搜狐集团旗下公司，为搜狐集团旗下互联网金融平台，聚焦民间小微借贷，致力于推动中国信贷行业的市场化、平民化及高效化，搭建中国最大、用户体验最好的个人及中小企业的互联网信贷平台。',
  //'^2$': '新手专享加息的活动规则是什么？ \n\n\ 2015年8月26日-9月13日期间，30天新手专享项目限时加息1%，年利率高达10.88%！\n*仅限未投资过新手专享项目且累计投资未满1万元的用户投资，每人仅限投资1笔，最高1万元。',
  // '^2$': '投资新手专享项目的规则是什么？\n\n1. 累计投资不满10000元的用户都可以投资新手专享项目（债权转让项目、货基通除外）；\n2. 投资新手专享项目的次数不限\n3. 每个新手专享项目每人最多投资1万元；\n4. 新手专享项目不可使用红包和加息券。',
  // '^3$': '新手专享项目的利息如何计算？\n\n7天新手项目：还款方式为到期一次还本付息，利息计算方式为投资人预期年化收益率/365*7。\n30天新手项目：1，先息后本方式：投资金额*年利率除以360天*30。2，一次性结清方式：投资金额*年利率除以365天*30',
  // '^4$': '收益回款到账时间是什么时候？\n\n回款当日24点之前到账，一般在回款当日下午的18:00到20:00的时间。',
  '七夕': '哈哈，你终于来了，Easy在此恭候多时！\n奉上<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2F&response_type=code&scope=snsapi_userinfo&state=7xi#wechat_redirect">七夕红包</a>一枚！“拆散一对赚一块”，每人每天最高可得88元投资红包哦~\n快来玩耍！',
  '领奖|领取': '请点击<a href="http://viewer.maka.im/k/K7ADJ8RR">这里</a>，填写你的资料，稍后会有客服联系你进行发奖~',
  '圣诞': '活动已经结束啦~',
  '心想事成': '活动已经结束啦~',
  '我要中奖': '收到啦~期待中奖哦[可怜]',
  // '^20$': '哦哦，这个活动在搜易贷微信订阅号中进行，微信号“souyidai”，今晚10点红包就没啦，赶紧去看看吧，嘻嘻~',
  // '^30$': '哦哦，这个活动在搜易贷微信订阅号中进行，微信号“souyidai”，今晚10点红包就没啦，赶紧去看看吧，嘻嘻~',
  // '^50$': '哦哦，这个活动在搜易贷微信订阅号中进行，微信号“souyidai”，今晚10点红包就没啦，赶紧去看看吧，嘻嘻~',
  '面向|面相|测试|红包|福利|测': '参与面相测试，领取面相红包 请关注搜易贷订阅号：souyidai',
  '2017狐力全开': '<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2F&response_type=code&scope=snsapi_userinfo&state=annual2017#wechat_redirect">年会签到</a>',
};

text = Object.assign(text, qa.qa_content);
module.exports = text;
