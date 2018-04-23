const React = require('react');
const Link = require('react-router').Link;
const RryCommand = require('./rry-recommand').RryCommand;
const cs = require('classnames');
const tools = require('./../../../common/tool');
const util = require('./../../../common/util');
const _ = require('lodash');
const { connect } = require('react-redux');
const { Popup } = require('./../../popup/index.popup');
const PopupCommon = require('../../popup/common/index');
const { RiskQuestion } = require('../../popup/risk/risk-questions.component');
const { RiskResult } = require('../../popup/risk/risk-result.component');
const { RiskTestTip } = require('../../popup/risk/risk-test.component');
const RryPopup = require('./../../rry/rry-popup').RryPopupMain;
const RryInvest = require('./../../rry/rry-invest').investMask;
const Rryout = require('./../../rry/rry-outgoing').outGoingMask;
const RrySuc = require('./../../rry/rry-result').rrySucMask;
const userBaseActions = require('../../../reducers/userBase/userBaseActions');
const Risk = require('../../../reducers/risk/riskActions');
const RryCharts = require('./../../rry/rry-echarts').RryCharts;
const ToolTip = require('../../common/tooltip.component').ToolTip;
const Const = require('./../../../common/const');

class RryOperaCommon extends React.Component{
    constructor(props){
        super(props);
        this.state={
            profitInfo:{
                rryAmount:0,
                rryBlockedBalance:0,
                rryEarningsYesterDay:0,
                rryInterest:0,
                rryCurrentBalance:0
            },
            //弹窗部分
            chargeMaskState: false,
            rryIncomeMaskState: false,
            showRiskResult:false,
            balanceObj: {},
            userOperaType: 1, //1 转入 2 转出 对应弹框状态传参
            safeMaskState: false,
            showRiskQuestion: false,
            openMaskState:false,
            userStatus:{},
            directCard:{},
            investObj:{
                isFromBank: 0,
                applyAmount:0,
                isToBank:false
            },
            errorMessage:'',
            showError:false,
            rryInvestSucState:false,
            riskSource:'',
            rightDateInfo:{
                inTime:'',
                incomeCalculationDay:'',
                incomeArrivalDay:''
            },
            transferStatus:{
                checkTransferIn:true,
                checkTransferOut:true
            },
            rryOutGoingMaskState:false,
            resultState:false,//请求结果返回参数
            openMaskPwdState:false,
        }
    }
    componentWillMount(){
        this.initInfo();
        this.getInvestDate();
        this.getTransferStatus();
        this.props.dispatch(userBaseActions.getUserBaseUserStatus());
        this.props.dispatch(userBaseActions.getUserBaseDirectCard());
        this.props.dispatch(userBaseActions.rateListData());
    }

    componentDidMount(){
        //url参数state控制 页面刚进入时弹框状态
        const _state = util.cookie.get('state');
        if(_state==1){
            this.rryInvestMaskOpen();
        }else if (_state==2){
            this.rryOutputMaskOpen();
        }
    }

    initInfo(){
        this.getUserRryInfo();
        // this.getBalance();
        this.props.dispatch(userBaseActions.getUserBaseAccount());
    }

    componentWillReceiveProps(nextProps) {
        const {userStatus,directCard} = nextProps;
        this.setState({userStatus:userStatus,directCard:directCard,riskSource:userStatus.riskSource});
    }

    submitRiskTestQA(){
        const {dispatch} = this.props;
        dispatch(Risk.popupSubmitRiskQuestions(() => {
            dispatch(userBaseActions.getUserBaseUserStatus(()=>{
                this.closePopup('showRiskQuestion')
                this.setState({showRiskResult:true})
            }));
        }))
    }

    getInvestDate(){
        const self = this;
        $.post({
            url:'/hqb/rry/inFlowDate',
            data:{date:new Date().getTime()},
            success:function (data) {
                self.setState({rightDateInfo:data.data})
            }
        })
    }

    getTransferStatus(){
        const self = this;
        $.post({
            url:'/hqb/rry/check',
            data:{date:new Date().getTime()},
            success:function (data) {
                self.setState({transferStatus:data.data})
            }
        })
    }


    //调用结果弹窗
    onResult(data,obj,modal){
        const self = this;
        if(data.errorCode==0){
            //转入成功进程图
            self.setState({rryInvestSucState:true,resultState:true,investObj:_.assign({},obj),errorMessage:''})
            self.initInfo()
        } else if(data.errorCode == -4) {
            self.setState({rryInvestSucState: true,resultState:false,investObj: _.assign({},obj),errorMessage:data.errorMessage})
            self.initInfo()
        }else {
            self.setState({showError:true,errorMessage:data.errorMessage,ajaxState:true})
        }
        self.closePopup(modal)
    }

    getUserRryInfo(){
        const self = this;
        $.get({
            url:'/hqb/rry/queryUserRryInfo',
            dataType:'JSON',
            data:{t:Math.random()},
            success:function (data) {
                if(data.errorCode===0){
                    self.setState({profitInfo:data.data})
                }
            }
        })
    }

    render(){
        const {profitInfo,chargeMaskState,userOperaType, rryIncomeMaskState, balanceObj: {autoInvestState},investObj,rightDateInfo,transferStatus} = this.state;
        const type = userOperaType==1?investObj.isFromBank:investObj.isToBank;
        let firstText = "", secondText = "";
        const _type = this.state.userStatus.riskStatus == 0? "never" : "expired";
        firstText = Const.risk[_type].firstText.replace("{0}", "保守型");
        secondText = Const.risk[_type].secondText.replace("{0}", "保守型");
        const isNoBalance = profitInfo.rryCurrentBalance==0;
        const isCntTranOut = !transferStatus.checkTransferOut;
        const isCntTranIn = !transferStatus.checkTransferIn;
        return (
            <div className="myacoount-right-con lt hq">
                <div className="hq-tp" style={{height: '304px'}}>
                    <div className="hq-count-title">
                        <h2>日日盈</h2>
                        {/*<span>由华安汇财通货币基金提供</span>*/}
                        <span>市场有风险  投资需谨慎</span>
                    </div>
                    <ul className="hq-count-info cols-trd">
                        <li>
                            <label>总金额(元) </label>
                            <ToolTip data-text="local_tooltip.acc_asset_rry" />
                            <span>{tools.tansformMoney(profitInfo.rryAmount)}</span></li>
                        <li>
                            <label>冻结金额(元)  </label>
                            <ToolTip data-text="local_tooltip.rry_blocked_balance_tip" />
                            <span>{tools.tansformMoney(profitInfo.rryBlockedBalance)}</span>
                        </li>
                        <li><label>累计收益(元)  </label><span>{tools.tansformMoney(profitInfo.rryInterest)}</span></li>
                        <li><label>昨日收益(元)  </label><span className="orange">{profitInfo.rryEarningsYesterDay==0?'--':tools.tansformMoney(profitInfo.rryEarningsYesterDay)}</span></li>
                    </ul>
                    <div className="hq-tp-btn hq-new cf">
                        <div className="hq-other-form">
                            <a className={cs({'btns orange-btn':true,'disa':isCntTranIn})}
                               title={isCntTranIn?codes.local_tooltip.rry_not_in_tip:''}
                               onClick={()=>{this.rryInvestMaskOpen()}}>转入</a>
                            {/*<a className="btns auto-btn" onClick={()=>{this.autoInvestFun()}}><i className="icon icon-auto" ></i>自动转入</a>*/}
                            <a className={cs({'btns roll-out-btn':true,'disa':isNoBalance||isCntTranOut})} title={isCntTranOut?codes.local_tooltip.rry_not_out_tip:isNoBalance?'您的剩余可转出金额为0，请先转入或等待转入完成':''} onClick={()=>{this.rryOutputMaskOpen()}}>转出</a>
                        </div>
                        <a className="link-blue">查看历史收益<i className="cart-down"></i>
                            <div className="hq-echarts-box">
                                <i className="cart-1"></i>
                                <i className="cart-2"></i>
                                <RryCharts />
                            </div>
                        </a>
                        <div className="echarts-rate" style={{display: 'none'}}>
                            <i className="cart-1"></i>
                            <i className="cart-2"></i>
                        </div>
                    </div>
                </div>
                <div className="hq-bt">
                    <div className="hq-nav-tabs">
                        <ul>
                            <li><Link to="/myaccount/rry/income" activeClassName="active">转入记录</Link></li>
                            <li><Link to="/myaccount/rry/output" activeClassName="active">转出记录</Link></li>
                            <li><Link to="/myaccount/rry/profit" activeClassName="active">收益记录</Link></li>
                        </ul>
                    </div>
                    {this.props.children}
                </div>
                <RryCommand/>
                <Popup title="安全提示"
                       isShow={this.state.openMaskState}
                       submitText="立即开户"
                       hasCancel={false}
                       showWarn={false}
                       submitFn={ () => {
                           this.goOpenCenter()
                       } }
                       closePopup={() => {
                           this.closePopup('openMaskState')
                       }}
                >
                    <PopupCommon.PopupResult
                        content={<span className='hq-popup-only'>{this.state.userStatus.id5Status==3?'为了您的资金安全，请先开通慧赚托管账户！':'为了您的资金安全，请先完成实名开户！'}</span>}
                    />
                </Popup>
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
                <Popup title="安全提示"
                       isShow={this.state.safeMaskState}
                       submitText="去评估"
                       hasCancel={false}
                       showWarn={false}
                       submitFn={ () => {
                           this.goSafeCenter()
                       } }
                       closePopup={() => {
                           this.closePopup('safeMaskState')
                       }}
                >
                    <RiskTestTip
                        firstText={firstText}
                        secondText={secondText}
                    />
                </Popup>
                <Popup title="余额自动转入"
                       isShow={chargeMaskState}
                       submitText="确认"
                       hasCancel={true}
                       submitFn={()=>{this.balanceChange()}}
                       showWarn={true}
                       closePopup={() => {
                           this.closePopup('chargeMaskState')
                       }}
                >
                    <RryPopup balanceState={autoInvestState} onChangeAutoInvest={(obj) => {
                        this.onChangeAutoInvest(obj)
                    }}/>
                </Popup>

                <Popup title="日日盈转入"
                       isShow={rryIncomeMaskState}
                       hasFooter={false}
                       closePopup={()=>{
                           this.closePopup('rryIncomeMaskState')
                       }}
                >
                    <RryInvest investMoney={''} onResult = {(data,obj)=>{this.onResult(data,obj,'rryIncomeMaskState')}} close = {()=>{this.closePopup('rryIncomeMaskState')}} />
                </Popup>
                <Popup title="日日盈转出"
                       isShow={this.state.rryOutGoingMaskState}
                       hasFooter={false}
                       closePopup={()=>{
                           this.closePopup('rryOutGoingMaskState')
                       }}
                >
                    <Rryout  onResult = {(data,obj)=>{this.onResult(data,obj,'rryOutGoingMaskState')}} close = {()=>{this.closePopup('rryOutGoingMaskState')}}/>
                </Popup>
                <Popup title={userOperaType==1?'日日盈转入':'日日盈转出'}
                       isShow={this.state.rryInvestSucState}
                       submitText='完成'
                       hasCancel={false}
                       submitFn={ () => {
                           this.reload()
                       } }
                       showWarn={true}
                       closePopup={() => {
                           this.onChangeInvestObj({});
                           this.closePopup('rryInvestSucState')
                       }}
                >
                    <RrySuc userOperaType={userOperaType} result={this.state.resultState} payType={type} count={investObj.applyAmount} isFast={userOperaType==2?investObj.isFast:''}> </RrySuc>
                </Popup>
                <Popup title="风险评估测试"
                       showWarn={false}
                       hasCancel={false}
                       submitDisabled={true}
                       submitText='确定'
                       submitFn={() => {
                           this.submitRiskTestQA();
                       }}
                       closePopup={() => {
                           this.closePopup('showRiskQuestion')
                       }}
                       isShow={this.state.showRiskQuestion}
                >
                    <RiskQuestion />
                </Popup>

                <Popup title="风险评估结果"
                       showWarn={false}
                       hasCancel={false}
                       submitText='继续转入'
                       submitDisabled={true}
                       submitFn={() => {
                           this.closePopup('showRiskResult');
                           this.rryInvestMaskOpen();
                       }}
                       closePopup={() => {
                           this.closePopup('showRiskResult')
                       }}
                       isShow={this.state.showRiskResult}
                >
                    <RiskResult userRiskType="保守型"
                                productRiskValue={1}
                                userRiskValue={1}
                                investText="转入"
                    />
                </Popup>

                <Popup  title="提示"
                        hasCancel={false}
                        submitFn={()=>{this.closePopup('showError')}}
                        closePopup={()=>{this.closePopup('showError')}}
                        isShow={this.state.showError}
                >
                    <PopupCommon.PopupResult icon="error" title={'日日盈'+ (userOperaType==1?'转入':'转出') +'提交失败'} content={<div className="hq-prompt-balance">{this.state.errorMessage}<br/>您可以联系客服400-817-8877来获得帮助</div>} />
                    {/*<PopupCommon.PopupTip*/}
                      {/*content={<span>{this.state.errorMessage}</span>}*/}
                    {/*/>*/}
                </Popup>
            </div>
        )
    }

    reload(){
        window.location.reload();
    }
    rryInvestMaskOpen(){
        const {transferStatus:{checkTransferIn}} = this.state;
        const isCntTranIn = !checkTransferIn;
        if(isCntTranIn)return;
        const {userStatus,directCard} = this.state;
        //是否进行开户
        if(userStatus.id5Status<3||directCard.isFetching==3){
            this.setState({openMaskState: true})
            return ;
        }
        //是否进行风险评估
        if(userStatus.riskSource==0){
            this.setState({safeMaskState: true})
            return ;
        }
        if(this.props.userStatus.isSetPayPassword=='false'){
            this.setState({openMaskPwdState:true});
            return ;
        }
        //弹出转入弹框
        this.setState({rryIncomeMaskState: true,userOperaType:1})

    }
    //转出
    rryOutputMaskOpen(){
        const {transferStatus:{checkTransferOut}} = this.state;
        const isCntTranOut = !checkTransferOut;
        if(isCntTranOut)return;
        if(this.state.profitInfo.rryCurrentBalance ==0)return;
        if(this.props.userStatus.isSetPayPassword=='false'){
            this.setState({openMaskPwdState:true});
            return ;
        }
        this.setState({rryOutGoingMaskState: true,userOperaType:2})
    }

    autoInvestFun() {
        this.setState({chargeMaskState: true});
    }

    closePopup(type) {
        let _state = {};
        _state[type] = false;
        this.setState(_state);
    }
    goSafeCenter() {
        this.setState({showRiskQuestion:true})
        this.closePopup('safeMaskState')
    }
    goOpenCenter(){
        location.href='https://www.huli.com/hl/#/collocation/openAccount';
        this.closePopup('openMaskState')
    }
    //设置自动转入接口
    balanceChange() {
        const {balanceObj} = this.state, self = this;
        if (!balanceObj.agree) {
            window.alert('请先同意余额自动转入协议');
            return;
        } else {
            $.post({
                url: '/hqb/rry/automatic',
                data: {automatic: balanceObj.autoInvestState},
                success: function (data) {
                    if (data.errorCode == 0) {
                        window.alert('设置成功')
                        self.closePopup('chargeMaskState')
                    } else {
                        window.alert('设置失败，请稍后再试')
                        return;
                    }
                }
            })
        }
    }
    //获得自动转入状态
    getBalance() {
        const self = this;
        $.post({
            url: '/hqb/rry/queryAutomaticStatus',
            data: {t: Math.random()},
            success: function (data) {
                if (data.errorCode == 0) {
                    self.setState({balanceObj: {autoInvestState: data.data}})
                }
            }
        })
    }

    onChangeAutoInvest(obj) {
        const {balanceObj} = this.state;
        this.setState({balanceObj: _.assign({}, balanceObj, obj)});
    }

    onChangeInvestObj(obj){
        const {investObj} = this.state;
        this.setState({investObj:_.assign({},investObj,obj)})
    }
}

const mapRryCommonProps = (state, ownProps) => {
    const {
        userBase : {directCard:data2,userStatus:{ data:data4 }}} = state;
    return{
        directCard:data2,
        userStatus:data4
    }
};

const mapDispatchsRryCommonProps = (dispatch, ownProps) => {
    return {
        dispatch
    }
};

export const RryModal = connect(
    mapRryCommonProps,mapDispatchsRryCommonProps
)(RryOperaCommon);