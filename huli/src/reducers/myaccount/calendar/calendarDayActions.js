//  资金概览-资金相关接口

export const calendarDayRequestPost = status => ({
  type: 'CALENDAR_DAY_REQUEST',
  status
});

export const calendarDayReceivePost = (status, data) => ({
  type: 'CALENDAR_DAY_RECEIVE',
  status,
  data
});

export const calendarDayErrorPost = (status, error) => ({
  type: 'CALENDAR_DAY_ERROR',
  status,
  error
});

export const calendarDayPosts = (data,fn) => (dispatch, getState) => {

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
  let formData =JSON.stringify({t:Math.random()});

  dispatch(calendarDayRequestPost(0));
  // return fetch('/myaccount/capital/ajax/get_receipt_days')
  return fetch('/myaccount/capital/ajax/get_receipt_days?'+params, { method: 'POST',credentials: 'include',mode: 'no-cors',body: formData})
    .then(response => response.json())
    .then((json) => {
      dispatch(calendarDayReceivePost(1, json.data));
      fn && fn(getState);
    })
    ['catch']((error) => {
      dispatch(calendarDayErrorPost(3, error));
    });
};
