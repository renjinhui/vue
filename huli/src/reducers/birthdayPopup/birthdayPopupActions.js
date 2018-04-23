// //  资金概览-资金相关接口
//
// const birthdayPopupRequestPost = status => ({
//   type: 'BIRTHDAY_POPUP_REQUEST',
//   status
// });
//
// const birthdayPopupReceivePost = (status, data) => ({
//   type: 'BIRTHDAY_POPUP_RECEIVE',
//   status,
//   data
// });
//
// const birthdayPopupErrorPost = (status, error) => ({
//   type: 'BIRTHDAY_POPUP_ERROR',
//   status,
//   error
// });
//
// export const birthdayPopupPosts = (fn) => (dispatch, getState) => {
//
//   let t =Math.random();
//   dispatch(birthdayPopupRequestPost(0));
//   return window.fetch('/alert/birthday?t='+t, { method: 'GET',credentials: 'include'})
//     .then(response => response.json())
//     .then((json) => {
//       dispatch(birthdayPopupReceivePost(1, json));
//       if(json.data.show == 0){
//         dispatch(birPopupState(1))
//       }
//       fn && fn(getState);
//     })
//     ['catch']((error) => {
//     dispatch(birthdayPopupErrorPost(3, error));
//     dispatch(birPopupState(1))
//   });
// };
//
// export const birPopupState = (state) => ({
//   type: 'BIRPOPUP_STATE',
//   state
// });