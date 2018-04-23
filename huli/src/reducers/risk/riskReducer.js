const _ = require('lodash');
const riskData = {
    questions: [],   //问题post数据
    questions_isFetching: 0,
    questions_error: '',
    questions_answers: {},   //答案 格式：问题id: 答案id
    risk_submit_isFetching: 0,
    risk_submit_error: '',
    risk_submit: {}
};

export const risk = (state = riskData, action) => {
    switch(action.type){
      case 'POPUP_SET_RISK_QUESTIONS_LOADING':
        return _.assign({}, state, {
          questions_isFetching: 0
        });
      case 'POPUP_SET_RISK_QUESTIONS_SUCCESS':
        return _.merge({}, state, {
          questions_isFetching: 1,
          questions: action.questionsData
        });
      case 'POPUP_SET_RISK_QUESTIONS_ERROR':
        return _.assign({}, state, {
          questions_isFetching: action.status,
          questions_error: action.error
        });
      case 'POPUP_SET_RISK_QUESTIONS_ANSWERS':
        return _.assign({}, state, {
          questions_answers: action.answers
        });
      case 'POPUP_SET_RISK_QUESTIONS_ANSWER':
        let answers = state.questions_answers;
        answers[action.id] = action.answer;

        return _.merge({}, state, {
          questions_answers: answers
        });
      case 'POPUP_SUBMIT_RISK_QUESTIONS_LOADING':
        return _.assign({}, state, {
          risk_submit_isFetching: 0
        });
      case 'POPUP_SUBMIT_RISK_QUESTIONS_SUCCESS':
        return _.merge({}, state, {
          risk_submit_isFetching: 1,
          risk_submit: action.riskSubmitData
        });
      case 'POPUP_SUBMIT_RISK_QUESTIONS_ERROR':
        return _.assign({}, state, {
          risk_submit_isFetching: action.status,
          risk_submit_error: action.error
        });

        default: return state
    }
}
