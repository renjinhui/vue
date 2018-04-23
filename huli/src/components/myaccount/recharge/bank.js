export const bankList = {
    "bank":{
        "":{"src":"","name":"", "realName":"","cardType":""},
        "icbc":
            {
                "name":"工商银行",
                "realName":"中国工商银行",
                "src":"https://static.huli.com/images/collocation/gongshang.png",
                "cardType":"借记卡",
                "prompt":"中国工商银行客服热线：95588",
                "info":[
                    {
                        "type":"电子口令卡",
                        "onceLimit": "500",
                        "dayLimit":"1000"
                    },
                    {
                        "type":"短信认证",
                        "onceLimit": "2000",
                        "dayLimit":"5000"
                    },
                    // {
                    //     "type":"电子密码",
                    //     "onceLimit": "50万",
                    //     "dayLimit": "100万"
                    // },
                    {
                        "type":"U盾",
                        "onceLimit": "100万",
                        "dayLimit": "100万"
                    }
                ]
            },
        "cmb":
            {
                "name":"招商银行",
                "realName":"招商银行",
                "src":"https://static.huli.com/images/collocation/zhaoshang.png",
                "cardType":"借记卡",
                "prompt":"招商银行客服热线：95555",
                "info":[
                    {
                        "type":"手机支付，卡号密码支付(大众版支付及一卡通支付）",
                        "onceLimit": "500",
                        "dayLimit":"5000"
                    },
                    {
                        "type":"专业版",
                        "onceLimit": "无限额，用户自行设置",
                        "dayLimit":"无限额，用户自行设置"
                    }
                ]
            },
        "boc":
            {
                "name":"中国银行",
                "realName":"中国银行",
                "src":"https://static.huli.com/images/collocation/zhongguo.png",
                "cardType":"借记卡",
                "prompt":"中国银行客服热线：95566",
                "info":[
                    {
                        "type":"手机交易码",
                        "onceLimit": "5000",
                        "dayLimit":"5000"
                    },
                    {
                        "type":"中银快付",
                        "onceLimit": "5000",
                        "dayLimit":"5000"
                    },
                    {
                        "type":"动态口令牌",
                        "onceLimit": "5万",
                        "dayLimit":"50万"
                    },
                    {
                        "type":"数字证书",
                        "onceLimit": "5万",
                        "dayLimit":"50万"
                    }
                ]
            },
        "cmbc":
            {
                "name":"民生银行",
                "realName":"中国民生银行",
                "src":"https://static.huli.com/images/collocation/minsheng.png",
                "cardType":"借记卡",
                "prompt":"民生银行客服热线：95568",
                "info":[
                    {
                        "type":"大众版",
                        "onceLimit": "5000",
                        "dayLimit":"5000"
                    },
                    {
                        "type":"U宝用户",
                        "onceLimit": "50万",
                        "dayLimit":"50万"
                    }
                ]
            },
        "szpab":
            {
                "name":"平安银行",
                "realName":"平安银行",
                "src":"https://static.huli.com/images/collocation/pingan.png",
                "cardType":"借记卡",
                "prompt":"平安银行客服热线：4006699999",
                "info":[
                    {
                        "type":"网银",
                        "onceLimit": "5万",
                        "dayLimit":"5万"
                    }
                ]
            },
        "ccb":
            {
                "name":"建设银行",
                "realName":"中国建设银行",
                "src":"https://static.huli.com/images/collocation/jianshe.png",
                "cardType":"借记卡",
                "prompt":"中国建设银行客服热线：95533",
                "info":[
                    {
                        "type":"账号直接支付",
                        "onceLimit": "1000",
                        "dayLimit":"1000"
                    },
                    {
                        "type":"动态口令",
                        "onceLimit": "5000",
                        "dayLimit":"5000"
                    },
                    {
                        "type":"网银盾1代",
                        "onceLimit": "5万",
                        "dayLimit":"5万"
                    },
                    {
                        "type":"网银盾2代",
                        "onceLimit": "50万",
                        "dayLimit":"50万"
                    }
                ]
            },
        "abc":
            {
                "name":"农业银行",
                "realName":"中国农业银行",
                "src":"https://static.huli.com/images/collocation/nongye.png",
                "cardType":"借记卡",
                "prompt":"中国农业银行客服热线：95599",
                "info":[
                    {
                        "type":"动态口令",
                        "onceLimit": "1000",
                        "dayLimit":"3000"
                    },
                    {
                        "type":"K宝",
                        "onceLimit": "无限额",
                        "dayLimit":"无限额"
                    },
                    {
                        "type":"K码",
                        "onceLimit": "1000",
                        "dayLimit":"1000"
                    }
                ]
            },
        "comm":
            {
                "name":"交通银行",
                "realName":"交通银行",
                "src":"https://static.huli.com/images/collocation/jiaotong.png",
                "cardType":"借记卡",
                "prompt":"交通银行客服热线：95559",
                "info":[
                    {
                        "type":"手机短信密码验证",
                        "onceLimit": "5万",
                        "dayLimit": "5万"
                    },
                    {
                        "type":"USBKey证书认证",
                        "onceLimit": "30万",
                        "dayLimit": "100万"
                    }
                ]
            },

        "cib":
            {
                "name":"兴业银行",
                "realName":"兴业银行",
                "src":"https://static.huli.com/images/collocation/xingye.png",
                "cardType":"借记卡",
                "prompt":"兴业银行客服热线：95561",
                "info":[
                    {
                        "type":"手机动态密码版",
                        "onceLimit": "5000",
                        "dayLimit":"5000"
                    },
                    {
                        "type":"U盾",
                        "onceLimit": "100万",
                        "dayLimit":"自行设置"
                    }
                ]
            },
        "spdb":
            {
                "name":"浦发银行",
                "realName":"上海浦东发展银行",
                "src":"https://static.huli.com/images/collocation/pufa.png",
                "cardType":"借记卡",
                "prompt":"上海浦东发展银行客服热线：95528",
                "info":[
                    {
                        "type":"手机动态密码",
                        "onceLimit": "20万",
                        "dayLimit":"20万"
                    },
                    {
                        "type":"数字证书（浏览器证书或U盾）",
                        "onceLimit": "90万",
                        "dayLimit":"无限额，自行设置"
                    }
                ]
            },
        "bob":
            {
                "name":"北京银行",
                "realName":"北京银行",
                "src":"https://static.huli.com/images/collocation/beijing.png",
                "cardType":"借记卡",
                "prompt":"北京银行客服热线：95526",
                "info":[
                    {
                        "type":"普通版",
                        "onceLimit": "",
                        "dayLimit":"总累计限额为300元"
                    },
                    {
                        "type":"动态密码版",
                        "onceLimit": "1000",
                        "dayLimit":"5000"
                    },
                    {
                        "type":"证书版",
                        "onceLimit": "100万",
                        "dayLimit":"100万"
                    }
                ]
            },
        "citic":
            {
                "name":"中信银行",
                "realName":"中信银行",
                "src":"https://static.huli.com/images/collocation/zhongxin.png",
                "cardType":"借记卡",
                "prompt":"中信银行客服热线：95558",
                "info":[
                    {
                        "type":"手机动态密码",
                        "onceLimit": "5万",
                        "dayLimit":"5万"
                    },
                    {
                        "type":"U盾",
                        "onceLimit": "100万",
                        "dayLimit":"100万"
                    }
                ]
            },
        "gdb":
            {
                "name":"广发银行",
                "realName":"广东发展银行",
                "src":"https://static.huli.com/images/collocation/guangfa.png",
                "cardType":"储蓄卡",
                "prompt":"广东发展银行客服热线：4008308003",
                "info":[
                    {
                        "type":"卡密支付",
                        "onceLimit": "1000",
                        "dayLimit":"1000"
                    },
                    {
                        "type":"网银支付-手机动态验证码",
                        "onceLimit": "3000",
                        "dayLimit":"3000"
                    },
                    {
                        "type":"网银支付-Key盾",
                        "onceLimit": "5000",
                        "dayLimit":"5000"
                    },
                    {
                        "type":"网银支付-Key令",
                        "onceLimit":"5000" ,
                        "dayLimit":"5000"
                    }
                ]
            },
        "psbc":
            {
                "name":"邮政储蓄",
                "realName":"中国邮政储蓄银行",
                "src":"https://static.huli.com/images/collocation/youzheng.png",
                "cardType":"借记卡",
                "prompt":"中国邮政储蓄银行客服热线：95580",
                "info":[
                    {
                        "type":"手机短信客户",
                        "onceLimit": "1万",
                        "dayLimit":"1万"
                    },
                    {
                        "type":"电子令牌客户",
                        "onceLimit": "10万",
                        "dayLimit":"10万"
                    },
                    {
                        "type":"Ukey+短信客户",
                        "onceLimit": "100万",
                        "dayLimit":"100万"
                    }
                ]
            },
        "ceb":
            {
                "name":"光大银行",
                "realName":"中国光大银行",
                "src":"https://static.huli.com/images/collocation/guangda.png",
                "cardType":"借记卡",
                "prompt":"光大银行客服热线：95595",
                "info":[
                    {
                        "type":"手机动态密码",
                        "onceLimit": "5000",
                        "dayLimit":"5000"
                    },
                    {
                        "type":"令牌动态密码及阳光网盾验证方式",
                        "onceLimit": "50万",
                        "dayLimit":"50万"
                    }
                ]
            },
        "hxb":
            {
                "name":"华夏银行",
                "realName":"华夏银行",
                "src":"https://static.huli.com/images/collocation/huaxia.png",
                "cardType":"借记卡",
                "prompt":"华夏银行客服热线：95577",
                "info":[
                    {
                        "type":"有数字证书",
                        "onceLimit":"5000" ,
                        "dayLimit":"2万"
                    },
                    {
                        "type":"无数字证书",
                        "onceLimit":"1000" ,
                        "dayLimit":"5000"
                    }
                ]
            },
        "shb":{
            "name":"上海银行",
            "realName":"上海银行",
            "src":"https://static.huli.com/images/collocation/shanghai.png",
            "prompt":"上海银行客服热线：95594",
            "info":[
                {
                    "type":"动态密码 + 数字证书",
                    "onceLimit": "6000",
                    "dayLimit":"1万"
                },
                {
                    "type":"上银快付业务客户",
                    "onceLimit": "5000",
                    "dayLimit":"单日5000，单月5000"
                },
                {
                    "type":"E盾个人网银",
                    "onceLimit":"50万",
                    "dayLimit":"100万"
                }
            ]
        }
    }
}