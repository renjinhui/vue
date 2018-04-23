//  资金概览-资金相关接口

export const rankingListRequestPost = status => ({
  type: 'RANKING_LIST_REQUEST',
  status
});

export const rankingListReceivePost = (status, data) => ({
  type: 'RANKING_LIST_RECEIVE',
  status,
  data
});

export const rankingListErrorPost = (status, error) => ({
  type: 'RANKING_LIST_ERROR',
  status,
  error
});

export const rankingListPosts = (data,fn) => (dispatch, getState) => {
  /**
   * type=0 是所有的
   * type=1 是网贷的
   * type=2 是理财的
   * isTransfer=0  非转让标
   * isTransfer=1  转让标
   **/
  // let param = '';
  // if(data){
  //   param = '?t='+Math.random()+'&limit='+10+'&isTransfer='+data.isTransfer+'&type=0';
  // }
  // let formData =JSON.stringify({t:Math.random()});

  /*let params = new FormData();
  for (let k in data) {
    params.append(k, data[k]);
  }
  params.append('type', 0);
  let request = {
    method: 'POST',
    body: params ,
    headers: {
      'accept': 'application/json, text/javascript',
      'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
  };

  dispatch(rankingListRequestPost(0));
    return fetch('/ranking/list', request)
      .then(response => response.json())
      .then((json) => {
        dispatch(rankingListReceivePost(1, json.data));
        fn && fn(getState);
      })
      ['catch']((error) => {
      dispatch(rankingListErrorPost(3, error));
  });
  */
  data.type = 0;
  $.ajax({
    url: '/ranking/list',
    data: data,
    type: 'POST',
    success: function(json){
      dispatch(rankingListReceivePost(1, json.data));
      fn && fn(getState);
    },
    error: function(error){
      dispatch(rankingListErrorPost(3, error));
    }
  })

  
};