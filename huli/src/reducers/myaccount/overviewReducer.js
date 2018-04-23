const _ = require('lodash');
const initialState = require('./overviewInitialState')['default'];

export default (state = initialState, action) => {
  switch(action.type){
    case "CHANGE_TAB":
      return _.assign({}, state, {
        index: action.index
      })
    default: return state
  }
};
