const React = require('react');
const connect = require('react-redux').connect;
const changeCardAction = require('../../reducers/collocation/changeCardAction');
const popupActions = require('../../reducers/popup/popupActions');
const BankList = require('./bankList').BankList;
const OAInput = require('./oaRow').OAInput;
const SmsCode = require('./smsCode').SmsCode;
const Popup = require('../popup/index.popup').Popup;
const CcResult = require('../popup/cc-result.component').CcResult;
const DocumentTitle = require('react-document-title');


const CC = React.createClass({
  getInitialState() {
    return {
      // 第0步
      name: '',
      nameErr: false,

      idCard: '',
      idCardErr: false,

      inputOldBankCard: false,
      oldBankCardId: '',
      oldBankCardErr: false,
      oldBankCardLen: 0,

      oldPass: '',
      oldPassErr: false,

      oldSmsCode: null,
      oldSmsCodeInfo: false,
      oldSmsCodeErr: false,
      oldSmsCodeErrMessage: '',
      initGetNewSmsCode: true,

      smsErr0: false,
      smsErrMessage0: '',
      verifySmsCodeErr0: false,
      verifySmsCodeErrMessage0: '',

      // 第1步
      selectBank: null,
      selectBankErr: false,
      bankListShow: false,
      selectedBank: null,

      inputNewBankCard: false,
      newBankCardId: '',
      newBankCardErr: false,
      newBankCardLen: 0,

      newPhoneNum: '',
      newPhoneNumErr: false,

      newSmsCode: null,
      newSmsCodeInfo: false,
      newSmsCodeErr: false,
      newSmsCodeErrMessage: '',
      initGetNewSmsCode: true,

      smsErr1: false,
      smsErrMessage1: '',
      verifySmsCodeErr1: false,
      verifySmsCodeErrMessage1: '',

      verifySmsCodeSucc: false,

      checkedProtocol: false
    }
  },

  componentDidMount() {
    this.props.dispatch(changeCardAction.initStep());
    this.props.dispatch(changeCardAction.getCCBankList('/myaccount/tl/bankList'));
  },
  // 第0步
  focusName() {
    this.setState({
      inputName: true,
      nameErr: false
    });
  },

  blurName(data) {
    this.setState({inputName: false});
    if (data.length === 0) {
      this.setState({ nameErr: true });
    }
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
    this.checkIdCard(idCard);
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

  changeIdCard(idCard) {
    this.setState({
      idCard
    });
  },

  focusOldBankCard() {
    this.setState({inputOldBankCard: true});
    this.setState({oldBankCardErr: false});
  },

  blurOldBankCard() {
    this.setState({inputOldBankCard: false});
    const bancCardId = this.state.oldBankCardId.replace(/ /g, '');
    this.oldLuhnCheck(bancCardId);
  },

  // ++++ ndev环境不加校验，上nrc再校验
  /*oldLuhnCheck(bankno) {
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
      this.setState({oldBankCardErr: false});
    } else {
      this.setState({oldBankCardErr: true});
    }
    if (bankno.length === 0) {
      this.setState({oldBankCardErr: true});
    }
  },*/

  oldLuhnCheck(bankno) {
    this.setState({oldBankCardErr: false});
  },

  setSelectionRangeOld(bankCardId, selectionEnd) {
    if (bankCardId.length < this.state.oldBankCardLen) {
      setTimeout(() => {
        this.refs.oldBankCardId.setSelectionRange(selectionEnd-1, selectionEnd-1);
      }, 1)
    } else {
      setTimeout(() => {
        this.refs.oldBankCardId.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
      },1)
    }
  },

  changeOldBankCard() {
    let selectionEnd = this.refs.oldBankCardId.selectionEnd;
    let oldBankCardId = this.refs.oldBankCardId.value;
    if (oldBankCardId != "") {
      let str = oldBankCardId.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
      this.setState({ oldBankCardId: str });
    } else {
      this.setState({oldBankCardId});
    }
    switch (selectionEnd){
      case 5:
        this.setSelectionRangeOld(oldBankCardId, selectionEnd);
        break;
      case 10:
        this.setSelectionRangeOld(oldBankCardId, selectionEnd);
        break;
      case 15:
        this.setSelectionRangeOld(oldBankCardId, selectionEnd);
        break;
      case 20:
        this.setSelectionRangeOld(oldBankCardId, selectionEnd);
        break;
      default:
        setTimeout(() => {
          this.refs.oldBankCardId.setSelectionRange(selectionEnd, selectionEnd);
        }, 1);
        break;
    }
    this.setState({ oldBankCardLen: this.refs.oldBankCardId.value.length });
  },

  focusOldPass() {
    this.setState({
      oldPassErr: false
    });
  },

  blurOldPass(oldPass) {
    this.setState({
      oldPass
    });
  },

  changeOldPass(oldPass) {
    this.setState({
      oldPass
    });
  },

  getSmsCode0() {
    this.setState({
      smsErr0: false,
      oldSmsCodeErr: false
    });
    const url = '/myaccount/tl/validCardDetailSendSms';
    const { name, idCard, idCardErr, oldBankCardId, oldBankCardErr, oldPass } = this.state;
    if (name !== '' && idCard !== '' && oldBankCardId !== '' && oldPass !== '' && idCardErr !== true && oldBankCardErr !== true) {
      this.setState({
        initGetOldSmsCode: false,
        oldSmsCodeInfo: false
      });
      let result = this.props.dispatch(changeCardAction.getSmsCode0(url));
      result.then((data) => {
        if (data.errorCode === 1) {
          this.setState({
            smsErr0: true,
            smsErrMessage0: data.errorMessage
          });
        }
      });
    } else {
      this.setState({
        oldSmsCodeInfo: true
      });
    }
  },

  focusSmsCode0() {

  },

  blurSmsCode0(oldSmsCode) {
    this.setState({ oldSmsCode });
  },

  nextStep() {
    this.setState({ verifySmsCodeErr0: false });
    const { name, idCard, idCardErr, oldBankCardId, oldBankCardErr, oldPass, oldSmsCode } = this.state;
    if (name !== '' && idCard !== '' && oldBankCardId !== '' && oldPass !== '' && idCardErr !== true && oldBankCardErr !== true && oldSmsCode !== '') {
      const url = '/myaccount/tl/changeCardValidsms';
      const data = {
        realName: name,
        id5: idCard,
        oldCardNo: oldBankCardId.replace(/ /g, ''),
        paypassword: oldPass,
        smscode: this.state.oldSmsCode
      };
      let result = this.props.dispatch(changeCardAction.getVerifySmsCode0(url, data));
      result.then((data) => {
        if (data.errorCode !== 0) {
          this.setState({
            verifySmsCodeErr0: true,
            verifySmsCodeErrMessage0: data.errorMessage
          });
        }
      });
    } else {
      this.setState({ messageErr: true });
      name === '' ? this.setState({ nameErr: true }) : null;
      idCard === '' ? this.setState({ idCardErr: true }) : null;
      oldBankCardId === '' ? this.setState({ oldBankCardErr: true }) : null;
      oldPass === '' ? this.setState({ oldPassErr: true }) : null;
      oldSmsCode === '' || oldSmsCode === null ? this.setState({ oldSmsCodeErr: true, oldSmsCodeErrMessage: '您的验证码不能为空' }) : null;
    }
  },

  closePopup(){
    this.setState({
      messageErr: false,
      smsErr0: false,
      verifySmsCodeErr0: false,
      smsErr1: false,
      verifySmsCodeSucc: false,
      verifySmsCodeErr1: false
    });
  },

  // 第一步

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

  focusNewBankCard() {
    this.setState({inputNewBankCard: true});
    this.setState({newBankCardErr: false});
  },

  blurNewBankCard() {
    this.setState({ inputNewBankCard: false });
    const bancCardId = this.state.newBankCardId.replace(/ /g, '');
    this.newLuhnCheck(bancCardId);
  },

  // ++++ ndev测试
  /*newLuhnCheck(bankno) {
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
      this.setState({newBankCardErr: false});
    } else {
      this.setState({newBankCardErr: true});
    }

    if (bankno.length === 0) {
      this.setState({ newBankCardErr: true });
    }
  },*/

  newLuhnCheck(bankno) {
    this.setState({newBankCardErr: false});
  },

  changeNewBankCard() {
    let newBankCardId = this.refs.newBankCardId.value;
    if (newBankCardId != "" && newBankCardId.length > 4) {
      let str = newBankCardId.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
      this.setState({ newBankCardId: str });
    } else {
      this.setState({ newBankCardId });
    }
  },

  focusNewPhoneNum() {
    this.setState({
      newPhoneNumErr: false
    });
  },

  blurNewPhoneNum(newPhoneNum) {
    this.newPhoneNumCheck(newPhoneNum.replace(/ /g, ''));
  },

  changeNewPhoneNum(newPhoneNum) {
    let str;
    if (newPhoneNum.length < 3) {
      this.setState({ newPhoneNum });
    } else if (newPhoneNum.length < 8) {
      str = newPhoneNum.replace(/\s/g, '').replace(/(\d{3})(?=\d)/g, "$1 ");
      this.setState({ newPhoneNum: str });
    } else {
      str = newPhoneNum.replace(/\s/g, '').replace(/(^\d{3}|\d{4}\B)/g, "$1 ");
      this.setState({ newPhoneNum: str });
    }
  },

  newPhoneNumCheck(num) {
    const reg = /^1[0-9]{10}$/;
    if (reg.test(num)) {
      this.setState({ newPhoneNumErr: false });
    } else {
      this.setState({ newPhoneNumErr: true });
    }
  },

  setSelectionRangeNew(bankCardId, selectionEnd) {
    if (bankCardId.length < this.state.newBankCardLen) {
      setTimeout(() => {
        this.refs.newBankCardId.setSelectionRange(selectionEnd-1, selectionEnd-1);
      }, 1)
    } else {
      setTimeout(() => {
        this.refs.newBankCardId.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
      },1)
    }
  },

  changeNewBankCard() {
    let selectionEnd = this.refs.newBankCardId.selectionEnd;
    let newBankCardId = this.refs.newBankCardId.value;
    if (newBankCardId != "") {
      let str = newBankCardId.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
      this.setState({ newBankCardId: str });
    } else {
      this.setState({newBankCardId});
    }
    switch (selectionEnd){
      case 5:
        this.setSelectionRangeNew(newBankCardId, selectionEnd);
        break;
      case 10:
        this.setSelectionRangeNew(newBankCardId, selectionEnd);
        break;
      case 15:
        this.setSelectionRangeNew(newBankCardId, selectionEnd);
        break;
      case 20:
        this.setSelectionRangeNew(newBankCardId, selectionEnd);
        break;
      default:
        setTimeout(() => {
          this.refs.newBankCardId.setSelectionRange(selectionEnd, selectionEnd);
        }, 1);
        break;
    }
    this.setState({ newBankCardLen: this.refs.newBankCardId.value.length });
  },

  getSmsCode1() {
    this.setState({
      smsErr1: false,
      newSmsCodeErr: false
  });
    let url = '/myaccount/tl/changeBankCardSendSms';
    const { newBankCardId, newBankCardErr, newPhoneNum, newPhoneNumErr, selectedBank } = this.state;
    if (newBankCardId !== '' && newPhoneNum !== '' && newBankCardErr !== true && newPhoneNumErr !== true && selectedBank !== null) {
      let data = {
        cardBindMobile: newPhoneNum.replace(/ /g, ''),
        bankCode: selectedBank.codeValue,
        bankCardNo: newBankCardId.replace(/ /g, '')
      };
      let result = this.props.dispatch(changeCardAction.getSmsCode1(url, data));
      result.then((data) => {
        if (data.errorCode === 1) {
          this.setState({
            smsErr1: true,
            smsErrMessage1: data.errorMessage,
            newSmsCodeErr: true,
            newSmsCodeErrMessage: data.errorMessage
          });
        }
      });
      this.setState({
        initGetNewSmsCode: false,
        newSmsCodeInfo: false
      });
    } else {
      this.setState({
        newSmsCodeInfo: true
      });
    }
  },

  focusSmsCode1() {
    this.setState({ newSmsCodeErr: false });
  },

  blurSmsCode1(newSmsCode) {
    this.setState({ newSmsCode });
  },

  select() {
    this.setState({
      checkedProtocol: !this.state.checkedProtocol
    });
  },

  verifyChangeCard() {
    const { newBankCardId, newBankCardErr, newPhoneNum, newPhoneNumErr, selectedBank, newSmsCode, initGetNewSmsCode, checkedProtocol } = this.state;
    if (newBankCardId !== '' && newPhoneNum !== '' && newBankCardErr !== true && newPhoneNumErr !== true && selectedBank !== null && newSmsCode !== '' && initGetNewSmsCode === false && checkedProtocol === true) {
      let url = '/myaccount/tl/changeBankCardValidSms';
      let data = {
        cardBindMobile: newPhoneNum.replace(/ /g, ''),
        bankCode: selectedBank.codeValue,
        bankCardNo: newBankCardId.replace(/ /g, ''),
        validCode: newSmsCode
      }
      let result = this.props.dispatch(changeCardAction.getVerifySmsCode1(url, data));
      result.then((data) => {
        if (data.errorCode === 0) {
          this.setState({
            verifySmsCodeSucc: true
          });
        } else {
          this.setState({
            verifySmsCodeErr1: true,
            verifySmsCodeErrMessage1: data.errorMessage
          });
        }
      });
    } else {
      this.setState({ messageErr: true });
      console.log(
        newBankCardId !== '' ,
        newPhoneNum !== '' ,
        newBankCardErr !== true ,
        newPhoneNumErr !== true ,
        selectedBank !== null ,
        newSmsCode !== '' ,
        initGetNewSmsCode === false,
        checkedProtocol === true
      )
      newBankCardId === '' ? this.setState({ newBankCardErr: true }) : null;
      newPhoneNum === '' ? this.setState({ newPhoneNumErr: true }) : null;
      selectedBank === null ? this.setState({ selectBankErr: true }) : null;
      newSmsCode === '' || newSmsCode === null ? this.setState({ newSmsCodeErr: true, newSmsCodeErrMessage: '请输入验证码！' }) : null;

    }
  },

  changeCardSucc() {
    location.assign('https://www.huli.com/hl/#/myaccount/bankCard');
  },

  render: function () {
    return (
      <DocumentTitle title='狐狸慧赚-更换银行卡'>
        <div className="myacoount-contain">
        <div className="myacoount-box cf">
          <div className="oa">
            <div className="oa-header">
              更换慧赚银行卡
            </div>
            <div className="oa-body">
              <div className="cc-step cf">
                <div className="cc-step-row">
                  <div className="cc-step-block1">
                    <div className="cc-step-circle">1</div>
                    <div className="cc-step-text">原卡信息确认</div>
                  </div>
                  <div className="cc-step-line">
                    <div className={
                      this.props.changeCardData.step === 0
                        ? "cc-step-line-inner1"
                        : "cc-step-line-inner2"
                    }>
                      <div className="cc-step-line-left"></div>
                      <div className="cc-step-line-right"></div>
                    </div>
                  </div>
                  <div className={
                    this.props.changeCardData.step === 0
                      ? "cc-step-block2"
                      : "cc-step-block3"
                  }>
                    <div className="cc-step-circle">2</div>
                    <div className="cc-step-text">绑定新银行卡</div>
                  </div>
                </div>
              </div>
              {
                this.props.changeCardData.step === 0
                  ? <div className="oa-form">

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
                    err="您的身份证号码输入错误"
                    isErr={this.state.idCardErr}
                    onFocus={this.focusIdCard}
                    onBlur={this.blurIdCard}
                    onChange={this.changeIdCard}
                  />

                  <div className="oa-row">
                    <div className="oa-left">
                      原银行卡号
                    </div>

                    <div className={this.state.oldBankCardLen > 0 && this.state.inputOldBankCard === true
                      ? "oa-center oa-input-card-blue"
                      : this.state.oldBankCardErr === true
                        ? "oa-center oa-input-error"
                        : "oa-center"}>
                      <div className="oa-card">
                        {
                          this.state.oldBankCardLen > 0　&& this.state.inputOldBankCard === true
                            ? <div className="oa-card-show">{this.state.oldBankCardId}</div>
                            : null
                        }
                        <input
                          type="text"
                          className="oa-input"
                          placeholder="请输入银行卡号,仅支持借记卡"
                          maxLength="23"
                          value={this.state.oldBankCardId}
                          ref="oldBankCardId"
                          onFocus={this.focusOldBankCard}
                          onBlur={this.blurOldBankCard}
                          onChange={this.changeOldBankCard}
                        />
                      </div>
                    </div>

                    <div className="oa-right">
                      <div className="oa-info">
                        {
                          this.state.inputOldBankCard
                            ? <div className="oa-hint">
                            <div className="oa-triangle"></div>
                            <div className="oa-triangle-in"></div>
                            支持19位银行卡号码
                          </div>
                            : null
                        }
                        {
                          this.state.oldBankCardErr
                            ? <div className="oa-info">请输入有效借记卡卡号</div>
                            : null
                        }
                      </div>
                    </div>
                  </div>

                  <OAInput
                    name="原交易密码"
                    placeholder="请输入原交易密码"
                    type="password"
                    info="请输入原交易密码"
                    err="密码错误"
                    isErr={this.state.oldPassErr}
                    onFocus={this.focusOldPass}
                    onBlur={this.blurOldPass}
                    onChange={this.changeOldPass}
                  />

                  <SmsCode
                    infoText="请完善上面信息"
                    isInfo={this.state.oldSmsCodeInfo}
                    isErr={this.state.oldSmsCodeErr}
                    errText={this.state.oldSmsCodeErrMessage}
                    getSmsCode={this.getSmsCode0}
                    blurSmsCode={this.blurSmsCode0}
                  />

                  <div className="oa-text">
                    <div className="oa-button blue-btn" onClick={this.nextStep}>下一步</div>
                  </div>
                  <div className="oa-text">温馨提示：换卡过程中如遇问题请致电客服：400-817-8877</div>
                </div>
                  : null
              }
              {
                this.props.changeCardData.step === 1
                  ? <div className="oa-form">
                  <div className="oa-row">
                    <div className="oa-info-red">
                      <div className="huli-common-icons oa-info-icon"></div>
                      绑定后，慧赚账户下的快捷充值/取现操作都将使用该卡
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
                        data={this.props.changeCardData.bankList}
                        clickBanks={this.clickBanks}
                        selectBank={this.selectBank}
                      />
                    </div>

                    <div className="oa-right">
                      {
                        this.state.selectBankErr
                          ? <div className="oa-info">请选择银行卡</div>
                          : null
                      }
                    </div>
                  </div>
                  <div className="oa-row">
                    <div className="oa-left">
                      银行卡号
                    </div>

                    <div className={this.state.inputNewBankCard === true
                      ? "oa-center oa-input-card-blue"
                      : this.state.newBankCardErr === true
                        ? "oa-center oa-input-error"
                        : "oa-center"}>
                      <div className="oa-card">
                        {
                          this.state.newBankCardLen > 0 && this.state.inputNewBankCard === true
                            ? <div className="oa-card-show">{this.state.newBankCardId}</div>
                            : null
                        }
                        <input
                          type="text"
                          className="oa-input"
                          maxLength={23}
                          placeholder="请输入银行卡号,仅支持借记卡"
                          value={this.state.newBankCardId}
                          ref="newBankCardId"
                          onFocus={this.focusNewBankCard}
                          onBlur={this.blurNewBankCard}
                          onChange={this.changeNewBankCard}
                        />
                      </div>
                    </div>

                    <div className="oa-right">
                      <div className="oa-info">
                        {
                          this.state.inputNewBankCard
                            ? <div className="oa-hint">
                            <div className="oa-triangle"></div>
                            <div className="oa-triangle-in"></div>
                            支持19位银行卡号码
                          </div>
                            : null
                        }
                        {
                          this.state.newBankCardErr
                            ? <div className="oa-info">请输入有效借记卡卡号</div>
                            : null
                        }
                      </div>
                    </div>
                  </div>
                  <OAInput
                    name="新银行预留手机号"
                    placeholder="请输入银行预留的手机号码"
                    info="支持11位手机号码"
                    err="请输入11位有效手机号码"
                    maxLength="13"
                    value={this.state.newPhoneNum}
                    isErr={this.state.newPhoneNumErr}
                    onFocus={this.focusNewPhoneNum}
                    onBlur={this.blurNewPhoneNum}
                    onChange={this.changeNewPhoneNum}
                  />
                  <SmsCode
                    infoText="请完善上面信息"
                    isInfo={this.state.newSmsCodeInfo}
                    errText={this.state.newSmsCodeErrMessage}
                    isErr={this.state.newSmsCodeErr}
                    getSmsCode={this.getSmsCode1}
                    focusSmsCode={this.focusSmsCode1}
                    blurSmsCode={this.blurSmsCode1}
                  />

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
                    {
                      this.state.checkedProtocol === true
                        ? <div className="oa-button blue-btn" onClick={this.verifyChangeCard}>确认更换</div>
                        : <div className="oa-button gray-btn" >确认更换</div>
                    }

                  </div>
                </div>
                  : null
              }
            </div>
          </div>
        </div>
        {
          this.state.messageErr === true
            ? <Popup title="提示"
                     submitText="确定"
                     submitFn={this.closePopup}
                     hasCancel={false}
                     closePopup={this.closePopup}>
            <CcResult context={{ title: '您的信息不完整' }}></CcResult>
          </Popup>
            : null
        }

        {
          this.state.smsErr0 === true
            ? <Popup title="更换慧赚银行卡"
                     hasSubmit={false}
                     cancelText="返回"
                     closePopup={this.closePopup}>
            <CcResult context={{ title: this.state.smsErrMessage0, hasHelp: true }}></CcResult>
          </Popup>
            : null
        }

        {
          this.state.verifySmsCodeErr0 === true
            ? <Popup title="更换慧赚银行卡"
                     submitFn={this.succConfirm}
                     hasSubmit={false}
                     cancelText="返回"
                     closePopup={this.closePopup}>
            <CcResult context={{ title: this.state.verifySmsCodeErrMessage0, hasHelp: true }}></CcResult>
          </Popup>
            : null
        }

        {
          this.state.smsErr1 === true
            ? <Popup title="更换慧赚银行卡"
                     hasSubmit={false}
                     cancelText="返回"
                     closePopup={this.closePopup}>
            <CcResult context={{ title: this.state.smsErrMessage1, hasHelp: true }}></CcResult>
          </Popup>
            : null
        }

        {
          this.state.verifySmsCodeSucc === true
            ? <Popup title="更换慧赚银行卡"
                     submitText="确认"
                     submitFn={this.changeCardSucc}
                     hasCancel={false}
                     closePopup={this.closePopup}>
            <CcResult context={{ title: '恭喜您换卡成功！', isSuccess: true }}></CcResult>
          </Popup>
            : null
        }

        {
          this.state.verifySmsCodeErr1 === true
            ? <Popup title="更换慧赚银行卡"
                     hasSubmit={false}
                     submitFn={this.closePopup}
                     cancelText="返回"
                     closePopup={this.closePopup}>
            <CcResult context={{ title: '抱歉，本次换卡未成功！', message: this.state.verifySmsCodeErrMessage1 }}></CcResult>
          </Popup>
            : null
        }
      </div>
      </DocumentTitle>
    )
  }
});

function mapStateToProps(state) {
  return {
    changeCardData: state.changeCardData,
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export const ChangeCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(CC);