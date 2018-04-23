const _ = require('lodash');
const sysTimeData = {
  data:'',
  isFetching:0,
  diff:0
};

export const getSysTime = (state = sysTimeData,action) =>{

  switch (action.type){

    case 'SYSTIME_REQUEST':
      return _.assign({},state,{
        isFetching:action.status
      });
    case 'SYSTIME_RECEIVE':
      return _.assign({},state,{
        isFetching:action.status,
        data:action.data ? action.data : ''
      });
    case 'SYSTIME_ERROR':
      return _.assign({},state,{
        isFetching:action.status,
        error:action.error
      });
    case 'SYSTIME_TIME_DIFF':
      return _.assign({},state,{
        diff:action.diff
      });
    default: return state
  }
};