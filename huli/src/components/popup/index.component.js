const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const XJGnoTurnOut = require('./xjg-noturnout.component').noTurnOut;
const XjgTurnOut1 = require('./xjg-turnout1.component').XjgTurnOut1;
const XjgTurnOut2 = require('./xjg-turnout2.component').XjgTurnOut2;
const XjgTurnOut3 = require('./xjg-turnout3.component').XjgTurnOut3;
const XjgRevoke = require('./xjg-revoke.component').XjgRevoke;
const XJGRevokeResult = require('./xjg-revoke-result.component').XJGRevokeResult;
const BalanceNotEnough = require('./balance-not-enough.component').BalanceNotEnough;
const Login = require('./login.component').Login;
const PopupError = require('./popup-error.component').PopupError;
const SystemBusy = require('./system-busy.component').SystemBusy;
const actionsPopup = require('../../reducers/popup/popupActions');
const actionsXJGDetail = require('../../reducers/xjg/xjgActions');
const xjgActions = require('../../reducers/myaccount/xjg/myaccountXjgActions');
const CCResult = require('./cc-result.component').CcResult;
const ChangPhone = require('./bankcard-changephone.component').ChangePhone;
const bankCardActions = require('../../reducers/myaccount/bankCard/bankCardActions');
const BindSydCard = require('./bankcard-bindSydCard.component').BindSydCard;

const PopupPar = React.createClass({

  cancelSubmit() {
    const data = this.props.state.popup;
    switch (data.type) {
      case 'xjg-turnout2':
        this.props.dispatch(actionsPopup.popupSetStatus({
          isShow: true,
          type: 'xjg-turnout1',
          title: '小金罐转出',
          submitDisabled: true
        }));
        break;
      default:
        this.closePopup();
    }
  },
  getInitialState(){
    return{

    }
  },
  getDefaultProps() {

  },
  componentWillMount() {

  },
  componentDidMount() {

  },
  componentDidUpdate(){

  },
  closePopup() {
    let isReload = this.props.state.popup.isReload;
    if (isReload) {
      window.location.reload();
    }
    this.props.dispatch(actionsPopup.popupSetStatus({
      isShow: false
    }));

  },
  submitFn() {
    if (this.props.state.popup.submitDisabled) {
      return;
    }
    const data = this.props.state.popup;
    switch (data.type) {
      case "xjg-noturnout":
        this.closePopup();
        break;
      case "xjg-turnout1":
        if (this.props.state.popup.submitDisabled)return;
        this.props.state.xjgData.isSuc.errorMessage = '';
        this.props.dispatch(actionsPopup.popupSetStatus({
          isShow: true,
          type: 'xjg-turnout2',
          title: '小金罐转出',
          cancelText: '上一步',
          submitDisabled: true
        }));
        break;
      case "xjg-turnout2":
        if (this.props.state.popup.submitDisabled)return;
        this.props.dispatch(xjgActions.myaccountXjgSureOutPosts());
        break;
      case "xjg-turnout3":
        this.closePopup();
        break;
      case "xjg-revoke":
        if (this.props.state.popup.submitDisabled)return;
        this.props.dispatch(xjgActions.myaccountXjgCancelPosts())
        break;
      case "xjg-revoke-result":
        this.closePopup();
        window.location.reload();
        break;
      case "balanceNotEnough":
        this.closePopup();
        break;
      case "login":
        window.location.href = 'https://passport.huli.com?backurl=' + data.backurl;
        break;
      case "popup-error":
        this.closePopup();
        break;
      case "change-phone":
        const { bankData, bankList } =  this.props.bankCardData
        const { newMobile, validCode } = bankData;
        let url = '/myaccount/tl/changeCardMobileValidSms';
        // 需要将bankList换成cardId
        const datas = { cardId: bankList.lcCard.cardId, newMobile, validCode };
        if (newMobile !== '' &&  validCode !== '') {
          this.props.dispatch(bankCardActions.changePhoneNum(url, datas));
        } else {
          this.props.dispatch(bankCardActions.isValidCodeErr(true));
          this.props.dispatch(bankCardActions.validCodeMessage('请输入验证码！'))
        }
        break;

      case 'bind-syd-card':
        const { bankCode, bankCardNo, bankCardErr } = this.props.bankCardData.sydBankCard;
        console.log(bankCode !== '' , bankCardNo !== '' , bankCardErr === false, bankCardErr)
        if (bankCode !== '' && bankCardNo !== '' && bankCardErr === false) {
          let bindCardUrl = '/myaccount/tl/saveWdWithDrawCard';
          let bindCardData = { bankCode, bankCardNo }
          this.props.dispatch(bankCardActions.bindSydCard(bindCardUrl, bindCardData));
        } else {
          this.props.dispatch(bankCardActions.isSydValidCodeErr(true));
          this.props.dispatch(bankCardActions.sydValidCodeMessage('请将信息补充完整'));
        }
        break;

      default:
        this.closePopup();
        break;
    }
  },
  setSubmitDisabled(disabled){
    if (disabled === undefined) {
      disabled = !this.props.state.popup.submitDisabled;
    }
    this.props.dispatch(actionsPopup.popupSetSubmitDisabled(disabled));
    return disabled;
  },
  render() {
    const data = this.props.state.popup;
    const data_xjgDetail = this.props.state.hqDetail;
    const submitDisabled = data.submitDisabled;
    let hasCancel = data.hasCancel;
    let hasSubmit = data.hasSubmit;
    let cancelText = data.cancelText || '取消';
    let submitText = data.submitText || '确定';
    if (data.isShow === false) {
      return (
        <div></div>
      )
    }
    let popupContent = '';

    let submitCls = 'blue-btn common-btn-130 ' + ( submitDisabled ? 'false-btn' : '' );
    switch (data.type) {
      case "xjg-noturnout":
        hasCancel = false;
        popupContent = <XJGnoTurnOut />;
        break;
      case "xjg-turnout1":
        popupContent = <XjgTurnOut1 />;
        break;
      case "xjg-turnout2":
        popupContent = <XjgTurnOut2 />;
        break;
      case "xjg-turnout3":
        popupContent = <XjgTurnOut3 />;
        break;
      case "xjg-revoke":
        popupContent = <XjgRevoke />;
        break;
      case "xjg-revoke-result":
        popupContent = <XJGRevokeResult />;
        break;
      case "balanceNotEnough":
        popupContent = <BalanceNotEnough showTip={data.showTip}/>;
        break;
      case "login":
        popupContent = <Login />;
        break;
      case "popup-error":
        hasCancel = false;
        if (data.errorCode == 99) {  //系统繁忙提示，无X图标
          popupContent = <SystemBusy errorMessage={data.errorMessage}/>
        } else {
          if (data.errorCode == 1 && data.errorMessage == "noLogin") {
            data.title = '快速登录';
            popupContent = <Login />;
          } else {
            popupContent = <PopupError errorTitle={data.errorTitle} errorMessage={data.errorMessage}/>;
          }
        }
        break;
      case "cc-result":
        popupContent = <CCResult context={data.context}/>
        break;
      case 'change-phone':
        popupContent = <ChangPhone context={data.context}/>
        break;
      case 'bind-syd-card':
        popupContent = <BindSydCard context={data.context}/>
        break;

    }

    return (
      <div>
        <div className="rc-dialog-mask" style={{animation: 'opShow5 .5s'}}></div>
        <div className="rc-dialog-wrap" style={{top: data.top + 'px', animation: 'opShow .5s'}}>
          <div className="huli-popup-main">
            <div className="huli-popup-title">
                  <span className="huli-popup-closed" onClick={this.closePopup}>
                      <a href="javascript:void(0)"></a>
                  </span>
              <div className="huli-popup-name">
                <span className="huli-popup-name-left">{data.title}</span>
              </div>
            </div>

            { popupContent }

            <div className="huli-popup-footer">
              <div className="huli-popup-action">
                {
                  hasCancel
                    ? <span>
                      <input type="button" className="gray-btn common-btn-130"
                             onClick={this.cancelSubmit}
                             value={ data.cancelText ? data.cancelText : "取消" }/>
                    </span>
                    : null
                }
                {
                  hasSubmit
                    ? <span>
                      <input type="button" className={ submitCls }
                             onClick={this.submitFn} value={ submitText }/>
                    </span>
                    : null
                }
              </div>
              <span className="huli-popup-risk">投资有风险，理财需谨慎</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    bankCardData: state.bankCardData,
    state
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const Popup = connect(
  mapStateToProps, mapDispatchToProps
)(PopupPar);
