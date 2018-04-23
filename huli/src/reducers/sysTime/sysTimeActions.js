//  资金概览-资金相关接口

export const sysTimeRequestPost = status => ({
  type: 'SYSTIME_REQUEST',
  status
});

export const sysTimeReceivePost = (status, data) => ({
  type: 'SYSTIME_RECEIVE',
  status,
  data
});

export const sysTimeErrorPost = (status, error) => ({
  type: 'SYSTIME_ERROR',
  status,
  error
});

export const sysTimePosts = (fn) => (dispatch) => {
  // let params = new FormData();
  // let params = '';
  // if(data){
  //   // for(let i in data){
  //   //   params.append(i,data[i]);
  //   // }
  //   params = JSON.stringify(data)
  //
  // }

  dispatch(sysTimeRequestPost(0));
  // return $.post('/ajax/sysTime', { format: 'yyyy-MM-dd HH:mm:ss' }, function(data){
  //   dispatch(sysTimeReceivePost(1, data));
  //   fn && fn();
  // },function(){
  //   fn && fn();
  // });


  return $.post('https://www.huli.com/ajax/sysTime', { format: 'yyyy/MM/dd HH:mm:ss' }).success(function(data){
    dispatch(sysTimeReceivePost(1, data));
    fn && fn();
  }).error(function(){
    fn && fn();
  });

  // return fetch('/ajax/sysTime',{credentials: 'include',cache: "no-cache" ,method: 'POST'})
  //   .then((response) => {
  //     response.json()
  //   })
  //   .then((json) => {
  //     console.log(json);
  //     dispatch(sysTimeReceivePost(1, json.data));
  //     // fn && fn(getState);
  //   })
  //   ['catch']((error) => {
  //     dispatch(sysTimeErrorPost(3, error));
  //   });
};

export const sysTimeDiffPost = (diff) => ({
  type: 'SYSTIME_TIME_DIFF',
  diff
});

export const sysTimeDiff = (fn) => (dispatch) => {
  
  dispatch(sysTimeRequestPost(0));

  // $.ajax({
  //   url:'/ajax/sysTime',
  //   type:'POST',
  //   data:{ format: 'yyyy/MM/dd HH:mm:ss' },
  //   dataType:'text',
  //   success:function(data){
  //     console.log(data)
  //   },
  //   error:function(data){
  //     console.log('error',data)
  //   }
  // })
  let timer1 = new Date().getTime();
  return $.post('https://www.huli.com/ajax/sysTime', { format: 'yyyy/MM/dd HH:mm:ss' }).success(function(data){
    let timer2 = new Date().getTime();
    data = /-/.test(data) ? data.replace(/-/,'/') : data;
    let diff = new Date(data).getTime() - timer1;
    dispatch(sysTimeDiffPost(diff));
    fn && fn(diff);
  }).error(function(){
    fn && fn();
  });


};
