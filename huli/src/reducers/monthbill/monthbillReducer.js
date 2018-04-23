const _ = require('lodash');
const monthBill={
    data:{},
    isFetching:0
}
const monthBillHead={
    data:{},
    isFetching:0
}

const monthBillPost={
    params:{
      startTime:'',
      endTime:''
    }
}

export const monthBillPostData = (state = monthBillPost,action) =>{

  switch (action.type){
    case 'MONTH_BILL_POST':
      return _.assign({},state,{
          params:action.options
      });
    default: return state
  }
};


export const monthBillData = (state = monthBill,action) =>{
  
  switch (action.type){
    case 'MONTH_BILL_LOADING':
      return _.assign({},state,{
          isFetching:action.status 
      });
    case 'MONTH_BILL_SUCCESS':
      return _.assign({},state,{
          isFetching:action.status,
          data: action.data ? action.data : {}
        
      });
    case 'MONTH_BILL_ERROR':
      return _.assign({},state,{
          isFetching:action.status,
          error:action.error
      
      });  
      
    default: return state
  }
};

export const monthBillHeadList = (state = monthBillHead,action) =>{
  
  switch (action.type){
    case 'MONTH_BILL_HEAD_LOADING':
      return _.assign({},state,{
          isFetching:action.status 
      });
    case 'MONTH_BILL_HEAD_SUCCESS':
      return _.assign({},state,{
          isFetching:action.status,
          data: action.data ? action.data : {}
        
      });
    case 'MONTH_BILL_HEAD_ERROR':
      return _.assign({},state,{
          isFetching:action.status,
          error:action.error
      
      });  
      
    default: return state
  }
};