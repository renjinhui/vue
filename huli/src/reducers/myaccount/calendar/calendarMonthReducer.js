const _ = require('lodash');
const calendarMonthData = {
  data:{},
  isFetching:0
};

export const getcalendarMonth = (state = calendarMonthData,action) =>{

  switch (action.type){

    case 'CALENDAR_MONTH_REQUEST':
      return _.assign({},state,{
        isFetching:action.status
      });
    case 'CALENDAR_MONTH_RECEIVE':
      return _.assign({},state,{
        isFetching:action.status,
        data:action.data ? action.data : {}
      });
    case 'CALENDAR_MONTH_ERROR':
      return _.assign({},state,{
        isFetching:action.status,
        error:action.error
      });

    default: return state
  }
};