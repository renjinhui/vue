//网贷头部 信息

const myaccountLcBsRequestPost = status => ({
  type: 'MYACCOUNT_LC_BS_REQUEST',
  status
});

const myaccountLcBsReceivePost = (status, data) => ({
  type: 'MYACCOUNT_LC_BS_RECEIVE',
  status,
  data
});

const myaccountLcBsErrorPost = (status, error) => ({
  type: 'MYACCOUNT_LC_BS_ERROR',
  status,
  error
});
export const myaccountLcBsPosts = (postObj,fn) => (dispatch, getState) => {
  dispatch(myaccountLcBsRequestPost(0));
  $.ajax({
    url:'/myaccount/invest/ajax/jjs_info',
    type: 'post',
    data: postObj,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1&&json.errorMessage=='noLogin'){
        let herf = window.location.href;
        window.location = 'https://passport.huli.com/?backurl='+herf;
      }else{
        dispatch(myaccountLcBsReceivePost(1, json));
      } 
      
    },
    error: function(error){
      //console.log('error3:', error)
      dispatch(myaccountLcBsErrorPost(3, error));
    }
  })
};


//网贷下面表格tab 下 LIst 的 接口 normal

const myaccountLcNormalLoading = status=>({
  type:'MYACCOUNT_LC_NORMAL_LOADING',
  status
});
const myaccountLcNormalSuccess = (status, data) => ({
  type: 'MYACCOUNT_LC_NORMAL_SUCCESS',
  status,
  data
});
const myaccountLcNormalError = (status, error) => ({
  type: 'MYACCOUNT_LC_NORMAL_ERROR',
  status,
  error
});
let lcListPageObj = {};
export const myaccountLcNormalPosts = (postdata,fn) => (dispatch, getState) => {
  dispatch(myaccountLcNormalLoading(0));
  lcListPageObj= postdata ? postdata : lcListPageObj
  $.ajax({
    url: '/myaccount/invest/ajax/jjs_recovering_list',
    type: 'post',
    data: lcListPageObj,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && json.errorMessage == 'noLogin'){
        window.location='https://passport.huli.com/?backurl='+window.location.href;
       
      }else{
        dispatch(myaccountLcNormalSuccess(1, json));
      }
      
      
    },
    error: function(error){
      dispatch(myaccountLcNormalError(3, error));
    }
  })
};
//网贷下面表格tab 下 LIst 的 接口 open
const myaccountLcOpenLoading = status=>({
  type:'MYACCOUNT_LC_OPEN_LOADING',
  status
});
const myaccountLcOpenSuccess = (status, data) => ({
  type: 'MYACCOUNT_LC_OPEN_SUCCESS',
  status,
  data
});
const myaccountLcOpenError = (status, error) => ({
  type: 'MYACCOUNT_LC_OPEN_ERROR',
  status,
  error
});
export const myaccountLcOpenPosts = (postdata,fn) => (dispatch, getState) => {
  dispatch(myaccountLcOpenLoading(0));

  $.ajax({
    url: '/myaccount/invest/ajax/jjs_investing_list',
    type: 'post',
    data: postdata,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && json.errorMessage == 'noLogin'){
        window.location='https://passport.huli.com/?backurl='+window.location.href;
       
      }else{
        dispatch(myaccountLcOpenSuccess(1, json));
      }
      
      
    },
    error: function(error){
      dispatch(myaccountLcOpenError(3, error));
    }
  })
};
//网贷下面表格tab 下 LIst 的 接口 over
const myaccountLcOverLoading = status=>({
  type:'MYACCOUNT_LC_OVER_LOADING',
  status
});
const myaccountLcOverSuccess = (status, data) => ({
  type: 'MYACCOUNT_LC_OVER_SUCCESS',
  status,
  data
});
const myaccountLcOverError = (status, error) => ({
  type: 'MYACCOUNT_LC_OVER_ERROR',
  status,
  error
});
export const myaccountLcOverPosts = (postdata,fn) => (dispatch, getState) => {
  dispatch(myaccountLcOverLoading(0));


  $.ajax({
    url: '/myaccount/invest/ajax/jjs_over_list',
    type: 'post',
    data: postdata,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && json.errorMessage == 'noLogin'){
        window.location='https://passport.huli.com/?backurl='+window.location.href;
       
      }else{
        dispatch(myaccountLcOverSuccess(1, json));
      }
      
      
    },
    error: function(error){
      dispatch(myaccountLcOverError(3, error));
    }
  })
};
//网贷下面表格tab 下 LIst 的 接口 drain
const myaccountLcDrainLoading = status=>({
  type:'MYACCOUNT_LC_DRAIN_LOADING',
  status
});
const myaccountLcDrainSuccess = (status, data) => ({
  type: 'MYACCOUNT_LC_DRAIN_SUCCESS',
  status,
  data
});
const myaccountLcDrainError = (status, error) => ({
  type: 'MYACCOUNT_LC_DRAIN_ERROR',
  status,
  error
});
export const myaccountLcDrainPosts = (postdata,fn) => (dispatch, getState) => {
  dispatch(myaccountLcDrainLoading(0));


  $.ajax({
    url: '/myaccount/invest/ajax/jjs_drain_list',
    type: 'post',
    data: postdata,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && json.errorMessage == 'noLogin'){
        window.location='https://passport.huli.com/?backurl='+window.location.href;
       
      }else{
        dispatch(myaccountLcDrainSuccess(1, json));
      }
      
      
    },
    error: function(error){
      dispatch(myaccountLcDrainError(3, error));
    }
  })
};
//获取服务器时间
const setServerTime = (sysTime) => ({
  type: 'SET_SERVER_TIME',
  sysTime
});
export const getServerTime = () => (dispatch, getState) => {

  $.post('https://www.huli.com/ajax/sysTime',{ format: 'yyyy/MM/dd HH:mm:ss' }, function(data){
    let nowtimestamp = Date.parse(new Date(data));
    dispatch(setServerTime(nowtimestamp));
  });
};
