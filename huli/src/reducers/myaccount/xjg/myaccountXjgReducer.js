const _ = require('lodash');
const xjgData = {
  // 基础信息
  basicData:{
    data:{},
    isFetching:0
  },
  //撤销赎回
  cancelData:{
    errorCode: 1,
    errorMessage: '',
    data: '',
    isFetching:0
  },
  //弹出 列表数据
  listData:{
    data:{},
    isFetching:0
  },
  isSuc:{
    errorCode: 1,
    errorMessage: '',
    data: '',
    isFetching:0
  },
  nextData:{
    data: {},
    isFetching:0
  },
  sureOutData:{
    subType:'XJG',
    password:'',
    turnOutM:0,
    trunOutG:0,
    applyMap:[]
  },
  popup:{
    revoke:{
      transId:'',
      transMoney:'',
      transTitle:''
    },
    revokePassW:{
      passW:''
    }
  }
};

export const xjgDataList = (state = xjgData,action) =>{
  switch (action.type){
//基本信息
    case 'MYACCOUNT_XJG_BS_REQUEST':
      return _.assign({},state,{
        basicData:{
          isFetching: action.status
        }
      });
    case 'MYACCOUNT_XJG_BS_RECEIVE':
 //console.log(111111111111)   
      return _.assign({},state,{
        basicData:{
          isFetching: action.status,
          data: action.data ? action.data : {}
        }
      });
    case 'MYACCOUNT_XJG_BS_ERROR':
      return _.assign({},state,{
        basicData:{
          isFetching:action.status,
          error:action.error
        }
        
      });
//撤销信息
    case 'MYACCOUNT_XJG_CANCEL_REQUEST':
      return _.assign({},state,{
        cancelData:{
          isFetching:action.status
        } 
      });
    case 'MYACCOUNT_XJG_CANCEL_RECEIVE'://console.log(action)
    // console.log(1111111111113333333) 
      return _.assign({},state,{
        cancelData:{
          isFetching:action.status,
          errorCode: action.data.errorCode,
          errorMessage:action.data.errorMessage || '',
          data: action.data.data,
        } 
      });
    case 'MYACCOUNT_XJG_CANCEL_ERROR':
      return _.assign({},state,{
        cancelData:{
          isFetching:action.status,
          error:action.error
        } 
        
      });  
//弹出框的列表数据    
    case 'MYACCOUNT_XJG_Turnout_REQUEST':
      return _.assign({},state,{
        listData:{
          isFetching:action.status
        } 
      });
    case 'MYACCOUNT_XJG_Turnout_RECEIVE':

      return _.assign({},state,{
        listData:{
          isFetching:action.status,
          data: action.data ? action.data : {}
        } 
      });
    case 'MYACCOUNT_XJG_Turnout_ERROR':
      return _.assign({},state,{
        listData:{
          isFetching:action.status,
          error:action.error
        } 
      });
//输入密码后的请求   
    case 'MYACCOUNT_XJG_SureOut_REQUEST':
      return _.assign({},state,{
        isSuc:{
          isFetching:action.status
        } 
      });
    case 'MYACCOUNT_XJG_SureOut_RECEIVE':

      return _.assign({},state,{
        isSuc:{
          isFetching:action.status,
          data: action.data,
          errorCode: action.errorCode,
          errorMessage: action.errorMessage || ''
        } 
      });
    case 'MYACCOUNT_XJG_SureOut_ERROR':
      return _.assign({},state,{
        isSuc:{
          isFetching:action.status,
          error:action.error
        } 
      });  
//转出的数据存贮
    case 'MYACCOUNT_XJG_SureOut_DATA':  
    //console.log(action)
      return _.assign({},state,{
        sureOutData:{
          subType:action.options.subType || "XJG",
          password:action.options.password,
          applyMap:action.options.applyMap,
          turnOutM:action.options.turnOutM,
          turnOutG:action.options.turnOutG
        } 
      });  


//撤销申购赎回弹窗
    case 'XJG_DETAIL_POPUP_REVOKE':
      return _.merge({}, state, {
        popup: {
          revoke: {
            transId: action.options.transId?action.options.transId:'',
            transMoney: action.options.transMoney?action.options.transMoney:'',
            transTitle:action.options.transTitle?action.options.transTitle:''
          }
        }
    });
      
    case 'XJG_DETAIL_POPUP_REVOKE_PASSW':
      return _.merge({}, state, {
        popup: {
          revokePassW: {
            passW:action.options.passW?action.options.passW:''
          }
        }
    });  

//转出第二个弹框的内容   
    case 'MYACCOUNT_XJG_NEXT_REQUEST':
      return _.assign({},state,{
        nextData:{
          isFetching:action.status
        } 
      });
    case 'MYACCOUNT_XJG_NEXT_RECEIVE':

      return _.assign({},state,{
        nextData:{
          isFetching:action.status,
          data: action.data
        } 
      });
    case 'MYACCOUNT_XJG_NEXT_ERROR':
      return _.assign({},state,{
        nextData:{
          isFetching:action.status,
          error:action.error
        } 
      });  


    default: return state
  }
};
