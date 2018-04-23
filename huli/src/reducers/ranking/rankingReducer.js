const _ = require('lodash');
const rankingListData = {
  data:{},
  isFetching:0
};

export const getRankingList = (state = rankingListData,action) =>{

  switch (action.type){

    case 'RANKING_LIST_REQUEST':
      return _.assign({},state,{
        isFetching:action.status
      });
    case 'RANKING_LIST_RECEIVE':
      return _.assign({},state,{
        isFetching:action.status,
        data:action.data ? action.data : {}
      });
    case 'RANKING_LIST_ERROR':
      return _.assign({},state,{
        isFetching:action.status,
        error:action.error
      });

    default: return state
  }
};