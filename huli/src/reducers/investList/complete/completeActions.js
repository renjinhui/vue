//  资金概览-资金相关接口

export const completeListRequestPost = status => ({
  type: 'COMPLETE_LIST_REQUEST',
  status
});

export const completeListReceivePost = (status, data) => ({
  type: 'COMPLETE_LIST_RECEIVE',
  status,
  data
});

export const completeListErrorPost = (status, error) => ({
  type: 'COMPLETE_LIST_ERROR',
  status,
  error
});

export const completeListPosts = (data,fn) => (dispatch, getState) => {
  // let params = new FormData();
  // if(data){
  //   for(let i in data){
  //     params.append(i,JSON.stringify(data[i]));
  //   }
  //
  // }

  // let params = '';
  // if(data){
  //   params = JSON.stringify(data);
  // }

  let params = '';
  let esc = encodeURIComponent;
  if(data){
    params = Object.keys(data)
      .map(k => esc(k) + '=' + esc(data[k]))
      .join('&');
  }

  dispatch(completeListRequestPost(0));
  return fetch('/invest/fulllist?t='+Math.random()+'&'+params,{credentials: 'include',ache: "no-cache"})
    .then(response => response.json())
    .then((json) => {
      dispatch(completeListReceivePost(1, json.data));
      fn && fn(getState);
    })
    ['catch']((error) => {
      dispatch(completeListErrorPost(3, error));
    });
};
