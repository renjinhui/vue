// const _ = require('lodash');
// const birthdayPopupData = {
//   data:{},
//   isFetching:0,
//   birState:0,
// };
//
// export const getBirthdayPopup = (state = birthdayPopupData,action) =>{
//
//   switch (action.type){
//
//     case 'BIRTHDAY_POPUP_REQUEST':
//       return _.assign({},state,{
//         isFetching:action.status
//       });
//     case 'BIRTHDAY_POPUP_RECEIVE':
//       return _.assign({},state,{
//         isFetching:action.status,
//         data:action.data ? action.data : {}
//       });
//     case 'BIRTHDAY_POPUP_ERROR':
//       return _.assign({},state,{
//         isFetching:action.status,
//         error:action.error
//       });
//     case 'BIRPOPUP_STATE':
//       return _.assign({},state,{
//           birState:action.state
//       });
//     default: return state
//   }
// };