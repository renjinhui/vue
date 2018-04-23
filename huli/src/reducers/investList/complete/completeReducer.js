const _ = require('lodash');
const completeListData = {
  data:{},
  isFetching:0
};

export const getCompleteList = (state = completeListData,action) =>{

  switch (action.type){

    case 'COMPLETE_LIST_REQUEST':
      return _.assign({},state,{
        isFetching:action.status
      });
    case 'COMPLETE_LIST_RECEIVE':
      return _.assign({},state,{
        isFetching:action.status,
        data:action.data ? action.data : {}
      });
    case 'COMPLETE_LIST_ERROR':
      return _.assign({},state,{
        isFetching:action.status,
        error:action.error
      });

    default: return state
  }
};