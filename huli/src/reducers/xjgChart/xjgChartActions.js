//  资金概览-资金相关接口

export const xjgChartDataRequestPost = status => ({
  type: 'XJG_CHART_DATA_REQUEST',
  status
});

export const xjgChartDataReceivePost = (status, data) => ({
  type: 'XJG_CHART_DATA_RECEIVE',
  status,
  data
});

export const xjgChartDataErrorPost = (status, error) => ({
  type: 'XJG_CHART_DATA_ERROR',
  status,
  error
});

export const xjgChartDataPosts = (data,fn) => (dispatch, getState) => {
  let param = '';
  if(data){
    param = '?subType='+data.type;
  }
  dispatch(xjgChartDataRequestPost(0));
  return fetch('/hqb/annualRate' + param, { method: 'GET'})
    .then(response => response.json())
    .then((json) => {
      dispatch(xjgChartDataReceivePost(1, json.data));
      fn && fn(getState);
    })
    ['catch']((error) => {
      dispatch(xjgChartDataErrorPost(3, error));
    });
};
