const popupActions = require('../../../reducers/popup/popupActions');

// 6、银行卡列表(我的账户--银行卡菜单)

export const setBankList = (data) => ({
  type: 'SET_BANK_LIST',
  data
});

export const getBankList = (url) => (dispatch) => {
  return $.ajax({
    url: url,
    type: "POST",
    dataType: 'json',
    success: function (data) {
      if (data.errorCode == 0) {
        dispatch(setBankList(data.data));
      }
    },
    error: function (err) {
      console.log('获取银行卡列表err');
    }
  });
};

// 7、进入修改银行预留手机号页面

export const setBankCardInfo = (data) => ({
  type: 'SET_BANK_CARD_INFO',
  data
});

export const initBankCardInfo = (url, data) => (dispatch) => {
  return $.ajax({
    url: url,
    data,
    type: "POST",
    dataType: 'json',
    success: function (data) {
      dispatch(setBankCardInfo(data.data));
    },
    error: function (err) {
      console.log('获取银行信息err');
    }
  });
}

// 8、更换银行预留手机发送短信验证码

export const sendChangePhoneSmsCode = (url, data) => (dispatch) => {
  return $.ajax({
    url: url,
    data,
    type: "POST",
    dataType: 'json',
    success: function (data) {
      console.log('验证码发送成功');
      if (data.errorCode !== 0) {
        dispatch(isValidCodeErr(true));
        dispatch(validCodeMessage(data.errorMessage));
      } else {
        this.props.bankCardData.bankData.isValidCodeErr !== null
          ? dispatch(isValidCodeErr(false))
          : null
      }
    },
    error: function (err) {
      console.log('验证码发送失败');
      dispatch(isValidCodeErr(true));
      dispatch(validCodeMessage('验证码发送失败'));
    }
  });
}

export const changePhoneNum = (url, data) => (dispatch) => {
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

// 设置新手机号
export const setNewMobile = (data) => ({
  type: 'SET_NEW_MOBILE',
  data
});

// 设置验证码
export const setValidCode = (data) => ({
  type: 'SET_VALID_CODE',
  data
});

export const isValidCodeErr = (data) => ({
  type: 'IS_VALID_COLID_ERR',
  data
});

export const validCodeMessage = (data) => ({
  type: 'VALID_CODE_MESSAGE',
  data
});

// 搜易贷选择银行卡
export const setSydCardType = (data) => ({
  type: 'SET_SYD_CARD_TYPE',
  data
});

// 搜易贷银行卡相关
export const setSydCardId = (data) => ({
  type: 'SET_SYD_CARD_ID',
  data
});

export const setSydCardIdErr = (data) => ({
  type: 'SET_SYD_CARD_ID_ERR',
  data
});

export const isSydValidCodeErr = (data) => ({
  type: 'IS_SYD_VALID_COLID_ERR',
  data
});

export const sydValidCodeMessage = (data) => ({
  type: 'SYD_VALID_CODE_MESSAGE',
  data
});

// 搜易贷取现卡绑定
export const bindSydCard = (url, data) => (dispatch) => {
  return $.ajax({
    url: url,
    data,
    type: "POST",
    dataType: 'json',
    success: function (data) {
      return data;
    },
    error: function (err) {
      console.log('绑卡失败');
      dispatch(isSydValidCodeErr(true));
      dispatch(sydValidCodeMessage('网络错误'));
    }
  });
}

export const delSydCard = (url, id) => (dispatch) => {
  return $.ajax({
    url: url,
    type: "POST",
    dataType: 'json',
    data: {id},
    success: function (data) {
      return data;
    }
  });
}
