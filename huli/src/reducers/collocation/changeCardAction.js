const popupActions = require('../../reducers/popup/popupActions');

export const initStep = () => ({
  type: 'CC_INIT_STEP'
});

export const step1 = () => ({
  type: 'CC_STEP_1'
});

export const ccBankList = data => ({
  type: 'CC_BANK_LIST',
  data
});

export const getCCBankList = (url) => (dispatch) => {
  return $.ajax({
    url: url,
    type: "POST",
    dataType: 'json',
    success: function (data) {
      dispatch(ccBankList(data.data));
    }
  })
};

export const ccSmsCode0 = data => ({
  type: 'CC_SMS_CODE_0',
  data
});

export const getSmsCode0 = (url) => (dispatch) => {
  return $.ajax({
    url: url,
    type: "POST",
    dataType: 'json',
    success: function (data) {
      dispatch(ccSmsCode0(data));
      return data;
    }
  });
};

export const getVerifySmsCode0 = (url, data) => (dispatch) => {
  return $.ajax({
    url: url,
    type: "POST",
    dataType: 'json',
    data,
    success: function (data) {
      if (data.errorCode === 0) {
        dispatch(step1());
      } else {
        return data;
      }
    }
  });
}

export const ccSmsCode1 = data => ({
  type: 'CC_SMS_CODE_1',
  data
});

export const getSmsCode1 = (url, data) => (dispatch) => {
  return $.ajax({
    url: url,
    data,
    type: "POST",
    dataType: 'json',
    success: function (data) {
      dispatch(ccSmsCode1(data));
      return data;
    }
  });
};

export const getVerifySmsCode1 = (url, data) => (dispatch) => {
  return $.ajax({
    url: url,
    type: "POST",
    data,
    dataType: 'json',
    success: function (data) {
      return data;
    }
  });
}