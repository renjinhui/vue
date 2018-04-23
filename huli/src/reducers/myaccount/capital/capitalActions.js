//  资金概览-资金相关接口

export const capitalInfoRequestPost = status => ({
  type: 'CAPITAL_INFO_REQUEST',
  status
});

export const capitalInfoReceivePost = (status, data) => ({
  type: 'CAPITAL_INFO_RECEIVE',
  status,
  data
});

export const capitalInfoErrorPost = (status, error) => ({
  type: 'CAPITAL_INFO_ERROR',
  status,
  error
});

export const capitalInfoPosts = fn => (dispatch, getState) => {
  dispatch(capitalInfoRequestPost(0));
  // let formData  = new FormData();
  //
  // formData.append('t', Math.random());
  let formData =JSON.stringify({t:Math.random()});

  return fetch('/myaccount/capital/ajax/info', { method: 'POST',credentials: 'include',mode: 'no-cors',body: formData })
    .then(response => response.json())
    .then((json) => {
      dispatch(capitalInfoReceivePost(1, json.data));
      fn && fn(getState);
    })
    ['catch']((error) => {
      dispatch(capitalInfoErrorPost(3, error));
    });
};
