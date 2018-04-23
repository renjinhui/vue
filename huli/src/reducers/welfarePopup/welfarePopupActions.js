// //  资金概览-资金相关接口
//
// export const welfarePopupRequestPost = status => ({
//   type: 'WELFARE_POPUP_REQUEST',
//   status
// });
//
// export const welfarePopupReceivePost = (status, data) => ({
//   type: 'WELFARE_POPUP_RECEIVE',
//   status,
//   data
// });
//
// export const welfarePopupErrorPost = (status, error) => ({
//   type: 'WELFARE_POPUP_ERROR',
//   status,
//   error
// });
//
// export const welfarePopupPosts = (fn) => (dispatch, getState) => {
//
//   let t =Math.random();
//   dispatch(welfarePopupRequestPost(0));
//   return window.fetch('/alert/coupon?t='+t, { method: 'GET',credentials: 'include'})
//     .then(response => response.json())
//     .then((json) => {
//       dispatch(welfarePopupReceivePost(1, json));
//       fn && fn(getState);
//     })
//     ['catch']((error) => {
//     dispatch(welfarePopupErrorPost(3, error));
//   });
// };
