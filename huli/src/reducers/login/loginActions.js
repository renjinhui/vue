const base64 = require('js-base64').Base64;
const Util = require('../../common/util');

export const userLogin = (status,cookies) => {
  return {
    type: 'USER_LOGIN',
    status,
    cookies
  }
};

export const userLogout = (status) => {
  return {
    type: 'USER_LOGOUT',
    status
  }
};

export const setLoginInfo = () => (dispatch, getState) => {
  let syd_name = Util.cookie.get('syd_name');
  // syd_name = '5YiY5YWI55Sf';
  let name = base64.decode(decodeURIComponent(syd_name));
  if(syd_name == ''){
    dispatch(userLogout(false));
  }else{
    dispatch(userLogin(true, name));
  }
}