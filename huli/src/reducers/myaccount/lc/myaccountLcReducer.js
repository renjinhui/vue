const _ = require('lodash');
const lcData = {
  sysTime:'',
  tabNormalList: {
    data: {},
    isFetching: 0
  },
  tabOpenList: {
    data: {},
    isFetching: 0
  },
  tabOverList: {
    data: {},
    isFetching: 0
  },
  tabDrainList: {
    data: {},
    isFetching: 0
  },
  // 基础信息
  basicData:{
    data:{},
    isFetching:0
  },
  //弹框 转让
  transData:{
    data:{},
    isFetching:0
  }
}

export const lcDataList = (state = lcData,action) =>{
  switch (action.type){

    case 'SET_SERVER_TIME':
      return _.assign({},state,{
        sysTime:action.sysTime || (new Date()).getTime()
      });
//网贷下半部分的请求 NORMAL
    case 'MYACCOUNT_LC_NORMAL_LOADING':
      return _.assign({},state,{
        tabNormalList:{
          isFetching:action.status 
        }
      });
    case 'MYACCOUNT_LC_NORMAL_SUCCESS':
      return _.assign({},state,{
        tabNormalList:{
          isFetching:action.status,
          data: action.data ? action.data : {}
        }
      });
    case 'MYACCOUNT_LC_NORMAL_ERROR':
      return _.assign({},state,{
        tabNormalList:{
          isFetching:action.status,
          error:action.error
        }
      });  
      //open
    case 'MYACCOUNT_LC_OPEN_LOADING':
      return _.assign({},state,{
        tabOpenList:{
          isFetching:action.status 
        }
      });
    case 'MYACCOUNT_LC_OPEN_SUCCESS':
      return _.assign({},state,{
        tabOpenList:{
          isFetching:action.status,
          data: action.data ? action.data : {}
        }
      });
    case 'MYACCOUNT_LC_OPEN_ERROR':
      return _.assign({},state,{
        tabOpenList:{
          isFetching:action.status,
          error:action.error
        }
      }); 
      //over
    case 'MYACCOUNT_LC_OVER_LOADING':
      return _.assign({},state,{
        tabOverList:{
          isFetching:action.status 
        }
      });
    case 'MYACCOUNT_LC_OVER_SUCCESS':
      return _.assign({},state,{
        tabOverList:{
          isFetching:action.status,
          data: action.data ? action.data : {}
        }
      });
    case 'MYACCOUNT_LC_OVER_ERROR':
      return _.assign({},state,{
        tabOverList:{
          isFetching:action.status,
          error:action.error
        }
      }); 
      //drain
    case 'MYACCOUNT_LC_DRAIN_LOADING':
      return _.assign({},state,{
        tabDrainList:{
          isFetching:action.status 
        }
      });
    case 'MYACCOUNT_LC_DRAIN_SUCCESS':
      return _.assign({},state,{
        tabDrainList:{
          isFetching:action.status,
          data: action.data ? action.data : {}
        }
      });
    case 'MYACCOUNT_LC_DRAIN_ERROR':
      return _.assign({},state,{
        tabDrainList:{
          isFetching:action.status,
          error:action.error
        }
      });                   

      // 基本信息
    case 'MYACCOUNT_LC_BS_REQUEST':
      return _.assign({},state,{
        basicData:{
          isFetching:action.status 
        }
      });
    case 'MYACCOUNT_LC_BS_RECEIVE':
      return _.assign({},state,{
        basicData:{
          isFetching:action.status,
          data: action.data ? action.data : {}
        }
      });
    case 'MYACCOUNT_LC_BS_ERROR':
      return _.assign({},state,{
        basicData:{
          isFetching:action.status,
          error:action.error
        }
      });  

      //网贷弹框 转让
    case 'MYACCOUNT_LC_TRANS_LOADING':
      return _.assign({},state,{
        transData:{
          isFetching:action.status 
        }
      });
    case 'MYACCOUNT_LC_TRANS_SUCCESS':
      return _.assign({},state,{
        transData:{
          isFetching:action.status,
          data: action.data ? action.data : {}
        }
      });
    case 'MYACCOUNT_LC_TRANS_ERROR':
      return _.assign({},state,{
        transData:{
          isFetching:action.status,
          error:action.error
        }
      });  
    default: return state
  }
};
