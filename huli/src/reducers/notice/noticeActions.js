//  资金概览-资金相关接口

export const noticeListRequestPost = status => ({
  type: 'NOTICE_LIST_REQUEST',
  status
});

export const noticeListReceivePost = (status, data) => ({
  type: 'NOTICE_LIST_RECEIVE',
  status,
  data
});

export const noticeListErrorPost = (status, error) => ({
  type: 'NOTICE_LIST_ERROR',
  status,
  error
});

export const noticeListPosts = (fn) => (dispatch, getState) => {

  dispatch(noticeListRequestPost(0));
  return $.ajax({
    async:false,
    url: 'https://help.huli.com/huli/announ/subannoun/index.json',
    type: "GET",
    jsonpCallback: 'jsonpcallbackgg',
    dataType: 'jsonp',
    success:function(data){

      dispatch(noticeListReceivePost(1, data));
      fn && fn(getState);
    }
  })
};
