const React = require('react');
const connect = require('react-redux').connect;
const openAccountActions = require('../../reducers/collocation/openAccountActions');
const bankCardActions = require('../../reducers/myaccount/bankCard/bankCardActions');
const BankList = require('../collocation/bankList').BankList;

const BC = React.createClass({
  getInitialState() {
    return {
      bankListShow: false,
      smsCodeInfo: false,

      selectedBank: null,
      inputBankCard: false,
      bankCardId: '',
      bankCardErr: false,
      bankCardLen: 0,

      checkedProtocol: false
    }
  },

  // 若慧赚银行卡有卡，搜易贷取现卡默认选项为慧赚卡信息

  componentDidMount() {
    this.props.setSubmitDisabled(true);
    this.props.dispatch(openAccountActions.getOaBankList('/myaccount/tl/withDrawBankList'));
    this.props.dispatch(bankCardActions.isSydValidCodeErr(null));
    const { lcCard, hasLC } = this.props.bankCardData.bankList;
    if (hasLC === true) {
      this.selectBank(lcCard.bankCode, lcCard.bankName);
      this.setState({
        bankCardId: lcCard.cardId.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ")
      });
      this.props.dispatch(bankCardActions.setSydCardId(lcCard.cardId));
      this.props.dispatch(bankCardActions.setSydCardIdErr(false));
    }
  },

  clickBanks(bank) {
    this.setState({
      bankListShow: bank
    });
  },

  selectBank(codeValue, codeName) {
    this.props.dispatch(bankCardActions.setSydCardType(codeValue));
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
    this.props.bankCardData.sydBankCard.isValidCodeErr !== null
      ? this.props.dispatch(bankCardActions.isSydValidCodeErr(false))
      : null
  },

  blurBankCard() {
    this.setState({inputBankCard: false});
    const bancCardId = this.state.bankCardId.replace(/ /g, '');
    this.luhnCheck(bancCardId);
    this.props.dispatch(bankCardActions.setSydCardId(bancCardId));
  },

/*
  luhnCheck(bankno) {
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
      this.setState({bankCardErr: false});
      this.props.dispatch(bankCardActions.setSydCardIdErr(false));
    } else {
      this.setState({bankCardErr: true});
      this.props.dispatch(bankCardActions.setSydCardIdErr(true));
    }
  },
*/

  luhnCheck(bankno) {
    this.setState({ bankCardErr: false });
    this.props.dispatch(bankCardActions.setSydCardIdErr(false));
  },

  setSelectionRange(bankCardId, selectionEnd) {
    if (bankCardId.length < this.state.bankCardLen) {
      setTimeout(() => {
        this.refs.bankCardId.setSelectionRange(selectionEnd-1, selectionEnd-1);
      }, 1)
    } else {
      setTimeout(() => {
        this.refs.bankCardId.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
      },1)
    }
  },

  changeBankCard() {
    let selectionEnd = this.refs.bankCardId.selectionEnd;
    let bankCardId = this.refs.bankCardId.value;
    if (bankCardId != "") {
      let str = bankCardId.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
      this.setState({ bankCardId: str });
    } else {
      this.setState({bankCardId});
    }
    switch (selectionEnd){
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
      case 25:
        this.setSelectionRange(bankCardId, selectionEnd);
        break;
      case 30:
        this.setSelectionRange(bankCardId, selectionEnd);
        break;
      default:
        setTimeout(() => {
          this.refs.bankCardId.setSelectionRange(selectionEnd, selectionEnd);
        }, 1);
        break;
    }
    this.setState({ bankCardLen: this.refs.bankCardId.value.length });
  },

  select() {
    this.props.setSubmitDisabled(false);
    this.setState({
      checkedProtocol: !this.state.checkedProtocol
    });
    if (this.state.checkedProtocol === true) {
      this.props.setSubmitDisabled(true);
      this.setState({
        checkedProtocol: false
      });
    } else {
      this.props.setSubmitDisabled(false);
      this.setState({
        checkedProtocol: true
      });
    }
  },

  render() {
    const { bankList } = this.props.bankCardData;
    const { realName } = bankList;
    return (
      <div className="huli-popup-content">
        <div className="bc-row-label">
          绑定后，搜易贷账户下的取现操作将使用该卡
          <div className={
            this.props.bankCardData.sydBankCard.isValidCodeErr === null
              ? "bc-row-label-inner"
              : this.props.bankCardData.sydBankCard.isValidCodeErr === true
                ? "bc-row-label-inner bc-label-show"
                : "bc-row-label-inner bc-label-hide"
          }>
            <div className="huli-common-icons oa-info-icon"></div>
            {this.props.bankCardData.sydBankCard.validCodeMessage}
          </div>
        </div>

        <div className="change-phone-form-syd">
          <div className="bc-row">
            <div className="bc-left">真实姓名</div>

            <div className="oa-center-without-border">
              {realName}
            </div>

          </div>

          <div className="bc-row">
            <div className="bc-left">选择银行</div>

            <div className={this.state.bankListShow === true
              ? "oa-center oa-border-blue"
              : "oa-center"}>
              <BankList
                data={this.props.openAccountData.bankList}
                clickBanks={this.clickBanks}
                selectBank={this.selectBank}
                selectedBank={this.state.selectedBank}
              />
            </div>

          </div>

          <div className="bc-row">
            <div className="bc-left">
              银行卡号
            </div>

            <div className={this.state.inputBankCard === true
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
                    请输入0~20位银行卡号码
                  </div>
                    : null
                }
                {
                  this.state.bankCardErr
                    ? <div className="oa-info">您的银行卡号码输入错误！</div>
                    : null
                }
              </div>
            </div>
          </div>

          <div className="oa-text">
            <div className={this.state.checkedProtocol === true
              ? "oa-checked huli-common-icons"
              : "oa-ckeck huli-common-icons"}
                 onClick={this.select}></div>
            <span className="oa-text-ctx">我已确认填写的银行卡信息完整无误且为自有实名账户，
                <br/>自行承担因银行卡信息有误导致的所有风险。</span>
          </div>
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

export const BindSydCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(BC);
