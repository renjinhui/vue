const popupActions = require('../../reducers/popup/popupActions');
const userBaseActions = require('../../reducers/userBase/userBaseActions');

export const oaBankList = data => ({
  type: 'OA_BANK_LIST',
  data
});

export const getOaBankList = (url) => (dispatch) => {
  return $.ajax({
    url: url,
    type: "POST",
    dataType: 'json',
    success: function (data) {
      dispatch(oaBankList(data.data));
    }
  });
};

export const initAccount = data => ({
  type: 'INIT_ACCOUNT',
  data
});

export const getAccount = (url) => (dispatch) => {
  return $.ajax({
    url: url,
    type: "POST",
    dataType: 'json',
    success: function (data) {
      dispatch(initAccount(data));
      return data;
    }
  })
}

export const getOaSmsCode = (url, data) => (dispatch) => {
  return $.ajax({
    url: url,
    type: "POST",
    data,
    dataType: 'json',
    success: function (data) {
      return data;
    }
  });
};

export const openAccount = data => {
  return ({
    type: 'OA_RESULT',
    data
  })
};

export const submitOpenAccount = (url, data) => (dispatch) => {
  return $.ajax({
    url: url,
    type: "POST",
    data,
    dataType: 'json',
    success: function (data) {
      dispatch(openAccount(data));
      if (data.errorCode === 0) {
        dispatch(userBaseActions.getUserBaseAccountInfo());
      }
      return data;
    },
    error: function (err) {
      console.log('开户网络错误');
    }
  });
}