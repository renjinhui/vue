const _ = require('lodash');
const bannerData = {
  data:[],
  isFetching:0
};

export const getbannerData = (state = bannerData,action) =>{

  switch (action.type){

    case 'BANNER_DATA_REQUEST':
      return _.assign({},state,{
        isFetching:action.status
      });
    case 'BANNER_DATA_RECEIVE':
      return _.assign({},state,{
        isFetching:action.status,
        data:action.data ? action.data : {}
      });
    case 'BANNER_DATA_ERROR':
      return _.assign({},state,{
        isFetching:action.status,
        error:action.error
      });

    default: return state
  }
};