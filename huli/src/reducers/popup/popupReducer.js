const _ = require('lodash');
const popupData = {
  top: 40,
  isShow: false,
  type: '',
  title: '小金罐',
  hasCancel: true,
  hasSubmit: true,
  cancelText: '',
  submitText: '',
  submitDisabled: false,
  isReload:false,
  backurl: 'https://www.huli.com',
  isHigher: false,  //当前用户等级是否大于项目需要的最低等级
  errorCode: -1,
  errorTitle: '',
  errorMessage: ''
};

export const popup = (state = popupData, action) =>{
  let WH = $(window).height();
  let PH = 500;

  switch (action.type){
    case 'POPUP_SET_STATUS':
      let top = (document.body.scrollTop || document.documentElement.scrollTop) + (WH - PH)/2;
      return _.assign({},state,{
        top: top,
        isShow: action.options.isShow,
        type: action.options.type,
        title: action.options.title || '',
        isReload:action.options.isReload || false,
        hasCancel: action.options.hasCancel === undefined ? true : action.options.hasCancel,
        hasSubmit: action.options.hasSubmit === undefined ? true : action.options.hasSubmit,
        cancelText: action.options.cancelText || '取消',
        submitText: action.options.submitText || '确定',
        submitDisabled: action.options.submitDisabled,
        backurl: action.options.backurl,
        showTip: action.options.showTip || false,
        isHigher: action.options.isHigher,
        context: action.options.context
      });
    case 'POPUP_SET_TOP':
      return _.assign({}, state, {
        top: action.top
      });
    case 'POPUP_SET_TYPE':
      return _.assign({}, state, {
        type: action.popupType
      });
    case 'POPUP_SET_SUBMIT_DISABLED':
      return _.assign({}, state, {
        submitDisabled: action.submitDisabled
      });
    case 'POPUP_SET_Is_RELOAD':
      return _.assign({}, state, {
        isReload: action.isReload
      });
    case 'POPUP_SET_ERROR_MESSAGE':
      return _.assign({}, state, {
        errorCode: action.errorCode,
        errorTitle: action.errorTitle,
        errorMessage: action.errorMessage
      });

    default: return state
  }
};
