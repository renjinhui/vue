//  资金概览-资金相关接口

export const userheadRequestPost = status => ({
  type: 'USER_HEAD_REQUEST',
  status
});

export const userheadReceivePost = (status, data) => ({
  type: 'USER_HEAD_RECEIVE',
  status,
  data
});

export const userheadErrorPost = (status, error) => ({
  type: 'USER_HEAD_ERROR',
  status,
  error
});

export const userheadPosts = (fn) => (dispatch, getState) => {

  dispatch(userheadRequestPost(0));
  return window.fetch('/myaccount/capital/headimage', { method: 'POST',credentials: 'include'})
    .then(response => response.json())
    .then((json) => {
      dispatch(userheadReceivePost(1, json));
      fn && fn(getState);
    })
    ['catch']((error) => {
    dispatch(userheadErrorPost(3, error));
  });
};
