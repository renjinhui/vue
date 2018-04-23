//  资金概览-资金相关接口
const _ = require('lodash');

export const popupSetType = (popupType) => ({
  type: 'POPUP_SET_TYPE',
  popupType
});

export const popupSetSubmitDisabled = (submitDisabled) => ({
  type: 'POPUP_SET_SUBMIT_DISABLED',
  submitDisabled
});

export const popupSetIsReload = (submitDisabled) => ({
  type: 'POPUP_SET_Is_RELOAD',
  isReload
});

export const popupSetStatus = (options) => ({
  type: 'POPUP_SET_STATUS',
  options
});

export const popupSetTop = (top) => ({
  type: 'POPUP_SET_TOP',
  top
});

export const popupGetRiskQuestionsPost = (fn) => (dispatch, getState) => {
  dispatch(popupSetRiskQuestionsLoading());
  dispatch(popupSetRiskQuestionsAnswers({})); //重置答案
  dispatch(popupSetRiskQuestionsAnswerCurrent(0));
  return fetch('/profile/safecenter/riskquestions', { method: 'GET', credentials: 'include' })
    .then(response => response.json())
    .then((json) => {
      if(json.errorCode == 0){
        dispatch(popupSetRiskQuestionsSuccess(json.data));
      }else{
        dispatch(popupSetRiskQuestionsError(json.errorCode, ''));
      }

    })
    ['catch']((error) => {
      dispatch(popupSetRiskQuestionsError(-1, error));
  });
};

const popupSubmitRiskQuestionsLoading = status => ({
  type: 'POPUP_SET_RISK_QUESTIONS_LOADING'   //POPUP_SUBMIT_RISK_QUESTIONS_LOADING
});

const popupSubmitRiskQuestionsSuccess = (riskSubmitData) => ({
  type: 'POPUP_SET_RISK_QUESTIONS_SUCCESS',
  riskSubmitData
});

const popupSubmitRiskQuestionsError = (status, error) => ({
  type: 'POPUP_SET_RISK_QUESTIONS_ERROR',
  status,
  error
});

export const popupSetErrorMessage = (errorCode, errorMessage, errorTitle) => ({
  type: 'POPUP_SET_ERROR_MESSAGE',
  errorCode,
  errorMessage,
  errorTitle
});
