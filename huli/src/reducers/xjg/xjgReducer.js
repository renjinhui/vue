const _ = require('lodash');

const xjgData = {
  page_isFetching: 0,  //0-loading;1-success;－1-error;其它－服务器错误
  page_error: "",
  page: {},    //接口请求的数据
  detail_isFetching: 0,
  detail_error: '',
  detail: {},
  buy_isFetching: 0,
  buy_errorCode: '',
  buy_errorMessage: ''
  // popup: {
  //   questions: [],
  //   invest: {
  //     wantTurnIn: 0,  //想要转入的金额
  //     turninMoney: 0,  //实际只能转入的金额（跟余额做比较）
  //     useMoney: 0,   //实际转入金额（有可能抛掉红包金额）
  //     isAgree: true,
  //     isBalanceLess: false
  //   }
  // }
};

export const getHQDetail = (state = xjgData, action) =>{
  switch (action.type){
    case 'XJG_DETAIL_LOADING':
      return _.assign({}, state, {
        page_isFetching: 0
      });
    case 'XJG_DETAIL_SUCCESS':
      return _.merge({}, state, {
        page_isFetching: 1,
        page: action.pageData
      });
    case 'XJG_DETAIL_ERROR':
      return _.assign({}, state, {
        page_isFetching: action.status,
        page_error: action.error
      });
    case 'XJG_DETAIL_BUY_LOADING':
      return _.assign({}, state, {
        buy_isFetching: 0
      });
    case 'XJG_DETAIL_BUY_SUCCESS':
      return _.merge({}, state, {
        buy_isFetching: 1,
        buy_errorMessage: action.errorMessage || '',
        buy_errorCode: action.errorCode || 0
      });
    case 'XJG_DETAIL_BUY_ERROR':
      return _.assign({}, state, {
        buy_isFetching: action.status,
        buy_errorMessage: action.errorMessage || '',
        buy_errorCode: action.errorCode || -1
      });
    // case 'XJG_DETAIL_POPUP_INVEST':
    //   return _.merge({}, state, {
    //     popup: {
    //       invest: {
    //         turninMoney: action.options.turninMoney,
    //         useMoney: action.options.useMoney,
    //         isBalanceLess: action.options.isBalanceLess
    //       }
    //     }
    //   })
    // case 'XJG_DETAIL_POPUP_WANT_TURNIN':
    //   return _.merge({}, state, {
    //     popup: {
    //       invest: {
    //         wantTurnIn: action.wantTurnIn
    //       }
    //     }
    //   })
    // case 'XJG_DETAIL_SET_POPUP_IS_AGREE':
    //   return _.merge({}, state, {
    //     popup: {
    //       invest: {
    //         isAgree: action.isAgree
    //       }
    //     }
    //   })

    // 产品详情
    case 'XJG_PRO_DETAIL_LOADING':
      return _.assign({},state,{
          detail_isFetching:0
      });
    case 'XJG_PRO_DETAIL_SUCCESS':
      return _.assign({},state,{
          detail_isFetching:1,
          detail:action.ProData ? action.ProData : {}
      });
    case 'XJG_PRO_DETAIL_ERROR':
      return _.assign({},state,{
          detail_isFetching:action.status,
          error:action.error
      });
    default: return state
  }
};
