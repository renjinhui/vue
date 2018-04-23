const _ = require('lodash');
const investingListData = {
  data:{},
  isFetching:0
};

export const getInvestingList = (state = investingListData,action) =>{

  switch (action.type){

    case 'INVESTING_LIST_REQUEST':
      return _.assign({},state,{
        isFetching:action.status
      });
    case 'INVESTING_LIST_RECEIVE':
      return _.assign({},state,{
        isFetching:action.status,
        data:action.data ? action.data : {}
      });
    case 'INVESTING_LIST_ERROR':
      return _.assign({},state,{
        isFetching:action.status,
        error:action.error
      });

    default: return state
  }
};