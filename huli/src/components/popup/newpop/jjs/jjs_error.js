const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const actionsPopup = require('../../../../reducers/popup/newpop/newpopActions');
const ToolPE = require('../../../../common/tool').tansformMoney;
const replace = require('../../../../common/tool').replace;

/**
 * 新errorCode的值
 * -1 投标金额不合法
 * -2 暂无该标信息
 * -4 不允许投资自己的标
 * -6 不能投手机专享标
 * -7 该标暂未开放
 * -8 180227之前是 标状态不对  之后是 codes.local_tooltip.inv_layer_fail_full
 * -9 投资金额不合法
 * -11 风险等级不满足
 * -12 用户未评估
 * 35 投标金额有误，请重新输入
 * 51 不能购买自己的项目
 * 38 不符合新手专享
 * 15 本项目的起投金额为***
 * 31 项目已投满
 * 34 项目已投满
 * 36 项目已投满
 * 52 项目已投满
 * 32 项目剩余金额不足
 * 33 项目剩余金额不足
 * 37 本周只能投资两次秒杀项目
 * 99 系统繁忙
 * 39 您指定的红包已被使用或不存在，请重新投标
 * 40 您指定的红包类型不匹配，请重新投标
 */


/**旧errorCode的值
 * 35 投标金额有误，请重新输入
 * -3 系统繁忙
 * -4 系统繁忙
 * -5 不能购买自己的项目
 * -10 即将开始
 * -7 投资金额不能低于项目要求的最小投资金额
 * -8 未完成风险评估测试，暂不能认购
 * -9 本项目适合风险承受能力为{"稳定行"}的用户认购。请重新评估
 * 51 不能购买自己的项目
 * 38 不符合新手专享
 * 15 本项目的起投金额为***
 * 31 项目已投满
 * 34 项目已投满
 * 36 项目已投满
 * 52 项目已投满
 * 32 项目剩余金额不足
 * 33 项目剩余金额不足
 * 37 本周只能投资两次秒杀项目
 * 99 系统繁忙
 * 39 您指定的红包已被使用或不存在，请重新投标
 * 40 您指定的红包类型不匹配，请重新投标
 */

const jjs_error = React.createClass({
  componentWillMount:function(){

  },
  closePop(){
    
    this.props.dispatch(actionsPopup.newpopSetStatus({
      isShow: false
    }));
  },
  render() {
    let errorMessage = '';
      switch (this.props.popselfdata.errorType+'') {
        case "35":
          errorMessage = "投标金额有误，请重新输入";
          break;
        case "-1":
          errorMessage = "投标金额有误，请重新输入";
          break;
        case "-2":
          errorMessage = "暂无该标信息";
          break;
        case "-4":
          errorMessage = "不允许投资自己的标";
          break;
        case "-6":
          errorMessage = "不能投手机专享标";
          break;
        case "-7":
          errorMessage = "该标暂未开放";
          break;
        case "-8":
          errorMessage = codes.local_tooltip.inv_layer_fail_full;
          break;
        case "-9":
          errorMessage = "输入金额不合法";
          break;
        case "-10":
          errorMessage = codes.local_tooltip.inv_layer_fail_avail;;
          break;
        case "-11":
          errorMessage = `<p>本项目适合风险承受能力为${this.props.bigData.levelForType[this.props.bigData.asset.riskLevel]}的用户认购。请重新评估。</p>`; 
          break;
        case "-12":
          errorMessage = '<p>您未完成风险评估测试，暂不能认购。<br/>请去安全中心完成评估。</p>';
          break;
        case "51": //不能购买自己的项目
          errorMessage = codes.local_tooltip.inv_layer_fail_self;
          break;
        case "38": //不符合新手专享
          errorMessage = `<div>
            <span className="version-popup-prompt-name"><strong>${codes.local_tooltip.inv_layer_fail_case_new}</strong></span>
            <div className="version-poput-small"><span>${codes.local_tooltip.inv_layer_fail_case_why_new}</span></div>
          </div>`;
          break;
        case "12": //本项目的起投金额为***
          msg = "账户不存在"; //{{#replace(codes.local_tooltip.inv_layer_fail_charge,/\{0\}/g,fmtMoney(mycalculate.bidMinLimit,0))}};
          break;
        case "15": //本项目的起投金额为***
          msg = replace(codes.local_tooltip.inv_layer_fail_charge,/\{0\}/g,ToolPE(this.props.biddingLimitMin,0)); //{{#replace(codes.local_tooltip.inv_layer_fail_charge,/\{0\}/g,fmtMoney(mycalculate.bidMinLimit,0))}};
          break;
        case "16": //本项目的起投金额为***
          msg = "通联账户不存在"; //{{#replace(codes.local_tooltip.inv_layer_fail_charge,/\{0\}/g,fmtMoney(mycalculate.bidMinLimit,0))}};
          break;
        case "31": //项目已投满
          errorMessage = codes.local_tooltip.inv_layer_fail_full;
          break;
        case "34"://项目已投满
          errorMessage = codes.local_tooltip.inv_layer_fail_full;
          break;
        case "36"://项目已投满
          errorMessage = codes.local_tooltip.inv_layer_fail_full;
          break;
        case "52"://项目已投满
          errorMessage = codes.local_tooltip.inv_layer_fail_full;
          break;
        case "32": //项目剩余金额不足
          errorMessage = codes.local_tooltip.inv_layer_fail_avail;
          break;
        case "33"://项目剩余金额不足
          errorMessage = codes.local_tooltip.inv_layer_fail_avail;
          break;
        case "37": //本周只能投资两次秒杀项目
          errorMessage = `<div>
            <span className="version-popup-prompt-name"><strong>${codes.local_tooltip.inv_layer_fail_case_sec}</strong></span>
            <div className="version-poput-small"><span>${codes.local_tooltip.inv_layer_fail_case_why_sec}</span></div>
          </div>`;
          break;
        case '302':
          errorMessage = `<p class="hq-prompt-suc login-hq">
            <a href="https://passport.huli.com/?backurl=https://www.huli.com/hl/#/details/project?bid=34710653383833&amp;proType=jjs&amp;_k=xnqo72" target="_blank">登录</a>
            <span>&nbsp;后操作，新朋友请先</span>
            <span>&nbsp;</span>
            <a href="https://passport.huli.com/regist.html" target="_blank">注册</a>
          </p>`;
          break;
        case "99":
          errorMessage = "系统繁忙";
          break;
        case "39":
          errorMessage = "您所选择的福利不能使用，可能已被使用或禁止使用，请重新选择并投标";
          break;
        case "40":
          errorMessage = "您指定的福利类型不匹配，请重新投标";
          break;
        case "101":
          errorMessage = "请先完成开户，再投标!";
          break;
        default:
          errorMessage = "系统繁忙"
      }
    return (
    <div>
        <div className="huli-popup-content">
            <div className="hq-popup-success">
                <div className="hq-ico-success hq-lose"></div>
              {
                this.props.popselfdata.errorType == '302'?
                <div class="hq-login-head"></div>
                :null
              }  
                
                <div className="hq-popup-prompt">
                    <p className="hq-prompt-suc" dangerouslySetInnerHTML={ {__html: errorMessage}}></p>
                </div>
            </div>
            
        </div>

        <div className="huli-popup-footer">
            <div className="huli-popup-action">
                <span>
                   <input type="button" className="blue-btn common-btn-130" value="确认" onClick={this.closePop}/>
                </span>
            </div>
            <span className="huli-popup-risk">投资有风险，理财需谨慎</span>
        </div>
    </div>
    )
  }
});
const mapStateToProps = (state, ownProps) => {
  return{
    state
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const jjsError = connect(
  mapStateToProps,mapDispatchToProps
)(jjs_error);
