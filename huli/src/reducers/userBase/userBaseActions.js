const Util = require('../../common/util');

export const userBaseRequestLoading = (baseType) => ({
  type: 'USER_BASE_REQUEST_LOADING',
  baseType
});

export const userBaseSucc = (baseType, data) => ({
  type: 'USER_BASE_SUCC',
  baseType,
  data
});

export const userBaseError = (baseType, status, error) => ({
  type: 'USER_BASE_ERROR',
  baseType,
  status,
  error
});

export const getUserBaseAccount = (fn) => (dispatch, getState) => {

    const _baseType = 'account';
    dispatch(userBaseRequestLoading(_baseType));
    Util.requestAjaxFn({
        url: '/myaccount/capital/ajax/news_and_coupon',
        succFn: function(json){
            dispatch(userBaseSucc(_baseType, json.data));
            fn && fn(json);
        },
        errorFn: function(error){
            dispatch(userBaseError(_baseType, 2, error));
        }
    })

};

export const getUserBaseUserStatus = (fn) => (dispatch, getState) => {

    const _baseType = 'userStatus';
    dispatch(userBaseRequestLoading(_baseType));
    Util.requestAjaxFn({
        url: '/profile/safecenter/safestatus',
        succFn: function(json){
            dispatch(userBaseSucc(_baseType, json.data));
            fn && fn(json);
        },
        errorFn: function(error){
            dispatch(userBaseError(_baseType, 2, error));
        }
    })

};

export const getUserBaseDirectCard = (fn) => (dispatch, getState) => {
    const _baseType = 'directCard';
    dispatch(userBaseRequestLoading(_baseType));
    Util.requestAjaxFn({
        url: '/trust/charge/directCard',
        succFn: function(json){

            if(json.errorCode == 0){
                dispatch(userBaseSucc(_baseType, json.data));
            }else if(json.errorCode == 1){
                dispatch(userBaseError(_baseType, 3, json.errorMessage));
            }
            fn && fn(json);
        },
        errorFn: function(){
            dispatch(userBaseError(_baseType, 2, error));
        }
    })

};

export const getUserBaseAccountInfo = (fn) => (dispatch, getState) => {

    const _baseType = 'accountInfo';
    dispatch(userBaseRequestLoading(_baseType));
    Util.requestAjaxFn({
        url: '/trust/withdraw/accountInfo',
        succFn: function(json){
            if(json.errorCode == 0){
                dispatch(userBaseSucc(_baseType, json.data));
            }
            fn && fn(json);
        },
        errorFn: function(){
            dispatch(userBaseError(_baseType, 2, error));
        }
    })

};

/**
 * 是否需要ID5实名认证
 * @author liuxuewen
 * @date   2017-09-22
 * @param  {[type]}   succFn) [description]
 * @return {[type]}           true－需要   false－不需要
 */
export const accountNeedId5Certification = (succFn) => (dispatch, getState) => {
    const state = getState();
    if(state.userBase.accountInfo.isFetching !== 1){
        dispatch(getUserBaseAccountInfo((json) => {
            if(json.errorCode == 0) {
                succFn && succFn(json.data.needId5Certification==1);
            }
        }))
    }else{
        succFn && succFn(state.userBase.accountInfo.data.needId5Certification==1);
    }
}
/**
 * 是否需要绑定通联卡（理财）
 * @author liuxuewen
 * @date   2017-09-22
 * @param  {[type]}   succFn) [description]
 * @return {[type]}           true-需要   false-不需要
 */
export const accountNeedBindCardToHl = (succFn) => (dispatch, getState) => {
    const state = getState();
    if(state.userBase.accountInfo.isFetching !== 1){
        dispatch(getUserBaseAccountInfo((json) => {
            if(json.errorCode == 0) {
                succFn && succFn(!json.data.tlAccount.bankCode);
            }
        }))
    }else{
        succFn && succFn(!state.userBase.accountInfo.data.tlAccount.bankCode);
    }
}
/**
 * 是否有搜易贷可用的取现卡
 * @author liuxuewen
 * @date   2017-09-22
 * @param  {[type]}   succFn) [description]
 * @return {[type]}           true-有  false-没有
 */
export const accountHasQXCardToSyd = (succFn) => (dispatch, getState) => {
    const state = getState();
    if(state.userBase.accountInfo.isFetching !== 1){
        dispatch(getUserBaseAccountInfo((json) => {
            if(json.errorCode == 0) {
                succFn && succFn(!json.data.hxAccount.bankCode);
            }
        }))
    }else{
        succFn && succFn(!state.userBase.accountInfo.data.hxAccount.bankCode);
    }
}

/**
 * 是否解绑过搜易贷快捷卡
 * @author liuxuewen
 * @date   2017-09-22
 * @param  {[type]}   succFn) [description]
 * @return {[type]}           true-有  false-没有
 */
export const accountHasUnBindCardToSyd = (succFn) => (dispatch, getState) => {
    const state = getState();
    if(state.userBase.accountInfo.isFetching !== 1){
        dispatch(getUserBaseAccountInfo((json) => {
            if(json.errorCode == 0) {
                succFn && succFn(json.data.hxAccount.bindConvientCard == 1); //是否解绑过快捷卡 1：解绑过 2：未解绑过
            }
        }))
    }else{
        succFn && succFn(state.userBase.accountInfo.data.hxAccount.bindConvientCard == 1);
    }
}

/**
 * 获取最近70天所有利率数据
 * @author zangpeihui
 * @date   2017-11-6
 * @param  {[type]}
 * @return {list}
 */
export const rateListData = (succFn) => (dispatch, getState) => {
    const _baseType = 'rryRateLists';
    const rightNow = new Date().getTime();
    const twoMonth = rightNow - 70*24*60*60*1000;
    dispatch(userBaseRequestLoading(_baseType));
    Util.requestAjaxFn({
        url: '/hqb/rry/queryRryInfo',
        data: {startTime:twoMonth, endTime:rightNow},
        succFn: function(json){

            if(json.errorCode == 0){
                dispatch(userBaseSucc(_baseType, json.data));
            }else if(json.errorCode == 1){
                dispatch(userBaseError(_baseType, 3, json.errorMessage));
            }
            succFn && succFn(json);
        },
        errorFn: function(){
            dispatch(userBaseError(_baseType, 2, error));
        }
    })
}