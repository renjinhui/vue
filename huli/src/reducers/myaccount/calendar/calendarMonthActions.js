//  资金概览-资金相关接口

export const calendarMonthRequestPost = status => ({
  type: 'CALENDAR_MONTH_REQUEST',
  status
});

export const calendarMonthReceivePost = (status, data) => ({
  type: 'CALENDAR_MONTH_RECEIVE',
  status,
  data
});

export const calendarMonthErrorPost = (status, error) => ({
  type: 'CALENDAR_MONTH_ERROR',
  status,
  error
});

export const calendarMonthPosts = fn => (dispatch, getState) => {
  dispatch(calendarMonthRequestPost(0));

  // let formData  = new FormData();
  //
  // formData.append('t', Math.random());
  let formData =JSON.stringify({t:Math.random()});

  return fetch('/myaccount/capital/ajax/get_receipt_month', { method: 'POST',credentials: 'include',mode: 'no-cors',body: formData})
    .then(response => response.json())
    .then((json) => {
      dispatch(calendarMonthReceivePost(1, json.data));
      fn && fn(getState);
    })
    ['catch']((error) => {
      dispatch(calendarMonthErrorPost(3, error));
    });
};
