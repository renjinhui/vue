const _ = require('lodash');
const changeCard = {
  step: 0,
  bankList: [],
  smsCode0: {},
  smsCode1: {},
  result0: {},
  result1: {}
};

export const changeCardData = (state = changeCard, action) => {

  switch (action.type) {

    case 'CC_INIT_STEP':
      return _.assign({}, state, {
        step: 0
      });

    case 'CC_STEP_1':
      return _.assign({}, state, {
        step: 1
      });

    case 'CC_BANK_LIST':
      return _.assign({}, state, {
        bankList: action.data
      });

    case ('CC_SMS_CODE_0'):
      return _.assign({}, state, {
        smsCode0: action.data
      });

    case ('CC_SMS_CODE_1'):
      return _.assign({}, state, {
        smsCode1: action.data
      });

    default:
      return state;
  }
};