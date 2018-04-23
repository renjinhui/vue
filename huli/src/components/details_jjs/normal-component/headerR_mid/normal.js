const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const cookie = require('../../../../common/util').cookie;
const MillisecondToDate  = require('../../../../common/tool').MillisecondToDate;

const Popup = require('../../../popup/index.popup').Popup;
const RiskQuestion = require('../../../popup/risk/risk-questions.component').RiskQuestion;
const RiskTestTip = require('../../../popup/risk/risk-test.component').RiskTestTip;
const PopupTip  = require('../../../popup/popup-tip.component').PopupTip;
const RiskLevelLowerTip = require('../../../popup/risk/risk-level-lower-tip.component').RiskLevelLowerTip;
const RiskResult = require('../../../popup/risk/risk-result.component').RiskResult;

const newActionsPopup = require('../../../../reducers/popup/newpop/newpopActions');
const sysTimeActions = require('../../../../reducers/sysTime/sysTimeActions');
const detailsActions =require('../../../../reducers/details_jjs/detailsActions');
const actionsPopup = require('../../../../reducers/popup/popupActions');
const baseDataActions = require('../../../../reducers/userBase/userBaseActions')
const Risk = require('../../../../reducers/risk/riskActions');

const normal = React.createClass({
  getInitialState(){
    return{
      buyValue:'',
      textR:false,
      focu:false,
      isAgree:true,
      placeholder:'输入金额为1000元整数倍',
      isExceed : 0, //0正常  1不足最低金额  2超过最大可投
      risk_step: "",
      timer: '',
      showShMPop:false, //展示实名弹框
      showBKPop:false,//展示绑卡弹框
      timer2: '',
      preOpen: this.props.preOpen,
      leftTime: {
        minutes:0,
        seconds:0
      }
    }
  },
  componentDidMount:function(){
    this.props.dispatch(sysTimeActions.sysTimeDiff(this.init));//获取时间差
  },
  init(diff){
    window.clearInterval(this.state.timer2);
    if(this.props.preOpen == 1){
      this.state.timer2 = setInterval(()=>{
        this.timeCountDown(diff)
      },1000)
    }
  },
  timeCountDown(diff){
    let opTime = this.props.datas.asset.openTime;
    let my_sys = diff || this.props.state.sysTimeData.diff;
    let leftT = opTime - (new Date().getTime() + my_sys);//正确的系统时间
    let timeObj = MillisecondToDate(leftT,true);
    if(leftT<=0){
      this.props.dispatch(newActionsPopup.submitBtnText({
        submitText: ''
      }))
      window.clearInterval(this.state.timer2);
      this.setState({
        preOpen : 0
      })
    }else{
      this.props.dispatch(newActionsPopup.submitBtnText({
        submitText: this.state.leftTime.minutes+'分'+ this.state.leftTime.seconds+"秒",
        leftTime:leftT
      }))
      this.setState({
        leftTime: {
          minutes: timeObj.minutes,
          seconds: timeObj.seconds
        }
      })  
    }

  },
  inpChange(e,maxM,minM){
    let tar =e.target || e.srcElement;
    
    if(Number(tar.value)||Number(tar.value) == 0){ 
      tar.value = Number(tar.value);
      this.setState({
        buyValue:parseInt(tar.value) || ''
      })
      
      if(tar.value*1000*100 > maxM){ //判断超额
        this.setState({
          isExceed : 2,
          buyValue:parseInt(tar.value)
        })
        this.calculateMoney(0);

      }else if(tar.value*1000*100 < minM && tar.value!=0){//判断低额
        this.setState({
          isExceed : 1,
          buyValue:parseInt(tar.value)
        })
        this.calculateMoney(0);
      }else{
        this.setState({
          isExceed : 0
        })
        let money = tar.value=='' ? '' : tar.value*1000*100;
        this.calculateMoney(money)
      }

    }else{
       this.setState({
        buyValue:this.state.buyValue
      })
    }
    
    
  },
  calculateMoney(num){
    window.clearTimeout(this.state.timer);
    num = Number(num);
    if(num == 0)return;
    let params = {};
    params.bidId = this.props.state.lcDetailsData.data.data.idStr;
    params.amount = num + Number(this.props.state.lcDetailsData.data.data.totalAmountBid);
    params.productType = 'jjs';
    params.investRate = this.props.state.lcDetailsData.data.data.asset.investAnnualRate;
    params.raiseRate = this.props.state.lcDetailsData.data.data.asset.curUserRaiseInterest;

    this.state.timer = window.setTimeout(()=>{
      this.props.dispatch(detailsActions.calculateMoney(params))

      this.props.dispatch(newActionsPopup.newpopSetMoney({
        howmuch: num
      }));
    },200);
    
  },
  inpFocus(e,minM){
    this.setState({
      placeholder:'',
      focu:true,
    })
  },
  inpBlur(e,minM){
    this.setState({
      placeholder:'输入金额为'+1000+'元整数倍',
      focu:false,
    });
    if(this.state.buyValue){
      
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
    // 输入金额是否合法
    if(this.state.isExceed)return;
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

    //如果输入框为空时 点击认购焦点默认到输入框
    if(!this.state.buyValue){
      this.inpt.focus();
      return;
    }
    this.setState({
      isExceed : 0
    })
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
      let preOpen = false;
      if(this.state.preOpen == 1){//是否预开标
        preOpen = true;
      }else{
        preOpen = false;
      }
      this.props.dispatch(newActionsPopup.newpopSetStatus({
        isShow: true,
        type: 'jjs',
        innerType: 'jjs_normal_do',
        preOpen:preOpen,
        howmuch: money
      }));
      // 神策埋点执行
      this.shenceBtn();
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
  shenceBtn(){
    let baseObj = this.props.state.lcDetailsData.data.data;
    let IncomeOfInvestment = (this.props.state.newPop.willIncome-baseObj.totalAmountBid)*(this.props.state.newPop.howmuch/(baseObj.totalAmountBid+this.props.state.newPop.howmuch))/100;
    let baseInfObj = { //神策埋点专用
      PlatformType: 'pc',
      LoanId: '',//借款编号（暂无）
      ProjectName: baseObj.asset.title || '',
      ProjectType: '理财',//不知道从哪拿
      ProductType: '',//产品类型暂无
      ReleaseTime: '',//发布时间暂无
      IncomeType: baseObj.repayModeStr || '',
      InterestCalculationMethod: '',//利息计算方式（暂无）
      ProjectDeadline: baseObj.periods || '',
      LoanAnnualInterestRate: Number(baseObj.asset.investAnnualRate/100) || '',
      AmountOfInvestment:this.props.state.newPop.howmuch/100,
      IncomeOfInvestment: parseFloat(IncomeOfInvestment.toFixed(2))
    };
    Util.sa('SubmissionInvestmentProjects',baseInfObj);
  },
  enterKey(e){
    if(e.keyCode == 13){
      this.sureBtn()
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
    // 状态为预开标或开标只要开标时间没到就显示倒计时
    let userinfo = '';
    let datas = this.props.datas;
    let lev =  datas.asset.riskLevel;
    let ary = datas.levelForType.split(',');
    let userLevel = this.props.state.UserLevelData.data.riskType;

    let leftTimeStr = '';
    // if(this.props.preOpen == 1){
    //   console.log(this.props.datas.asset.openTime,this.props.state.sysTimeData)
    //   let that =this;
    //   let timer = window.setInterval(function(){
    //     that.state.leftTime ++;
    //     leftTimeStr = that.state.leftTime + '秒后可以认购';
    //     console.log(leftTimeStr)
    //   },1000)
    // }
    return (
        <div>    
            <div className={this.state.focu?'input-box-focus input-box  margin-0-30':'input-box  margin-0-30'} bidMinLimit={datas.asset.investLimitMin}>
                <input ref={dom => {this.inpt = dom}} style={{textAlign:this.state.buyValue||this.state.focu ? 'right' : 'left'}} className="input-w180" onFocus={(e)=>{this.inpFocus(e,datas.asset.investLimitMin)}}  onChange={(e)=>{this.inpChange(e,datas.asset.canBidAmount,datas.asset.investLimitMin)}} onBlur={(e)=>{this.inpBlur(e,datas.asset.investLimitMin)}} placeholder={this.state.placeholder} value={this.state.buyValue} type="text" disabled={this.props.state.userLogin.isLogin ? null :'disabled'} onKeyUp={this.enterKey} autoComplete="off" />
                <span className="span-w60 lt">,000<span className='yuan'>元</span></span>
            </div>
            <div className="err-box margin-0-30">
              {
                this.state.isExceed == 2 ?
                <span>认购金额不能超过每位用户最大可认购金额</span>
                :
                 this.state.isExceed == 1 ?
                 <span>认购金额不能低于最低认购金额{datas.asset.investLimitMin/100}元</span>
                :null 
              }
            </div>
            <div className={this.state.isAgree ? "btn-box margin-0-30" : 'btn-box margin-0-30 false-btn'} onClick={this.sureBtn}>
            {
                !this.props.state.userLogin.isLogin?
                <input type="button" name="" value="登录后认购"/>
                :
                this.state.preOpen == 1 ?
                <input type="button" className={this.state.isExceed ? "false-btn2 input-w180" : "input-w180"} name="" value={this.state.leftTime.minutes+'分'+ this.state.leftTime.seconds+"秒后可以认购" }/>
                :
                <input type="button" className={this.state.isExceed ? "false-btn2 input-w180" : "input-w180"} name="" value="立即认购"/>
            }
            </div>
            <div className="checkbox-box margin-0-30">
                <em className={this.state.isAgree ? "huli-common-icons checked" : "huli-common-icons"} onClick={this.agreeMent}></em>
                我已阅读并同意
                <a href={datas.agreementUrl} target="_blank">《{datas.agreementName}》</a>
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

export const Normal = connect(
  mapStateToProps,mapDispatchToProps
)(normal);