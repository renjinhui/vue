const _ = require('lodash');
const xjgChartData = {
  data:{},
  isFetching:0
};

export const getXJGChartData = (state = xjgChartData,action) =>{

  switch (action.type){

    case 'XJG_CHART_DATA_REQUEST':
      return _.assign({},state,{
        isFetching:action.status
      });
    case 'XJG_CHART_DATA_RECEIVE':
      return _.assign({},state,{
        isFetching:action.status,
        data:action.data ? action.data : {}
      });
    case 'XJG_CHART_DATA_ERROR':
      return _.assign({},state,{
        isFetching:action.status,
        error:action.error
      });

    default: return state
  }
};