const _ = require('lodash');
const userHeadData = {
  data:{},
  isFetching:0
};

export const getUserHead = (state = userHeadData,action) =>{

  switch (action.type){

    case 'USER_HEAD_REQUEST':
      return _.assign({},state,{
        isFetching:action.status
      });
    case 'USER_HEAD_RECEIVE':
      return _.assign({},state,{
        isFetching:action.status,
        data:action.data ? action.data : {}
      });
    case 'USER_HEAD_ERROR':
      return _.assign({},state,{
        isFetching:action.status,
        error:action.error
      });

    default: return state
  }
};