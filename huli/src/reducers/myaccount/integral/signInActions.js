//资金概览-是否已签到
const action = require('./signTodayActions');
const welfareActions = require('../../../reducers/myaccount/welfare/welfareActions');
export const signInRequestPost = (status) =>{

  return{
    type:'SIGN_IN_REQUEST',
    status:status
  }
};


export const signInReceivePost = (status,data) =>{

  return{
    type:'SIGN_IN_RECEIVE',
    status:status,
    data
  }
};

export const signInErrorPost = (status,error) =>{

  return{
    type:'SIGN_IN_ERROR',
    status:status,
    error
  }
};


export const signInPosts =(fn) => (dispatch,getState) =>{

  dispatch(signInRequestPost(0));

  return fetch('/profile/sign/signIn?page=myacc',{method:'GET',credentials: 'include',mode: 'no-cors'})
    .then(response => response.json())
    .then(json => {
      dispatch(signInReceivePost(1,json.data));
      if(json.data.signStatus == 1 || json.data.signStatus == 0){
        dispatch(welfareActions.welfareInfoPosts());
        dispatch(action.singTodayPosts());
      }

    })
    ['catch'](function(error){
      dispatch(signInErrorPost(3,error))
    });
};