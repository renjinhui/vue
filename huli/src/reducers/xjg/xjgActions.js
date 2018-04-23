// 小金罐 详情
const actionsPopup = require('../popup/popupActions');

const xjgDetailLoading = status => ({type: 'XJG_DETAIL_LOADING'});

const xjgDetailSuccess = (pageData) => ({type: 'XJG_DETAIL_SUCCESS', pageData});

const xjgDetailError = (status, error) => ({type: 'XJG_DETAIL_ERROR', status, error});

const xjgDetailBuyLoading = status => ({type: 'XJG_DETAIL_BUY_LOADING'});

const xjgDetailBuySuccess = (errorCode, errorMessage) => ({type: 'XJG_DETAIL_BUY_SUCCESS', errorCode, errorMessage});

const xjgDetailBuyError = (status, errorCode, errorMessage) => ({type: 'XJG_DETAIL_BUY_ERROR', status, errorCode, errorMessage});

// export const xjgDetailPopupInvest = (options) => ({type: 'XJG_DETAIL_POPUP_INVEST', options});

// export const xjgDetailPopupWantTurnIn = (wantTurnIn) => ({type: 'XJG_DETAIL_POPUP_WANT_TURNIN', wantTurnIn});

// export const xjgDetailSetPopupIsAgree = (isAgree) => ({type: 'XJG_DETAIL_SET_POPUP_IS_AGREE', isAgree: isAgree});

export const xjgDetailPosts = (afterAjaxFn) => (dispatch, getState) => {
    dispatch(xjgDetailLoading());
    ajax_xjgDetailPosts(dispatch, getState, afterAjaxFn);
};
const ajax_xjgDetailPosts = (dispatch, getState, afterAjaxFn) => {
    $.ajax({
        url: '/hqb/detail',
        type: 'post',
        data: {
            subType: 'XJG',
            version: 1.6
        },
        dataType: 'json',
        success: function(json) {
            if (json.errorCode == 0) {
                json.data.xjg = json.data.hqbItems['XJG'];
                dispatch(xjgDetailSuccess(json.data));
                // isShowPopup && showXJGPopup(dispatch, getState);
            } else {
                dispatch(xjgDetailError(json.errorCode, ''));
            }
            afterAjaxFn && afterAjaxFn(json);
        },
        error: function(error) {
            dispatch(xjgDetailError(-1, error));
        }
    })
}

export const xjgSubmitInvest = (turninMoney, afterAjaxFn) => (dispatch, getState) => {
    const state = getState();
    dispatch(xjgDetailBuyLoading());
    $.ajax({
        url: '/hqb/buy',
        type: 'post',
        data: {
            subType: 'XJG',
            applyAmount: turninMoney * 100
        },
        dataType: 'json',
        success: function(json) {
            if (json.errorCode == 0) {
                dispatch(xjgDetailBuySuccess(json.errorCode, json.data));
                let timer = window.setTimeout(function() {
                    window.clearTimeout(timer);
                    ajax_xjgDetailPosts(dispatch, getState);
                }, 1000);
                // dispatch(actionsPopup.popupSetType('xjg-success'));
            } else {
                // dispatch(actionsPopup.popupSetErrorMessage(json.errorCode, json.errorMessage, '小金罐转入失败！'));
                // dispatch(actionsPopup.popupSetType('popup-error'));
                dispatch(xjgDetailBuyError(json.errorCode, json.errorCode, json.errorMessage));
            }
            afterAjaxFn && afterAjaxFn(json);
        },
        error: function(error) {
            dispatch(xjgDetailBuyError(-1, -1, error));
        }
    })
};

// 产品详情
export const xjgProDetailLoading = status => ({type: 'XJG_PRO_DETAIL_LOADING', status})

export const xjgProDetailSuccess = (status, ProData) => ({type: 'XJG_PRO_DETAIL_SUCCESS', status, ProData})

export const xjgProDetailError = (status, error) => ({type: 'XJG_PRO_DETAIL_ERROR', status, error});

export const xjgProDetailPosts = () => (dispatch, getState) => {
    dispatch(xjgProDetailLoading());
    return fetch('/hqb/productContent?subType=XJG', {
        method: 'GET',
        credentials: 'include'
    }).then(response => response.json()).then((json) => {
        if (json.errorCode == 0) {
            dispatch(xjgProDetailSuccess(1, json.data));
        } else {
            dispatch(xjgProDetailError(json.errorCode, ''));
        }

    })
    ['catch']((error) => {
        dispatch(xjgDetailError(-1, error));
    });
};

// export const xjgShowPopup = () => (dispatch, getState) => {
//     showXJGPopup(dispatch, getState);
// }

// function showXJGPopup(dispatch, getState) {
//     const page = getState().hqDetail.page;
//     // 判断是否做过风险评估 0:未评估 1:已评估未过期 2:已评估已过期
//     let userRiskStatus = page.riskInfo.riskStatus;
//     let isHigher = page.riskInfo.riskValue && page.riskInfo.riskValue.length >= page.xjg.riskValue.length;
//     let riskPopupType = '';
//     let submitText = '重新评估';
//     if (userRiskStatus == 0) {
//         riskPopupType = 'risk-first';
//         submitText = '开始评估';
//     } else if (userRiskStatus == 2) {
//         riskPopupType = 'risk-again';
//     } else if (userRiskStatus == 1 && !isHigher) { //判断用户评估等级是否高过项目最低等级
//         riskPopupType = 'risk-tip';
//         submitText = '继续转入';
//     }
//     if (riskPopupType) {
//         dispatch(actionsPopup.popupSetStatus({
//             isShow: true,
//             type: riskPopupType,
//             title: '风险评估测试',
//             isHigher: isHigher,
//             submitText: submitText,
//             cancelText: '暂不转入'
//         }));
//         return;
//     }
//
//     //投资
//     dispatch(actionsPopup.popupSetStatus({isShow: true, type: 'xjg-invest', title: '小金罐转入', submitText: '确定'}));
// }
