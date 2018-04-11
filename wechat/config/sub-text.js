'use strict';
const text = {
  'default': '嗨，你好~搜易贷投资项目的固定放出时间为工作日10:30、14:30和20:00。点击↓↓【易·投资】可快速查看\n下载搜易贷App请点击：http://a.app.qq.com/o/simple.jsp?pkgname=com.souyidai.investment.android&from=singlemessage&isappinstalled=0\n客服热线：\n4000-168-866',
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
  '借款|贷款': {
    type: 'image',
    content: {
      mediaId: 'Dhjw_3AmdR0vRwcdvjf9bE-H1KmU8cRhqureWeFjpR0'
    }
  },
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
  '百万红包': [{
    title: '【查收】百万红包+返现',
    description: '隔壁老王已经“捞”了几百块啦！！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4cpicImljjnShBMlyFsxEPjl7NGhSYUCiclpGjviaorxfibLguhI6Ax05Vp0cY32QbvJ8ibHmOEibhvxDZg/0',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=205263583&idx=1&sn=77d84f58c846efd2294545c3f592d218#rd'
  }],
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
  '加息': '这个活动已经结束了哦~保持关注，保证很快就有新的福利上架~',
  '牛': 'Wifi密码为“souyidai888”！留着人家的微信哟，有靠谱的投资项目第一时间告诉你~么么哒',
  '摇': [{
    title: '【年中大福利】这次捞金的姿势很销魂哦~',
    description: '尖叫声在哪里！！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4dCRNL3l1UtDSBooghxK9uQJLWCbyUiaUfO3lZc6kiaZc7jMaZM6CRjgbWzIK9DMP4NdPXEiaVZuOz4g/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=209334966&idx=1&sn=77c6896c5535a4d3d679a0b4481cc91f#rd'
  }],
  '最爽|花钱|经历': '好了，好了，告诉Easy你的故事吧~可以赢取价值399的银行家套装哟~',
  '猎熊': [{
    title: '猎熊行动！8月数钱尽情玩耍~',
    description: '盛夏，起嗨！',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4eoSH4hfia4PtldiafMe5FQtH0jDiawd6zpYGtOcMI1YUPFyUURXMjjiaCSA7knq7TD9yKrict1NzBxXpg/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=209931629&idx=1&sn=aad4c5e523215412178d7201418123b3#rd'
  }],
  '七夕': [{
    title: '强拆！情侣党这么危险 代表月亮消灭你',
    description: '红包连拿3天？ 每天最多88元？ 我还有事 先走了',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fPGaq1FJQ6uA7FJA05XbGGomUmnr8wIlqhDMPUTWno9icibpcA1Imt8o0fomK7T9UkgWDXzVUrosxA/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=210266510&idx=1&sn=0b3e85f9d32b0db412ed6f9b4df8c690#rd'
  }],
  '周年': [{
    title: '9月15日 零点 Let"s party！',
    description: '正确参与就送10元投资红包~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4fdgrUgz9oKXDj2Ga1M6s88VSlDDH8abmV5I82Nm3Epr6pL0c8LrP6rib3e1r0Edwo0x0x3eDqhibJA/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=210752412&idx=1&sn=8f3873e5c35fa8e1fb1cc2dd62cd8f73#rd'
  }],
  '红酒': {
    type: 'image',
    content: {
      mediaId: 'mIvLR828tftEMO3dl8CDNMSKblwMyjicIxsfJWXpZEo'
    }
  },
  '绘画': {
    type: 'image',
    content: {
      mediaId: 'mIvLR828tftEMO3dl8CDNMDCGUIttMlDtabgbX4F3Fg'
    }
  },
  '健身': {
    type: 'image',
    content: {
      mediaId: 'mIvLR828tftEMO3dl8CDNGgOqHXfxMHjgcCilhwyO9Q'
    }
  },
  '乐器': {
    type: 'image',
    content: {
      mediaId: 'mIvLR828tftEMO3dl8CDNPPhxQ9dgUL2dzTa7VkulQo'
    }
  },
  '奢侈品|鉴赏': {
    type: 'image',
    content: {
      mediaId: 'mIvLR828tftEMO3dl8CDNDOO3K_IxPQhCP9XVi1jofY'
    }
  },
  '舞蹈': {
    type: 'image',
    content: {
      mediaId: 'mIvLR828tftEMO3dl8CDNLGWu4oNZjuMTXmF0ke3FhQ'
    }
  },
  '现金': [{
    title: '滋补一下你的“肾”',
    description: '玫瑰金什么的，最俗气了……人家才不会掏钱买买买呢',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4cjkDCjFibOkXUtQWE8sIJ4gMYM5RnTs6NiabkezweduZDzTwSxWzLjKh0RibY3rStpoZCPRlQLmkaxA/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=210951292&idx=1&sn=ab72f89ec48fa0374b7ec9f95aef9257#rd'
  }],
  '送个蛋': [{
    title: '中秋送啥？送个“蛋”呀~',
    description: '送蛋你怕了吗？',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4dTuc4ZIlPFOF9WwPaLyfTgDAbquSW9jXraf6C0pQzNnyZfv5MrSiarojaAwaTibNzCWkRGxWnicv8fw/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=210873789&idx=1&sn=dbcb94159f6defa4b06a83432deb2bcb#rd'
  }],
  '鸡蛋': '收到！请点击<a href="http://viewer.maka.im/k/G8H3UPSA">这里</a>，留下邮寄地址，工作人员核对图片信息后会给前200位参与用户发鸡蛋哒，谢谢参与，么么哒～',
  '剧透': {
    type: 'image',
    content: {
      mediaId: 'Bo5SFpTyU6_epD38i6tSLdGW3CqNEbKO5fjZLJ5dQEk'
    }
  },
  '领奖|领取': '请点击<a href="http://viewer.maka.im/k/K7ADJ8RR">这里</a>，填写你的资料，稍后会有客服联系你进行发奖~',
  '圣诞': '活动已经结束啦~',
  '时光红包': '活动已经结束啦~',
  '心想事成': '活动已经结束啦~',
  '我要中奖': '收到啦~期待中奖哦[可怜]',
  '^20$': '少年，你来晚了，红包已经被他们抢完了~',
  '^30$': '少年，你来晚了，红包已经被他们抢完了~',
  '^50$': '少年，你来晚了，红包已经被他们抢完了~',
  '一年之计在于春': '少年，你来晚了，红包已经被他们抢完了~',
  '孟浩然': '少年，你来晚了，红包已经被他们抢完了~',
  '春卷': '少年，你来晚了，红包已经被他们抢完了~',
  '龙抬头': [{
    title: '红包领取开始：20，30，还是50？',
    description: '我猜你只要是红包，都想要~',
    picurl: 'https://mmbiz.qlogo.cn/mmbiz/v1G6d3E3ic4c1ib4xyQmskbR9Hf2MxjdKb6HTIkQyam9Xoqiby5YDywlqH2PEmf5cF6pQf8nsbnT6cneNKPIHGfibA/0?wx_fmt=jpeg',
    url: 'http://mp.weixin.qq.com/s?__biz=MzA5MDk1ODkzNQ==&mid=404101291&idx=1&sn=8d358980bba2777ddcd7a1fddbeebd2d#rd'
  }],
  '点亮百亿|souyidai': '搜易贷百亿狂欢主活动#点亮百亿财富计划#来啦!!!红包,加息券,现金等你拿<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2F&response_type=code&scope=snsapi_userinfo&state=light#wechat_redirect">点击这里</a>，去看看！',
  '回款': '您的回款将在项目回款日当天24点前到账，不要着急哦~'
};
module.exports = text;
