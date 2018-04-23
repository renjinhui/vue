const _ = require('lodash');
const detailsData={
    data:{},
    isFetching:0
}
const detailsLeftTime={
    leftTime:''
}
const userLevel={
    data:{},
    isFetching:0
}
const jjsPopData={
    data:{},
    isFetching:0
}
const calculateData={
    data:{},
    isFetching:0
}
const surebuy={
    data:{},
    isFetching:0
}
const surebuyTrans={
    data:{},
    isFetching:0
}
const buystate={
    data:{},
    isFetching:0
}
const popbanner = {
    data:{}
}

const perlist={
    data:{},
    isFetching:0
}

const userfuli={
    data:{},
    isFetching:0
}

export const LcDetailsData = (state = detailsData,action) =>{
  
  switch (action.type){
    case 'LC_DETAIL_LOADING':
      return _.assign({},state,{
          isFetching:action.status 
      });
    case 'LC_DETAIL_SUCCESS':
      return _.assign({},state,{
          isFetching:action.status,
          data: action.data ? action.data : {}
        
      });
    case 'LC_DETAIL_ERROR':
      return _.assign({},state,{
          isFetching:action.status,
          error:action.error
      
      });  
      
    default: return state
  }
};

export const TransLeftTime = (state = detailsLeftTime,action) =>{
  
  switch (action.type){
    case 'TRANS_LEFT_TIME':
      return _.assign({},state,{
          leftTime:action.leftTime 
      });
    default: return state
  }
};

export const userLevelData = (state = userLevel,action) =>{
  
  switch (action.type){
    case 'USER_RISK_LEVEL_LOADING':
      return _.assign({},state,{
          isFetching:action.status 
      });
    case 'USER_RISK_LEVEL_SUCCESS':
      return _.assign({},state,{
          isFetching:action.status,
          data: action.data ? action.data : {}
        
      });
    case 'USER_RISK_LEVEL_ERROR':
      return _.assign({},state,{
          isFetching:action.status,
          error:action.error
      
      });  
      
    default: return state
  }
};

export const JjsPopData = (state = jjsPopData,action) =>{
  
  switch (action.type){
    case 'GET_POP_DATA_LOADING':
      return _.assign({},state,{
          isFetching:action.status 
      });
    case 'GET_POP_DATA_SUCCESS':
      return _.assign({},state,{
          isFetching:action.status,
          data: action.data ? action.data : {}
        
      });
    case 'GET_POP_DATA_ERROR':
      return _.assign({},state,{
          isFetching:action.status,
          error:action.error
      
      });  
      
    default: return state
  }
};

export const CalculateData = (state = calculateData,action) =>{
  
  switch (action.type){
    case 'CALCULATE_LOADING':
      return _.assign({},state,{
          isFetching:action.status 
      });
    case 'CALCULATE_SUCCESS':
      return _.assign({},state,{
          isFetching:action.status,
          data: action.data ? action.data : {}
        
      });
    case 'CALCULATE_ERROR':
      return _.assign({},state,{
          isFetching:action.status,
          error:action.error
      
      });  
      
    default: return state
  }
};

export const sureBuyTrans = (state = surebuyTrans,action) =>{
  
  switch (action.type){
    case 'SURE_BUY_TRANS_LOADING':
      return _.assign({},state,{
          isFetching:action.status 
      });
    case 'SURE_BUY_TRANS_SUCCESS':
      return _.assign({},state,{
          isFetching:action.status,
          data: action.data ? action.data : {}
        
      });
    case 'SURE_BUY_TRANS_ERROR':
      return _.assign({},state,{
          isFetching:action.status,
          error:action.error
      
      });  
      
    default: return state
  }
};

export const sureBuy = (state = surebuy,action) =>{
  
  switch (action.type){
    case 'SURE_BUY_DIB_LOADING':
      return _.assign({},state,{
          isFetching:action.status 
      });
    case 'SURE_BUY_DIB_SUCCESS':
      return _.assign({},state,{
          isFetching:action.status,
          data: action.data ? action.data : {}
        
      });
    case 'SURE_BUY_DIB_ERROR':
      return _.assign({},state,{
          isFetching:action.status,
          error:action.error
      
      });  
      
    default: return state
  }
};

export const buyState = (state = buystate,action) =>{
  
  switch (action.type){
    case 'CHECK_BUY_STATE_LOADING':
      return _.assign({},state,{
          isFetching:action.status 
      });
    case 'CHECK_BUY_STATE_SUCCESS':
      return _.assign({},state,{
          isFetching:action.status,
          data: action.data ? action.data : {}
        
      });
    case 'CHECK_BUY_STATE_ERROR':
      return _.assign({},state,{
          isFetching:action.status,
          error:action.error
      
      });  
      
    default: return state
  }
};

export const popBanner = (state = popbanner,action) =>{
  
  switch (action.type){
    case 'POP_BANNER_DATA':
      return _.assign({},state,{
          data: action.data || {} 
      });
    default: return state
  }
};

export const investPerList = (state = perlist,action) =>{
  
  switch (action.type){
    case 'INV_PER_LIST_LOADING':
      return _.assign({},state,{
          isFetching:action.status 
      });
    case 'INV_PER_LIST_SUCCESS':
      return _.assign({},state,{
          isFetching:action.status,
          data: action.data ? action.data : {}
        
      });
    case 'INV_PER_LIST_ERROR':
      return _.assign({},state,{
          isFetching:action.status,
          error:action.error
      
      });  
      
    default: return state
  }
};

export const userFuli = (state = userfuli,action) =>{
  
  switch (action.type){
    case 'GET_FULI_LOADING':
      return _.assign({},state,{
          isFetching:action.status 
      });
    case 'GET_FULI_SUCCESS':
      return _.assign({},state,{
          isFetching:action.status,
          data: action.data ? action.data : {}
        
      });
    case 'GET_FULI_ERROR':
      return _.assign({},state,{
          isFetching:action.status,
          error:action.error
      
      });  
      
    default: return state
  }
};