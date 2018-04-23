

// 请求的 参数
export const monthBillPost = (options) => ({
  type: 'MONTH_BILL_POST',
  options
});
//  月账单body数据 接口
export const monthBillLoading = status => ({
  type: 'MONTH_BILL_LOADING',
  status
});

export const monthBillSuccess = (status, data) => ({
  type: 'MONTH_BILL_SUCCESS',
  status,
  data
});

export const monthBillError = (status, error) => ({
  type: 'MONTH_BILL_ERROR',
  status,
  error
});

export const getMonthBillData = (params,fn) => (dispatch, getState) => {
  dispatch(monthBillLoading(0));
  if(!params.startTime)return;//月份为空 不访问数据接口
  // let formData  = new FormData();
  //
  // formData.append('t', Math.random());
  // let formData =JSON.stringify({t:Math.random()});

  // return fetch('/monthbill/list ', { method: 'POST',credentials: 'include',mode: 'no-cors',body: formData })
  //   .then(response => response.json())
  //   .then((json) => {
  //     dispatch(capitalInfoReceivePost(1, json.data));
  //     fn && fn(getState);
  //   })
  //   ['catch']((error) => {
  //     dispatch(capitalInfoErrorPost(3, error));
  //   });
  $.ajax({
    url: '/myaccount/monthbill/list', 
    type: 'post',
    data: params,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && /ogin/.test(json.errorMessage)){
        window.location='https://passport.huli.com/?backurl='+window.location.href;
       
      }else if(json.errorCode==1 ){
        dispatch(monthBillError(3, error));
      }else{
        dispatch(monthBillSuccess(1, json)); 
      }
      
      
    },
    error: function(error){
      dispatch(monthBillError(3, error));
    }
  })
};


//  月账单head数据 接口---------------------------------------------------

export const monthBillHeadLoading = status => ({
  type: 'MONTH_BILL_HEAD_LOADING',
  status
});

export const monthBillHeadSuccess = (status, data) => ({
  type: 'MONTH_BILL_HEAD_SUCCESS',
  status,
  data
});

export const monthBillHeadError = (status, error) => ({
  type: 'MONTH_BILL_HEAD_ERROR',
  status,
  error
});

export const getMonthBillHeadList = (params,fn) => (dispatch, getState) => {
  dispatch(monthBillHeadLoading(0));
  $.ajax({
    url: '/myaccount/monthbill/month_list', 
    type: 'POST',
    data: params,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1 && /ogin/.test(json.errorMessage)){
        window.location='https://passport.huli.com/?backurl='+window.location.href; 
      }else if(json.errorCode==1){
        dispatch(monthBillHeadError(3, error));
      }else{
        dispatch(monthBillHeadSuccess(1, json));
        if(json.data[0]){
          let y = new Date(json.data[0]).getFullYear(),m = new Date(json.data[0]).getMonth()+1,allD = new Date(y,m,0).getDate();
          m = m<10 ? '0'+m : m;
          let new_params={
            startTime:y+'-'+m+'-01',
            endTime:y+'-'+m+'-'+allD
          }
          dispatch(getMonthBillData(new_params))
          dispatch(monthBillPost(new_params))
        }else{
          let new_params={
            startTime:'',
            endTime:''
          }
          dispatch(getMonthBillData(new_params))
          dispatch(monthBillPost(new_params))
        }
      }
      
      
    },
    error: function(error){
      dispatch(monthBillHeadError(3, error));
    }
  })
};

// 下载账单。。。。。







