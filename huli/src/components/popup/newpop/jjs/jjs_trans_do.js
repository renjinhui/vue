const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const newActionsPopup = require('../../../../reducers/popup/newpop/newpopActions');
const userBaseActions = require('../../../../reducers/userBase/userBaseActions');
const detailsActions =require('../../../../reducers/details_jjs/detailsActions');
const actionsPopup = require('../../../../reducers/popup/popupActions');
const ToolPE = require('../../../../common/tool').tansformMoney;
const ToolTip = require('../../../common/tooltip.component').ToolTip;

const jjs_trans_do = React.createClass({
  getInitialState(){
    return{
      bid: window.location.hash.match(/bid=(\w+)&proType=([a-z]+)/)[1],
      proType: window.location.hash.match(/bid=(\w+)&proType=([a-z]+)/)[2] || 'jjs',
      isAgree:true,
      canBuy:true,
      chooseXjg:true,
      showErr:false, // 选择付款方式的余额不足
      chooseType : 'hz', //选择的付款方式
      timer: '',
      money: 0,
      postNum:0
    }
  },
  componentWillMount:function(){

  },
  initM(){ //进入组件时先判断账户的钱够不够用
    let m = this.props.popdata.investBidInfo.remainInterest+this.props.popdata.investBidInfo.remainPrincipal,maxM = this.props.popdata.currentBalanceHuli;
    this.setState({
      money:m
    })
    if(m > maxM){
      this.setState({
        canBuy:false,
        showErr:true
      })
    }
  },
  componentDidMount:function(){
    this.initM()
  },
  chooseHZ(n){console.log(n)
    this.setState({
      chooseType : 'hz'
    })
    this.huiz.className = /paying-select/.test(this.huiz.className) ? this.huiz.className : this.huiz.className + ' paying-select';
    this.xjg.className = this.xjg.className.replace(/ paying-select/,'')
    if(!n){
      this.setState({
        canBuy:false,
        showErr : true
      })
    }else{
      this.setState({
        canBuy:true,
        showErr : false
      })
    }
  },
  chooseXjg(n){
    if(n){
      this.setState({
        chooseType : 'xjg',
        canBuy:true,
        showErr : false
      })
      this.xjg.className = this.xjg.className + ' paying-select'
      this.huiz.className = this.huiz.className.replace(/ paying-select/,'')
    }
  },
  closePop(){
    this.props.dispatch(newActionsPopup.newpopSetStatus({
      isShow: false
    }));
  },
  sureBuy(){
    if(!this.state.isAgree||!this.state.canBuy)return;
    this.setState({
      canBuy: false
    });
    let params = {
      bidId:this.state.bid,
      productType:this.state.proType,
      bidAmount:this.props.popdata.investBidInfo.remainPrincipal,
      isUseCoupon:0,
      isFullAmountBuy:false,
    };
    //投标账户
    if(this.state.chooseType=='hz'){
      params.investAccountType = 2;
    }else{
      params.investAccountType = 3;
    }
    this.props.dispatch(detailsActions.sureBuyTrans(params,(data)=>{
      this.goWhichPop(data)
    }));
  },
  agreeMent(){
    if(this.state.isAgree){
      this.setState({
        isAgree: false
      })
    }else{
      this.setState({
        isAgree: true
      })
    }
  },
  goWhichPop(data){
    if(data.errorCode == 0){
      this.props.dispatch(detailsActions.getOperaData())
      this.props.dispatch(newActionsPopup.newpopSetStatus({
          isShow: true,
          type: 'jjs',
          innerType: 'jjs_suc',
          errorType: 0
      }));
      // let _this = this;
      // var timer = window.setTimeout(function(){
      //   window.clearTimeout(timer);
      //   _this.props.dispatch(detailsActions.getLcDetailData({bid:_this.state.bid,proType:_this.state.proType}))//刷新该标数据
      //   _this.props.dispatch(detailsActions.investPersonList({bid:_this.state.bid,proType:_this.state.proType}));//获取投资人列表
      //   _this.props.dispatch(userBaseActions.getUserBaseAccount())//刷新用户数据    
      // },1000);
      return;
    }
    this.props.dispatch(newActionsPopup.newpopSetStatus({
        isShow: true,
        type: 'jjs',
        innerType: 'jjs_error',
        errorType: data.errorCode
    }));
  },
  render() {
    let popdata = this.props.popdata;
    let month_day = '';
    if(popdata.investBidInfo){
      if(popdata.investBidInfo.month && popdata.investBidInfo.day){
        month_day = <div className="detail-popup-digital">
                      <span>{popdata.investBidInfo.month}</span><em>月</em>
                      <em>{popdata.investBidInfo.day}</em><em>天</em>
                    </div>;
      }else if(popdata.investBidInfo.month && !popdata.investBidInfo.day){
        month_day = <div className="detail-popup-digital">
                      <span>{popdata.investBidInfo.month}</span><em>月</em>
                    </div>;
      }else if(popdata.investBidInfo.day){
        month_day = <div className="detail-popup-digital">
                      <span>{popdata.investBidInfo.day}</span><em>天</em>
                    </div>;
      }else{
        month_day = <div className="detail-popup-digital">
                      <span>{popdata.investBidInfo.periods}</span>
                    </div>;
      }
    }
    return (
    <div>
        <div className="huli-popup-content">
            <div className="detail-popup-rows cf">
                <div className="detail-popup-left lt">
                    <div className="detail-popup-digital">
                        <span>{popdata.investBidInfo ? ToolPE(popdata.investBidInfo.investAnnualRate) : '0.00'}</span><em>%</em>
                    </div>
                    <p className="detail-popup-nameof">约定年化利率</p>
                </div>
                <div className="gray-lines lt"></div>
                <div className="detail-popup-center lt">
                    {month_day}
                    <p className="detail-popup-nameof">剩余期限</p>
                </div>
                <div className="gray-lines lt"></div>
                <div className="detail-popup-right lt">
                    <p className="detail-popup-times">{popdata.investBidInfo ? popdata.investBidInfo.repayModeStr : ''}</p>
                    <p className="detail-popup-nameof">还款方式</p>
                </div>
            </div>

            <div className="popup-details-list">
                <div className="detail-list-items cf">
                    <p className="detail-variable-names lt">转让项目本金</p>
                    <p className="transfer-actualPrice lt"><span>{popdata.investBidInfo ? ToolPE(popdata.investBidInfo.remainPrincipal) : '0.00'}</span><span>元</span></p>
                    <div className="expect-earnings lt">
                      <span className='lt'>预计收益</span>
                      <ToolTip data-text="local_tooltip.acc_asset_expectedRevenue"></ToolTip>
                      <em>{(this.props.popselfdata.willIncome-this.state.money)>=0 ? ToolPE(this.props.popselfdata.willIncome-this.state.money) : "0.00"}元</em>
                    </div>
                </div>
                <div className="transfer-list-boxs">
                    <div className="transfer-list-items cf">
                        <p className="list1">转让利率</p>
                        <ToolTip data-text="local_tooltip.inv_layer_interest_jjs" />
                        <p className="list2">{popdata.investBidInfo ? ToolPE(popdata.investBidInfo.investAnnualRate) : '0.00'}%</p>
                        <p className="list3">转让结息</p>
                        <ToolTip data-text="local_tooltip.transfer_interest" />
                        <p className="list4">{popdata.investBidInfo ? ToolPE(popdata.investBidInfo.remainInterest) : '0.00'}元</p>
                    </div>
                </div>
                <div className="detail-list-items cf">
                    <p className="detail-variable-names lt">预计支付金额</p>
                    <p className="detail-actualPrice lt"><span>{popdata.investBidInfo ? ToolPE(this.state.money) : '0.00'}</span><span>元</span></p>
                </div>
            </div>

            <div className="paying-way cf">

                <div className="paying-way-list lt paying-select" ref={(dom)=>{this.huiz = dom}} onClick={()=>{this.chooseHZ((this.state.money) <= popdata.currentBalanceHuli)}}>{/* 选中状态是paying-select,余额不足加limit,余额为0元时加zero*/}
                  <div className="paying-way-boxs"> 

                      <em className="select-icon"></em>
                      <div className="paying-list">
                          <div className="surplus-nums cf">
                              <p className="lt">慧赚可用余额支付(元)</p>
                              <p className="rt num-money">{popdata.currentBalanceHuli ? ToolPE(popdata.currentBalanceHuli) : '0.00'}</p>
                          </div>
                      </div>
                  </div>
                  <div className="detail-popup-lack" style={{display:this.state.showErr ? "block" : 'none'}}>
                      <span>余额不足，还需{popdata.currentBalanceHuli!=undefined ? ToolPE(this.state.money-popdata.currentBalanceHuli) : ''}元，</span>
                      <a href={"https://www.huli.com/hl/#/myaccount/recharge/main?cash="+(this.state.money-popdata.currentBalanceHuli)} target="_blank">请充值</a>
                  </div>
                </div>
                <div className={"paying-way-list lt mar-l10 " + (popdata.investBidInfo && (this.state.money) > popdata.currentBalanceRry ? 'zero' : '')} ref={(dom)=>{this.xjg = dom}} onClick={()=>{this.chooseXjg((this.state.money) <= popdata.currentBalanceRry)}}>
                  <div className="paying-way-boxs ">
                      <em className="select-icon no-select"></em>
                      <div className="paying-list">
                          <div className="surplus-nums cf">
                              <p className="lt">日日盈支付(元)</p>
                              <p className="rt num-money">{popdata.currentBalanceRry ? ToolPE(popdata.currentBalanceRry) : '0.00'}</p>
                          </div>
                      </div>
                  </div>
                  <div className="detail-popup-lack">
                      <span>日日盈余额不足</span>
                  </div>
                </div>
            </div>

            <div className="detail-content-bottom">
                <div className="popup-checkbox cf">
                   <em className={this.state.isAgree ? "huli-common-icons checked lt" : 'huli-common-icons checked no-checked lt'} onClick={()=>{this.agreeMent()}}></em>
                   <span className="huli-agrees lt">我已阅读并同意{/*<a href="javascript:" target="_blank">《债权转让协议》、</a>*/}<a href={popdata.investBidInfo.agreementUrl} target="_blank">《{popdata.investBidInfo.agreementName}》</a></span>
                </div>
                {
                    popdata && popdata.investBidInfo && !popdata.investBidInfo.isSpecialAsset ?
                    <div className="popup-checkbox cf">
                       <span className="huli-agrees lt">产品合同包含：会员开户、风险提示、认购承诺、风险测评、认购协议</span>
                    </div>
                    :null
                }
            </div>
        </div>

        <div className="huli-popup-footer">
            <div className="huli-popup-action">
                <span>
                    <input type="button" className="gray-btn common-btn-130" value="取消" onClick={this.closePop}/>
                </span>
                <span>
                   <input type="button" className={(this.state.canBuy&&this.state.isAgree) ? "blue-btn common-btn-130" : 'blue-btn common-btn-130 false-btn'} value="确认认购" onClick={this.sureBuy}/>
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

export const jjsTransDo = connect(
  mapStateToProps,mapDispatchToProps
)(jjs_trans_do);
