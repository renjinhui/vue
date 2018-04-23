const React = require('react');
const connect = require('react-redux').connect;
const openAccountActions = require('../../reducers/collocation/openAccountActions');
const popupActions = require('../../reducers/popup/popupActions');
const userBaseActions = require('../../reducers/userBase/userBaseActions');
const BankList = require('./bankList').BankList;
const OAInput = require('./oaRow').OAInput;
const SmsCode = require('./smsCode').SmsCode;
const Popup = require('../popup/index.popup').Popup;
const CcResult = require('../popup/cc-result.component').CcResult;
const DocumentTitle = require('react-document-title');

const OA = React.createClass({

  getInitialState() {
    return {
      account: {},

      name: '',
      nameErr: false,

      idCard: '',
      idCardErr: false,

      selectBank: null,
      selectBankErr: false,
      bankListShow: false,
      selectedBank: null,

      inputBankCard: false,
      bankCardId: '',
      bankCardErr: false,
      bankCardLen: 0,

      phoneNum: '',
      phoneNumErr: false,

      smsCode: null,
      smsCodeInfo: false,
      smsCodeErr: false,
      smsCodeErrMessage: '',
      initGetSmsCode: true,
      timingOut: false,

      isSetPass: null,
      pass: '',
      passErr: false,
      rePass: '',
      rePassErr: false,

      checkedProtocol: false,

      isRegisted: true,

      messageErr: false,
      oaSuccess: false,
      oaError: false,
      oaErrMessage: '',
      oaErrBack: false,

      backhash: null,
    }
  },

  componentWillMount() {
    this.props.dispatch(openAccountActions.getOaBankList('/myaccount/tl/bankList'));
  },

  componentDidMount() {
    const account = this.props.dispatch(openAccountActions.getAccount('/myaccount/tl/bindCardIndex'));
    account.then((result) => {
      const {data} = result;
      if (data) {
        this.props.openAccountData.bankList.map((item) => {
          data.bankCode
            ? item.codeValue === data.bankCode
            ? this.selectBank(item.codeValue, item.codeName)
            : null
            : null
        });
        this.setState({
          name: data.realName,
          idCard: data.id5,
          bankCardId: data.bankCardNo.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 "),
          isSetPass: data.isSetPayPassWord
        });
      }

    });
    let {backhash} = this.props.location.query;
    this.setState({backhash});
  },

  focusName() {
    this.setState({
      inputName: true,
      nameErr: false
    });
  },

  blurName(name) {
    this.setState({
      name,
      inputName: false
    });
    name.length === 0 ? this.setState({nameErr: true}) : null;
  },

  changeName(name) {
    this.setState({name});
  },

  focusIdCard() {
    this.setState({
      inputIdCard: true,
      idCardErr: false
    });
  },

  blurIdCard(idCard) {
    this.setState({
      idCard
    });
    this.checkIdCard(idCard);
  },

  changeIdCard(idCard) {
    this.setState({
      idCard
    });
  },

  checkIdCard(idCard) {
    const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if (regIdCard.test(idCard)) {
      if (idCard.length == 18) {
        let idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        let idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        let idCardWiSum = 0;
        for (let i = 0; i < 17; i++) {
          idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
        }
        let idCardMod = idCardWiSum % 11;
        let idCardLast = idCard.substring(17);
        if (idCardMod == 2) {
          if (idCardLast == "X" || idCardLast == "x") {
            this.setState({idCardErr: false});
          } else {
            this.setState({idCardErr: true});
          }
        } else {
          //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
          if (idCardLast !== idCardY[idCardMod]) {
            this.setState({idCardErr: false});
          } else {
            this.setState({idCardErr: true});
          }
        }
      }
    } else {
      this.setState({idCardErr: true});
    }
  },

  clickBanks(bank) {
    this.setState({
      bankListShow: bank,
      selectBankErr: false
    });
  },

  selectBank(codeValue, codeName) {
    this.setState({
      selectedBank: {
        codeValue,
        codeName
      }
    });
  },

  focusBankCard() {
    this.setState({
      inputBankCard: true,
      bankCardErr: false
    });
  },

  blurBankCard() {
    this.setState({inputBankCard: false});
    const bancCardId = this.state.bankCardId.replace(/ /g, '');
    this.luhnCheck(bancCardId);
  },

  // ++++ndev测试
  /*luhnCheck(bankno) {
   let lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhn进行比较）
   let first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
   let newArr = [];
   for (let i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
   newArr.push(first15Num.substr(i, 1));
   }
   let arrJiShu = []; //奇数位*2的积 <9
   let arrJiShu2 = []; //奇数位*2的积 >9
   let arrOuShu = []; //偶数位数组
   for (let j = 0; j < newArr.length; j++) {
   if ((j + 1) % 2 == 1) { //奇数位
   if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
   else arrJiShu2.push(parseInt(newArr[j]) * 2);
   } else //偶数位
   arrOuShu.push(newArr[j]);
   }

   let jishu_child1 = []; //奇数位*2 >9 的分割之后的数组个位数
   let jishu_child2 = []; //奇数位*2 >9 的分割之后的数组十位数
   for (let h = 0; h < arrJiShu2.length; h++) {
   jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
   jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
   }

   let sumJiShu = 0; //奇数位*2 < 9 的数组之和
   let sumOuShu = 0; //偶数位数组之和
   let sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
   let sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
   let sumTotal = 0;
   for (let m = 0; m < arrJiShu.length; m++) {
   sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
   }

   for (let n = 0; n < arrOuShu.length; n++) {
   sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
   }

   for (let p = 0; p < jishu_child1.length; p++) {
   sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
   sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
   }
   //计算总和
   sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

   //计算luhn值
   let k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
   let luhn = 10 - k;

   if (lastNum == luhn) {
   this.setState({ bankCardErr: false });
   } else {
   this.setState({ bankCardErr: true });
   }

   if (bankno.length === 0) {
   this.setState({ bankCardErr: true });
   }
   },*/
  luhnCheck(bankno) {
    this.setState({bankCardErr: false});
  },

  setSelectionRange(bankCardId, selectionEnd) {
    if (bankCardId.length < this.state.bankCardLen) {
      setTimeout(() => {
        this.refs.bankCardId.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
      }, 1)
    } else {
      setTimeout(() => {
        this.refs.bankCardId.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
      }, 1)
    }
  },

  changeBankCard() {
    let selectionEnd = this.refs.bankCardId.selectionEnd;
    let bankCardId = this.refs.bankCardId.value;
    if (bankCardId != "") {
      let str = bankCardId.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
      this.setState({bankCardId: str});
    } else {
      this.setState({bankCardId});
    }
    switch (selectionEnd) {
      case 5:
        this.setSelectionRange(bankCardId, selectionEnd);
        break;
      case 10:
        this.setSelectionRange(bankCardId, selectionEnd);
        break;
      case 15:
        this.setSelectionRange(bankCardId, selectionEnd);
        break;
      case 20:
        this.setSelectionRange(bankCardId, selectionEnd);
        break;
      default:
        setTimeout(() => {
          this.refs.bankCardId.setSelectionRange(selectionEnd, selectionEnd);
        }, 1);
        break;
    }
    this.setState({bankCardLen: this.refs.bankCardId.value.length});
  },

  focusPhoneNum() {
    this.setState({
      phoneNumErr: false
    });
  },

  blurPhoneNum(phoneNum) {
    this.phoneNumCheck(phoneNum.replace(/ /g, ''));
  },

  changePhoneNum(phoneNum) {
    let str;
    if (phoneNum.length < 3) {
      this.setState({phoneNum});
    } else if (phoneNum.length < 8) {
      str = phoneNum.replace(/\s/g, '').replace(/(\d{3})(?=\d)/g, "$1 ");
      this.setState({phoneNum: str});
    } else {
      str = phoneNum.replace(/\s/g, '').replace(/(^\d{3}|\d{4}\B)/g, "$1 ");
      this.setState({phoneNum: str});
    }
  },

  phoneNumCheck(num) {
    const reg = /^1[0-9]{10}$/;
    if (reg.test(num)) {
      this.setState({phoneNumErr: false});
    } else {
      this.setState({phoneNumErr: true});
    }
  },

  getSmsCode() {
    const url = this.props.openAccountData.account.errorCode === 0
      ? '/myaccount/tl/bindCardSendsms'
      : '/myaccount/tl/createAccountSendsms'
    const {name, idCard, idCardErr, bankCardId, bankCardErr, phoneNum, phoneNumErr, selectedBank} = this.state;
    // console.log(name !== '', idCard !== '', bankCardId !== '', phoneNum !== '', selectedBank !== null, idCardErr !== true, bankCardErr !== true, phoneNumErr !== true);
    if (name !== '' && idCard !== '' && bankCardId !== '' && phoneNum !== '' && selectedBank !== null && idCardErr !== true && bankCardErr !== true && phoneNumErr !== true) {
      const data = {
        cardBindMobile: phoneNum.replace(/ /g, ''),
        bankCode: selectedBank.codeValue,
        bankCardNo: bankCardId.replace(/ /g, ''),
        realName: name,
        id5: idCard
      }
      let result = this.props.dispatch(openAccountActions.getOaSmsCode(url, data));
      result.then((data) => {
        if (data.errorCode !== 0) {
          if (data.errorMessage == 'noLogin') {
            location.href = "https://passport.huli.com/?backurl=https://www.huli.com/hl/#/collocation/openAccount"
          }
          this.setState({
            smsCodeErr: true,
            smsCodeErrMessage: data.errorMessage
          });
        }
      });
      this.setState({
        initGetSmsCode: false,
        smsCodeInfo: false,
        smsCodeErr: false
      });
    } else {
      this.setState({
        smsCodeInfo: true,
        smsCodeErr: false
      });
    }
  },

  blurSmsCode(smsCode) {
    this.setState({smsCode});
  },

  focusSmsCode() {
    this.setState({smsCodeErr: false});
  },

  focusPass() {
    this.setState({
      passErr: false
    });
  },

  blurPass(pass) {
    this.checkPass(pass);
  },

  changePass(pass) {
    this.setState({
      pass
    });
  },

  checkPass(pass) {
    const reg = /^([\w\.\@\!\#\$\%\^\&\*\(\)]){6,20}$/;
    if (reg.test(pass)) {
      this.setState({
        passErr: false
      });
    } else {
      this.setState({
        passErr: true
      });
    }
  },

  focusRePass() {
    this.setState({
      rePassErr: false
    });
  },

  blurRePass(rePass) {
    this.setState({rePass});
    this.rePassCheck(rePass);
  },

  rePassCheck(rePass) {
    if (rePass === this.state.pass) {
      this.setState({
        rePassErr: false
      });
    } else {
      this.setState({
        rePassErr: true
      });
    }
  },

  select() {
    this.setState({
      checkedProtocol: !this.state.checkedProtocol
    });
  },

  succConfirm() {
    this.setState({oaSuccess: false}, () => {
      userBaseActions.getUserBaseDirectCard();
      userBaseActions.getUserBaseUserStatus();
    });
    location.assign('https://www.huli.com/hl/#/myaccount/recharge/main');
  },

  examineInvest() {
    location.assign('https://www.huli.com/hl/#/invest/hy');
  },

  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  },

  goBack() {
      const backurl = this.getQueryString('backurl');
      const backhash = this.getQueryString('backhash');
      const urltype = this.getQueryString('urltype');
      if (backurl) {
        location.assign(backurl);
      } else {
        if (backhash) {
          if (urltype && urltype === 'syd') {
            location.assign('https://www.souyidai.com/p2p/#/' + backhash);
          } else {
            location.assign(backhash);
          }
        } else {
          location.assign('https://www.huli.com/myaccount/safecenter');
        }
      }
  },

  errorConfirm() {
    this.setState({oaError: false});
    this.submit();
  },

  submit() {
    // 当所有表单都不为空且错误信息为false
    const {name, nameErr, idCard, idCardErr, selectedBank, bankCardId, bankCardErr, phoneNum, phoneNumErr, smsCode, pass, passErr, rePass, rePassErr, initGetSmsCode, checkedProtocol} = this.state;
    if (this.state.isSetPass === false) {
      if (!nameErr && name !== '' && !idCardErr && idCard !== '' && selectedBank !== null && !bankCardErr && bankCardId !== '' && !phoneNumErr && phoneNum !== '' && smsCode !== '' && !passErr && pass !== '' && !rePassErr && rePass !== '' && initGetSmsCode === false && checkedProtocol === true) {
        const url = this.props.openAccountData.account.errorCode === 0
          ? '/myaccount/tl/bindCard'
          : '/myaccount/tl/id5AndBindCard';
        const data = this.props.openAccountData.account.errorCode === 0
          ? {
            cardBindMobile: phoneNum.replace(/ /g, ''),
            bankCode: selectedBank.codeValue,
            bankCardNo: bankCardId.replace(/ /g, ''),
            validCode: smsCode,
            newpassword: pass,
            confirmpassword: rePass
          }
          : {
            cardBindMobile: phoneNum.replace(/ /g, ''),
            bankCode: selectedBank.codeValue,
            bankCardNo: bankCardId.replace(/ /g, ''),
            realName: name,
            id5: idCard,
            validCode: smsCode,
            newpassword: pass,
            confirmpassword: rePass
          }
        let oaResult = this.props.dispatch(openAccountActions.submitOpenAccount(url, data));
        oaResult.then((data) => {
          data.errorCode === 0
            ? this.setState({oaSuccess: true})
            : data.errorCode === -2
              ? this.setState({oaError: true, oaErrMessage: data.errorMessage, oaErrBack: true})
              : this.setState({oaError: true, oaErrMessage: data.errorMessage})
          /*if (data.errorCode === 0) {
           debugger
           this.props.dispatch(userBaseActions.getUserBaseAccountInfo());
           debugger
           this.setState({ oaSuccess: true });
           debugger
           } else {
           this.setState({ oaError: true, oaErrMessage: data.errorMessage });
           }*/
        });
      } else {
        this.setState({messageErr: true});
        /*console.log(
          !nameErr,
          name !== '',
          !idCardErr,
          idCard !== '',
          selectedBank !== null,
          !bankCardErr,
          bankCardId !== '',
          !phoneNumErr,
          phoneNum !== '',
          smsCode !== '',
          !passErr,
          pass !== '',
          !rePassErr,
          rePass !== '',
          initGetSmsCode === false,
          checkedProtocol === true)
        console.log(111)
        console.log("name",name,"idCard",idCard)*/
        name === '' ? this.setState({nameErr: true}) : null;
        idCard === '' ? this.setState({idCardErr: true}) : null;
        selectedBank === null ? this.setState({selectBankErr: true}) : null
        bankCardId === '' ? this.setState({bankCardErr: true}) : null;
        phoneNum === '' ? this.setState({phoneNumErr: true}) : null
        smsCode === null || smsCode === '' ? this.setState({smsCodeErr: true, smsCodeErrMessage: '请输入验证码'}) : null
        pass === '' ? this.setState({passErr: true}) : null
        rePass === '' ? this.setState({rePassErr: true}) : null
      }
    } else {
      if (!nameErr && name !== '' && !idCardErr && idCard !== '' && selectedBank !== null && !bankCardErr && bankCardId !== '' && !phoneNumErr && phoneNum !== '' && smsCode !== '' && initGetSmsCode === false && checkedProtocol === true) {
        const url = this.props.openAccountData.account.errorCode === 0
          ? '/myaccount/tl/bindCard'
          : '/myaccount/tl/id5AndBindCard';
        const data = this.props.openAccountData.account.errorCode === 0
          ? {
            cardBindMobile: phoneNum.replace(/ /g, ''),
            bankCode: selectedBank.codeValue,
            bankCardNo: bankCardId.replace(/ /g, ''),
            validCode: smsCode,
            newpassword: pass,
            confirmpassword: rePass,
            agreementTypeStr: '3'
          }
          : {
            cardBindMobile: phoneNum.replace(/ /g, ''),
            bankCode: selectedBank.codeValue,
            bankCardNo: bankCardId.replace(/ /g, ''),
            realName: name,
            id5: idCard,
            validCode: smsCode,
            newpassword: pass,
            confirmpassword: rePass,
            agreementTypeStr: '2,3'
          }
        let oaResult = this.props.dispatch(openAccountActions.submitOpenAccount(url, data));
        oaResult.then((data) => {
          // data.errorCode === 0
          //   ? this.setState({ oaSuccess: true })
          //   : this.setState({ oaError: true, oaErrMessage: data.errorMessage })
          if (data.errorCode === 0) {
            this.setState({oaSuccess: true});
            // this.props.dispatch(userBaseActions.getUserBaseAccountInfo());
          } else if (data.errorCode === -2) {
            this.setState({oaError: true, oaErrMessage: data.errorMessage, oaErrBack: true});
          } else {
            this.setState({oaError: true, oaErrMessage: data.errorMessage});
          }
        });
      } else {
        this.setState({messageErr: true});
        /*console.log(
          !nameErr,
          name !== '',
          !idCardErr,
          idCard !== '',
          selectedBank !== null,
          !bankCardErr,
          bankCardId !== '',
          !phoneNumErr,
          phoneNum !== '',
          smsCode !== '',
          !passErr,
          pass !== '',
          !rePassErr,
          rePass !== '',
          initGetSmsCode === false,
          checkedProtocol === true);
        console.log(222)*/
        name === '' ? this.setState({nameErr: true}) : null;
        idCard === '' ? this.setState({idCardErr: true}) : null;
        selectedBank === null ? this.setState({selectBankErr: true}) : null
        bankCardId === '' ? this.setState({bankCardErr: true}) : null;
        phoneNum === '' ? this.setState({phoneNumErr: true}) : null
        smsCode === null || smsCode === '' ? this.setState({smsCodeErr: true, smsCodeErrMessage: '请输入验证码'}) : null
        pass === '' ? this.setState({passErr: true}) : null
        rePass === '' ? this.setState({rePassErr: true}) : null
      }
    }
  },

  confirm() {
    this.setState({messageErr: false});
  },

  closePopup() {
    this.setState({
      messageErr: false,
      oaSuccess: false,
      oaError: false
    });
  },

  render: function () {

    return (
      <DocumentTitle title='狐狸慧赚-开户'>
        <div className="myacoount-contain">
        <div className="myacoount-box cf">
          <div className="oa">
            <div className="oa-header">
              {
                this.props.openAccountData.account
                  ? this.props.openAccountData.account.errorCode === 0
                  ? "开通慧赚托管账户"
                  : "实名开户"
                  : null
              }
            </div>

            <div className="oa-body">
              {
                this.props.openAccountData.account
                  ? this.props.openAccountData.account.errorCode === 0
                  ? <div className="oa-form">
                    <div className="oa-info-red oa-margin-40">
                      <div className="huli-common-icons oa-info-icon"></div>
                      绑定后，慧赚账户下的快捷充值/取现操作都将使用该卡
                    </div>
                    <div className="oa-row">
                      <div className="oa-left">
                        真实姓名
                      </div>

                      <div className="oa-center-without-border">
                        {this.state.name}
                      </div>

                    </div>
                    <div className="oa-row">
                      <div className="oa-left">
                        身份证号
                      </div>

                      <div className="oa-center-without-border">
                        {this.state.idCard}
                      </div>
                    </div>

                    <div className="oa-row">
                      <div className="oa-left">
                        选择银行
                      </div>

                      <div className={
                        this.state.selectBankErr
                          ? "oa-center oa-input-error"
                          : this.state.bankListShow === true
                          ? "oa-center oa-border-blue"
                          : "oa-center"}>
                        <BankList
                          data={this.props.openAccountData.bankList}
                          clickBanks={this.clickBanks}
                          selectBank={this.selectBank}
                          selectedBank={this.state.selectedBank}
                        />
                      </div>

                      <div className="oa-right">
                        {
                          this.state.selectBankErr === true
                            ? <div className="oa-info">您未选择银行卡</div>
                            : null
                        }
                      </div>
                    </div>
                    <div className="oa-row">
                      <div className="oa-left">
                        银行卡号
                      </div>

                      <div className={this.state.bankCardLen > 0 && this.state.inputBankCard === true
                        ? "oa-center oa-input-card-blue"
                        : this.state.bankCardErr === true
                          ? "oa-center oa-input-error"
                          : "oa-center"}>
                        <div className="oa-card">
                          {
                            this.state.bankCardLen > 0 && this.state.inputBankCard === true
                              ? <div className="oa-card-show">{this.state.bankCardId}</div>
                              : null
                          }
                          <input
                            type="text"
                            className="oa-input"
                            placeholder="请输入银行卡号,仅支持借记卡"
                            maxLength={24}
                            value={this.state.bankCardId}
                            ref="bankCardId"
                            onFocus={this.focusBankCard}
                            onBlur={this.blurBankCard}
                            onChange={this.changeBankCard}
                          />
                        </div>
                      </div>

                      <div className="oa-right">
                        <div className="oa-info">
                          {
                            this.state.inputBankCard
                              ? <div className="oa-hint">
                              <div className="oa-triangle"></div>
                              <div className="oa-triangle-in"></div>
                              支持19位银行卡号码
                            </div>
                              : null
                          }
                          {
                            this.state.bankCardErr
                              ? <div className="oa-info">请输入有效借记卡卡号</div>
                              : null
                          }
                        </div>
                      </div>
                    </div>
                    <OAInput
                      name="银行预留手机号"
                      placeholder="请输入银行预留的手机号码"
                      info="支持11位手机号码"
                      err="请输入11位有效手机号码"
                      value={this.state.phoneNum}
                      maxLength="13"
                      isErr={this.state.phoneNumErr}
                      onFocus={this.focusPhoneNum}
                      onBlur={this.blurPhoneNum}
                      onChange={this.changePhoneNum}
                    />
                    <SmsCode
                      infoText="请完善上面信息"
                      isInfo={this.state.smsCodeInfo}
                      isErr={this.state.smsCodeErr}
                      errText={this.state.smsCodeErrMessage}
                      getSmsCode={this.getSmsCode}
                      focusSmsCode={this.focusSmsCode}
                      blurSmsCode={this.blurSmsCode}
                    />
                    {
                      this.state.isSetPass === false
                        ? <OAInput
                        name="设置交易密码"
                        placeholder="请输入交易密码"
                        type="password"
                        info="6-20位,支持数字、字母、英文符号"
                        err="密码格式错误"
                        isErr={this.state.passErr}
                        onFocus={this.focusPass}
                        onBlur={this.blurPass}
                        onChange={this.changePass}
                      />
                        : null
                    }
                    {
                      this.state.isSetPass === false
                        ? <OAInput
                        name="确认交易密码"
                        placeholder="请再次输入交易密码"
                        type="password"
                        info="请再次输入交易密码"
                        err="密码与上面不一致，请重试！"
                        isErr={this.state.rePassErr}
                        onFocus={this.focusRePass}
                        onBlur={this.blurRePass}
                      />
                        : null
                    }

                    <div className="oa-text">
                      <div className={this.state.checkedProtocol === true
                        ? "oa-checked huli-common-icons"
                        : "oa-ckeck huli-common-icons"}
                           onClick={this.select}></div>
                      <span className="oa-text-ctx">我已阅读并同意</span>
                      <a className="oa-link" target="_blank" href={this.props.state.userBase.pageUrl.tlzf}>《通联支付授权书》、</a>
                      <a className="oa-link" target="_blank" href={this.props.state.userBase.pageUrl.zffw}>《支付服务协议》</a>
                    </div>

                    <div className="oa-text">
                      <div className="oa-company-logo">
                        <div className="oa-icon-logo1"></div>
                      </div>
                    </div>

                    <div className="oa-text">
                      {
                        this.state.checkedProtocol === true
                          ? <div className="oa-button blue-btn" onClick={this.submit}>确认开户</div>
                          : <div className="oa-button gray-btn">确认开户</div>
                      }
                    </div>
                    <div className="oa-text">温馨提示：开户过程中如遇问题请致电客服：400-817-8877</div>
                  </div> // 已注册
                  : <div className="oa-form">

                    <div className="oa-label-row">
                      <div className="oa-left">
                        <div className="oa-label">
                          用户信息
                        </div>
                      </div>
                    </div>
                    <OAInput
                      name="真实姓名"
                      placeholder="请输入真实姓名"
                      info="您的真实姓名"
                      isErr={this.state.nameErr}
                      err="姓名不能为空"
                      onFocus={this.focusName}
                      onBlur={this.blurName}
                      onChange={this.changeName}
                    />
                    <OAInput
                      name="身份证号"
                      placeholder="请输入二代身份证号码"
                      info="仅支持18位"
                      err="请输入18位二代身份证号码"
                      isErr={this.state.idCardErr}
                      onFocus={this.focusIdCard}
                      onBlur={this.blurIdCard}
                      onChange={this.changeIdCard}
                    />

                    <div className="oa-label-row">
                      <div className="oa-left">
                        <div className="oa-label">
                          银行卡信息
                        </div>
                      </div>
                    </div>
                    <div className="oa-row">
                      <div className="oa-left">
                        选择银行
                      </div>

                      <div className={
                        this.state.selectBankErr
                          ? "oa-center oa-input-error"
                          : this.state.bankListShow === true
                          ? "oa-center oa-border-blue"
                          : "oa-center"}>
                        <BankList
                          data={this.props.openAccountData.bankList}
                          clickBanks={this.clickBanks}
                          selectBank={this.selectBank}
                          selectedBank={this.state.selectedBank}
                        />
                      </div>

                      <div className="oa-right">
                        {
                          this.state.selectBankErr === true
                            ? <div className="oa-info">您未选择银行卡</div>
                            : null
                        }
                      </div>
                    </div>
                    <div className="oa-row">
                      <div className="oa-left">
                        银行卡号
                      </div>

                      <div className={this.state.bankCardLen > 0 && this.state.inputBankCard === true
                        ? "oa-center oa-input-card-blue"
                        : this.state.bankCardErr === true
                          ? "oa-center oa-input-error"
                          : "oa-center"}>
                        <div className="oa-card">
                          {
                            this.state.bankCardLen > 0 && this.state.inputBankCard === true
                              ? <div className="oa-card-show">{this.state.bankCardId}</div>
                              : null
                          }
                          <input
                            type="text"
                            className="oa-input"
                            placeholder="请输入银行卡号,仅支持借记卡"
                            maxLength={24}
                            value={this.state.bankCardId}
                            ref="bankCardId"
                            onFocus={this.focusBankCard}
                            onBlur={this.blurBankCard}
                            onChange={this.changeBankCard}
                          />
                        </div>
                      </div>

                      <div className="oa-right">
                        <div className="oa-info">
                          {
                            this.state.inputBankCard
                              ? <div className="oa-hint">
                              <div className="oa-triangle"></div>
                              <div className="oa-triangle-in"></div>
                              支持19位银行卡号码
                            </div>
                              : null
                          }
                          {
                            this.state.bankCardErr
                              ? <div className="oa-info">请输入有效借记卡卡号</div>
                              : null
                          }
                        </div>
                      </div>
                    </div>
                    <OAInput
                      name="银行预留手机号"
                      placeholder="请输入银行预留的手机号码"
                      value={this.state.phoneNum}
                      info="支持11位手机号码"
                      err="请输入11位有效手机号码"
                      isErr={this.state.phoneNumErr}
                      onFocus={this.focusPhoneNum}
                      onBlur={this.blurPhoneNum}
                      onChange={this.changePhoneNum}
                    />
                    <SmsCode
                      infoText="请完善上面信息"
                      isInfo={this.state.smsCodeInfo}
                      isErr={this.state.smsCodeErr}
                      errText={this.state.smsCodeErrMessage}
                      getSmsCode={this.getSmsCode}
                      focusSmsCode={this.focusSmsCode}
                      blurSmsCode={this.blurSmsCode}
                    />
                    <OAInput
                      name="设置交易密码"
                      placeholder="请输入交易密码"
                      type="password"
                      info="6-20位,支持数字、字母、英文符号"
                      err="密码格式错误"
                      isErr={this.state.passErr}
                      onFocus={this.focusPass}
                      onBlur={this.blurPass}
                      onChange={this.changePass}
                    />
                    <OAInput
                      name="确认交易密码"
                      placeholder="请再次输入交易密码"
                      type="password"
                      info="请再次输入交易密码"
                      err="密码与上面不同，请重试!"
                      isErr={this.state.rePassErr}
                      onFocus={this.focusRePass}
                      onBlur={this.blurRePass}
                    />

                    <div className="oa-text">
                      <div className={this.state.checkedProtocol === true
                        ? "oa-checked huli-common-icons"
                        : "oa-ckeck huli-common-icons"}
                           onClick={this.select}></div>
                      <span className="oa-text-ctx">我已阅读并同意</span>
                      <a className="oa-link"
                         target="_blank"
                         href={this.props.state.userBase.pageUrl.tlzf}>
                        《通联支付授权书》、
                      </a>
                      <a className="oa-link"
                         target="_blank"
                         href={this.props.state.userBase.pageUrl.zffw}>
                        《支付服务协议》、
                      </a>
                      <a className="oa-link"
                         target="_blank"
                         href={this.props.state.userBase.pageUrl.sydhxcg}>
                        《搜易贷华夏银行存管授权》
                      </a>
                    </div>

                    <div className="oa-text">
                      <div className="oa-company-logo">
                        <div className="oa-icon-logo1"></div>
                        <div className="oa-icon-logo2"></div>
                      </div>
                    </div>

                    <div className="oa-text">
                      {
                        this.state.checkedProtocol === true
                          ? <div className="oa-button blue-btn" onClick={this.submit}>确认开户</div>
                          : <div className="oa-button gray-btn">确认开户</div>
                      }
                    </div>
                    <div className="oa-text">温馨提示：开户过程中如遇问题请致电客服：400-817-8877</div>
                  </div> // 未注册
                  : <div className="oa-blank-page"></div>
              }
            </div>
          </div>
        </div>

        {
          this.state.messageErr === true
            ? <Popup title="提示"
                     submitText="确定"
                     submitFn={this.confirm}
                     hasCancel={false}
                     closePopup={this.closePopup}>
            <CcResult context={{title: '您的信息不完整'}}></CcResult>
          </Popup>
            : null
        }

        {
          this.state.oaSuccess === true
            ? <Popup title="实名开户"
                     submitText="去充值"
                     submitFn={this.succConfirm}
                     cancelText="查看投资项目"
                     cancelClick={this.examineInvest}
                     closePopup={this.goBack}>
            <CcResult context={{isSuccess: true, title: '恭喜您开户成功'}}></CcResult>
          </Popup>
            : null
        }

        {
          <Popup title="实名开户"
                 hasSubmit={false}
                 submitFn={this.errorConfirm}
                 isShow={this.state.oaError}
                 cancelText="返回"
                 closePopup={this.state.oaErrBack ? this.toSafeCenter : this.closePopup}>
            <CcResult context={{title: '开户失败', message: this.state.oaErrMessage, hasHelp: true}}></CcResult>
          </Popup>
        }
      </div>
      </DocumentTitle>
    )
  }
});

function mapStateToProps(state) {
  return {
    openAccountData: state.openAccountData,
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export const OpenAccount = connect(
  mapStateToProps,
  mapDispatchToProps
)(OA);

