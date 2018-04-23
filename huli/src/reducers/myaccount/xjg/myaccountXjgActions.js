// 小金罐 接口
// 基础信息
const actionsPopup = require('../../popup/popupActions');
const myaccountXjgBsRequestPost = status => ({
  type: 'MYACCOUNT_XJG_BS_REQUEST',
  status
});

const myaccountXjgBsReceivePost = (status, data) => ({
  type: 'MYACCOUNT_XJG_BS_RECEIVE',
  status,
  data
});

const myaccountXjgBsErrorPost = (status, error) => ({
  type: 'MYACCOUNT_XJG_BS_ERROR',
  status,
  error
});
export const myaccountXjgBsPosts = fn => (dispatch, getState) => {
  dispatch(myaccountXjgBsRequestPost(0));
  return fetch('/hqb/myAccount?'+'subType=XJG&version=1.6&t='+Math.random(10), { method: 'GET',credentials: 'include',mode: 'no-cors' })
    .then(response => response.json())
    .then((json) => {
      
      dispatch(myaccountXjgBsReceivePost(1, json.data)); 
      fn && fn(getState);
    })
    ['catch']((error) => {
      dispatch(myaccountXjgBsErrorPost(3, error));
    });
};

//撤销赎回
const myaccountXjgCancelRequestPost = status =>({
  type: 'MYACCOUNT_XJG_CANCEL_REQUEST',
  status
});

const myaccountXjgCancelReceivePost = (status, data) => ({
  type: 'MYACCOUNT_XJG_CANCEL_RECEIVE',
  status,
  data
});

const myaccountXjgCancelErrorPost = (status, error) => ({
  type: 'MYACCOUNT_XJG_CANCEL_ERROR',
  status,
  error
});
export const myaccountXjgCancelPosts = (fn) => (dispatch, getState) => {
  dispatch(myaccountXjgCancelRequestPost(0));
  let transId=getState().xjgData.popup.revoke.transId;
  let passW=getState().xjgData.popup.revokePassW.passW;
  let postObj={
        password:passW,
        transId:transId,
      };
  //postObj=JSON.stringify(postObj);
  $.ajax({
    url:'/hqb/hqbCancel/cancelXjg',
    type: 'post',
    data: postObj,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1&&json.errorMessage=='noLogin'){
        dispatch(actionsPopup.popupSetErrorMessage(json.errorCode, json.errorMessage, '小金罐撤销失败！'));
        dispatch(actionsPopup.popupSetType('popup-error'));
        dispatch(actionsPopup.popupSetSubmitDisabled(false))
        
      }else{
        dispatch(myaccountXjgCancelReceivePost(1, json)); 
      } 
      
    },
    error: function(error){
      //console.log('error3:', error)
      dispatch(myaccountXjgCancelErrorPost(3, error));
    }
  })
  // return fetch('/hqb/hqbCancel/cancelXjg?', { method: 'POST',credentials: 'include',mode: 'no-cors'})
  //   .then(response => response.json())
  //   .then((json) => {
  //     dispatch(myaccountXjgCancelReceivePost(1, json));
  //     fn && fn(getState);
  //   }).catch((error) => {console.log(error)
  //     dispatch(myaccountXjgCancelErrorPost(3, error));
  //   });
};

// 弹出 转出列表
const myaccountXjgTurnoutRequestPost = status => ({
  type: 'MYACCOUNT_XJG_Turnout_REQUEST',
  status
});

const myaccountXjgTurnoutReceivePost = (status, data) => ({
  type: 'MYACCOUNT_XJG_Turnout_RECEIVE',
  status,
  data
});

const myaccountXjgTurnoutErrorPost = (status, error) => ({
  type: 'MYACCOUNT_XJG_Turnout_ERROR',
  status,
  error
});

export const myaccountXjgTurnoutPosts = fn => (dispatch, getState) => {
  dispatch(myaccountXjgTurnoutRequestPost(0));

  return fetch('/hqb/redeemPage?'+'subType=XJG&t='+Math.random(10), { method: 'GET',credentials: 'include',mode: 'no-cors' })
    .then(response => response.json())
    .then((json) => {//console.log(json)
      if(json.errorCode==0){
       dispatch(myaccountXjgTurnoutReceivePost(1, json)); 
      }else{
        dispatch(actionsPopup.popupSetErrorMessage(json.errorCode, json.errorMessage, '小金罐转出失败！'));
        dispatch(actionsPopup.popupSetType('popup-error'));
        dispatch(actionsPopup.popupSetSubmitDisabled(false))
      }
      
      // console.log(getState(),888)
      fn && fn(getState);
    })
    ['catch']((error) => {
      dispatch(myaccountXjgTurnoutErrorPost(3, error));
    });
};


//  输入密码后的请求
const myaccountXjgSureOutRequestPost = status => ({
  type: 'MYACCOUNT_XJG_SureOut_REQUEST',
  status
});

const myaccountXjgSureOutReceivePost = (status, errorCode, data, errorMessage) => ({
  type: 'MYACCOUNT_XJG_SureOut_RECEIVE',
  status,
  errorCode,
  data,
  errorMessage
});

const myaccountXjgSureOutErrorPost = (status, error) => ({
  type: 'MYACCOUNT_XJG_SureOut_ERROR',
  status,
  error
});

export const myaccountXjgSureOutPosts = (fn) => (dispatch, getState) => {
  const obj = getState().xjgData.sureOutData;
  dispatch(myaccountXjgSureOutRequestPost(0));
  //console.log(obj.applyMap.toString(),1111)
  let applyMap=JSON.stringify(obj.applyMap);
  let postdata={
    subType:obj.subType,
    password:obj.password,
    applyMap: applyMap
  };

  //console.log(postdata)
  $.ajax({
    url: '/hqb/redeem', 
    type: 'post',
    data: postdata,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1&&json.errorMessage=='noLogin'){
        dispatch(actionsPopup.popupSetErrorMessage(json.errorCode, json.errorMessage, '小金罐请求数据失败！'));
        dispatch(actionsPopup.popupSetType('popup-error'));
        dispatch(actionsPopup.popupSetSubmitDisabled(false))
      }else{
        dispatch(myaccountXjgSureOutReceivePost(1, json.errorCode, json.data, json.errorMessage));
      }      
    },
    error: function(error){
      //console.log('error3:', error)
      dispatch(myaccountXjgSureOutErrorPost(3, error));
    }
  })
  
};
export const myaccountXjgSureOutData = (options) => ({
  type: 'MYACCOUNT_XJG_SureOut_DATA',
  options
});


export const myaccountXjgPopupRevoke = (options) => ({
  type: 'XJG_DETAIL_POPUP_REVOKE',
  options
});

export const myaccountXjgPopupRevokePassW = (options) => ({
  type: 'XJG_DETAIL_POPUP_REVOKE_PASSW',
  options
});


//  转出第2个弹框
const myaccountXjgNextRequestPost = status => ({
  type: 'MYACCOUNT_XJG_NEXT_REQUEST',
  status
});

const myaccountXjgNextReceivePost = (status, data) => ({
  type: 'MYACCOUNT_XJG_NEXT_RECEIVE',
  status,
  data
});

const myaccountXjgNextErrorPost = (status, error) => ({
  type: 'MYACCOUNT_XJG_NEXT_ERROR',
  status,
  error
});

export const myaccountXjgNextPosts = (fn) => (dispatch, getState) => {
  const obj = getState().xjgData.sureOutData;
  dispatch(myaccountXjgNextRequestPost(0));
  //console.log(obj.applyMap.toString(),1111)
  let applyMap=JSON.stringify(obj.applyMap);
  let postdata={
    subType:obj.subType,
    applyMap: applyMap
  };

  //console.log(postdata)
  $.ajax({
    url: '/hqb/calProfit', 
    type: 'post',
    data: postdata,
    dataType:'json',
    success: function(json){
      if(json.errorCode==0){
        dispatch(myaccountXjgNextReceivePost(1, json));
      }else{
        dispatch(actionsPopup.popupSetErrorMessage(json.errorCode, json.errorMessage, '小金罐请求数据失败！'));
        dispatch(actionsPopup.popupSetType('popup-error'));
        dispatch(actionsPopup.popupSetSubmitDisabled(false))
      }
      
    },
    error: function(error){
      //console.log('error3:', error)
      dispatch(myaccountXjgNextErrorPost(3, error));
    }
  })
  
};

