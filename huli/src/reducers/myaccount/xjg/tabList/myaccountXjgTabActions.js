//小金罐下面表格tab 下 LIst 的 接口
const actionsPopup = require('../../../popup/popupActions');

const myaccountXjgTableLoading = status=>({
  type:'MYACCOUNT_XJG_TABLE_LOADING',
  status
});
const myaccountXjgTableSuccess = (status, data) => ({
  type: 'MYACCOUNT_XJG_TABLE_SUCCESS',
  status,
  data
});
const myaccountXjgTableError = (status, error) => ({
  type: 'MYACCOUNT_XJG_TABLE_ERROR',
  status,
  error
});
export const myaccountXjgTablePosts = (postdata,fn) => (dispatch, getState) => {
  dispatch(myaccountXjgTableLoading(0));

  //let esc = encodeURIComponent;
  // if(postdata){
  //   params = Object.keys(postdata)
  //     .map(k => esc(k) + '=' + esc(postdata[k]))
  //     .join('&');
  // }
  //console.log(params)
  $.ajax({
    url: '/hqb/opLog', 
    type: 'post',
    data: postdata,
    dataType:'json',
    success: function(json){
      if(json.errorCode==1){
        window.location='https://passport.huli.com/?backurl='+window.location.href;
       
      }else{
        dispatch(myaccountXjgTableSuccess(1, json)); 
      }
      
      
    },
    error: function(error){
      dispatch(myaccountXjgTableError(3, error));
    }
  })
};
