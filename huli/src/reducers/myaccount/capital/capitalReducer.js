const _ = require('lodash');
const capitalInfoData = {
  data:{},
  isFetching:0
};

export const getCapitalInfo = (state = capitalInfoData,action) =>{

  switch (action.type){

    case 'CAPITAL_INFO_REQUEST':
      return _.assign({},state,{
        isFetching:action.status
      });
    case 'CAPITAL_INFO_RECEIVE':
      return _.assign({},state,{
        isFetching:action.status,
        data:action.data ? action.data : {}
      });
    case 'CAPITAL_INFO_ERROR':
      return _.assign({},state,{
        isFetching:action.status,
        error:action.error
      });

    default: return state
  }
};