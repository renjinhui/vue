export const AccountInfo = data => ({
    type: 'TK_Account_Info',
    data
});

export const TKBankList = data => ({
  type: 'TK_BANK_LIST',
  data
});

export const getTKBankList = (url) => (dispatch) => {
  return $.ajax({
    url: url,
    type: "POST",
    data:{ t : Math.random() },
    dataType: 'json',
    success(data) {
      dispatch(TKBankList(data.data));
    }
  })
};

/*
    获取所有接口信息
    @params url  string   接口地址
    @params data json     请求参数 没有默认加t
    @params type string   请求类型 默认 POST
    @return function      dispatch触发action走redux
*/
export const getAccountInfo = (url, data, type='POST') => {
    data = !data && { t : Math.random() };
    return (dispatch) => {
        return $.ajax({
            url,
            type,
            data,
            dataType: 'json',
            success(json){
                console.log(json);
                if(json.errorCode==1 && /no[Ll]ogin/.test(json.errorMessage)){
                    window.location='https://passport.huli.com/?backurl='+window.location.href;
                }else{
                    let data = {
                        status : 'success',
                        data : json.data || {}
                    };
                    dispatch(AccountInfo(data));
                }
            },
            error(error){
                throw new Error(error);
                dispatch(AccountInfo({
                    status : 'error',
                    data : {}
                }))
            }
        })
    }
};