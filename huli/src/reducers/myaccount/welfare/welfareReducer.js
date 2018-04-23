const _ = require('lodash');
const welfareInfoData = {
  data:{},
  isFetching:0
};

export const getWelfareInfo = (state = welfareInfoData,action) =>{

  switch (action.type){

    case 'WELFARE_INFO_REQUEST':
      return _.assign({},state,{
        isFetching:action.status
      });
    case 'WELFAR_INFO_RECEIVE':
      return _.assign({},state,{
        isFetching:action.status,
        data:action.data ? action.data : {}
      });
    case 'WELFAR_INFO_ERROR':
      return _.assign({},state,{
        isFetching:action.status,
        error:action.error
      });

    default: return state
  }
};