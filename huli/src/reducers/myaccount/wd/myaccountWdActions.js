//网贷头部 信息

const myaccountWdBsRequestPost = status => ({
  type: 'MYACCOUNT_WD_BS_REQUEST',
  status
});

const myaccountWdBsReceivePost = (status, data) => ({
  type: 'MYACCOUNT_WD_BS_RECEIVE',
  status,
  data
});

const myaccountWdBsErrorPost = (status, error) => ({
  type: 'MYACCOUNT_WD_BS_ERROR',
  status,
  error
});
export const myaccountWdBsPosts = (postObj,fn) => (dispatch, getState) => {
  dispatch(myaccountWdBsRequestPost(0));
  $.ajax({
    url:'/myaccount/invest/ajax/invest_info',
    type: 'post',
    data: postObj,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1&&json.errorMessage=='noLogin'){
        let herf = window.location.href;
        window.location = 'https://passport.huli.com/?backurl='+herf;
      }else{
        dispatch(myaccountWdBsReceivePost(1, json)); 
      } 
      
    },
    error: function(error){
      //console.log('error3:', error)
      dispatch(myaccountWdBsErrorPost(3, error));
    }
  })
};


//网贷下面表格tab 下 LIst 的 接口 normal

const myaccountWdNormalLoading = status=>({
  type:'MYACCOUNT_WD_NORMAL_LOADING',
  status
});
const myaccountWdNormalSuccess = (status, data) => ({
  type: 'MYACCOUNT_WD_NORMAL_SUCCESS',
  status,
  data
});
const myaccountWdNormalError = (status, error) => ({
  type: 'MYACCOUNT_WD_NORMAL_ERROR',
  status,
  error
});

let wdListPageObj = {};

export const myaccountWdNormalPosts = (postdata,fn) => (dispatch, getState) => {
  dispatch(myaccountWdNormalLoading(0));
  wdListPageObj= postdata ? postdata : wdListPageObj
  $.ajax({
    url: '/myaccount/invest/ajax/invest_list', 
    type: 'post',
    data: wdListPageObj,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && json.errorMessage == 'noLogin'){
        window.location='https://passport.huli.com/?backurl='+window.location.href;
       
      }else{
        dispatch(myaccountWdNormalSuccess(1, json)); 
      }
      
      
    },
    error: function(error){
      dispatch(myaccountWdNormalError(3, error));
    }
  })
};
//网贷下面表格tab 下 LIst 的 接口 open
const myaccountWdOpenLoading = status=>({
  type:'MYACCOUNT_WD_OPEN_LOADING',
  status
});
const myaccountWdOpenSuccess = (status, data) => ({
  type: 'MYACCOUNT_WD_OPEN_SUCCESS',
  status,
  data
});
const myaccountWdOpenError = (status, error) => ({
  type: 'MYACCOUNT_WD_OPEN_ERROR',
  status,
  error
});
export const myaccountWdOpenPosts = (postdata,fn) => (dispatch, getState) => {
  dispatch(myaccountWdOpenLoading(0));

  $.ajax({
    url: '/myaccount/invest/ajax/bid_list', 
    type: 'post',
    data: postdata,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && json.errorMessage == 'noLogin'){
        window.location='https://passport.huli.com/?backurl='+window.location.href;
       
      }else{
        dispatch(myaccountWdOpenSuccess(1, json)); 
      }
      
      
    },
    error: function(error){
      dispatch(myaccountWdOpenError(3, error));
    }
  })
};
//网贷下面表格tab 下 LIst 的 接口 over
const myaccountWdOverLoading = status=>({
  type:'MYACCOUNT_WD_OVER_LOADING',
  status
});
const myaccountWdOverSuccess = (status, data) => ({
  type: 'MYACCOUNT_WD_OVER_SUCCESS',
  status,
  data
});
const myaccountWdOverError = (status, error) => ({
  type: 'MYACCOUNT_WD_OVER_ERROR',
  status,
  error
});
export const myaccountWdOverPosts = (postdata,fn) => (dispatch, getState) => {
  dispatch(myaccountWdOverLoading(0));


  $.ajax({
    url: '/myaccount/invest/ajax/over_list', 
    type: 'post',
    data: postdata,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && json.errorMessage == 'noLogin'){
        window.location='https://passport.huli.com/?backurl='+window.location.href;
       
      }else{
        dispatch(myaccountWdOverSuccess(1, json)); 
      }
      
      
    },
    error: function(error){
      dispatch(myaccountWdOverError(3, error));
    }
  })
};
//网贷下面表格tab 下 LIst 的 接口 drain
const myaccountWdDrainLoading = status=>({
  type:'MYACCOUNT_WD_DRAIN_LOADING',
  status
});
const myaccountWdDrainSuccess = (status, data) => ({
  type: 'MYACCOUNT_WD_DRAIN_SUCCESS',
  status,
  data
});
const myaccountWdDrainError = (status, error) => ({
  type: 'MYACCOUNT_WD_DRAIN_ERROR',
  status,
  error
});
export const myaccountWdDrainPosts = (postdata,fn) => (dispatch, getState) => {
  dispatch(myaccountWdDrainLoading(0));


  $.ajax({
    url: '/myaccount/invest/ajax/drain_list', 
    type: 'post',
    data: postdata,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && json.errorMessage == 'noLogin'){
        window.location='https://passport.huli.com/?backurl='+window.location.href;
       
      }else{
        dispatch(myaccountWdDrainSuccess(1, json)); 
      }
      
      
    },
    error: function(error){
      dispatch(myaccountWdDrainError(3, error));
    }
  })
};
//获取服务器时间
const setServerTime = (sysTime) => ({
  type: 'SET_SERVER_TIME',
  sysTime
});
export const getServerTime = () => (dispatch, getState) => {

  $.post('https://www.huli.com/ajax/sysTime', { format: 'yyyy/MM/dd HH:mm:ss' },function(data){
    let nowtimestamp = Date.parse(new Date(data));
    dispatch(setServerTime(nowtimestamp));
  });
};
