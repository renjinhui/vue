const React = require('react');
const connect = require('react-redux').connect;
const SmsCode = require('../collocation/smsCode').SmsCode;
const bankCardActions = require('../../reducers/myaccount/bankCard/bankCardActions');

const CP = React.createClass({
  getInitialState() {
    return {
      name: '招商银行',

      phoneNum: '',
      phoneNumErr: '',
      phoneErrText: '',

      smsCodeInfo: false
    }
  },

  componentDidMount() {
    this.props.dispatch(bankCardActions.isValidCodeErr(null))
    let { id } = this.props.bankCardData.bankList.lcCard;
    let data = { cardId:id }
    // this.props.dispatch(bankCardActions.initBankCardInfo('/myaccount/tl/changecardmobile', data));
  },

  focusPhoneNum() {
    this.setState({
      phoneNumErr: false
    });
    if (this.props.bankCardData.bankData.isValidCodeErr === true) {
      this.props.dispatch(bankCardActions.isValidCodeErr(false));
    }
  },

  blurPhoneNum() {
    const phoneNum = this.refs.phoneNum.value;
    const mobile = phoneNum.replace(/ /g, '')
    this.phoneNumCheck(mobile);
    this.props.dispatch(bankCardActions.setNewMobile(mobile));
  },

  changePhoneNum() {
    const phoneNum = this.refs.phoneNum.value;
    let str;
    if (phoneNum.length < 3) {
      this.setState({ phoneNum });
    } else if (phoneNum.length < 8) {
      str = phoneNum.replace(/\s/g, '').replace(/(\d{3})(?=\d)/g, "$1 ");
      this.setState({ phoneNum: str });
    } else {
      str = phoneNum.replace(/\s/g, '').replace(/(^\d{3}|\d{4}\B)/g, "$1 ");
      this.setState({ phoneNum: str });
    }
  },

  phoneNumCheck(num) {
    const reg = /^1[0-9]{10}$/;
    if (reg.test(num)) {
      if (num == this.props.bankCardData.bankList.lcCard.cardMobile) {
        this.setState({
          phoneNumErr: true,
          phoneErrText: '新手机号码不能与旧的一致'
        });
      } else {
        this.setState({ phoneNumErr: false });
      }
    } else {
      this.setState({
        phoneNumErr: true,
        phoneErrText: '手机格式错误'
      });
    }
  },

  getSmsCode() {
    const { phoneNum, phoneNumErr } = this.state;
    if (phoneNum !== '' && phoneNumErr !== true) {
      this.setState({ smsCodeInfo: false });

      let data = {
        cardId: this.props.bankCardData.bankList.lcCard.id,
        newMobile: phoneNum.replace(/ /g, '')
      }
      this.props.dispatch(bankCardActions.sendChangePhoneSmsCode('/myaccount/tl/changeCardMobileSendSms', data));
    } else {
      this.setState({ smsCodeInfo: true });
    }
  },

  focusSmsCode() {
    if (this.props.bankCardData.bankData.isValidCodeErr === true) {
      this.props.dispatch(bankCardActions.isValidCodeErr(false));
    }
  },

  blurSmsCode(validCode) {
    this.props.dispatch(bankCardActions.setValidCode(validCode));
  },

  render() {
    const { bankList } = this.props.bankCardData;
    const { lcCard } = bankList;
    return (
      <div className="huli-popup-content">
        <div className="bc-row-label">
          新预留手机号请与在银行柜台预留的手机号码保持一致
          <div className={
            this.props.bankCardData.bankData.isValidCodeErr === null
            ? "bc-row-label-inner"
            : this.props.bankCardData.bankData.isValidCodeErr === true
              ? "bc-row-label-inner bc-label-show"
              : "bc-row-label-inner bc-label-hide"
          }>
            <div className="huli-common-icons oa-info-icon"></div>
            {this.props.bankCardData.bankData.validCodeMessage}
          </div>
        </div>

        <div className="change-phone-form">
         <div className="bc-row">
          <div className="bc-left">银行</div>

          <div className="oa-center-without-border">
            <img
              className="bc-bank-icon"
              src={`https://static.huli.com/images/bank-logo/${lcCard.bankCode}.png`}
              alt=""/>
            {lcCard.bankName}
          </div>

          </div>
         <div className="bc-row">
           <div className="bc-left">
             银行卡号
           </div>
           <div className="oa-center-without-border">
             {/*{lcCard.cardId.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ")}*/}
               {`${lcCard.cardId.substr(0, 4)} **** **** ${lcCard.cardId.substr(-4)}`}
           </div>

         </div>
         <div className="bc-row">
           <div className="bc-left">
             银行原预留手机号
           </div>
           <div className="oa-center-without-border">
             {lcCard.cardMobile.replace(/\s/g, '').replace(/(^\d{3}|\d{4}\B)/g, "$1 ")}
           </div>

         </div>
         <div className="bc-row">
           <div className="bc-left">
             银行新预留手机号
           </div>
           <div className={
             this.state.phoneNumErr === true
               ? "oa-center oa-input-error"
               : "oa-center"
           }>
             <input
               className="oa-input"
               type="text"
               ref="phoneNum"
               placeholder="请输入银行新预留手机号"
               maxLength="13"
               value={this.state.phoneNum}
               onFocus={this.focusPhoneNum}
               onBlur={this.blurPhoneNum}
               onChange={this.changePhoneNum}
             />
           </div>
           <div className="oa-right">
             {
               this.state.phoneNumErr === true
                 ? <div className="oa-info">{this.state.phoneErrText}</div>
                 : null
             }
           </div>
         </div>
         <SmsCode
           isBC={true}
           infoText="请完善上面信息"
           isInfo={this.state.smsCodeInfo}
           isSure={this.state.phoneNum !== '' && this.state.phoneNumErr === false}
           isFalse={this.props.bankCardData.bankData.isValidCodeErr}
           getSmsCode={this.getSmsCode}
           blurSmsCode={this.blurSmsCode}
           focusSmsCode={this.focusSmsCode}
         />

       </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    openAccountData: state.openAccountData,
    bankCardData: state.bankCardData,
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export const ChangePhone = connect(
  mapStateToProps,
  mapDispatchToProps
)(CP);
