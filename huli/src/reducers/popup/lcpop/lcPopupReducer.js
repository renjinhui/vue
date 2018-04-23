const _ = require('lodash');
const lcPopupData = {
  top: 40,
  isShow: false,
  type: '',
  title: '理财转让',
  bidId:'',
  rate:'',
  hasCancel: true,
  hasSubmit: true,
  cancelText: '',
  submitText: '',
  submitDisabled: false,
  submitNeverAble: false,//辅助不能提交
  backurl: 'https://www.huli.com',
  errorCode: -1, //100及以上表示成功的弹框 100--转让成功  101--撤销成功  1--未登录  2--请求弹框数据系统繁忙  3--转让失败 系统繁忙 4--撤销失败 系统繁忙
  //  网贷弹框  转让
  transData:{
    isFetching:0,
    data:{},
    error:{}
  },
  //  网贷弹框  撤销确认转让
  transCancelData:{
    isFetching:0,
    data:{},
    error:{}
  },
  //  网贷弹框  确认转让
  transOverData:{
    isFetching:0,
    data:{},
    error:{}
  },
  //  网贷弹框  确认撤销转让
  transOverCancelData:{
    isFetching:0,
    data:{},
    error:{}
  },
};

export const lcPopup = (state = lcPopupData, action) =>{
  let WH = $(window).height();
  let PH = 500;

  switch (action.type){
    case 'POPUP_LC_SET_STATUS':
      let top = (document.body.scrollTop || document.documentElement.scrollTop) + (WH - PH)/2;
      return _.assign({},state,{
        top: top,
        isShow: action.options.isShow,
        type: action.options.type,
        title: action.options.title || state.title,
        bidId: action.options.bidId || '',
        rate: action.options.rate || '',
        hasCancel: action.options.hasCancel === undefined ? true : action.options.hasCancel,
        hasSubmit: action.options.hasSubmit === undefined ? true : action.options.hasSubmit,
        cancelText: action.options.cancelText || '取消',
        submitText: action.options.submitText || '确定',
        submitDisabled: action.options.submitDisabled,
        backurl: action.options.backurl,
      });
    case 'POPUP_LC_SET_RATE':
      return _.assign({}, state, {
        rate: action.rate
      });
    case 'POPUP_SET_LC_ERRORCODE':
      return _.assign({}, state, {
        errorCode: action.errorCode
      });
    case 'POPUP_LC_SET_SUBMIT_DISABLED':
      return _.assign({}, state, {
        submitDisabled: action.submitDisabled
      });
    case 'POPUP_LC_SET_SUBMIT_NEVERABLE':
      return _.assign({}, state, {
        submitNeverAble: action.submitNeverAble
      });

      //网贷弹框 转让接口
    case 'POPUP_LC_TRANS_LOADING':
      return _.assign({}, state, {
        transData:{  
          isFetching: action.status
        }
      });
    case 'POPUP_LC_TRANS_SUCCESS':
      return _.merge({}, state, {
        transData:{  
          isFetching: action.status,
          data:action.data ? action.data : ""
        }
      });
    case 'POPUP_LC_TRANS_ERROR':
      return _.assign({}, state, {
        transData:{  
          isFetching: action.status,
          error:action.error
        }
      });

        //网贷弹框 撤销转让接口
    case 'POPUP_LC_CANCEL_TRANS_LOADING':
      return _.assign({}, state, {
        transCancelData:{  
          isFetching: action.status
        }
      });
    case 'POPUP_LC_CANCEL_TRANS_SUCCESS':
      return _.merge({}, state, {
        transCancelData:{  
          isFetching: action.status,
          data:action.data ? action.data : ""
        }
      });
    case 'POPUP_LC_CANCEL_TRANS_ERROR':
      return _.assign({}, state, {
        transCancelData:{  
          isFetching: action.status,
          error:action.error
        }
      });

      //网贷弹框 确认转让接口
    case 'POPUP_LC_SURE_TRANS_LOADING':
      return _.assign({}, state, {
        transOverData:{  
          isFetching: action.status
        }
      });
    case 'POPUP_LC_SURE_TRANS_SUCCESS':
      return _.merge({}, state, {
        transOverData:{  
          isFetching: action.status,
          data:action.data ? action.data : ""
        }
      });
    case 'POPUP_LC_SURE_TRANS_ERROR':
      return _.assign({}, state, {
        transOverData:{  
          isFetching: action.status,
          error:action.error
        }
      });
      //网贷弹框 确认撤销转让接口
    case 'POPUP_LC_SURE_CANCEL_TRANS_LOADING':
      return _.assign({}, state, {
        transOverCancelData:{  
          isFetching: action.status
        }
      });
    case 'POPUP_LC_SURE_CANCEL_TRANS_SUCCESS':
      return _.merge({}, state, {
        transOverCancelData:{  
          isFetching: action.status,
          data:action.data ? action.data : ""
        }
      });
    case 'POPUP_LC_SURE_CANCEL_TRANS_ERROR':
      return _.assign({}, state, {
        transOverCancelData:{  
          isFetching: action.status,
          error:action.error
        }
      });
    default: return state
  }
};