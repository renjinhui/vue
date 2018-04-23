//资金概览-资金相关接口
export const welfareInfoRequestPost = (status) =>{

  return{
    type:'WELFARE_INFO_REQUEST',
    status:status
  }
};


export const welfareInfoReceivePost = (status,data) =>{

  return{
    type:'WELFAR_INFO_RECEIVE',
    status:status,
    data
  }
};

export const welfareInfoErrorPost = (status,error) =>{

  return{
    type:'WELFAR_INFO_ERROR',
    status:status,
    error
  }
};


export const welfareInfoPosts =(fn) => (dispatch,getState) =>{
  // let formData  = new FormData();
  //
  // formData.append('t', Math.random());
  let formData =JSON.stringify({t:Math.random()});

  dispatch(welfareInfoRequestPost(0));

  return fetch('/myaccount/capital/ajax/welfare',{method:'POST',credentials: 'include',mode: 'no-cors',body: formData})
    .then(response => response.json())
    .then(json => {
      dispatch(welfareInfoReceivePost(1,json.data));
      fn && fn(getState);
    })
    ['catch'](function(error){
       dispatch(welfareInfoErrorPost(3,error))
    });
};