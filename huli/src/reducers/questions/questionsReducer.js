const _ = require('lodash');
const questionListData = {
  data:{},
  isFetching:0
};

export const getQuestionList = (state = questionListData,action) =>{

  switch (action.type){

    case 'QUESTION_LIST_REQUEST':
      return _.assign({},state,{
        isFetching:action.status
      });
    case 'QUESTION_LIST_RECEIVE':
      return _.assign({},state,{
        isFetching:action.status,
        data:action.data ? action.data : {}
      });
    case 'QUESTION_LIST_ERROR':
      return _.assign({},state,{
        isFetching:action.status,
        error:action.error
      });

    default: return state
  }
};