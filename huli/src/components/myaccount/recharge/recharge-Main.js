const React = require('react');
const Balance = require('./recharge-balance').BalanceInfos;
const Huizhuan =require('./recharge-lc').chargeLC;
const Syd =require('./recharge-wd').chargeWD;
const MaskBank = require('./recharge-choice-bank').rechargeBank;
const {connect} = require('react-redux');
const { Popup } = require('./../../popup/index.popup');
const PopupCommon = require('../../popup/common/index');
const userBaseActions = require('../../../reducers/userBase/userBaseActions');

class rechargeDom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rechargeState:0,
            bankNameHL:null,
            bankNameTL:null,
            maskState:0,
            stateNum:0,
            openMaskState:false,
            formData:{
                accountType:'',
                amount:'',
                bankCode:'',
            },
            errorInfo:'',
            userStatus:{},
            rechargingState:false,
            openMaskPwdState:false,
            rechargeSuc:false,
            rechargingFail:false,
            rechargeWebSuc:false,
            rechargingLimit:false
        }
    }
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(userBaseActions.getUserBaseDirectCard());
        dispatch(userBaseActions.getUserBaseAccount());
        dispatch(userBaseActions.getUserBaseAccountInfo());
    }


    componentWillReceiveProps(props){
        const {userStatus,directCard} = props;
        if(userStatus.id5Status!=3){
            this.setState({userStatus:userStatus,openMaskState:true,openMaskPwdState:false});
        }else if(directCard.isFetching==1&&userStatus.isSetPayPassword=='false'){
            this.setState({userStatus:userStatus,openMaskState:false,openMaskPwdState:true});
        }else {
            this.setState({userStatus:userStatus,openMaskState:false,openMaskPwdState:false});
        }
    }

    render(){
        const {rechargeState,bankNameHL,bankNameTL,maskState,formData,errorInfo,userStatus} =this.state;
        return (
            <div className="invest-main">
                <div className="information mar-top20 rechargeBox" >
                    <Balance onChange={state => this.rechargeStateChange(state)} />
                    <Huizhuan
                        state={rechargeState}
                        bankName={bankNameHL}
                        doWeb={(a,b,c,d) => this.doWebCharge(a,b,c,d)}
                    />
                    <Syd state={rechargeState}
                         bankName={bankNameTL}
                         doWeb={(a,b,c,d) => this.doWebCharge(a,b,c,d)}
                    />
                </div>
                {/*未开户*/}
                <Popup title="安全提示"
                       isShow={this.state.openMaskState}
                       submitText="立即开户"
                       hasCancel={false}
                       showWarn={false}
                       submitFn={ () => {
                           this.goOpenCenter()
                       } }
                       closePopup={() => {
                           if(userStatus.id5Status!=3){
                               location.href='https://www.huli.com/hl/#/myaccount/capital'
                           }else{
                               this.closePopup('openMaskState')
                           }
                       }}
                >
                    <PopupCommon.PopupResult
                        content={userStatus.id5Status!=3?<span className='hq-popup-only'>为了您的资金安全，请先完成实名开户！</span>:<span className='hq-popup-only'>为了您的资金安全，请先开通慧赚托管账户！</span>}
                    />
                </Popup>
                {/*处理中*/}
                <Popup title="充值"
                       isShow={this.state.rechargingState}
                       submitText="查看充值记录"
                       hasCancel={false}
                       showWarn={false}
                       submitFn={ () => {
                           location.href='https://www.huli.com/hl/#/myaccount/recharge/lc-history';
                       } }
                       closePopup={() => {
                           this.closePopup('rechargingState')
                       }}
                >
                    <PopupCommon.PopupResult
                        content={<span className='hq-popup-only'>{errorInfo}</span>}
                    />
                </Popup>
                {/*未设置交易密码*/}
                <Popup title="安全提示"
                       isShow={this.state.openMaskPwdState}
                       submitText="确定"
                       submitFn={ () => {
                           location.href='https://www.huli.com/myaccount/safecenter';
                       } }
                       closePopup={() => {
                           this.closePopup('openMaskPwdState')
                       }}
                >
                    <PopupCommon.PopupIsSetPwd/>
                </Popup>
                {/*充值成功*/}
                <Popup title="充值"
                       isShow={this.state.rechargeSuc}
                       submitText="确定"
                       hasCancel={false}
                       showWarn={false}
                       submitFn={ () => {
                           window.location.reload()
                       } }
                       closePopup={() => {
                           window.location.reload()
                       }}
                >
                    <PopupCommon.PopupResult
                        content={
                            <div className="safeWarn">
                                <img className="icon-success "
                                     src="https://static.huli.com/images/collocation/success.png"
                                />
                                <p >恭喜您充值成功！</p>
                                <a className="link-blue"
                                   href="https://www.huli.com/hl/#/myaccount/recharge/lc-history">
                                    查看明细
                                </a>
                            </div>
                        }
                    />
                </Popup>
                {/*网银充值弹框*/}
                <Popup title="充值"
                       isShow={this.state.rechargeWebSuc}
                       submitText="已完成付款"
                       cancelText="选择其他方式"
                       showWarn={false}
                       submitFn={ () => {
                           window.location.reload()
                       } }
                       closePopup={() => {
                           this.closePopup('rechargeWebSuc')
                       }}
                >
                    <PopupCommon.PopupResult
                        content={
                            <div className="safeWarn">
                                <img src="https://static.huli.com/images/collocation/apologize.png"
                                     alt="" className="icon-safePrompt"
                                />
                                <p className="prompt">请在新打开的网上银行页面进行支付，<br/>支付完成前不要关闭该窗口。</p>
                            </div>
                        }
                    />
                </Popup>
                {/*充值失败*/}
                <Popup title="充值"
                       isShow={this.state.rechargingFail}
                       submitText="确定"
                       hasCancel={false}
                       showWarn={false}
                       submitFn={ () => {
                           this.closePopup('rechargingFail')
                       } }
                       closePopup={() => {
                           this.closePopup('rechargingFail')
                       }}
                >
                    <PopupCommon.PopupResult
                        content={
                            <div className="safeWarn">
                                <div className="icon-fail"></div>
                                <h4 className="prompt">抱歉，本次充值未成功！</h4>
                                <p className="prompt">{errorInfo}</p>
                                <p className="prompt">如需帮助，请致电客服 <a className="link-blue">400-817-8877</a></p>
                            </div>
                        }
                    />
                </Popup>
              {/*充值操作被限制*/}
              <Popup title="充值"
                     isShow={this.state.rechargingLimit}
                     submitText="确定"
                     hasCancel={false}
                     showWarn={false}
                     submitFn={ () => {
                       this.closePopup('rechargingLimit')
                     } }
                     closePopup={() => {
                       this.closePopup('rechargingLimit')
                     }}
              >
                <PopupCommon.PopupTip
                  content={<span>{errorInfo}</span>}
                />
              </Popup>
                <MaskBank state={rechargeState} onChange={(state,n) => this.selectedBank(state,n)}/>
                <form action={rechargeState==0?'/trust/charge/doCharge':'https://www.souyidai.com/myaccount/capital/doDeposit'} id="chargeForm" method="post" target="_blank">
                    <input type="hidden"  name="accountType" value={formData.accountType} id="accountType"/>
                    <input type="hidden"  name="amount" value={formData.amount} id="amount"/>
                    <input type="hidden"  name="bankCode" value={formData.bankCode} id="bankCode"/>
                    <input type="hidden"  name="bankId" value={formData.bankCode.toLowerCase()} id="bankNameParam"/>
                </form>
            </div>
        )
    }
    rechargeStateChange(n){
        const {rechargeState} = this.state;
        if(n==0&&rechargeState!==n){
            $('#wd').stop().fadeOut(200,()=>{$('#lc').stop().fadeIn()});

        }else if(n!=0&&rechargeState!==n){
            $('#lc').stop().fadeOut(200,()=>{$('#wd').stop().fadeIn()});
        }
        this.setState({rechargeState:n})
    }
    selectedBank(key,n){
        switch (n){
            case 0: this.setState({bankNameHL:key});
                break;
            case 1: this.setState({bankNameTL:key})
                break;
            default:break
        }
    }

    accountClose(){
        if(this.props.dispatch(userBaseActions.accountNeedId5Certification((isneed) => {
                if(isneed) {
                    window.history.go(-1);
                }
                else {
                    this.closePopup('openMaskState')
                }
            })));
    }

    goOpenCenter(){
        location.href='https://www.huli.com/hl/#/collocation/openAccount'
    }

    closePopup(type) {
        let _state = {};
        _state[type] = false;
        this.setState(_state);
    }

    doWebCharge(a,b,c,d){
        const self = this;
        const {formData} = this.state;
        if(a==0){
            this.setState({formData:_.assign({},formData,{
                accountType:b,
                amount:parseFloat(c.replace(/[\.\,]/g,"")),
                bankCode:d
            })},()=>{
                $('#chargeForm').submit();
            });
            self.setState({rechargeWebSuc:true});
        }else if(a==-2){
            this.setState({openMaskState:true})
        }else if(a==-1){
            this.setState({openMaskPwdState:true})
        }else if(a==1){
            this.setState({rechargeSuc:true})
        }else if(a==2){
            this.setState({rechargingFail:true,errorInfo:b})
        }else if(a==4){
            this.setState({rechargingState:true,errorInfo:b})
        }else if(a==-3){
          this.setState({rechargingLimit:true,errorInfo:b})
        }
    }

}


const mapRechargeProps = (state, ownProps) => {
    const {
        userBase :
            {
                account:{data:data2},
                directCard:data3,
                accountInfo:{ data:data4 },
                userStatus:{data:data5}
            }
    } = state;
    return{
        account:data2,
        accountInfo:data4,
        directCard:data3,
        userStatus:data5
    }
};

const mapDispatchsRechargeProps = (dispatch, ownProps) => {
    return {
        dispatch
    }
};

export const rechargeBox = connect(
    mapRechargeProps,mapDispatchsRechargeProps
)(rechargeDom);
