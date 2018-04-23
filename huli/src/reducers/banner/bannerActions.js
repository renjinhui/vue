

export const bannerDataRequestPost = status => ({
  type: 'BANNER_DATA_REQUEST',
  status
});

export const bannerDataReceivePost = (status, data) => ({
  type: 'BANNER_DATA_RECEIVE',
  status,
  data
});

export const bannerDataErrorPost = (status, error) => ({
  type: 'BANNER_DATA_ERROR',
  status,
  error
});

export const bannerDataPosts = (url,fn) => (dispatch, getState) => {
  dispatch(bannerDataRequestPost(0));
  return $.ajax({
    async:false,
    url: url,
    type: "GET",
    jsonpCallback: 'jsonpcallback',
    dataType: 'jsonp',
    success:function(data){

      dispatch(bannerDataReceivePost(1, data));
      fn && fn(getState);
    }
  })
};
