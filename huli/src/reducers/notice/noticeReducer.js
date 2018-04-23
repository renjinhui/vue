const _ = require('lodash');
const noticeListData = {
  data:{},
  isFetching:0
};

export const getNoticeList = (state = noticeListData,action) =>{

  switch (action.type){

    case 'NOTICE_LIST_REQUEST':
      return _.assign({},state,{
        isFetching:action.status
      });
    case 'NOTICE_LIST_RECEIVE':
      return _.assign({},state,{
        isFetching:action.status,
        data:action.data ? action.data : {}
      });
    case 'NOTICE_LIST_ERROR':
      return _.assign({},state,{
        isFetching:action.status,
        error:action.error
      });

    default: return state
  }
};