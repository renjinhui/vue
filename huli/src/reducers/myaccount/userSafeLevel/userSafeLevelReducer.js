const _ = require('lodash');
const userLevelData = {
  data:{},
  isFetching:0
};

export const getUserLevelInfo = (state = userLevelData,action) =>{

  switch (action.type){

    case 'SAFE_LEVEL_REQUEST':
      return _.assign({},state,{
        isFetching:action.status
      });
    case 'SAFE_LEVEL_RECEIVE':
      return _.assign({},state,{
        isFetching:action.status,
        data:action.data ? action.data : {}
      });
    case 'SAFE_LEVEL_ERROR':
      return _.assign({},state,{
        isFetching:action.status,
        error:action.error
      });

    default: return state
  }
};