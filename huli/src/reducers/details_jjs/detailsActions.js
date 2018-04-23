
const newActionsPopup = require('../popup/newpop/newpopActions');


// 获取标的信息
const LcDetailLoading = status => ({
  type: 'LC_DETAIL_LOADING',
  status
});

const LcDetailSuccess = (status, data) => ({
  type: 'LC_DETAIL_SUCCESS',
  status,
  data
});

const LcDetailError = (status, error) => ({
  type: 'LC_DETAIL_ERROR',
  status,
  error
});

export const getLcDetailData = (params,fn) => (dispatch, getState) => {
  dispatch(LcDetailLoading(0));
  let nparams = {};
  nparams.t = Math.random();
  nparams.assetId = params.bid  || window.location.hash.match(/bid=(\w+)&proType=([a-z]+)/)[1];
  nparams.productType = params.proType || window.location.hash.match(/bid=(\w+)&proType=([a-z]+)/)[2];
  $.ajax({
    url: '/detail/jjs?t='+Math.random(), 
    type: 'post',
    data: nparams,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && /ogin/.test(json.errorMessage)){
        window.location='https://passport.huli.com/?backurl='+window.location.href;
      }else if(json.errorCode==0){
        dispatch(LcDetailSuccess(1, json));
        let params2 = {};
        if(nparams.productType == 'jjs'){
          params2.bidId = json.data.idStr;
          params2.amount = json.data.totalAmountBid ? Number(json.data.totalAmountBid) : 1000000;
          params2.productType = 'jjs';
          params2.investRate = json.data.asset.investAnnualRate;
          params2.raiseRate = json.data.asset.curUserRaiseInterest;
        }else{
          params2.bidId = json.data.idStr;
          params2.amount = json.data.assetTransfer.principal ? Number(json.data.assetTransfer.principal) : 1000000;
          params2.productType = 'jjszrb';
          params2.investRate = json.data.assetTransfer.rootAnnualRate;
        }
        dispatch(calculateMoney(params2));
      }else {
        if(json.errorMessage == '标id无效'){
          // window.location.href = 'https://www.huli.com';
        }
        dispatch(LcDetailError(3, json.errorMessage));
      } 
    },
    error: function(error){
      dispatch(LcDetailError(3, error));
    }
  })
};

export const transLeftTime = (leftTime) => ({
  type: 'TRANS_LEFT_TIME',
  leftTime
})

// 获取弹框数据
const getPopDataLoading = status => ({
  type: 'GET_POP_DATA_LOADING',
  status
});

const getPopDataSuccess = (status, data) => ({
  type: 'GET_POP_DATA_SUCCESS',
  status,
  data
});

const getPopDataError = (status, error) => ({
  type: 'GET_POP_DATA_ERROR',
  status,
  error
});

export const getPopData = (params,fn) => (dispatch, getState) => {
  dispatch(getPopDataLoading(0));
  params = params ? params : {};
  params.t = Math.random();
  $.ajax({
    url: '/invest/jjs/info',
    type: 'post',
    data: params,
    dataType: 'json',
    success: function(json){
      if(json.errorCode == 0){
        dispatch(getPopDataSuccess(1, json.data));
      }else{
        fn && fn()
      }
    },
    error: function(error){
      dispatch(getPopDataError(3, error));
    }
  });
}

// 获取收益数目
const calculateMoneyLoading = status=>({
  type:'CALCULATE_LOADING',
  status
});
const calculateMoneySuccess = (status, data) => ({
  type: 'CALCULATE_SUCCESS',
  status,
  data
});
const calculateMoneyError = (status, error) => ({
  type: 'CALCULATE_ERROR',
  status,
  error
});
export const calculateMoney = (params,fn) => (dispatch, getState) => {
  dispatch(calculateMoneyLoading(0));
  let str = 'bidId=' + params.bidId + '&amount=' + params.amount + '&productType=' + params.productType;
  $.ajax({
    url: ' /ajax/cal_receipt?'+str,
    type: 'post',
    data: {
      t: Math.random(),
      investRate: params.investRate,
      raiseRate:params.raiseRate
    },
    dataType: 'json',
    success: function(json){
      if(json.errorCode == 0){
        if(params.popIncome != 'popIncome'){
          dispatch(calculateMoneySuccess(1, json.data));
        }
        dispatch(newActionsPopup.newpopSetIncome(json.data.total));
        fn && fn(json.data);
      }
    },
    error: function(error){
      dispatch(calculateMoneyError(3, error));
    }
  });
}

//计算加息收益
export const calculatePopMoney = (params,fn) => (dispatch, getState) => {
  let str = 'bidId=' + params.bidId + '&amount=' + params.amount + '&productType=' + params.productType;
  params.t = Math.random();
  $.ajax({
    url: ' /ajax/income?',//+str
    type: 'post',
    data: params,
    dataType: 'json',
    success: function(json){
        dispatch(newActionsPopup.newpopSetJxIncome(json.data));
    },
    error: function(error){
      
    }
  });
}
// 获取用户风险等级
const userRiskLevelLoading = status=>({
  type:'USER_RISK_LEVEL_LOADING',
  status
});
const userRiskLevelSuccess = (status, data) => ({
  type: 'USER_RISK_LEVEL_SUCCESS',
  status,
  data
});
const userRiskLevelError = (status, error) => ({
  type: 'USER_RISK_LEVEL_ERROR',
  status,
  error
});
export const userRiskLevel = (fn) => (dispatch, getState) => {
  dispatch(userRiskLevelLoading(0));
  $.ajax({
    url: '/profile/safecenter/safestatus',
    type: 'post',
    data: {
      type:1,
      t: Math.random()
    },
    dataType: 'json',
    success: function(json){
      if(json.errorCode == 0){
        dispatch(userRiskLevelSuccess(1, json.data));
        fn && fn(json.data);
      }
    },
    error: function(error){
      dispatch(userRiskLevelError(3, error));
    }
  });
}

// 确定购买
const sureBuyThisBidLoading = status=>({
  type:'SURE_BUY_DIB_LOADING',
  status
});
const sureBuyThisBidSuccess = (status, data) => ({
  type: 'SURE_BUY_DIB_SUCCESS',
  status,
  data
});
const sureBuyThisBidError = (status, error) => ({
  type: 'SURE_BUY_DIB_ERROR',
  status,
  error
});
export const sureBuyThisBid = (params,fn) => (dispatch, getState) => {
  dispatch(sureBuyThisBidLoading(0));
  let params2 = params ? params : {};
  params2.t = Math.random();
  $.ajax({
    url: '/invest/dojjs',
    type: 'post',
    data: params2,
    dataType: 'json',
    success: function(json){
        dispatch(sureBuyThisBidSuccess(1, json));
        fn && fn(json);
        if(json.errorCode == 0){ //一次购买成功 或者 需要轮询
          dispatch(newActionsPopup.newpopSetSucGet(json.data));
        }
    },
    error: function(error){
      dispatch(sureBuyThisBidError(3, error));
    }
  });
}

// 查看购买状态
const checkBuyStateLoading = status=>({
  type:'CHECK_BUY_STATE_LOADING',
  status
});
const checkBuyStateSuccess = (status, data) => ({
  type: 'CHECK_BUY_STATE_SUCCESS',
  status,
  data
});
const checkBuyStateError = (status, error) => ({
  type: 'CHECK_BUY_STATE_ERROR',
  status,
  errorCode
});
export const checkBuyState = (params,fn) => (dispatch, getState) => {
  dispatch(checkBuyStateLoading(0));
  let params2 = params ? params : {};
  params2.t = Math.random();
  $.ajax({
    url: '/invest/jjs/pollingbidres?t='+Math.random(),
    type: 'post',
    data: params2,
    dataType: 'json',
    success: function(json){
        dispatch(checkBuyStateSuccess(1, json));
        if(json.data.retCode == 0){
          dispatch(newActionsPopup.newpopSetSucGet(json.data));
        }
        fn && fn(json);
    },
    error: function(error){
      dispatch(checkBuyStateError(3, error));
    }
  });
}


//成功弹框上的推广
const popbannerpost = (data) => ({
  type: 'POP_BANNER_DATA',
  data
});
export const getOperaData = () => (dispatch, getState) => {

  let data = {
    "zr" : {
      "title":"zr",
      "link":"https://events.huli.com/static/web/guide/",
      "picture":"https://help.souyidai.com/upload/2017/04/12/14919822494152l7e.jpg"
    },
    "zt":{
      "title":"zr",
      "link":"https://events.huli.com/static/web/guide/",
      "picture":"https://help.souyidai.com/upload/2017/04/12/1491992111575Dn4m.gif"
    }
  };
  dispatch(popbannerpost(data))
  $.ajax({
    async:false,
    url: 'https://help.huli.com/element/hulisucc/index.json',
    type: 'GET',
    jsonpCallback: 'jsonpcallbacksucchuli',
    dataType: 'jsonp',
    success: function(json){
      dispatch(popbannerpost(json.data));
    },
    error: function(error){
    }
  })
};

// 确定购买转让标
const sureBuyTransLoading = status=>({
  type:'SURE_BUY_TRANS_LOADING',
  status
});
const sureBuyTransSuccess = (status, data) => ({
  type: 'SURE_BUY_TRANS_SUCCESS',
  status,
  data
});
const sureBuyTransError = (status, error) => ({
  type: 'SURE_BUY_TRANS_ERROR',
  status,
  error
});
export const sureBuyTrans = (params,fn) => (dispatch, getState) => {
  dispatch(sureBuyTransLoading(0));
  params.t = Math.random();
  $.ajax({
    url: '/invest/dojjs?t='+Math.random(),
    type: 'post',
    data: params,
    dataType: 'json',
    success: function(json){
        dispatch(sureBuyTransSuccess(1, json));
        if(json.errorCode == 0){
          dispatch(newActionsPopup.newpopSetSucGet(json.data));
        }
        fn && fn(json);
    },
    error: function(error){
      dispatch(sureBuyTransError(3, error));
    }
  });
}

// 获取投资人列表
const investPersonListLoading = status=>({
  type:'INV_PER_LIST_LOADING',
  status
});
const investPersonListSuccess = (status, data) => ({
  type: 'INV_PER_LIST_SUCCESS',
  status,
  data
});
const investPersonListError = (status, error) => ({
  type: 'INV_PER_LIST_ERROR',
  status,
  error
});
export const investPersonList = (params,fn) => (dispatch, getState) => {
  dispatch(investPersonListLoading(0));
  let params2 = {};
  params2.t = Math.random();
  params2.assetId = params.bid || window.location.hash.match(/bid=(\w+)&proType=([a-z]+)/)[1];
  params2.productType = params.proType || window.location.hash.match(/bid=(\w+)&proType=([a-z]+)/)[2];
  $.ajax({
    url: '/detail/jjs/log?t='+Math.random(),
    type: 'post',
    data: params2,
    dataType: 'json',
    success: function(json){
        dispatch(investPersonListSuccess(1, json));
        fn && fn(json);
    },
    error: function(error){
      dispatch(investPersonListError(3, error));
    }
  });
}


// 获取福利数组
const getUserFuliLoading = status=>({
  type:'GET_FULI_LOADING',
  status
});
const getUserFuliSuccess = (status, data) => ({
  type: 'GET_FULI_SUCCESS',
  status,
  data
});
const getUserFuliError = (status, error) => ({
  type: 'GET_FULI_ERROR',
  status,
  error
});
export const getUserFuli = (params,fn) => (dispatch, getState) => {
  dispatch(getUserFuliLoading(0));
  let params2 = {};
  params2.t = Math.random();
  params2.type = 1;
  params2.bidId = params.bid || window.location.hash.match(/bid=(\w+)&proType=([a-z]+)/)[1];
  params2.productType = params.proType || window.location.hash.match(/bid=(\w+)&proType=([a-z]+)/)[2];
  $.ajax({
    url: '/invest/coupon/list?t='+Math.random(),
    type: 'post',
    data: params2,
    dataType: 'json',
    success: function(json){
        dispatch(getUserFuliSuccess(1, json));
        fn && fn(json);
    },
    error: function(error){
      dispatch(getUserFuliError(3, error));
    }
  });
}

