const _ = require('lodash');
const userBaseData = {
    pageUrl: {
        'tlzf': 'https://events.huli.com/static/web/agree/authorization.html', //通联支付授权书
        'zffw': 'https://events.huli.com/static/web/agree/payment-service.html', //支付服务协议
        'sydhxcg': 'https://events.huli.com/static/web/agree/hx-cunguan.html' //搜易贷华夏银行存管授权
    },
    account: { //账户信息
        isFetching: -1, //-1未请求；0请求中；1请求成功；2请求失败
        error: '',
        data: {
            "couponAmount": "0.00", //红包金额
            "currentBalance": "0.00", //搜易贷账户余额
            "huliCurrentBalance": "0.00", //狐狸账户余额
            "raiseInterestCouponCount": 0, //加息券个数
            "couponCount": 0, //红包个数
            "stainfoCount": 0 // 消息箱个数
        }
    },
    directCard: {  //通联快捷卡信息
        isFetching: -1, //-1未请求；0请求中；1请求成功；2请求失败；3未邦卡
        error: '', //isFetching=3时，意味着未绑定卡，错误提示： 如 请绑定慧赚快捷卡
        "data": {
            "bankCode": "",  //银行代号 如：CMB
            "cardId": "",  //快捷卡卡号（屏蔽中间的数字）如：1234********5678
            "hint": "", //限额提示 如：招商银行，单笔充值上限20w元
            "bankName": "", //银行名称 如：招商银行
            "limitAmount": 0  //单笔限额，精确到分如 50000 表示500元
        }
    },
    userStatus: {
        isFetching: -1, //-1未请求；0请求中；1请求成功；2请求失败
        error: '',
        data: {
            "riskTime": "",  //最近一次评估日期（如果没评估过，返回当前访问日期）
            "id5Status": "3",  // 实名：0 未设置 1 审核中 2 审核未通过 3 审核通过
            "isSetNickName": "",   //是否设置过昵称
            "isSetSecret": "",   //
            "secretLevel": "",   //密保等级
            "isSetPayPassword": "",   //是否设置交易密码
            "id5RetryCount": "",   //
            "isMobileActive": "",   //
            "emailStatus": "",   //邮箱：0未设置 3已设置
            "riskType": "",   //风险评估类型：开始评估,保守型,稳健型,平衡型,成长型,进取型
            "riskSource": "",   //0:未进行测试，1:保守型，2:稳健型，3:平衡型，4:成长型，5:进取型
            "riskStatus":"0",   //0表示未评估,1表示已评估未过期,2表示已评估已过期
            "riskCount": ""    //所剩的每年评估次数，目前都会 >0 （无效属性，不要使用）
        }
    },
    accountInfo: {
        isFetching: -1, //-1未请求；0请求中；1请求成功；2请求失败
        error: '',
        data: {
            "needId5Certification": 0,  //是否需要实名认证 0:不需要 1:需要
            "tlAccount": {  //通联账户信息
                "tlAccountTip": "可用于购买理财项目、活期项目、网贷项目",
                "bankCode": "",
                "cardId": "",
                "bankName": "",
                "accountAmount": 0,
                "withdrawAvailableAmount":0,//可取现金额
                "fastWithdrawInfo":''
            },
            "hxAccount": {  //华夏账户信息
                "hxAccountTip": "可用于购买网贷项目； 不可用于购买理财项目、活期项目",
                "bindConvientCard": 0,  //是否解绑过快捷卡 1：解绑过 2：未解绑过
                "bankCode": "",
                "cardId": "",
                "bankName": "",
                "accountAmount": 0
            },
            "pwdSet": 0   //是否已设置交易密码-1已设置-0未设置
        },
        "errorCode": 0
    },
    rryRateLists:{
        isFetching: -1,
        data:[]
    }
};

export const UserBaseInfo = (state = userBaseData, action) => {

    let _base = {};
    _base[action.baseType] = {};

    switch (action.type) {
        case 'USER_BASE_REQUEST_LOADING':
            _base[action.baseType].isFetching = 0;
            return _.merge({}, state, _base);
        case 'USER_BASE_SUCC':
            _base[action.baseType].isFetching = 1;
            _base[action.baseType].data = action.data;
            return  _.merge({}, state, _base);
        case 'USER_BASE_ERROR':
            _base[action.baseType].isFetching = action.status;
            _base[action.baseType].error = action.error;
            return _.merge({}, state, _base);
        default:
            return state
    }

};
