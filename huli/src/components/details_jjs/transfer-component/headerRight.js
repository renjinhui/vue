const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const DocumentTitle = require('react-document-title');

const cookie = require('../../../common/util').cookie;
const ToolPE = require('../../../common/tool').tansformMoney;
const ToolTip = require('../../common/tooltip.component').ToolTip;

const Popup = require('../../popup/index.popup').Popup;
const RiskQuestion = require('../../popup/risk/risk-questions.component').RiskQuestion;
const RiskTestTip = require('../../popup/risk/risk-test.component').RiskTestTip;
const PopupTip  = require('../../popup/popup-tip.component').PopupTip;
const RiskLevelLowerTip = require('../../popup/risk/risk-level-lower-tip.component').RiskLevelLowerTip;
const RiskResult = require('../../popup/risk/risk-result.component').RiskResult;

const newActionsPopup = require('../../../reducers/popup/newpop/newpopActions');
const detailsActions =require('../../../reducers/details_jjs/detailsActions');
const actionsPopup = require('../../../reducers/popup/popupActions');
const baseDataActions = require('../../../reducers/userBase/userBaseActions')
const Risk = require('../../../reducers/risk/riskActions');
export const headerRight = React.createClass({
  getInitialState(){
    return{
      risk_step: "",
      showShMPop:false, //展示实名弹框
      showBKPop:false,//展示绑卡弹框
      isAgree:true
    }
  },
  sureBtn(){
    
    let syd_name = cookie.get('syd_name');
    //是否选上我已同意条款
    if(!this.state.isAgree)return;

    //已经默认退出的情况要调到登录弹框
    if(!syd_name && this.props.state.userLogin.isLogin){ 
      this.props.dispatch(actionsPopup.popupSetStatus({
        isShow: true,
        type: 'login',
        title: '快速登录',
        hasCancel: false,
        submitText: '关闭'
      }));
      return;
    }
    if(!syd_name && !this.props.state.userLogin.isLogin){
      window.location.href = "https://passport.huli.com/?backurl=" + window.location.href;
    }

    //是否开通托管 是否实名认证在这判断------
    this.props.dispatch(baseDataActions.accountNeedId5Certification((isneed)=>{
      if(isneed){ //未实名认证
        this.setState({
          showShMPop:true
        })
      }else{
        this.props.dispatch(baseDataActions.accountNeedBindCardToHl((isneed)=>{
          if(isneed){ //已实名未绑卡
            this.setState({
              showBKPop:true
            })
          }else{
            this.nomalBuyBtn();
          }
        }))
      }
    }))
  },
  nomalBuyBtn(){
    //判断是否是自己的转让标
    let bidData = this.props.datas;
      if(bidData.baseUser && bidData.baseUser.uid == bidData.assetTransfer.uid){
        this.props.dispatch(newActionsPopup.newpopSetStatus({
          isShow: true,
          type: 'jjs',
          innerType: 'jjs_error',
          errorType: '-5'
      }));
      return;
    }
    // 判断风险等级
    let needLevel = this.props.state.lcDetailsData.data.data.asset.riskLevel,
        userLevel = this.props.state.UserLevelData.data.riskSource,
        userStatus = this.props.state.UserLevelData.data.riskStatus,
        money = this.props.state.newPop.howmuch,
        isTranfer = this.props.state.lcDetailsData.data.data.jjsIsTransfer;
    let isHigher = userLevel && userLevel >= needLevel;
    let riskInfo = {};
    if(userStatus == 0){
      riskInfo.type = 'risk-first'
    }else if(userStatus == 2){
      riskInfo.type = 'risk-again'
    }else if(userStatus == 1 && !isHigher){
      riskInfo.type = 'risk-lower'
    }else{
      //正常购买
      this.props.dispatch(newActionsPopup.newpopSetStatus({
        isShow: true,
        type: 'jjs',
        innerType: 'jjs_trans_do',
        preOpen:false,
        howmuch: money
      }));
    }
    let lev =  this.props.state.lcDetailsData.data.data.asset.riskLevel || 1;
    let ary = this.props.state.lcDetailsData.data.data.levelForType.split(',');
    // levelPop(userStatus,isHigher,money,dispatch,isTranfer)
    switch(riskInfo.type){
      case 'risk-again':
          this.setState({
              risk_step: 'risk-tip',
              firstText: "您上次的风险评估结果已过期，需要重新评估。",
              secondText: "本产品适合风险承受能力为“" + ary[lev-1] + "”及以上的用户转入。",
              submitText: '重新评估',
              cancelText: '暂不认购'
          })
          break;
      case 'risk-first':
          this.setState({
              risk_step: 'risk-tip',
              firstText: "本产品适合风险承受能力为“" + ary[lev-1] + "”及以上的用户转入。",
              secondText: "投资前，请您先完成风险评估测试。",
              submitText: '立即评估',
              cancelText: '暂不认购'
          })
          break;
      case 'risk-lower':
          this.setState({
              risk_step: 'risk-lower'
          })
          break;
    }
  },
  agreeMent(){
    if(this.state.isAgree){
      this.setState({
        isAgree:false
      })
    }else{
      this.setState({
        isAgree:true
      })
    }
  },
  submitRisk(){
      this.setState({
          risk_step: 'risk-qa'
      });
  },
  submitRiskTestQA(){
      this.props.dispatch(Risk.popupSubmitRiskQuestions(data => {
        this.props.dispatch(detailsActions.userRiskLevel(()=>{
          this.showResultPop();
        }))
      }))
  },
  showResultPop(){
      let needLevel = this.props.state.lcDetailsData.data.data.asset.riskLevel,
          userLevel = this.props.state.UserLevelData.data.riskSource;
      let isHigher = userLevel && userLevel >= needLevel;
      if(isHigher){
        this.setState({
            risk_step: 'risk-result-can'
        });  
      }else{
        this.setState({
            risk_step: 'risk-result-cannot'
        }); 
      }
      
  },
  gobuy(){
    this.closeRiskPopup(); //关闭风险等级弹框
    this.nomalBuyBtn();
  },
  submitRiskLowerFn(){
      this.setState({
          risk_step: 'risk-qa'
      });
  },
  closeRiskPopup(){
    this.props.dispatch(Risk.popupSetRiskQuestionsAnswers({}));
    this.setState({
        risk_step: ""
    })
  },
  openAccountFn(type){
    let str = window.location.hash.replace(/#/,'');
    // window.location.hash = 'collocation/openAccount?backhash=' + str;
    window.location.hash = 'collocation/openAccount';
    window.clearInterval(this.state.timer2)
  },
  handleCancel(type){
    if(type == 'sm'){
      this.setState({
        showShMPop :false
      })
    }else{
      this.setState({
        showBKPop :false
      })
    }
    
  },
  render:function(){
    let datas = this.props.datas;
    let userData = this.props.userData;
    let lev =  this.props.state.lcDetailsData.data.data.asset.riskLevel;
    let ary = this.props.state.lcDetailsData.data.data.levelForType.split(',');
    let userLevel = this.props.state.UserLevelData.data.riskType;
    let btn = '';
    if(datas.jjsIsTransfer !=1){
      return <div></div>
    }
    if(datas.assetTransfer && datas.assetTransfer.status == 2){
      btn = <input className="false-btn2" type="button" name="" disabled value={datas.userTransAssetTotalAmount>0 ? '转让成功(已购买)' : '转让成功'}/>
    }else if(datas.assetTransfer && (datas.assetTransfer.status == 3 || datas.assetTransfer.status == 4)){
      btn = <input className="false-btn2" type="button" name="" disabled value='已取消'/ >
    }else if(!this.props.state.userLogin.isLogin){
      btn = <input type="button" name="" value='登录后购买转让' onClick={this.sureBtn} />
    }else{
      btn = <input type="button" name="" value='认购转让项目' onClick={this.sureBtn} />
    }
    return (
        <div className='margin-r-30'>
          {
            this.props.state.userLogin.isLogin?
            <div className="user-info">
                <div className="left-info lt">
                    <div className='rest-money cf'>
                        <span className='lt'>慧赚可用余额(元)</span>
                        <ToolTip data-text="local_tooltip.acc_asset_available_licai" />
                        <strong className='rt'>{userData ? userData.huliCurrentBalance : ToolPE(datas.currentBalance)}</strong>
                    </div>
                    <div className='rest-hb cf'>
                        <a href="https://www.huli.com/myaccount/coupon/list" className='lt'>可用红包(元)</a>
                        <a href="https://www.huli.com/myaccount/coupon/list" className='rt'>{userData ? userData.couponAmount : ToolPE(datas.couponAmount)}</a>
                    </div>
                </div>
                <a href='https://www.huli.com/hl/#/myaccount/recharge/main' className="right-btn lt">充值</a>
            </div>
            :
            <div className='user-info'></div>
          }
            <div className="trans trans_fir margin-0-30 cf">
                <span className="most-title lt">转让利率</span>
                <ToolTip data-text="local_tooltip.inv_layer_interest_jjs" className='eeee' />
                <span className='most-num rt'>{datas.assetTransfer ? ToolPE(datas.assetTransfer.investAnnualRate) : '0.00'}%</span>
            </div>
            <div className="trans margin-0-30 cf">
                <span className="most-title lt">转让结息</span>
                <ToolTip data-text="local_tooltip.transfer_interest" />
                <span className='most-num rt'>{datas.transferInterest ? ToolPE(datas.transferInterest) : '0.00'}元</span>
            </div>
            <div className="trans trans_thr margin-0-30 cf">
                <span className="most-title lt">转让总额</span>
                <ToolTip data-text="local_tooltip.bid_sum_tran_jjs" />
                <span className='most-num rt'>{datas.assetTransfer ? ToolPE(datas.assetTransfer.principal + datas.transferInterest ) : '0.00'}元</span>
            </div>
            <div>

              <div className={this.state.isAgree ? "btn-box margin-0-30" : 'btn-box margin-0-30 false-btn'} >
                  {btn}
              </div>
              <div className="checkbox-box margin-0-30">
                  <em className={this.state.isAgree ? "huli-common-icons checked" : "huli-common-icons"} onClick={this.agreeMent}></em>
                  我已阅读并同意
                  <a href={datas.agreementUrl}>《产品合同》</a>
              </div>
            </div>
            {
                this.state.risk_step === "risk-tip"?
                <Popup title={datas.asset.title} submitText={this.state.submitText} cancelText={this.state.cancelText} submitFn={this.submitRisk} closePopup={this.closeRiskPopup} submitDisabled={false} top={200}>
                    <RiskTestTip firstText={this.state.firstText} secondText={this.state.secondText}></RiskTestTip>
                </Popup>
                :
                this.state.risk_step === "risk-qa"?
                <Popup title="风险评估测试" submitFn={this.submitRiskTestQA} hasCancel={false} showWarn={false} submitDisabled={true} closePopup={this.closeRiskPopup} top={200}>
                    <RiskQuestion></RiskQuestion>
                </Popup>
                :
                this.state.risk_step === 'risk-lower'?
                <Popup title="风险评估测试" submitText="重新评估" cancelText='暂不认购' submitFn={this.submitRiskLowerFn} submitDisabled={false} closePopup={this.closeRiskPopup} top={200}>
                    <RiskResult userRiskType={userLevel} userRiskValue={this.props.state.UserLevelData.data.riskSource} productRiskType={ary[lev-1]} productRiskValue={lev}></RiskResult>
                </Popup>
                :
                this.state.risk_step === 'risk-result-can'?
                <Popup title="风险评估测试" submitText="继续认购" submitFn={this.gobuy} submitDisabled={false} closePopup={this.closeRiskPopup} top={200}>
                    <RiskResult userRiskType={userLevel} userRiskValue={this.props.state.UserLevelData.data.riskSource} productRiskType={ary[lev-1]} productRiskValue={lev}></RiskResult>
                </Popup>
                :
                this.state.risk_step === 'risk-result-cannot'?
                <Popup title="风险评估测试" submitText="重新评估" cancelText='暂不认购' submitFn={this.submitRisk} submitDisabled={false} closePopup={this.closeRiskPopup} top={200}>
                    <RiskResult userRiskType={userLevel} userRiskValue={this.props.state.UserLevelData.data.riskSource} productRiskType={ary[lev-1]} productRiskValue={lev}></RiskResult>
                </Popup>
                :
                null
            }
            <Popup 
                  title="安全提示"
                  submitFn={()=>{this.openAccountFn('sm')}}
                  closePopup={()=>{ this.handleCancel('sm') }}
                  submitText="立即开户"
                  hasCancel={false}
                  isShow={this.state.showShMPop}>
                <PopupTip content="为了您的资金安全，请先完成实名开户！" />
              </Popup>
              <Popup 
                  title="安全提示"
                  submitFn={()=>{this.openAccountFn('bk')}}
                  closePopup={()=>{ this.handleCancel('bk') }}
                  submitText="立即开户"
                  hasCancel={false}
                  isShow={this.state.showBKPop}
                >
                <PopupTip content="为了您的资金安全，请先开通慧赚托管账户！" />
              </Popup>
        </div>
    );
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

export const HeaderRight = connect(
  mapStateToProps,mapDispatchToProps
)(headerRight);
