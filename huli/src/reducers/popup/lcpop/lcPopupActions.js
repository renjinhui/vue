//  网贷列表弹框开始
const _ = require('lodash');


export const popupSetType = (popupType) => ({
  type: 'POPUP_LC_SET_TYPE',
  popupType
});
export const popupSetStatus = (options) => ({
  type: 'POPUP_LC_SET_STATUS',
  options
});
export const popupLcSetErrorCode = (errorCode) => ({
  type: 'POPUP_SET_LC_ERRORCODE',
  errorCode
});
export const popupLcSetRate = (rate) => ({
  type: 'POPUP_LC_SET_RATE',
  rate
});
export const popupLcSetSubmitDisabled = (submitDisabled) => ({
  type: 'POPUP_LC_SET_SUBMIT_DISABLED',
  submitDisabled
});
export const popupLcSetSubmitNeverAble = (submitNeverAble) => ({
  type: 'POPUP_LC_SET_SUBMIT_NEVERABLE',
  submitNeverAble
});

//网贷弹框  转让接口
const myaccountLcTransLoading = status=>({
  type:'POPUP_LC_TRANS_LOADING',
  status
});
const myaccountLcTransSuccess = (status, data) => ({
  type: 'POPUP_LC_TRANS_SUCCESS',
  status,
  data
});
const myaccountLcTransError = (status, error) => ({
  type: 'POPUP_LC_TRANS_ERROR',
  status,
  error
});
export const myaccountLcTransPosts = (postdata,fn) => (dispatch, getState) => {
  dispatch(myaccountLcTransLoading(0));
  let nObj = {
    productType:postdata.productType ? postdata.productType :'',
    t: postdata.t
  }
  $.ajax({
    url: '/myaccount/invest/jjs/interest/'+postdata.bidId+'/'+postdata.rate,
    type: 'post',
    data: nObj,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && json.errorMessage=="noLogin"){
        // window.location='https://passport.huli.com/?backurl='+window.location.href;
        dispatch(myaccountLcTransError(3, {errorMessage:json.errorMessage}));
        dispatch(popupLcSetErrorCode(1));
        dispatch(popupSetStatus({
          isShow: true,
          type: 'lc-tr-success',
          hasCancel: false
        }));
      }else if(json.errorCode==0){
        dispatch(myaccountLcTransSuccess(1, json));
        fn && fn();
        if(json.data && (json.data.actualYearRate<codes.globalRules.tran_raise_rate_limit)){
          dispatch(popupLcSetSubmitNeverAble(true))
        }else{
          dispatch(popupLcSetSubmitNeverAble(false));
        }
      }else{
        dispatch(popupLcSetErrorCode(2));
        dispatch(popupSetStatus({
          isShow: true,
          type: 'lc-tr-success',
          hasCancel: false
        }));
      }
      
      
    },
    error: function(error){
      dispatch(myaccountLcTransError(3, error));
      dispatch(popupLcSetErrorCode(2));
      dispatch(popupSetStatus({
        isShow: true,
        type: 'lc-tr-success',
        hasCancel: false
      }));
    }
  })
};

//网贷弹框  撤销转让接口
const myaccountLcCancelTransLoading = status=>({
  type:'POPUP_LC_CANCEL_TRANS_LOADING',
  status
});
const myaccountLcCancelTransSuccess = (status, data) => ({
  type: 'POPUP_LC_CANCEL_TRANS_SUCCESS',
  status,
  data
});
const myaccountLcCancelTransError = (status, error) => ({
  type: 'POPUP_LC_CANCEL_TRANS_ERROR',
  status,
  error
});
export const myaccountLcCancelTransPosts = (postdata,fn) => (dispatch, getState) => {
  dispatch(myaccountLcCancelTransLoading(0));
  let nObj = {
    t: postdata.t
  }
  $.ajax({
    // url:'/myaccount/transfer/interest/7395786735195/1',
    url: '/myaccount/invest/jjs/cancle/interest/'+postdata.bidId+'/'+postdata.cancelType,
    type: 'post',
    data: nObj,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && json.errorMessage=="noLogin"){
        // window.location='https://passport.huli.com/?backurl='+window.location.href;
        dispatch(myaccountLcCancelTransError(3, {errorMessage:json.errorMessage}));
        dispatch(popupLcSetErrorCode(1));
        dispatch(popupSetStatus({
          isShow: true,
          type: 'lc-tr-success',
          hasCancel: false
        }));
      }else if(json.errorCode==0){
        dispatch(myaccountLcCancelTransSuccess(1, json));
        fn && fn();
        if(json.data && (json.data.actualYearRate<codes.globalRules.tran_raise_rate_limit)){
          dispatch(popupLcSetSubmitNeverAble(true))
        }else{
          dispatch(popupLcSetSubmitNeverAble(false));
        }
      }else {
        dispatch(popupLcSetErrorCode(4));
        dispatch(popupSetStatus({
          isShow: true,
          type: 'lc-tr-success',
          hasCancel: false
        }));
      }
      
      
    },
    error: function(error){
      dispatch(myaccountLcCancelTransError(3, error));
      dispatch(popupLcSetErrorCode(4));
      dispatch(popupSetStatus({
        isShow: true,
        type: 'lc-tr-success',
        hasCancel: false
      }));
    }
  })
};

//网贷弹框  确定转让  接口
const myaccountLcSureTransLoading = status=>({
  type:'POPUP_LC_SURE_TRANS_LOADING',
  status
});
const myaccountLcSureTransSuccess = (status, data) => ({
  type: 'POPUP_LC_SURE_TRANS_SUCCESS',
  status,
  data
});
const myaccountLcSureTransError = (status, error) => ({
  type: 'POPUP_LC_SURE_TRANS_ERROR',
  status,
  error
});
export const myaccountLcSureTransPosts = (postdata,fn) => (dispatch, getState) => {
  dispatch(myaccountLcSureTransLoading(0));
  let nObj = {
    t: postdata.t
  }
  $.ajax({
    url: '/myaccount/invest/jjs/transfer/'+postdata.bidId+'/'+postdata.rate,
    type: 'post',
    data: nObj,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && json.errorMessage=="noLogin"){
        // window.location='https://passport.huli.com/?backurl='+window.location.href;
        dispatch(myaccountLcSureTransError(3, {errorMessage:json.errorMessage}));
        dispatch(popupLcSetErrorCode(1))
      }else{
        fn && fn(json);
        // dispatch(popupLcSetErrorCode(100));
        dispatch(myaccountLcSureTransSuccess(1, json));
      }
      // dispatch(popupSetStatus({
      //   isShow: true,
      //   type: 'lc-tr-success',
      //   hasCancel: false
      // }));
      
    },
    error: function(error){
      dispatch(popupLcSetErrorCode(3));
      dispatch(myaccountLcSureTransError(3, error));
      dispatch(popupSetStatus({
        isShow: true,
        type: 'lc-tr-success',
        hasCancel: false
      }));
    }
  })
};


//网贷弹框  确定撤销转让  接口
const myaccountLcSureCancelTransLoading = status=>({
  type:'POPUP_LC_SURE_CANCEL_TRANS_LOADING',
  status
});
const myaccountLcSureCancelTransSuccess = (status, data) => ({
  type: 'POPUP_LC_SURE_CANCEL_TRANS_SUCCESS',
  status,
  data
});
const myaccountLcSureCancelTransError = (status, error) => ({
  type: 'POPUP_LC_SURE_CANCEL_TRANS_ERROR',
  status,
  error
});
export const myaccountLcSureCancelTransPosts = (postdata,fn) => (dispatch, getState) => {
  dispatch(myaccountLcSureCancelTransLoading(0));
  let nObj = {
    t: postdata.t
  }
  $.ajax({
    url: '/myaccount/invest/jjs/cancle/'+postdata.bidId+'/'+postdata.cancelType,
    type: 'post',
    data: nObj,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && json.errorMessage=="noLogin"){
        // window.location='https://passport.huli.com/?backurl='+window.location.href;
        dispatch(myaccountLcSureCancelTransError(3, {errorMessage:json.errorMessage}));
        dispatch(popupLcSetErrorCode(1))
      }else{
        // fn && fn();
        dispatch(popupLcSetErrorCode(101))
        dispatch(myaccountLcSureCancelTransSuccess(1, json));
      }
      dispatch(popupSetStatus({
        isShow: true,
        type: 'lc-tr-success',
        hasCancel: false
      }));
      
    },
    error: function(error){
      dispatch(popupLcSetErrorCode(3));
      dispatch(myaccountLcSureCancelTransError(3, error));
      dispatch(popupSetStatus({
        isShow: true,
        type: 'lc-tr-success',
        hasCancel: false
      }));
    }
  })
};
