const _ = require('lodash');
const newpopData = {
  top: 40,
  isShow: false,
  type: '',
  innerType:'',
  howmuch:0,
  preOpen:false,
  willIncome:0,
  sumIncome:0,//pop预期收益
  sumRaiseIncome:0,//pop预期加息收益
  errorType:-3,
  submitText:'',
  leftTime:0,
  sucGet:{ //购买成功后接口返回的信息
    useXjgAmount:0,   //使用小金罐金额
    useHuliAmount:0,  //使用狐狸账户金额 
    couponAmount:0,   //使用红包金额
    raiseInterest:0,  //使用加息券面额
    realAmount:0,     //真实投资金额
    interestTime:'',  //直投标起息日
    score:0,          //用户投资所得积分
    investAccountType:2, //使用账户类型 2-慧赚 3-小金罐
  }
};

export const newpop = (state = newpopData, action) =>{
  let WH = $(window).height();
  let PH = 500;

  switch (action.type){
    case 'NEWPOP_SET_STATUS':
      let top = (document.body.scrollTop || document.documentElement.scrollTop) + (WH - PH)/2;
      return _.assign({},state,{
        top: top,
        isShow: action.options.isShow,
        type: action.options.type,
        innerType: action.options.innerType,
        preOpen:action.options.preOpen || false,
        errorType: action.options.errorType || -3,
      });
      break;
    case "NEWPOP_SET_MONEY":
      return _.assign({},state,{
        howmuch:action.options.howmuch
      })
      break;
    case "SUBMIT_BTN_TEXT":
      return _.assign({},state,{
        submitText:action.options.submitText,
        leftTime: action.options.leftTime || 0
      })
      break;
    case "NEWPOP_SET_WILLINCOME":
      return _.assign({},state,{
        willIncome:action.options
      })
      break;
    case "NEWPOP_SET_WILLJXINCOME":
      return _.assign({},state,{
        sumIncome:action.options.sumIncome,
        sumRaiseIncome:action.options.sumRaiseIncome
      })
      break;
    case "NEWPOP_SET_SUCGET":
      return _.assign({},state,{
        sucGet:{
          realAmount:action.options.realAmount,
          couponAmount:action.options.couponAmount||0,
          raiseInterest:action.options.raiseInterest||0,
          interestTime:action.options.interestTime || state.sucGet.interestTime,
          score:action.options.score||0,
          investAccountType:action.options.investAccountType
        }
      })
      break;
    default: return state
  }
};