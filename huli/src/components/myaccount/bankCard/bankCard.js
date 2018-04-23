const React = require('react');
const Link = require('react-router').Link;
const connect = require('react-redux').connect;
const popupActions = require('../../../reducers/popup/popupActions');
const bankCardActions = require('../../../reducers/myaccount/bankCard/bankCardActions');
const Popup = require('../../popup/index.popup').Popup;
const ChangePhone = require('../../popup/bankcard-changephone.component').ChangePhone;
const CcResult = require('../../popup/cc-result.component').CcResult;
const BindSydCard = require('../../popup/bankcard-bindSydCard.component').BindSydCard;
const CcPrompt = require('../../popup/bankcard-propmt.component').CcPrompt;
const PopupCommon = require('../../popup/common/index');


const BankCardList = React.createClass({

  getInitialState() {
    return {
      isHover: false,
      cardType: 0,
      isBindCardHz: true,
      isBindCardSyd: false,
      id5Status: 3,
      showChangePhone: false,
      changePhoneSucc: false,
      showBindSydCard: false,
      showBindSydCardInApp: false,
      showUnbindSydCard: false,
      showDelSydCard: false,
      goChangeCardState: false,
      mustSetPassState: false,
      showState: false
    }
  },

  componentDidMount(){
    const {id5Status} = this.props;
    this.props.dispatch(bankCardActions.getBankList('/myaccount/tl/bankCardList'));
    this.setState({
      isBindCard1: true,
      id5Status: id5Status,
      showState: id5Status != 3
    });
  },
  componentWillReceiveProps(props){
    const {id5Status} = props;
    let status = id5Status != 3;
    this.setState({
      id5Status,
      showState: status
    });
  },
  // 切换慧赚银行卡or搜易贷银行卡
  lookCard(cardType) {
    this.setState({cardType});
  },

  enterAddBankCard() {
    this.setState({isHover: true});
  },

  leaveAddBankCard() {
    this.setState({isHover: false});
  },

  changePhoneNum() {
    this.setState({showChangePhone: true});
  },

  confirmChangePhoneNum() {
    const {bankData, bankList} = this.props.bankCardData;
    const {newMobile, validCode} = bankData;
    let url = '/myaccount/tl/changeCardMobileValidSms';
    let datas = {cardId: bankList.lcCard.id, newMobile, validCode};
    console.log(datas);
    if (newMobile !== '' && validCode !== '') {
      let result = this.props.dispatch(bankCardActions.changePhoneNum(url, datas));
      result.then((data) => {
        if (data.errorCode === 0) {
          this.setState({
            showChangePhone: false,
            changePhoneSucc: true
          });
        } else if (data.errorCode === 2) {
          this.props.dispatch(bankCardActions.isValidCodeErr(true));
          this.props.dispatch(bankCardActions.validCodeMessage('验证码错误'));
        } else {
          this.props.dispatch(bankCardActions.isValidCodeErr(true));
          this.props.dispatch(bankCardActions.validCodeMessage(data.errorMessage));
        }
      })
    } else {
      this.props.dispatch(bankCardActions.isValidCodeErr(true));
      this.props.dispatch(bankCardActions.validCodeMessage('请输入验证码！'))
    }
  },

  confirmChangePhoneSucc() {
    this.props.dispatch(bankCardActions.getBankList('/myaccount/tl/bankCardList'));
    this.setState({changePhoneSucc: false});
    this.props.dispatch(bankCardActions.isValidCodeErr(null));
  },

  // 没绑过卡绑定搜易贷银行卡
  bindSydCard() {
    this.setState({showBindSydCard: true});
  },

  confirmBindSydCard() {
    const {bankCode, bankCardNo, bankCardErr} = this.props.bankCardData.sydBankCard;
    console.log(bankCode !== '', bankCardNo !== '', bankCardErr === false, bankCardErr)
    if (bankCode !== '' && bankCardNo !== '' && bankCardErr === false) {
      let bindCardUrl = '/myaccount/tl/saveWdWithDrawCard';
      let bindCardData = {bankCode, bankCardNo}
      let result = this.props.dispatch(bankCardActions.bindSydCard(bindCardUrl, bindCardData));
      result.then((data) => {
        console.log('绑卡成功');
        // 成功之后，再次初始化银行卡列表
        if (data.errorCode === 0) {
          this.props.dispatch(bankCardActions.getBankList('/myaccount/tl/bankCardList'));
          this.closePopup();
        } else {
          this.props.dispatch(bankCardActions.isSydValidCodeErr(true));
          this.props.dispatch(bankCardActions.sydValidCodeMessage(data.errorMessage));
        }
      });
    } else {
      this.props.dispatch(bankCardActions.isSydValidCodeErr(true));
      this.props.dispatch(bankCardActions.sydValidCodeMessage('请将信息补充完整'));
    }
  },
  // 换卡提示操作
  goChangeCard(){
    this.setState({goChangeCardState: true});
  },

  // 换卡前必须设置交易密码
  mustSetPass() {
    this.setState({ mustSetPassState: true });
  },

  // 去设置交易密码
  goSetPassword() {
    location.assign('https://www.huli.com/myaccount/safecenter');
  },

  // 绑过卡弹窗
  bindSydCardInApp() {
    this.setState({showBindSydCardInApp: true});
  },

  // 解绑搜易贷银行卡
  unbindSydCard() {
    this.setState({showUnbindSydCard: true});
  },

  goBack(){
    window.history.go(-1);
  },

  // 删除搜易贷银行卡
  delSydCard(){
    this.setState({showDelSydCard: true});
  },

  goOpenCenter(){
    location.href = 'https://www.huli.com/hl/#/collocation/openAccount'
  },

  confirmDelSydCard() {
    const {bankList} = this.props.bankCardData;
    const {wdCard} = bankList;
    const {id} = wdCard;
    let result = this.props.dispatch(bankCardActions.delSydCard('/user/bank_card_del', id));
    result.then((data) => {
      if (data.errorCode === 0) {
        this.closePopup();
        this.props.dispatch(bankCardActions.getBankList('/myaccount/tl/bankCardList'));
      } else {
        alert('删除失败');
      }
    });
  },

  makeSureChange(){
    location.href = 'https://www.huli.com/hl/#/collocation/changeCard';
  },

  closePopup() {
    this.setState({
      showChangePhone: false,
      changePhoneSucc: false,
      showBindSydCard: false,
      showBindSydCardInApp: false,
      showUnbindSydCard: false,
      showDelSydCard: false,
      goChangeCardState: false,
      mustSetPassState: false
    });
  },

  render: function () {
    const {id5Status} = this.state;
    const {bankList} = this.props.bankCardData;
    const {lcCard, wdCard, userType, isSetPayPassWord, lcCanChangeCard} = bankList;
    return (
      <div className="myacoount-right-con lt">
        <div className="aside-area-content">
          <div className="aside-right border-top-bg new-bank-card">
            <div className="aside-right">
              <div className="headline card-band-tab">
                <span
                  className={this.state.cardType === 0 ? "default-left-bg headline-current" : null}
                  onClick={this.lookCard.bind(this, 0)}
                >慧赚银行卡</span>
                <span
                  className={this.state.cardType === 1 ? "default-left-bg headline-current" : null}
                  onClick={this.lookCard.bind(this, 1)}
                >搜易贷银行卡</span>
              </div>
              { // 第一个选项卡
                id5Status == 3 && this.state.cardType === 0
                  ? <div className="invest-main">
                  <div className="bank-box cf">
                    {
                      bankList.hasLC === false
                        ? <Link to="/collocation/openAccount">
                        <div
                          className={this.state.isHover === false
                            ? "defautl-add-card bank-card border-dashed add_bank_card"
                            : "defautl-add-card bank-card border-dashed add_bank_card hover-bgcolor"}
                          onMouseEnter={this.enterAddBankCard}
                          onMouseLeave={this.leaveAddBankCard}
                        >
                          <p className="default-frame">
                            <span className="ico-borrow ico-bank-add"></span>
                            <span className="text">绑定慧赚银行卡</span>
                          </p>
                        </div>
                      </Link> // 未绑卡
                        : null
                    }
                    {
                      bankList.hasLC === true
                        ? <div className="bank-card" id="bank_card_wd">
                        <div className="card-logo">
                          <div className="card-logo-img">
                            <img className="card-logo-icon"
                                 src={`https://static.huli.com/images/bank-logo/${bankList.lcCard.bankCode}.png`}
                                 alt=""/>
                            <span>{lcCard.bankName}</span>
                          </div>
                          <span className="card-number">
                            {`${lcCard.cardId.substr(0, 4)} **** **** ${lcCard.cardId.substr(-4)}`}
                          </span>
                        </div>
                        <div className="card-phone">
                          <p className="phone-num">
                            银行预留手机号码{lcCard.cardMobile}
                            {
                              userType === 1
                                ? <a className="edit-card"
                                     onClick={this.changePhoneNum}
                                     href="javascript:void(0);">修改</a>
                                : null
                            }
                            {
                              userType === 2 || userType === 3
                                ? <a className="edit-card-disable"
                                     href="javascript:void(0);">修改</a>
                                : null
                            }
                          </p>
                        </div>
                        {
                          userType === 1 && lcCanChangeCard === true
                            ? <div className="card-action">
                              {
                                isSetPayPassWord
                                  ? <a onClick={this.goChangeCard}>换卡</a>
                                  : <a onClick={this.mustSetPass}>换卡</a>
                              }
                              </div>
                            : null
                        }
                        {
                          userType === 2 || userType === 3 || lcCanChangeCard === false
                            ? <div className="card-action-disable">
                                <a href="javascript:void(0);">换卡</a>
                              </div>
                            : null
                        }

                        {
                          lcCard.isForMobile === 0
                            ? <div className="cashCard">取现卡</div>
                            : <div className="quickCard">快捷卡</div>
                        }
                      </div>  // 已绑卡
                        : null
                    }
                  </div>
                </div>
                  : null
              }
              { // 第二个选项卡
                id5Status == 3 && this.state.cardType === 1
                  ? <div className="invest-main">
                  <div className="bank-box cf">
                    {
                      this.props.bankCardData.bankList.hasWD === false
                        ? <div
                        className={this.state.isHover === false
                          ? "defautl-add-card bank-card border-dashed add_bank_card"
                          : "defautl-add-card bank-card border-dashed add_bank_card hover-bgcolor"}
                        onMouseEnter={this.enterAddBankCard}
                        onMouseLeave={this.leaveAddBankCard}
                        onClick={
                          this.props.bankCardData.bankList.wdBindTimes === 0
                            ? this.bindSydCard
                            : this.bindSydCardInApp
                        }>
                        <p className="default-frame">
                          <span className="ico-borrow ico-bank-add"></span>
                          <span className="text">绑定搜易贷银行卡</span>
                        </p>
                      </div>
                        : null
                    }
                    {
                      this.props.bankCardData.bankList.hasWD === true
                        ? <div className="bank-card" id="bank_card_wd">
                        <div className="card-logo">
                          <div className="card-logo-img">
                            <img className="card-logo-icon"
                                 src={`https://static.huli.com/images/bank-logo/${wdCard.bankCode}.png`}
                                 alt=""/>
                            <span>{wdCard.bankName}</span>
                          </div>
                          <span className="card-number">
                            {`${wdCard.cardId.substr(0, 4)} **** **** ${wdCard.cardId.substr(-4)}`}
                          </span>
                        </div>
                        {
                          userType === 1
                            ? <div className="card-action-del">
                            {
                              wdCard.isForMobile !== 0
                                ? <a href="javascript:void(0)" onClick={this.unbindSydCard}>解绑</a>
                                : null
                            }

                            {
                              wdCard.isForMobile === 0
                                ? <a href="javascript:void(0)" onClick={this.delSydCard}>删除</a>
                                : null
                            }
                          </div>
                            : null
                        }

                        {
                          userType === 2 || userType === 3
                            ? <div className="card-action-del-disable">
                            {
                              wdCard.isForMobile !== 0
                                ? <a href="javascript:void(0)">解绑</a>
                                : null
                            }

                            {
                              wdCard.isForMobile === 0
                                ? <a href="javascript:void(0)">删除</a>
                                : null
                            }
                          </div>
                            : null
                        }

                        {
                          wdCard.isForMobile === 0
                            ? <div className="cashCard">取现卡</div>
                            : <div className="quickCard">快捷卡</div>
                        }

                      </div>
                        : null
                    }
                  </div>
                </div>
                  : null
              }

              <div className="hint-box hint-new-box">
                <h3>温馨提示</h3>
                <div className="hint-box-content"
                     dangerouslySetInnerHTML={{
                       __html: id5Status == 3 && this.state.cardType === 0
                         ? codes.local_tooltip.card_pc_licai
                         : codes.local_tooltip.card_pc_p2p}}>
                </div>
              </div>
            </div>
          </div>
        </div>
        {//开户提示
          <Popup title="安全提示"
                 isShow={this.state.showState}
                 submitText="立即开户"
                 hasCancel={false}
                 showWarn={false}
                 submitFn={ () => {
                   this.goOpenCenter()
                 } }
                 closePopup={this.goBack}>
            <PopupCommon.PopupResult
              content={<span className='hq-popup-only'>为了您的资金安全，请先完成实名开户！</span>}
            />
          </Popup>
        }
        { //修改手机号
          <Popup title="修改银行预留手机号"
                 submitText="确认修改"
                 submitFn={this.confirmChangePhoneNum}
                 hasCancel={false}
                 isShow={this.state.showChangePhone}
                 closePopup={this.closePopup}>
            <ChangePhone />
          </Popup>
        }
        { // 修改手机号结果
          <Popup title="更换结果"
                 submitText="确认"
                 submitFn={this.confirmChangePhoneSucc}
                 hasCancel={false}
                 isShow={this.state.changePhoneSucc}
                 closePopup={this.closePopup}>
            <CcResult context={{isSuccess: true, title: '恭喜您银行预留手机号修改成功！'}}/>
          </Popup>
        }
        { // 绑定搜易贷银行卡
          <Popup title="绑定搜易贷银行卡"
                 submitText="确认绑卡"
                 submitFn={this.confirmBindSydCard}
                 isShow={this.state.showBindSydCard}
                 closePopup={this.closePopup}
                 hasCancel={false}>
            <BindSydCard />
          </Popup>
        }
        { // 去app中绑定搜易贷银行卡
          <Popup title="请去APP中绑卡"
                 submitFn={this.closePopup}
                 hasCancel={false}
                 isShow={this.state.showBindSydCardInApp}
                 closePopup={this.closePopup}>
            <CcResult context={{title: '请去APP中绑卡!', hasHelp: true}}/>
          </Popup>
        }
        { // 解绑搜易贷银行卡
          <Popup title="解绑银行卡"
                 submitText="确认"
                 submitFn={this.closePopup}
                 hasCancel={false}
                 isShow={this.state.showUnbindSydCard}
                 closePopup={this.closePopup}>
            <CcResult context={{
              style: 'left',
              message: '· 请您到手机APP的“我的账户-安全中心-搜易贷银行卡”中进行解绑操作。<br>· 为了您的资金安全，解绑快捷卡后，请在手机APP中绑定新的快捷卡进行取现操作。'
            }}/>
          </Popup>
        }
        { // 解绑搜易贷银行卡
          <Popup title="换卡需知"
                 submitText="继续换卡"
                 submitFn={this.makeSureChange}
                 cancelText="暂不换卡"
                 isShow={this.state.goChangeCardState}
                 closePopup={this.closePopup}>
            <CcPrompt />
          </Popup>
        }
        { // 删除搜易贷银行卡
          <Popup title="删除银行卡"
                 submitText="确认"
                 submitFn={this.confirmDelSydCard}
                 isShow={this.state.showDelSydCard}
                 closePopup={this.closePopup}>
            <CcResult context={{title: '您是否要删除银行卡'}}/>
          </Popup>
        }
        { // 换卡未设置密码
          <Popup title="安全提示"
                 submitText="立即设置"
                 submitFn={this.goSetPassword}
                 isShow={this.state.mustSetPassState}
                 hasCancel={false}
                 closePopup={this.closePopup}>
            <CcResult context={{title: '为了您的银行卡安全，请先设置交易密码!'}}/>
          </Popup>
        }
      </div>
    )
  }
});

function mapStateToProps(state) {
  return {
    bankCardData: state.bankCardData,
    id5Status: state.userBase.userStatus.data.id5Status,
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export const BankCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(BankCardList);

