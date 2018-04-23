export const questionsListRequestPost = status => ({
  type: 'QUESTION_LIST_REQUEST',
  status
});

export const questionsListReceivePost = (status, data) => ({
  type: 'QUESTION_LIST_RECEIVE',
  status,
  data
});

export const questionsListErrorPost = (status, error) => ({
  type: 'QUESTION_LIST_ERROR',
  status,
  error
});

export const questionsListPosts = (fn) => (dispatch, getState) => {

  dispatch(questionsListRequestPost(0));

  return $.ajax({
    async:false,
    url: 'https://help.huli.com/huli/help/others/hot/index.json',
    type: "GET",
    jsonpCallback: 'jsonpcallbackcjwt',
    dataType: 'jsonp',
    success:function(data){

      dispatch(questionsListReceivePost(1, data));
      fn && fn(getState);
    }
  })
};
