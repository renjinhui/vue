//资金概览-今日积分

export const singTodayRequestPost = (status) =>{

  return{
    type:'SING_TODAY_REQUEST',
    status:status
  }
};


export const singTodayReceivePost = (status,data) =>{

  return{
    type:'SING_TODAY_RECEIVE',
    status:status,
    data
  }
};

export const singTodayErrorPost = (status,error) =>{

  return{
    type:'SING_TODAY_ERROR',
    status:status,
    error
  }
};


export const singTodayPosts =(fn) => (dispatch,getState) =>{

  dispatch(singTodayRequestPost(0));

  return fetch('/profile/sign/today?t='+Math.random(),{method:'GET',credentials: 'include',mode: 'no-cors',headers: {
    'Cache-Control': 'no-cache'
  }})
    .then(response => response.json())
    .then(json => {
      dispatch(singTodayReceivePost(1,json.data));
      fn && fn(getState);
    })
    ['catch'](function(error){
      dispatch(singTodayErrorPost(3,error))
    });
};