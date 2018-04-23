// const _ = require('lodash');
// const welfarePopupData = {
//   data:{},
//   isFetching:0
// };
//
// export const getWelfarePopup = (state = welfarePopupData,action) =>{
//
//   switch (action.type){
//
//     case 'WELFARE_POPUP_REQUEST':
//       return _.assign({},state,{
//         isFetching:action.status
//       });
//     case 'WELFARE_POPUP_RECEIVE':
//       return _.assign({},state,{
//         isFetching:action.status,
//         data:action.data ? action.data : {}
//       });
//     case 'WELFARE_POPUP_ERROR':
//       return _.assign({},state,{
//         isFetching:action.status,
//         error:action.error
//       });
//
//     default: return state
//   }
// };