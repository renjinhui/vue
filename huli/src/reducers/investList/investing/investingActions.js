//  资金概览-资金相关接口

export const investingListRequestPost = status => ({
  type: 'INVESTING_LIST_REQUEST',
  status
});

export const investingListReceivePost = (status, data) => ({
  type: 'INVESTING_LIST_RECEIVE',
  status,
  data
});

export const investingListErrorPost = (status, error) => ({
  type: 'INVESTING_LIST_ERROR',
  status,
  error
});

export const investingListPosts = (data,fn) => (dispatch, getState) => {
  // let params = new FormData();
  // let params = '';
  // if(data){
  //   // for(let i in data){
  //   //   params.append(i,data[i]);
  //   // }
  //   params = JSON.stringify(data)
  //
  // }

  let params = '';
  let esc = encodeURIComponent;
  if(data){
    params = Object.keys(data)
      .map(k => esc(k) + '=' + esc(data[k]))
      .join('&');
  }
  dispatch(investingListRequestPost(0));
  // return fetch('../../json/json.json')
  return fetch('/invest/onlinelist?t='+Math.random()+'&'+params,{credentials: 'include',cache: "no-cache"})
    .then(response => response.json())
    .then((json) => {
      dispatch(investingListReceivePost(1, json.data));
      fn && fn(getState);
    })
    ['catch']((error) => {
      dispatch(investingListErrorPost(3, error));
    });
};
