const _ = require('lodash');
const  signTodayData= {
  data:{},
  isFetching:0
};

export const getSingToday = (state = signTodayData,action) =>{

  switch (action.type){

    case 'SING_TODAY_REQUEST':
      return _.assign({},state,{
        isFetching:action.status
      });
    case 'SING_TODAY_RECEIVE':
      return _.assign({},state,{
        isFetching:action.status,
        data:action.data ? action.data : {}
      });
    case 'SING_TODAY_ERROR':
      return _.assign({},state,{
        isFetching:action.status,
        error:action.error
      });

    default: return state
  }
};