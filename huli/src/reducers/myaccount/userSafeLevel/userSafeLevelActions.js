//资金概览-资金相关接口
export const userLevelRequestPost = (status) =>{

  return{
    type:'SAFE_LEVEL_REQUEST',
    status:status
  }
};


export const userLevelReceivePost = (status,data) =>{

  return{
    type:'SAFE_LEVEL_RECEIVE',
    status:status,
    data
  }
};

export const userLevelErrorPost = (status,error) =>{

  return{
    type:'SAFE_LEVEL_ERROR',
    status:status,
    error
  }
};


export const userSafeLevelPosts =(fn) => (dispatch,getState) =>{
  // let formData  = new FormData();
  //
  // formData.append('t', Math.random());
  let formData =JSON.stringify({t:Math.random()});

  dispatch(userLevelRequestPost(0));

  return fetch('/myaccount/capital/ajax/userinfo',{method:'POST',credentials: 'include',mode: 'no-cors',body: formData })
    .then(response => response.json())
    .then(json => {
      dispatch(userLevelReceivePost(1,json.data));
      fn && fn(getState);
    })
    ['catch'](function(error){
       dispatch(userLevelErrorPost(3,error))
    });
};