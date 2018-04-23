const _ = require('lodash');
const  signInData= {
  data:{},
  isFetching:0
};

export const getSignInData = (state = signInData,action) =>{

  switch (action.type){

    case 'SIGN_IN_REQUEST':
      return _.assign({},state,{
        isFetching:action.status
      });
    case 'SIGN_IN_RECEIVE':
      return _.assign({},state,{
        isFetching:action.status,
        data:action.data ? action.data : {}
      });
    case 'SIGN_IN_ERROR':
      return _.assign({},state,{
        isFetching:action.status,
        error:action.error
      });

    default: return state
  }
};