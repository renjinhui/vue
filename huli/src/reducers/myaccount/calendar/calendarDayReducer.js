const _ = require('lodash');
const calendarDayData = {
  data:[],
  isFetching:0
};

export const getcalendarDay = (state = calendarDayData,action) =>{

  switch (action.type){

    case 'CALENDAR_DAY_REQUEST':
      return _.assign({},state,{
        isFetching:action.status
      });
    case 'CALENDAR_DAY_RECEIVE':
      return _.assign({},state,{
        isFetching:action.status,
        data:action.data ? action.data : {}
      });
    case 'CALENDAR_DAY_ERROR':
      return _.assign({},state,{
        isFetching:action.status,
        error:action.error
      });

    default: return state
  }
};