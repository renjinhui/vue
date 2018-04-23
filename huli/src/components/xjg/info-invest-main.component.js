const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const classNames = require('classnames');
const _ = require('lodash');
const Tool = require('../../common/tool');
const tansformMoney = Tool.tansformMoney;
const Popup = require('../popup/index.popup').Popup;
const XJGInvest = require('../popup/xjg/invest').Invest;
const BalanceNotEnough = require('../popup/balance-not-enough.component').BalanceNotEnough;
const RiskQuestion = require('../popup/risk/risk-questions.component').RiskQuestion;
const RiskTestTip = require('../popup/risk/risk-test.component').RiskTestTip;
const XJGCalculator = require('../popup/xjg/xjg-calculator.component').XJGCalculator;
const RiskLevelLowerTip = require('../popup/risk/risk-level-lower-tip.component').RiskLevelLowerTip;
const PopupError = require('../popup/popup-error.component').PopupError;
const PopupSucc = require('../popup/xjg-success.component').XJGSuccess;
const actionsPopup = require('../../reducers/popup/popupActions');
const Risk = require('../../reducers/risk/riskActions');
const actionsXJG = require('../../reducers/xjg/xjgActions');
const ToolTip = require('../common/tooltip.component').ToolTip;

const Main = React.createClass({
  getInitialState: function () {
    return {
      isShowError: false,
      errorMessage: '错误',
      btnText: '立即转入',
      btnDisabled: false,
      isChecked: true,
      investValueInput: null,
      investValue: null,
      inputBoxCls: 'input-box',
      btnClass: {
        isDisabled: false,
        isStop: false
      },
      risk_step: "",
      isBalanceLess: false,
      useMoney: 0,
      firstText: '',
      secondText: '',
      errorTitle: '小金罐购买失败',
      errorBuyMessage: '',
      buyStatus: '',
      calculator: {
        isShow: false
      }
    }
  },
  componentDidUpdate: function () {
    let WH = $(window).height();
    let PH = $('.rc-dialog-wrap').height() ? $('.rc-dialog-wrap').height() : 500;
    let H = (document.body.scrollTop || document.documentElement.scrollTop) + (WH - PH) / 2;
    $('.rc-dialog-wrap').css({top: H});
  },
  inputFocusFn(e) {
    e.target.focus();
    this.setState({inputBoxCls: 'input-box input-focus'});
  },
  inputBlurFn(e) {
    this.setState({inputBoxCls: 'input-box '});
  },
  checkAgreement: function () {
    let _this = this;
    this.setState({isChecked: !this.state.isChecked});
    this.setState({btnDisabled: this.state.isChecked});

    if (this.props.state.hqDetail.page.xjg.reachCredit !== 1) {
      this.setState({btnClass: _.assign({}, _this.state.btnClass, {isDisabled: this.state.isChecked})})
    }
  },
  checkMoney: function (e) {
    let reg = /[^\d]/g;
    let val = e.target.value;
    if (reg.test(val)) {
      this.setState({investValue: val.replace(reg, ''), errorMessage: '输入金额格式错误', isShowError: true});
    } else {
      this.setState({investValue: e.target.value, errorMessage: '', isShowError: false});
    }
  },
  closeRiskPopup(){
    this.setState({
      risk_step: ""
    })
  },
  showInvestPopup: function () {
    if (this.state.btnDisabled) {
      return;
    }

    // 判断是否登录
    if (this.props.state.userLogin.isLogin == false) {
      window.location.href = 'https://passport.huli.com?backurl=https://www.huli.com/hl/#/xjg';
      return;
    }


    let page = this.props.state.hqDetail.page;
    // 是否额度已满
    if (page.xjg.reachCredit == 1) {
      return;
    }

    let investValue = this.state.investValue * 100;
    if (!investValue) {
      this.setState({errorMessage: '请输入要转入的金额', isShowError: true});
      return;
    }
    if (investValue < page.xjg.investmentAmount) {
      this.setState({errorMessage: '小金罐首次最低投资金额为' + (page.xjg.investmentAmount / 100) + '元', isShowError: true});
      return;
    }

    // 判断当前用户余额是否小于100或1（1元起投首次100）
    if (page.currentBalance < page.xjg.investmentAmount) {

      //判断是否已经有在收益中的小金罐，如果有，则不显示起投金额
      let isFirst = true;
      if (page.xjg.investedAmount !== 0) {
        isFirst = false;
      }
      this.setState({
        buyStatus: 'buy-not-enough'
      });
      return;
    }
    //判断是否超限额
    let limitMoney = null;
    if (page.xjg.investMax !== undefined) {
      limitMoney = page.xjg.investMax - page.xjg.investedAmount;
    }

    if (limitMoney != null && (investValue > limitMoney)) {
      this.setState({errorMessage: '本产品单个投资人最高投资限额为' + (page.xjg.investMax / 1000000) + '万元', isShowError: true});
      return;
    }

    // 余额跟转入金额比较，如果余额不足 已余额为准
    let useMoney = this.state.investValue;
    let isBalanceLess = page.currentBalance < useMoney * 100;
    if (isBalanceLess) {
      useMoney = parseInt(page.currentBalance / 100);
    }
    this.setState({
      isBalanceLess,
      useMoney
    });

    this.showRiskPopup();
  },
  showRiskPopup(){
    let page = this.props.state.hqDetail.page;
    let riskInfo = Tool.getRiskInfo({
      riskStatus: page.riskInfo.riskStatus,
      riskValue: page.riskInfo.riskValue,
      bidInfo: {
        isCompare: true,
        riskValue: page.xjg.riskValue
      }
    });
    let objState = {};
    switch (riskInfo.type) {
      case 'risk-succ':
        objState = {
          risk_step: 'xjg-invest'
        };
        break;
      case 'risk-again':
        objState = {
          risk_step: 'risk-tip',
          firstText: "您上次的风险评估结果已过期，需要重新评估。",
          secondText: "本产品适合风险承受能力为“" + this.props.state.hqDetail.page.xjg.riskType + "”及以上的用户转入。"
        };
        break;
      case 'risk-first':
        objState = {
          risk_step: 'risk-tip',
          firstText: "本产品适合风险承受能力为“" + this.props.state.hqDetail.page.xjg.riskType + "”及以上的用户转入。",
          secondText: "投资前，请您先完成风险评估测试。"
        };
        break;
      case 'risk-lower':
        objState = {
          risk_step: 'risk-lower'
        };
        break;
    }
    this.setState(objState);
  },
  submitRisk(){
    this.setState({
      risk_step: 'risk-qa'
    });
  },
  submitRiskTestQA(){
    this.props.dispatch(Risk.popupSubmitRiskQuestions(data => {
      if (data.errorCode == 0) {
        this.props.dispatch(actionsXJG.xjgDetailPosts(data => {
          this.showRiskPopup();
        }));
      }

    }))
  },
  submitInvest(){
    //购标
    this.props.dispatch(actionsXJG.xjgSubmitInvest(this.state.useMoney, (data) => {
      this.setState({
        risk_step: "",
        errorBuyMessage: data.errorMessage,
        buyStatus: data.errorCode == 0 ? 'buy-succ' : 'buy-error'  //1-成功；2-失败
      });
    }));
  },
  submitRiskLowerFn(){
    this.setState({
      risk_step: 'xjg-invest'
    });
  },
  submitBuyError(){
    this.setState({
      buyStatus: ''
    })
  },
  submitBuySucc(){
    this.setState({
      buyStatus: ''
    })
  },
  showCalculator(){
    this.setState({
      calculator: {
        isShow: true
      }
    })
  },
  submitCalculator(){
    this.setState({
      calculator: {
        isShow: false
      }
    })
  },
  closeCalculator(){
    this.setState({
      calculator: {
        isShow: false
      }
    })
  },
  render: function () {
    const user = this.props.state.userLogin;
    const data = this.props.state.hqDetail;
    let currentBalance = <p className="sums-num rt"><span>0</span><span>元</span></p>;
    let currentBalanceCls = 'hq-account hidden-account cf';
    let hadInvested = '';
    let productName = '';
    let contractUrl = '';

    if (user.isLogin) {
      currentBalanceCls = 'hq-account cf';
    } else {
      this.state.btnText = '登录后转入';
    }
    if (data.page_isFetching == 1) {
      contractUrl = data.page.xjg.contractUrl;
      currentBalance =
        <p className="sums-num rt"><span>{tansformMoney(data.page.currentBalance, 2)}</span><span>元</span></p>;

      if (user.isLogin) {
        if (data.page.xjg.investedAmount) {
          hadInvested = <div className="had-purchase cf">
            <p className="normal-text lt">我已转入金额</p>
            <p className="nums lt"><span>{tansformMoney(data.page.xjg.investedAmount, 2)}</span><span>元</span></p>
          </div>
        }
        if (data.page.xjg.reachCredit == 0) {
          this.state.btnText = '立即转入';
        } else if (data.page.xjg.reachCredit == 1) {
          this.state.btnText = '暂停转入';
          this.state.btnDisabled = true;
          this.state.isShowError = true;
          this.state.errorMessage = data.page.xjg.creditTip;
          this.state.btnClass.isStop = true;
          this.state.btnClass.isDisabled = false;
        }
      }
    }

    let btnClass = classNames({
      'orange-btn shift-money': true,
      'pause-btn': this.state.btnClass.isStop,
      'false-btn': this.state.btnClass.isDisabled
    });

    return (
      <div className="hq-version-right rt">
        <div className={ currentBalanceCls }>
          <div className="account-sum lt">
            <em>
              <span className="lt">理财可用余额</span>
              <ToolTip data-text="acc_asset_available_licai"/>
            </em>
            {currentBalance}
          </div>
          <a href="/myaccount/capital/deposit" className="orange-btn hq-recharge lt">充值</a>
        </div>
        <div className="hq-data-input cf">
          <div className={ this.state.inputBoxCls }>
            <input type="text" onFocus={this.inputFocusFn} onBlur={this.inputBlurFn} placeholder="请输入1元的整数倍"
                   value={this.state.investValue} ref={(input) => {
              this.state.investValueInput = input;
            }} onChange={this.checkMoney}/>
            <span>元</span>
          </div>
          <a href="javascript:" onClick={this.showCalculator} className="hq-calculator hq-common-images"></a>
        </div>
        <div className="error-input"><p
          style={{display: this.state.isShowError ? "block" : "none"}}>{this.state.errorMessage}</p></div>
        <input type="button" disabled={this.state.btnDisabled} className={btnClass} value={this.state.btnText}
               onClick={this.showInvestPopup}/>
        <div className="huli-one-checkbox">
          <em onClick={this.checkAgreement}
              className={this.state.isChecked ? "huli-common-icons checked" : "huli-common-icons"}></em>
          <span className="huli-agrees">我已阅读并同意
            <a href="https://events.huli.com/static/web/agree/xjg.html"
               target="_blank">《产品合同》</a>
          </span>
        </div>
        {hadInvested}
        {
          this.state.risk_step === "risk-tip" ?
            <Popup title="小金罐转入" submitFn={this.submitRisk} closePopup={this.closeRiskPopup}>
              <RiskTestTip firstText={this.state.firstText} secondText={this.state.secondText}></RiskTestTip>
            </Popup>
            :
            this.state.risk_step === "risk-qa" ?
              <Popup showWarn={false} title="风险评估测试" submitFn={this.submitRiskTestQA} hasCancel={false}
                     submitDisabled={true} closePopup={this.closeRiskPopup}>
                <RiskQuestion></RiskQuestion>
              </Popup>
              :
              this.state.risk_step === "xjg-invest" ?
                <Popup title="小金罐转入" submitFn={this.submitInvest} closePopup={this.closeRiskPopup}>
                  <XJGInvest xjg={data.page.xjg} isBalanceLess={this.state.isBalanceLess}
                             useMoney={this.state.useMoney}></XJGInvest>
                </Popup>
                :
                this.state.risk_step === 'risk-lower' ?
                  <Popup title="风险评估测试" submitText="继续认购" submitFn={this.submitRiskLowerFn}
                         closePopup={this.closeRiskPopup}>
                    <RiskLevelLowerTip userRiskType="稳健型" userRiskValue="1,2" productRiskType="成长型"></RiskLevelLowerTip>
                  </Popup>
                  :
                  null
        }
        {
          this.state.buyStatus === 'buy-error' ?
            <Popup title="小金罐转入" submitFn={this.submitBuyError} hasCancel={false}>
              <PopupError errorTitle={this.state.errorTitle} errorMessage={this.state.errorBuyMessage}></PopupError>
            </Popup>
            :
            this.state.buyStatus === 'buy-succ' ?
              <Popup title="小金罐转入" submitFn={this.submitBuySucc} hasCancel={false}>
                <PopupSucc turnInMoney={this.state.useMoney} useMoney={this.state.useMoney}></PopupSucc>
              </Popup>
              :
              this.state.buyStatus === 'buy-not-enough' ?
                <Popup title="小金罐" submitText="确定" submitFn={this.submitBuyError} hasCancel={false}>
                  <BalanceNotEnough money={data.page.xjg.investmentAmount / 100} showTip={true}/>
                </Popup>
                :
                null
        }
        {
          (data.page_isFetching == 1 && this.state.calculator.isShow) ?
            <Popup title="小金罐收益计算器" submitFn={this.submitCalculator} submitText="关闭" hasCancel={false}
                   closePopupSucc={this.closeCalculator}>
              <XJGCalculator turnInMoney={this.state.investValue} rate={data.page.xjg.profileRate}
                             raise={data.page.xjg.raiseInterestRate}></XJGCalculator>
            </Popup>
            :
            null
        }
      </div>
    )
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    state
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const XJGInfoInvestMain = connect(
  mapStateToProps, mapDispatchToProps
)(Main);
