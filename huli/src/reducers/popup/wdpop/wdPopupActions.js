//  网贷列表弹框开始
const _ = require('lodash');


export const popupSetType = (popupType) => ({
  type: 'POPUP_WD_SET_TYPE',
  popupType
});
export const popupSetStatus = (options) => ({
  type: 'POPUP_WD_SET_STATUS',
  options
});
export const popupWdSetErrorCode = (errorCode) => ({
  type: 'POPUP_SET_WD_ERRORCODE',
  errorCode
});
export const popupWdSetRate = (rate) => ({
  type: 'POPUP_WD_SET_RATE',
  rate
});
export const popupWdSetSubmitDisabled = (submitDisabled) => ({
  type: 'POPUP_WD_SET_SUBMIT_DISABLED',
  submitDisabled
});
export const popupWdSetSubmitNeverAble = (submitNeverAble) => ({
  type: 'POPUP_WD_SET_SUBMIT_NEVERABLE',
  submitNeverAble
});

//网贷弹框  转让接口
const myaccountWdTransLoading = status=>({
  type:'POPUP_WD_TRANS_LOADING',
  status
});
const myaccountWdTransSuccess = (status, data) => ({
  type: 'POPUP_WD_TRANS_SUCCESS',
  status,
  data
});
const myaccountWdTransError = (status, error) => ({
  type: 'POPUP_WD_TRANS_ERROR',
  status,
  error
});
export const myaccountWdTransPosts = (postdata,fn) => (dispatch, getState) => {
  dispatch(myaccountWdTransLoading(0));
  let nObj = {
    t: postdata.t
  }
  $.ajax({
    url: '/myaccount/invest/interest/'+postdata.bidId+'/'+postdata.rate, 
    type: 'post',
    data: nObj,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && json.errorMessage=="noLogin"){
        // window.location='https://passport.huli.com/?backurl='+window.location.href;
        dispatch(myaccountWdTransError(3, {errorMessage:json.errorMessage}));
        dispatch(popupWdSetErrorCode(1))
        dispatch(popupSetStatus({
          isShow: true,
          type: 'wd-tr-success',
          hasCancel: false
        }));
      }else if(json.errorCode==0){
        dispatch(myaccountWdTransSuccess(1, json));
        fn && fn(); 
        if(json.data && (json.data.actualYearRate<codes.globalRules.tran_raise_rate_limit)){
          dispatch(popupWdSetSubmitNeverAble(true))
        }else{
          dispatch(popupWdSetSubmitNeverAble(false));
        }
      }else{
        dispatch(popupWdSetErrorCode(2))
        dispatch(popupSetStatus({
          isShow: true,
          type: 'wd-tr-success',
          hasCancel: false
        }));
      }
      
      
    },
    error: function(error){
      dispatch(myaccountWdTransError(3, error));
      dispatch(popupWdSetErrorCode(2))
      dispatch(popupSetStatus({
        isShow: true,
        type: 'wd-tr-success',
        hasCancel: false
      }));
    }
  })
};

//网贷弹框  撤销转让接口
const myaccountWdCancelTransLoading = status=>({
  type:'POPUP_WD_CANCEL_TRANS_LOADING',
  status
});
const myaccountWdCancelTransSuccess = (status, data) => ({
  type: 'POPUP_WD_CANCEL_TRANS_SUCCESS',
  status,
  data
});
const myaccountWdCancelTransError = (status, error) => ({
  type: 'POPUP_WD_CANCEL_TRANS_ERROR',
  status,
  error
});
export const myaccountWdCancelTransPosts = (postdata,fn) => (dispatch, getState) => {
  dispatch(myaccountWdCancelTransLoading(0));
  let nObj = {
    t: postdata.t
  }
  $.ajax({
    // url:'/myaccount/transfer/interest/7395786735195/1',
    url: '/myaccount/invest/cancle/interest/'+postdata.bidId+'/'+postdata.cancelType +'?t='+Math.random(),  
    type: 'post',
    data: nObj,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && json.errorMessage=="noLogin"){
        // window.location='https://passport.huli.com/?backurl='+window.location.href;
        dispatch(myaccountWdCancelTransError(3, {errorMessage:json.errorMessage}));
        dispatch(popupWdSetErrorCode(1))
        dispatch(popupSetStatus({
          isShow: true,
          type: 'wd-tr-success',
          hasCancel: false
        }));
      }else if(json.errorCode==0){
        dispatch(myaccountWdCancelTransSuccess(1, json)); 
        fn && fn();
        if(json.data && (json.data.actualYearRate<codes.globalRules.tran_raise_rate_limit)){
          dispatch(popupWdSetSubmitNeverAble(true))
        }else{
          dispatch(popupWdSetSubmitNeverAble(false));
        }
      }else{
        dispatch(popupWdSetErrorCode(4))
        dispatch(popupSetStatus({
          isShow: true,
          type: 'wd-tr-success',
          hasCancel: false
        }));
      }
      
      
    },
    error: function(error){
      dispatch(myaccountWdCancelTransError(3, error));
      dispatch(popupWdSetErrorCode(4))
      dispatch(popupSetStatus({
        isShow: true,
        type: 'wd-tr-success',
        hasCancel: false
      }));
    }
  })
};

//网贷弹框  确定转让  接口
const myaccountWdSureTransLoading = status=>({
  type:'POPUP_WD_SURE_TRANS_LOADING',
  status
});
const myaccountWdSureTransSuccess = (status, data) => ({
  type: 'POPUP_WD_SURE_TRANS_SUCCESS',
  status,
  data
});
const myaccountWdSureTransError = (status, error) => ({
  type: 'POPUP_WD_SURE_TRANS_ERROR',
  status,
  error
});
export const myaccountWdSureTransPosts = (postdata,fn) => (dispatch, getState) => {
  dispatch(myaccountWdSureTransLoading(0));
  let nObj = {
    t: postdata.t
  }
  $.ajax({
    url: '/myaccount/invest/transfer/'+postdata.bidId+'/'+postdata.rate,
    type: 'post',
    data: nObj,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && json.errorMessage=="noLogin"){
        // window.location='https://passport.huli.com/?backurl='+window.location.href;
        dispatch(myaccountWdSureTransError(3, {errorMessage:json.errorMessage}));
        dispatch(popupWdSetErrorCode(1))
      }else{
        // dispatch(popupWdSetErrorCode(100))
        fn && fn(json);
        dispatch(myaccountWdSureTransSuccess(1, json));
      }
      // dispatch(popupSetStatus({
      //   isShow: true,
      //   type: 'wd-tr-success',
      //   hasCancel: false
      // }));

    },
    error: function(error){
      dispatch(popupWdSetErrorCode(3))
      dispatch(myaccountWdSureTransError(3, error));
      dispatch(popupSetStatus({
        isShow: true,
        type: 'wd-tr-success',
        hasCancel: false
      }));
    }
  })
};


//网贷弹框  确定撤销转让  接口
const myaccountWdSureCancelTransLoading = status=>({
  type:'POPUP_WD_SURE_CANCEL_TRANS_LOADING',
  status
});
const myaccountWdSureCancelTransSuccess = (status, data) => ({
  type: 'POPUP_WD_SURE_CANCEL_TRANS_SUCCESS',
  status,
  data
});
const myaccountWdSureCancelTransError = (status, error) => ({
  type: 'POPUP_WD_SURE_CANCEL_TRANS_ERROR',
  status,
  error
});
export const myaccountWdSureCancelTransPosts = (postdata,fn) => (dispatch, getState) => {
  dispatch(myaccountWdSureCancelTransLoading(0));
  let nObj = {
    t: postdata.t
  }
  $.ajax({
    url: '/myaccount/invest/cancle/'+postdata.bidId+'/'+postdata.cancelType+'?t='+Math.random(), 
    type: 'post',
    data: nObj,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && json.errorMessage=="noLogin"){
        // window.location='https://passport.huli.com/?backurl='+window.location.href;
        dispatch(myaccountWdSureCancelTransError(3, {errorMessage:json.errorMessage}));
        dispatch(popupWdSetErrorCode(1))
      }else{
        dispatch(popupWdSetErrorCode(101))
        // fn && fn();
        dispatch(myaccountWdSureCancelTransSuccess(1, json)); 
      }
      dispatch(popupSetStatus({
        isShow: true,
        type: 'wd-tr-success',
        hasCancel: false
      }));
      
    },
    error: function(error){
      dispatch(popupWdSetErrorCode(3))
      dispatch(myaccountWdSureCancelTransError(3, error));
      dispatch(popupSetStatus({
        isShow: true,
        type: 'wd-tr-success',
        hasCancel: false
      }));
    }
  })
};
