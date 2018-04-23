/**
 * 风险评估相关
 */
const _ = require('lodash');

const popupSetRiskQuestionsLoading = status => ({
  type: 'POPUP_SET_RISK_QUESTIONS_LOADING'
});

const popupSetRiskQuestionsSuccess = (questionsData) => ({
  type: 'POPUP_SET_RISK_QUESTIONS_SUCCESS',
  questionsData
});

const popupSetRiskQuestionsError = (status, error) => ({
  type: 'POPUP_SET_RISK_QUESTIONS_ERROR',
  status,
  error
});

export const popupSetRiskQuestionsAnswers = (answers) => ({
  type: 'POPUP_SET_RISK_QUESTIONS_ANSWERS',
  answers
});

export const popupSetRiskQuestionsAnswer = (id, answer) => ({
  type: 'POPUP_SET_RISK_QUESTIONS_ANSWER',
  id,
  answer
});

export const popupGetRiskQuestionsPost = (fn) => (dispatch, getState) => {
  dispatch(popupSetRiskQuestionsLoading());
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
  type: 'POPUP_SET_RISK_QUESTIONS_LOADING'
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

export const popupSubmitRiskQuestions = (afterAjaxFn) => (dispatch, getState) => {
  let state = getState();
  let _answers = [], _qids = [];
  _.forOwn(state.risk.questions_answers, (value, id) => {
    if(id != "__proto__"){
      _qids.push(id);
      _answers.push(value);
    }
  });
  dispatch(popupSubmitRiskQuestionsLoading());
  dispatch(popupSetRiskQuestionsAnswers({})); //重置答案
  $.ajax({
    url: '/profile/safecenter/riskanswer',
    type: 'post',
    data: {
      qids: _qids.join(','),
      answers: _answers.join(','),
      device: 'pc'
    },
    dataType: 'json',
    success: function(json){
      if(json.errorCode == 0){
        dispatch(popupSubmitRiskQuestionsSuccess(json.data));
      }else{
        dispatch(popupSubmitRiskQuestionsError(json.errorCode, ''));
      }
      afterAjaxFn && afterAjaxFn(json);
    },
    error: function(error){
      dispatch(popupSubmitRiskQuestionsError(-1, error));
    }
  })
};

export const getUserRiskStatus = (afterAjaxFn) => (dispatch, getState) => {
  $.ajax({
    url: '/profile/safecenter/safestatus',
    type: 'post',
    data: {
        t: Math.random()
    },
    dataType: 'json',
    success: function(json){
      afterAjaxFn && afterAjaxFn(json);
    },
    error: function(error){
    }
  })
};
