const _ = require('lodash');
const tabList={
    data:{},
    isFetching:0
}

export const xjgtabList = (state = tabList,action) =>{
  switch (action.type){
//小金罐下半部分的请求
    case 'MYACCOUNT_XJG_TABLE_LOADING':
      return _.assign({},state,{
          isFetching:action.status 
      });
    case 'MYACCOUNT_XJG_TABLE_SUCCESS':
 //console.log(action)
      return _.assign({},state,{
          isFetching:action.status,
          data: action.data ? action.data : {}
        
      });
    case 'MYACCOUNT_XJG_TABLE_ERROR':
      return _.assign({},state,{
          isFetching:action.status,
          error:action.error
      
      });  
      
    default: return state
  }
};
