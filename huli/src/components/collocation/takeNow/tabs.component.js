const React = require('react');
const Moment = require('moment');
const Component = React.Component;
const { connect } = require('react-redux');
const Pagination = require('rc-pagination');
const _ = require('lodash');
const bankLists = require('./../../myaccount/recharge/bank').bankList;
// const { Modal } = require('./modal.component.js');
const { ToolTip } = require('../../common/tooltip.component.js');
const BindSydCard = require('../../popup/bankcard-bindSydCard.component').BindSydCard;

const { ajaxData } = require('../../../common/util.js');
const { bankCardInit, tansformMoney } = require('../../../common/tool.js');
const { PopupResult } = require('../../popup/common');
const PopupCommon = require('../../popup/common/index');
const { Popup } = require('../../popup/index.popup');
const userBaseActions = require('../../../reducers/userBase/userBaseActions');
const bankCardActions = require('../../../reducers/myaccount/bankCard/bankCardActions');

class Tab1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeType:1,
            types:[
                {key:1,name:'慧赚',isBind:false,cash:'0.00'},
                {key:2,name:'搜易贷',isBind:false,cash:'0.00',isUnBind:false}
            ],
            formKeys : {
                cash : {valid: false,value: '',error: ''},
                password : {valid: false,value: '',error: ''}
            },
            visible1:false,
            visible2:false,
            visible3:false,
            isRealName:true,
            serviceCharge:'0.00',
            isShowOpenAccount: false,
            bindCard: false,
            openMaskPwdState:false,
            promptVisible: false,
            statu: '',
            promptMessage: '',
            isFast:true,
            amount:{
                tlAmount:0,
                hxAmount:0,
                withdrawFastLimitAmount:0,
            },
        };

    }
    componentWillMount(){
        this.getTakeNowCount();
        this.props.dispatch(userBaseActions.getUserBaseAccountInfo());
        this.props.dispatch(userBaseActions.getUserBaseDirectCard());
        this.getAccountInfo();
        const checkTabIndex = location.hash.indexOf('type=syd')!=-1?2:1;
        this.handleActive(checkTabIndex);
    }
    componentWillReceiveProps(nextProps){
        this.getAccountInfo(nextProps.accountInfo);
        const { userStatus,directCard } = nextProps;
        if(userStatus.id5Status!=3){
            this.setState({userStatus:userStatus,isShowOpenAccount:true,openMaskPwdState:false});
        }else if(directCard.isFetching==1&&userStatus.isSetPayPassword=='false'){
            this.setState({userStatus:userStatus,isShowOpenAccount:false,openMaskPwdState:true});
        }else {
            this.setState({userStatus:userStatus,isShowOpenAccount:false,openMaskPwdState:false});
        }
    }
    componentDidMount(){
        this.props.dispatch(bankCardActions.getBankList('/myaccount/tl/bankCardList'));
        if(this.props.dispatch(userBaseActions.accountNeedId5Certification((isneed) => {
                if(isneed){
                    this.setState({
                        isShowOpenAccount: isneed
                    });
                }
            })));
    }
    getTakeNowCount(){
        const {activeType} = this.state;
        //传到后台type 网贷1 理财2
        const param = {accountType:activeType==1?2:1}
        ajaxData('/myaccount/capital/withdrawcount',param).then(data => {
            if(data.errorCode == 0){
                this.setState({serviceCharge:data.data > 4 ? '2.00' : '0.00'});
            }else{
                this.setState({
                    promptVisible: true,
                    statu: 'error',
                    promptMessage: data.errorMessage
                });
            }
        });
    }
    getAccountInfo(data){
        const accountInfo = data || this.props.accountInfo;
        const { hxAccount, tlAccount } = accountInfo;
        const { types } = this.state;
        let newTypes = [];
        _.map(types, type => {
            if( type.key == 1 ){
                _.assign(type, { cash:tansformMoney(tlAccount.accountAmount) });
            }else if( type.key == 2 ){
                _.assign(type, { cash:tansformMoney(hxAccount.accountAmount) });
            }
            if( type.key == 1 && tlAccount.bankCode ){
                _.assign(type, {
                    isBind:true,
                    bg:tlAccount.bankCode.toLowerCase(),
                    carNum:bankCardInit(tlAccount.cardId)
                });
            }else if( type.key == 2 && hxAccount.bankCode ){
                _.assign(type, {
                    isBind:true,
                    bg:hxAccount.bankCode.toLowerCase(),
                    carNum:bankCardInit(hxAccount.cardId)
                })
            }else if( type.key == 2 && hxAccount.bindConvientCard){
                _.assign(type, {
                    isUnBind:hxAccount.bindConvientCard == 1
                })
            }
            newTypes.push(type);
        });
        this.setState({
            types: newTypes,
            amount:{
                tlAmount:  tlAccount.withdrawAvailableAmount,
                hxAmount:  hxAccount.accountAmount,
                withdrawFastLimitAmount:tlAccount.withdrawFastLimitAmount
            },
            formKeys: {
                cash : {valid:false, value:'', error: ''},
                password : {valid:false ,value:'', error:''}
            }
        })
    }
    handleActive(key){
        this.setState({activeType:key},function(){
            this.getTakeNowCount();
            var href = key==1?location.href.split('?')[0]: location.href.split('?')[0]+ '?type=syd';
            location.href = href;
        });
    }
    bindBank(key, event){
        event.stopPropagation();
        this.handleBind(key);
    }
    handleBind(key){
        const { activeType, types } = this.state;
        if(activeType != key)return;
        const type = _.find(types, { key:activeType });
        if(activeType == 1){
            this.openAccountFn();
        }else{
            if(type.isUnBind){
                this.setState({visible2:true});
            }else{
                this.setState({visible1:true});
            }
        }
        this.closeBind();
    }
    handleHide(){
        if(this.props.dispatch(userBaseActions.accountNeedId5Certification((isneed) => {
                if(isneed){
                    location.hash = "/myaccount/capital";
                }else{
                    this.setState({visible1:false,isShowOpenAccount:false});
                }
            })));
    }
    closeBind(){
        this.setState({bindCard: false});
    }
    handleValueChange(name, value){
        const {
            formKeys,
            types,
            activeType,
            serviceCharge,
            amount
        } = this.state;
        const newInfo = { value, valid:true, error:'' };
        // const currentAmount = _.find(types, { key:activeType }).cash;
        const currentAmount = activeType==1?(amount.tlAmount/100):(amount.hxAmount/100);
        switch(name){
            case 'cash':
                if(value == ''){
                    newInfo.valid = false;
                    newInfo.error = '请输入取现金额';
                }else if(!/^\d+(\.\d{1,2})?$/.test(+value)){
                    newInfo.valid = false;
                    newInfo.error = '请输入大于0并且最多两位小数的值';
                }else if(+value > currentAmount){
                    newInfo.valid = false;
                    newInfo.error = '取现金额不能大于可取现余额';
                }else if(+value <= serviceCharge){
                    newInfo.valid = false;
                    newInfo.error = '取现金额要大于手续费';
                }else if(value - serviceCharge < 1){
                    newInfo.valid = false;
                    newInfo.error = '实际到账金额需大于等于1元';
                }
                this.autoChoiceType(value);
                break;
            case 'password':
                if(value == ''){
                    newInfo.valid = false;
                    newInfo.error = '请输入交易密码';
                }
                break;
        }
        const newFormKeys = _.assign({}, formKeys, {[name]:newInfo});
        this.setState({
            formKeys:newFormKeys
        });
    }
    handleSubmit(){
        let self = this;
        const { formKeys:{ cash, password }, activeType, types ,isFast} = this.state;
        const haveCard = _.find(types, { key:activeType }).carNum != undefined;
        const accountType = activeType == 1 ? 2 : 1 ;
        if(!haveCard){
            this.setState({bindCard: true});
            return;
        }
        if(!cash.valid){
            this.handleValueChange('cash', cash.value);
            return;
        }
        if(!password.valid){
            this.handleValueChange('password', password.value);
            return;
        }
        const api = ['/trust/withdraw/huli', '/trust/withdraw/souyidai'];
        const params = {
            amount : Math.round(cash.value * 100),
            password : password.value + '',
            isQuick : isFast?1:0
        };
        $.post({
            url: '/trust/charge/judgeOp',
            data: {accountType: accountType,op:'withdraw'},
            success: function (data) {
                data = data.errorCode != undefined ? data : JSON.parse(data);
                let promptMessage = '';
                if (data.errorCode == 92 || data.errorCode == 91) {
                    promptMessage = data.errorMessage;
                    self.setState({
                        visible3: true,
                        promptMessage
                    });
                }else{
                    self.withDrawFn(api[activeType-1],params);
                }
            }
        })
    }
    withDrawFn(api,refConfig){
        ajaxData(api, refConfig).then(data => {
            let statu = 'error';
            let promptMessage = data.errorMessage;
            if(data.errorCode == 0){
                statu = 'success';
                promptMessage = `恭喜您取现申请提交${data.data}!`;
            }
            this.setState({
                promptVisible: true,
                statu,
                promptMessage
            });
            this.getAccountInfo();
        })
    }
    handleOk(){
        const {bankCode, bankCardNo, bankCardErr} = this.props.sydCard;
        if (bankCode !== '' && bankCardNo !== '' && bankCardErr === false) {
            let bindCardUrl = '/myaccount/tl/saveWdWithDrawCard';
            let bindCardData = {bankCode, bankCardNo}
            let result = this.props.dispatch(bankCardActions.bindSydCard(bindCardUrl, bindCardData));
            result.then((data) => {
                // 成功之后，再次初始化银行卡列表
                if (data.errorCode === 0) {

                    this.props.dispatch(bankCardActions.getBankList('/myaccount/tl/bankCardList'));
                    this.props.dispatch(userBaseActions.getUserBaseAccountInfo());
                    this.handleHide();

                } else {

                    this.props.dispatch(bankCardActions.isSydValidCodeErr(true));
                    this.props.dispatch(bankCardActions.sydValidCodeMessage(data.errorMessage));

                }
            });
        } else {

            this.props.dispatch(bankCardActions.isSydValidCodeErr(true));
            this.props.dispatch(bankCardActions.sydValidCodeMessage('请将信息补充完整'));

        }
    }
    asyncData(fn){
        fn && fn();
        return new Promise(res => res());
    }
    closePopup(type) {
        let _state = {};
        _state[type] = false;
        this.setState(_state);
    }
    handleBindCard(){
        const { activeType } = this.state;
        if(this.props.dispatch(userBaseActions.accountNeedId5Certification((isneed) => {
                if(isneed){
                    this.setState({isShowOpenAccount:false})
                    this.props.history.push('/collocation/openAccount');
                }else{
                    if(activeType == 1){
                        this.setState({isShowOpenAccount:false});
                        this.props.history.push('/collocation/openAccount');
                    }else{
                        this.setState({
                            visible1:true,
                            isShowOpenAccount:false
                        });
                    }
                }
            })));
    }
    handleAPPBind(){
        this.setState({visible2:false});
    }
    takeNowAll(){
        const { formKeys:{ cash, password }, activeType , amount } = this.state;
        const value = tansformMoney(activeType==1?amount.tlAmount:amount.hxAmount).replace(/\,/g, '');
        this.autoChoiceType(parseFloat(value));
        let newCash = {valid:true, value:value, error:''};
        this.setState({
            formKeys:{
                cash:newCash,
                password
            }
        })
    }
    handlePromptClose(){
        this.setState({visible3:false});
        window.location.reload();
    }
    openAccountFn(){
        location.hash = "/collocation/openAccount";
    }

    choiceTakeType(status){
        const {  formKeys : { cash, password } } = this.state;
        if(parseFloat(cash.value)<=50000||cash=='')this.setState({
            isFast:status
        })
    }

    autoChoiceType(money){
        const {amount:{withdrawFastLimitAmount}} = this.state
        this.setState({
            isFast:money<=withdrawFastLimitAmount/100
        })
    }

    render() {
        const {
            activeType, types, visible1, isShowOpenAccount, visible2, visible3,
            formKeys : { cash, password },
            serviceCharge, promptVisible, statu, promptMessage,isFast,amount
        } = this.state;
        let fastText='', normalText = '';
        const fastPrompt  = codes.local_tooltip.rry_out_fast_result_tip.indexOf('%s')!=-1?codes.local_tooltip.rry_out_fast_result_tip.split('%s'):[];
        const normalPrompt  = codes.local_tooltip.withdraw_normal_hl.indexOf('%s')!=-1?codes.local_tooltip.withdraw_normal_hl.split('%s'):[];
        fastPrompt.map((item,index)=>{
            fastText += index!=fastPrompt.length-1?item + '<span class="orange-text">'+codes.local_tooltip.rry_bank_out_fast_time+'</span>':item
        })
        normalPrompt.map((item,index)=>{
            normalText +=  index!=normalPrompt.length-1?item + '<span class="orange-text">'+codes.local_tooltip.withdraw_normal_hl_time+'</span>':item
        })
        const  fastWithdrawInfo = this.props.accountInfo.tlAccount.fastWithdrawInfo;


        return (
            <div style={{display:'block'}} className="invest-main">
                <div className="information mar-top20">
                    <div className="cash-row cf">
                        {
                            _.map(types, type => {
                                let className = type.key == 1 ? 'cash-aside' : 'cash-aside mar-lt';
                                let logo = type.isBind ?
                                    (<div className="card-logo cf">
                                        <span className={`rechargebank-${type.bg}`}></span>
                                        {/*<div className="bankGroup">*/}
                                        {/*<img src={bankLists.bank[type.bg.toLowerCase()].src} className="bank-icon" alt=""/>*/}
                                        {/*<span>{bankLists.bank[type.bg.toLowerCase()].realName}</span>*/}
                                        {/*</div>*/}
                                        <span>{type.carNum}</span>
                                    </div>)
                                    :(<p className="default-frame">
                                        <span className="ico-bank-add huli-common-icons"></span>
                                        <strong onClick={(e)=>this.bindBank(type.key, e)}>{`绑定${type.name}银行卡`}</strong>
                                    </p>);
                                let bindClass = type.isBind ? 'bank-event cash-card' : 'defautl-add-card cash-card bank-card border-dashed';
                                bindClass = type.key == activeType ? `${bindClass} cash-card-click` : bindClass;
                                return (<div className={className} key={type.key} onClick={()=>this.handleActive(type.key)}>
                                        <div className="cash-box">
                                            <div className={bindClass} id="add_bank_card">
                                                <div className="bank-balance cf">
                                                    <span className="quota-name">{`${type.name}可用余额(元)`}</span>
                                                    <span className="quota-center">
														<strong id="amount_aval" >{type.cash}</strong>
		                                        	</span>
                                                </div>
                                                {logo}
                                                {type.key == activeType && (<span data-type="choose-ok" className="ico-borrow"></span>)}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="quota-row">
                        <form id="withdrawForm">
                            <div style={{'height':0,'width':0,'overflow':'hidden','position':'relative','zndex':'-1'}}>
                                <input type="text"/>
                                <input type="password"/>
                            </div>
                            <div className="quota-span3">
								<span className="quota-name">可取现金额
                                    {
                                        activeType == 1 && <div className="rt" style={{margin:'-2px 0 0 0'}}>
                                            <ToolTip data-text="local_tooltip.withdraw_available_hl" ></ToolTip>
                                        </div>
                                    }
                                </span>
                                <span className="quota-center">
										<strong id="amount_final">{tansformMoney(activeType==1?amount.tlAmount:amount.hxAmount)}</strong>
										<label className="normal-unit">元</label>
										<a className="link-blue" onClick={()=>this.takeNowAll()}>全部取现</a>
                                    {/*<label id="get-all" className="get-all" onClick={(e)=>this.takeNowAll(type, e)}>全部取现</label>*/}
									</span>
                            </div>
                            <div className="quota-span3">
                                <span className="quota-name">取现金额</span>
                                <span className="quota-center">
                                    <input id="withdrawAmount" placeholder="请输入取现金额"
                                           value={cash.value || ''}
                                           onChange={(e)=>{this.handleValueChange('cash',e.target.value)}}
                                    />
                                    <label className="position-unit">元</label>
                                </span>
                                <span className="quota-right">手续费{serviceCharge}元</span>
                                {!cash.valid && <span className="quota-right" style={{'color':'#ff6803'}}>{cash.error}</span>}
                            </div>
                            <div className="quota-span3">
                                <span className="quota-name">实际到账金额</span>
                                <span className="quota-center">
                                    <strong id="amount_final">{+cash.value > serviceCharge ? tansformMoney((+cash.value - serviceCharge)*100) : 0.00}</strong>
                                    <label className="normal-unit">元</label>
                                </span>
                            </div>
                            {
                                activeType==1&&<div className="quota-span3 quota-type">
                                    <span className="quota-name">取现方式</span>
                                    <div className="quota-box">
                                        <div className="quota-takenow">
                                            <i className={isFast?'bankicon check-right':'bankicon gray-check'} onClick={ ()=>this.choiceTakeType(true)}></i>
                                            <div className="quota-group">
                                                <h4 className="type-name">快速取现</h4>
                                                <div className="type-info">
                                                    <p dangerouslySetInnerHTML={{__html:fastText}}></p>
                                                </div>
                                            </div>
                                            {
                                                fastWithdrawInfo!=''?<div className="takenow-propmpt-info">{fastWithdrawInfo}</div>:''
                                            }
                                        </div>
                                        <div className="quota-takenow">
                                            <i className={!isFast?'bankicon check-right':'bankicon gray-check'} onClick={ ()=>this.choiceTakeType(false)}></i>
                                            <div className="quota-group">
                                                <h4 className="type-name">普通取现</h4>
                                                <div className="type-info">
                                                    <p dangerouslySetInnerHTML={{__html:normalText}}></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="quota-span3">
                                <span className="quota-name">交易密码</span>
                                <span className="quota-center">
                                    <input id="withdrawPassword" type="password" placeholder="请输入交易密码" className="border-radius3"
                                           value={password.value || ''}
                                           onChange={(e)=>{this.handleValueChange('password',e.target.value)}}
                                    />
                                </span>
                                <span className="quota-right"><a href="/myaccount/safecenter#set_deal_password_div" target="_blank">忘记交易密码?</a></span>
                                {!password.valid && <span className="quota-right" style={{'color':'#ff6803'}}>{password.error}</span>}
                            </div>
                        </form>
                        <div className="btn-next">
                            <a id="submitBtn" className="btn-prepaid-phone btn blue-btn" href="javascript:void(0)" onClick={()=>this.handleSubmit()}>确认取现</a>
                            <span className="btn-sunshine-insurance" style={{display: 'none'}}>
                                <em className="version-details-img"></em>
                                <a href="https://help.souyidai.com/help/security/ZHZJX/" target="_blank">账户资金流转安全由阳光财产保险承保</a>
                            </span>
                        </div>
                    </div>
                    <div style={{paddingTop:40,display:'none'}}>
                        <a href="https://www.souyidai.com/myaccount/fixedmonth/list" target="_blank">
                            <img src="https://static.souyidai.com/www/images/version/version-banner-widthraw.gif" width="849" height="103" />
                        </a>
                    </div>
                    <div className="hint-box">
                        <h3>温馨提示：</h3>
                        <div className="hint-box-content" dangerouslySetInnerHTML={{__html:activeType==1?codes.local_tooltip.withdraw_hint:codes.local_tooltip.withdraw_pc_wd}}></div>
                    </div>
                </div>
                {
                    // <Modal
                    //    	visible={visible1}
                    //    	title={'绑定搜易贷银行卡'}
                    //    	onCancel={()=>this.handleHide()}
                    //    	onOk={()=>this.handleOk()}
                    //    	okBtn="确认绑卡"
                    //    	bindBank={visible1}
                    //    	key={Math.random()}
                    //    	showWarn={false}
                    //    />
                }
                {/* 绑定搜易贷银行卡 */}
                <Popup title="绑定搜易贷银行卡"
                       submitText="确认绑卡"
                       submitFn={() => this.handleOk()}
                       isShow={visible1}
                       closePopup={() => this.handleHide()}
                       hasCancel={false}
                >
                    <BindSydCard />
                </Popup>
                <Popup
                    isShow={visible2}
                    title='请在手机APP中绑卡'
                    submitText='确定'
                    hasCancel={false}
                    closePopup={() => this.handleAPPBind()}
                    submitFn={() => this.handleAPPBind()}
                    showWarn={false}
                >
                    <PopupResult
                        content={<span style={{lineHeight: '30px', display:'inline-block', textAlign:'left', letterSpacing:-1, color:'#333'}}>
				                    • 您已成功解绑了搜易贷银行卡，为了您的资金安排，请在手机端重新绑卡后再进行取现操作。<br/>
				                    • 手机端“我的账户-安全中心-银行卡-搜易贷银行卡”中进行绑卡操作。<br/>
				                </span>}
                    />
                </Popup>
                {/* 未实名，未开户 */}
                <Popup
                    title="安全提示"
                    submitFn={()=>this.openAccountFn()}
                    closePopup={()=>this.handleHide()}
                    submitText="立即开户"
                    hasCancel={false}
                    isShow={this.state.isShowOpenAccount}
                    showWarn={false}
                >
                    <PopupResult title="为了您的资金安全，请先完成实名开户！" />
                </Popup>
                {/* 已实名，未开户的用户点击取现按钮 */}
                <Popup
                    title="安全提示"
                    submitFn={()=>this.handleBind(activeType)}
                    closePopup={()=>{ this.closeBind() }}
                    submitText={ activeType == 1 ? "立即开户" : "立即绑定" }
                    hasCancel={false}
                    isShow={this.state.bindCard}
                    showWarn={false}
                >
                    <PopupResult title={ activeType == 1 ? "为了您的资金安全，请先开通慧赚托管账户" : "请绑定搜易贷银行卡" } />
                </Popup>
                <Popup
                    title="取现"
                    submitFn={()=>this.handlePromptClose()}
                    closePopup={()=>{ this.handlePromptClose() }}
                    hasCancel={statu == 'error'}
                    hasSubmit={statu == 'success'}
                    cancelText='关闭'
                    submitText='确认'
                    isShow={this.state.promptVisible}
                    showWarn={false}
                >
                    <PopupResult icon={statu} title={promptMessage}/>
                </Popup>
                {/*充值操作被限制*/}
                <Popup title="取现"
                       isShow={visible3}
                       submitText="确定"
                       hasCancel={false}
                       showWarn={false}
                       closePopup={()=>this.handlePromptClose()}
                       submitFn={()=>this.handlePromptClose()}
                >
                    <PopupCommon.PopupTip
                        content={<span>{promptMessage}</span>}
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
            </div>
        );
    }
}

class Tab2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page:{ total:0, current:1 },
            data:[],
            startTime:'',
            endTime:'',
            loading:true,
            visible1:false,
            visible2:false,
            visible3:false,
            cancelId:'',
            cancelStatu:'',
            failMessage:'',
        };
    }
    componentWillMount(){
        this.getDealInfo();
    }
    componentDidMount(){
        $('input[data-target="start"]').datepicker({
            format: 'yyyy-mm-dd'
        }).on('changeDate', ev => {
            this.handleQuery();
        });
        $('input[data-target="last"]').datepicker({
            format: 'yyyy-mm-dd'
        }).on('changeDate', ev => {
            this.handleQuery();
        });
    }
    getDealInfo(){
        const { page:{ current }, startTime, endTime } = this.state;
        const { accountType } = this.props;
        ajaxData('/myaccount/capital/withdraw_log',{
            pageNo: current,
            startTime,
            endTime :endTime == '' ? '' : Moment(endTime).add(1, 'd').format('YYYY-MM-DD'),
            accountType
        }).then(data => {
            if(data.errorCode == 0){
                let dealInfo = data.data;
                this.setState({
                    page:{
                        total:dealInfo.totalRecords,
                        current
                    },
                    data: dealInfo.list,
                    loading: false
                });
            }else{
                this.setState({
                    page:{
                        total: 0,
                        current: 1
                    },
                    data: [],
                    loading: false
                });
            }
        })
    }
    toDou(d){
        return d.toString().length == 1 ? ('0' + d) : d ;
    }
    getLastDay(day){
        let newDate = new Date();
        if(day){
            newDate = newDate.setDate(newDate.getDate() - day);
        }else{
            newDate = newDate.setYear(newDate.getFullYear() - 1);
        }
        newDate = new Date(newDate);
        let m = this.toDou(newDate.getMonth() + 1);
        let d = this.toDou(newDate.getDate());
        return newDate.getFullYear() + "-" + m + "-" + d;
    }
    handleDateChange(day=0){
        const { startTime, endTime, page:{ total } } = this.state;
        let nET = new Date().getFullYear() + "-" + this.toDou(new Date().getMonth()+1) + "-" + this.toDou(new Date().getDate());
        let nST = this.getLastDay(day);
        this.setState({
            startTime:nST,
            endTime:nET
        })
        this.asyncData(()=>{
            this.setState({
                startTime:nST,
                endTime:nET,
                page:{total, current:1},
                loading:true
            })
        }).then(() => {
            this.getDealInfo();
        })
    }
    handleQuery(){
        let startTime = $('input[data-target="start"]').val();
        let endTime = $('input[data-target="last"]').val();
        if(!startTime || !endTime)return;
        const { page:{ total, current } } = this.state;
        this.asyncData(()=>{
            this.setState({
                startTime,
                endTime,
                page:{total, current:1},
                loading:true
            })
        }).then(() => {
            this.getDealInfo();
        })
    }
    asyncData(fn){
        fn && fn();
        return new Promise(res => res());
    }
    handleCancelApply(id){
        const accountType = this.state.activeType == 1 ? 2 : 1 ;
        let self =this;
        $.post({
            url: '/trust/charge/judgeOp',
            data: {accountType: accountType,op:'cancel_withdraw'},
            success: function (data) {
                data = data.errorCode != undefined ? data : JSON.parse(data);
                let statu = 'error';
                let promptMessage = '';
                if (data.errorCode == 92 || data.errorCode == 91) {
                    let cancelStatu = data.errorCode;
                    let failMessage = cancelStatu == 0 ? '' : data.errorMessage;
                    self.setState({visible1:false,visible3:true,cancelStatu,failMessage});
                }else{
                    self.setState({visible1:true,cancelId:id});
                }
            }
        })
    }
    handleHide(){
        this.setState({visible1:false});
    }
    handleOk(){
        const { cancelId } = this.state;
        const { accountType } = this.props;
        ajaxData('/myaccount/capital/cancelwithdraw',{
            withdrawId: cancelId,
            accountType,
        }).then(data => {
            let cancelStatu = data.errorCode;
            let failMessage = cancelStatu == 0 ? '' : data.errorMessage;
            this.setState({visible1:false,visible2:true,cancelStatu,failMessage});
        })
    }
    handleCancel(){
        this.asyncData(()=>{
            this.setState({visible2:false,visible3:false,loading:true});
        }).then(()=>{
            this.getDealInfo();
        })
    }
    handlePageChange(nextPage){
        const { page:{ total } } = this.state;
        this.asyncData(()=>{
            this.setState({
                page:{total, current:nextPage},
                loading:true
            });
        }).then(()=>{
            this.getDealInfo();
        })
    }
    render() {
        const {
            loading, page, startTime, endTime, data,
            visible1, visible2, visible3, cancelStatu, failMessage
        } = this.state;
        const { accountType } = this.props;
        const name = accountType == 1 ? '搜易贷' : '慧赚';
        return (
            <div style={{display: 'block'}} className="invest-main">
                <div className="range">
                    <span className="capital-type">时间范围</span>
                    <div className="type-data">
                        <input type="text"
                               value={startTime} data-target="start"
                        />
                        <label className="cut-off"> - </label>
                        <input type="text"
                               value={endTime} data-target="last"
                        />
                        <label className="day-time">
                            <a href="javascript:void(0)" onClick={()=>this.handleDateChange(7)}>最近7天</a>
                            <a href="javascript:void(0)" onClick={()=>this.handleDateChange(30)}>最近30天</a>
                            <a href="javascript:void(0)" onClick={()=>this.handleDateChange(90)}>最近90天</a>
                            <a href="javascript:void(0)" onClick={()=>this.handleDateChange()}>最近一年</a>
                        </label>
                    </div>
                </div>
                <div className="information mar-top20" style={{overflow: 'visible'}}>
                    <div className="borrow-title-th" style={{boxSizing:'initial'}}>
                        <span className="p-w150">取现申请时间</span>
                        <span className="p-w140 p-tr">取现金额(元)</span>
                        <span className="p-w100">手续费(元)</span>
                        <span className="p-w120">状态</span>
                        <span className="p-w340">备注</span>
                    </div>
                    <div id="withdraw-detail-main">
                        {
                            loading ?
                                (<div id='ele-loading' style={{height:'240px', textAlign:'center', lineHeight:'240px'}}>
                                    <img src='https://static.huli.com/images/loading.gif'/>
                                    加载中……
                                </div>)
                                :
                                (_.map(data, item => {
                                    let statu = '';
                                    //tlAccountFlag; // 通联账户类型 0 余额账户 1 现金账户 1是日日盈转出 不能撤销申请
                                    //搜易贷账号可以撤销申请
                                    switch(item.withdrawStatus){
                                        case 0:
                                            statu = (<p className="p-normal p-w120" style={((item.tlAccountFlag === 0 || accountType == 1)&& item.tlPayFlag != 1) ? {lineHeight:'20px'} : {}}>
                                                申请中<br/>
                                                {(item.tlAccountFlag === 0 || accountType == 1)&& item.tlPayFlag != 1 ? <a href="javascript:void(0)" className="enchashment_undo_application" onClick={()=>this.handleCancelApply(item.withdrawId)}>撤销申请</a> : ''}
                                            </p>);
                                            break;
                                        case 1:
                                            statu = (<p className="p-normal p-w120 pre-audit">提现成功</p>)
                                            break;
                                        case 2:
                                            statu = (<p className="p-normal p-w120 pre-failed">提现失败</p>)
                                            break;
                                        case 3:
                                            statu = (<p className="p-normal p-w120">处理中 </p>)
                                            break;
                                        case 4:
                                            statu = (<p className="p-normal p-w120 pre-revoked">已撤销</p>)
                                            break;
                                    };
                                    return (<div className="borrow-list cf" style={{width: '100%', position:'relative'}} key={item.withdrawId}>
                                        <div className="p-normal p-w150 p-tl" style={{textAlign: 'left', textIndent: '15px'}}>{item.applyTimeStr}
                                            {
                                                (item.withdrawFrom == 3||item.withdrawFrom == 4) && <ToolTip data-text="通过手机取现" extClass="ver-ico-url acgral-mobile" hoverClass="ver-ico-url mobile-hover"/>
                                            }
                                            {
                                                item.tlPayFlag == 1 && <ToolTip data-text="快速取现" extClass="fast-withdraw" hoverClass="fast-hover"/>
                                            }
                                        </div>
                                        <p className="p-normal p-w140 p-tr">{item.amountStr}</p>
                                        <p className="p-normal p-w100">{item.userFeeStr}</p>
                                        {statu}
                                        <p className="p-normal p-w340">{`${item.cardDesc.bankName}-${item.cardDesc.bankCardId}`}</p>
                                    </div>)
                                }))
                        }
                    </div>
                    {
                        !loading && <div className="paging-boxs cf">
                            <Pagination
                                showLessItems
                                onChange={(page)=>this.handlePageChange(page)}
                                current={page.current}
                                total={page.total}
                            />
                        </div>
                    }
                </div>
                <Popup
                    isShow={visible1}
                    title={`撤销${name}取现申请`}
                    submitText='确认撤销'
                    cancelText='取消'
                    closePopup={()=>this.handleHide()}
                    submitFn={()=>this.handleOk()}
                    showWarn={false}
                >
                    <PopupResult content={<span style={{lineHeight: '30px',display:'inline-block',textAlign:'left',color:'#333'}}>
			                    您正在撤销本次取现申请<br/>
			                    • 撤销取现成功后，资金会立即回到<span>{`${name}`}</span>账户的可用余额中<br/>
			                    • 若银行正在处理您的取现申请，可能会引起撤销失败<br/>
			                </span>}/>
                </Popup>
                <Popup
                    isShow={visible2}
                    title={`撤销${name}取现申请`}
                    submitText='确定'
                    hasCancel={false}
                    closePopup={()=>this.handleCancel()}
                    submitFn={()=>this.handleCancel()}
                    showWarn={false}
                >
                    <PopupResult
                        icon={cancelStatu == 0 ? "success" : "error"}
                        title={
                            cancelStatu == 0
                                ? <span>您可以在<a style={{fontSize:14,color: '#53a0e3'}} href="https://www.huli.com/hl/#/myaccount/capital" target="_blank">我的账户</a>中查看可用余额，或去<a  style={{fontSize:14, color: '#53a0e3'}} href={accountType == 1 ? "https://www.souyidai.com/p2p/#/invest/gs" : "https://www.huli.com/hl/#/invest/hy"} target="_blank">投资列表</a>直接投资。</span>
                                : failMessage
                        }
                    />
                </Popup>
                {/*充值操作被限制*/}
                <Popup title={`撤销${name}取现申请`}
                       isShow={visible3}
                       submitText="确定"
                       hasCancel={false}
                       showWarn={false}
                       closePopup={()=>this.handleCancel()}
                       submitFn={()=>this.handleCancel()}
                >
                    <PopupCommon.PopupTip
                        content={<span>{failMessage}</span>}
                    />
                </Popup>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {
        userBase : { accountInfo : { data: data1 },
            directCard : data3,
            userStatus : { data: data2 } } ,
        bankCardData : { sydBankCard }
    } = state;
    return{
        sydCard: sydBankCard,
        accountInfo : data1,
        userStatus : data2,
        directCard:data3,
    }
}

function mapDispatchToProps(dispatch) {
    return{

    }
}

export const TabOne = connect(
    mapStateToProps,
    mapDispatchToProps
)(Tab1)

export const TabTwo = connect(
    mapStateToProps,
    mapDispatchToProps
)(Tab2)
