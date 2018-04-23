const _ = require('lodash');
const bankCard = {
  bankList: {
      hasWD:false,
      realName:'',
      lcCanChangeCard:false,
      hasLC:false,
      lcCard:{
          accountName:'',
          accountType:2,
          bandType:4,
          bank:'',
          bankCode:'',
          bankName:'',
          bidId:0,
          bindId:'',
          cardId:'',
          cardId5:'',
          cardMobile:'',
          cardType:0,
          createTime:0,
          disabled:false,
          editable:false,
          id:0,
          isForMobile:1,
          uid:0,
          updateTime:0
      },
      userType:1,
      wdCard:{
          accountName:'',
          accountType:1,
          bandType:0,
          bank:'',
          bankCode:'',
          bankName:'',
          bidId:0,
          bindId:'',
          cardId:'',
          cardId5:'',
          cardMobile:'',
          cardType:0,
          createTime:0,
          disabled:false,
          editable:true,
          id:0,
          isForMobile:0,
          uid:0,
          updateTime:0
      },
      needId5Certification:false,
      wdBindTimes:0
  },
  bankData: {
    newMobile: '',
    validCode: '',
    isValidCodeErr: null,
    validCodeMessage: '',
  },
  sydBankCard: {
    bankCode: '',
    bankCardNo: '',
    bankCardErr: null,
    isValidCodeErr: null,
    validCodeMessage: '',
  },
  changeBankMobild: {

  }
};

export const bankCardData = (state = bankCard, action) => {

  switch (action.type) {

    case 'SET_BANK_LIST':
      return _.assign({}, state, {
        bankList: action.data
      });

    case 'SET_BANK_CARD_INFO':
      return _.assign({}, state, {
        changeBankMobild: action.data
      });

    case 'SET_NEW_MOBILE':
      return _.merge({}, state, {
        bankData: {
          newMobile: action.data
        }
      });

    case 'SET_VALID_CODE':
      return _.merge({}, state, {
        bankData: {
          validCode: action.data
        }
      });

    case 'IS_VALID_COLID_ERR':
      return _.merge({}, state, {
        bankData: {
          isValidCodeErr: action.data
        }
      });

    case 'VALID_CODE_MESSAGE':
      return _.merge({}, state, {
        bankData: {
          validCodeMessage: action.data
        }
      });

    case 'SET_SYD_CARD_TYPE':
      return _.merge({}, state, {
        sydBankCard: {
          bankCode: action.data
        }
      });

    case 'SET_SYD_CARD_ID':
      return _.merge({}, state, {
        sydBankCard: {
          bankCardNo: action.data
        }
      });

    case 'SET_SYD_CARD_ID_ERR':
      return _.merge({}, state, {
        sydBankCard: {
          bankCardErr: action.data
        }
      });

    case 'IS_SYD_VALID_COLID_ERR':
      return _.merge({}, state, {
        sydBankCard: {
          isValidCodeErr: action.data
        }
      });

    case 'SYD_VALID_CODE_MESSAGE':
      return _.merge({}, state, {
        sydBankCard: {
          validCodeMessage: action.data
        }
      });


    default:
      return state;
  }
};