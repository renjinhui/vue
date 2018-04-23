const _ = require('lodash');
const loginData = {
  isLogin:false,
  cookies:''
};
export const getLoginData =  (state = loginData, action) => {
  switch(action.type){
    case 'USER_LOGIN':
      return _.assign({}, state, {
        isLogin: action.status,
        cookies: action.cookies
      });
    case 'USER_LOGOUT':
      return _.assign({}, state, {
        isLogin: action.status
      });
    default: return state
  }
};
