const _ = require('lodash');
const openAccount = {
  account: null,
  isLogin: '',
  bankList: [],
  result: {
    errorCode: 0,
    errorMessage: ''
  },
};

export const openAccountData = (state = openAccount, action) => {

  switch (action.type) {

    case 'OA_BANK_LIST':
      return _.assign({}, state, {
        bankList: action.data
      });

    case 'INIT_ACCOUNT':
      return _.assign({}, state, {
        account: action.data
      });

    case 'OA_RESULT':
      return _.assign({}, state, {
        result: action.data
      });

    default:
      return state
  }
};