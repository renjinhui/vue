const React = require('react');
const cs = require('classnames');
const bankLists = require('./bank').bankList;
const {connect} = require('react-redux');
const tools = require('./../../../common/tool');
const util = require('./../../../common/util');
const { Popup } = require('./../../popup/index.popup');
const PopupCommon = require('../../popup/common/index');
const userBaseActions = require('../../../reducers/userBase/userBaseActions');

class chargeLCDom extends React.Component{
    constructor(props){
        super(props);
        this.state =  {
            _bankList:{
                src:'',
                name:''
            },
            showState:false,
            bandState:false,
            payType:0,
            bankName:'',
            rechargeCount:'',
            promptText:'',
            valiState:false,
            payPwd:'',
            quickPayPrompt:'',
            initValiState:true,
            initPwdValiState:true,
            bankNotice:'',
            directCard:{
                bankCode: "",  //银行代号 如：CMB
                cardId: "",  //快捷卡卡号（屏蔽中间的数字）如：1234********5678
                hint: "", //限额提示 如：招商银行，单笔充值上限20w元
                bankName: "", //银行名称 如：招商银行
                limitAmount: 0
            },
            bankPrompt:'',
            animateState:true,
            rechargeStartState:false,
            isSetPayPassword:true,
            isLimit:false,
            isLimitMessage:''
        }
    }
    componentWillMount(){
        const self = this;
        const {dispatch} = this.props;
        const {directCard,isSetPayPassword} = this.props;
        if(directCard.cardId!=''){
            dispatch(userBaseActions.getUserBaseDirectCard());
        }
        this.setState({directCard:directCard,bandState:directCard.cardId!='',isSetPayPassword:isSetPayPassword});
        this.getBankPrompt();
        $.post({
            url: '/trust/charge/recentCyberCard',
            data: {accountType: 2},
            success: function (data) {
                if (data.errorCode == 0) {
                    const name = data.data.bankCode.toLowerCase();
                    self.setState({_bankList: bankLists.bank[name], showState: name!=='', bankName:name})
                }
            }
        })
        $.post({
            url: '/trust/charge/judgeOp',
            data: {accountType: 2,op: 'charge'},
            success: function (data) {
                data = data.errorCode != undefined ? data : JSON.parse(data);
                const message = data.errorMessage;
                if (data.errorCode == 92 || data.errorCode == 91) {
                    self.setState({isLimit:false,isLimitMessage:message})
                }else{
                    self.setState({isLimit:true,isLimitMessage:''})
                }
            }
        })
    }

    componentWillReceiveProps(props){
        const {directCard,bankName,isSetPayPassword} = props;
        if(bankName) {
            this.setState({_bankList: bankLists.bank[bankName],bankName:bankName,showState:true})
        }
        const rechargeValue = util.getUrlParam('cash');
        let {promptText} = this.state;
        if(rechargeValue!=''&&directCard.cardId!='')promptText= ''
        this.setState({directCard:directCard,bandState:directCard.cardId!='',promptText:rechargeValue!=''?promptText:'',isSetPayPassword:isSetPayPassword},()=>{
            if(rechargeValue!=''&&rechargeValue>=10000){
                this.rechargeCountChange(tools.tansformMoney(rechargeValue));
                const href = location.href.replace(/cash=\d*&*/,'')
                location.href = href;
            }else if(this.state.rechargeCount!=''){
                let {rechargeCount} = this.state;
                rechargeCount = rechargeCount.replace(/,/,'');
                this.rechargeCountChange(tools.tansformMoney(rechargeCount*100));
            }
        })

    }
    render(){
        const _state = this.props.state;
        const {initValiState,valiState,promptText,initPwdValiState,payType,bandState,directCard,showState,animateState,bankNotice} = this.state;
        return (
            <div style={{'display':'block'}} id="lc">
                <div className="cashNum mb40" >
                    <div style={{'position':'absolute','opacity':0,'zIndex':'-1'}}>
                        <input type="text" name=""/>
                        <input type="password" name=""/>
                    </div>
                    <label className="mr20">充值金额</label>
                    <input type="text" placeholder={payType==0?'请输入≥100的金额':'请输入≥1元的金额'}
                           className={cs({'error-input':!initValiState&&!valiState})}
                           value={this.state.rechargeCount} onChange={(e)=>{this.rechargeCountChange(e)}}
                           onFocus={(e) =>{this.backData(e)}} onBlur={(e)=>{this.formData(e)}}/>
                    <span className="yuan">元</span>
                    <span className={cs({'promptStyle':true,'error':!valiState})}>{promptText}</span>
                </div>
                <div className="cashControl mb30">
                    <h3 className="title">充值方式</h3>
                    <div className={payType==0?'bankBox mt10 active':'bankBox mt10'}>
                        {
                            bandState?
                                <div style={{'overflow':'hidden'}}>
                                    <div className="quickPay">
                                        <i className={cs({'bankicon':true, 'check-right':payType==0,'gray-check':payType!=0})} onClick={()=>{this.quickPayChoice()}}></i>
                                        <label className="mr20">快捷充值</label>
                                        <div className="bankGroup">
                                            <img className="bankicon oa-icon-zhaoshang" src={bankLists.bank[directCard.bankCode.toLowerCase()].src}/>
                                            <label>{bankLists.bank[directCard.bankCode.toLowerCase()].realName}</label>
                                        </div>
                                        <div className="bankCardInfo">
                                            <span className="bankNum">{tools.bankCardInit(directCard.cardId)}</span>
                                            <p>{directCard.hint}</p>
                                        </div>
                                    </div>
                                    {
                                        payType==0?
                                            <div className="quickRechargBox" style={{'paddingBottom':'29px','display':animateState?'block':'none'}}>
                                                <div className="cashPwd" style={{'overflow':'hidden','padding':'0 20px 20px'}}>
                                                    <input type="password" className={cs({'cashInput':true,'cashInputError':!initPwdValiState&&this.state.quickPayPrompt!==''})} placeholder="输入交易密码" value={this.state.payPwd} onChange={(e)=>{this.quickPayPwdChange(e)}} onfocus={(e)=>{this.quickPayStateChange(e)}}/>
                                                    <span className="quickPayPrompt">{this.state.quickPayPrompt}</span>
                                                    <a className="link-blue" href="https://www.huli.com/myaccount/safecenter#set_deal_password_div">忘记交易密码？</a>
                                                </div>
                                                {
                                                    bandState&&payType==0?
                                                        <div style={{'clear':'both'}}>
                                                            <a className="cashSure" onClick={()=>{this.quickPay()}}>确认充值</a>
                                                            {
                                                                bankNotice!==''&&<p className="cashPrompt">{bankNotice}</p>
                                                            }
                                                        </div>:null
                                                }

                                            </div>:null
                                    }
                                </div>:
                                <div className="quickPay">
                                    <i className={cs({'bankicon':true, 'check-right':payType==0,'gray-check':payType!=0})} onClick={()=>{this.quickPayChoice()}}></i>
                                    <label className="mr20">快捷充值</label>
                                    <a className="link-blue" href="https://www.huli.com/hl/#/collocation/openAccount" >开通慧赚托管账户</a>
                                </div>
                        }
                    </div>
                    <div className={payType==1?"webCash active":'webCash'}>
                        <div className="webPay">
                            <i className={cs({'bankicon':true, 'check-right':payType==1,'gray-check':payType!=1})} onClick={()=>{this.webPayChoice()}}></i>
                            <label className="mr20">网银支付</label>
                            {
                                showState?<div className="bankGroup">
                                    <img className="bankicon"
                                         src={this.state._bankList.src}/>
                                    <label>{this.state._bankList.name}</label>
                                </div>:null
                            }
                            <a className="link-blue" onClick={()=>{this.openBankList()}}>{showState?'选择其他银行':'选择银行'}</a>
                            {
                                this.state.bankPrompt!==''&&!showState&&<p className="promptText" style={{marginLeft:'10px',color:'#FF781A',float:'left'}}>{this.state.bankPrompt}</p>
                            }
                        </div>
                        {
                            payType==1?
                                <div className="mb20" id="webChargeBox" style={{'display':'none'}}>
                                    <a className="cashSure webBtn" onClick={()=>{this.doCharge()}}>确认充值</a>
                                </div>:null
                        }
                    </div>
                </div>
                <div className="promptInfo">
                    <h3 className="title">温馨提示：</h3>
                    <div dangerouslySetInnerHTML={{__html:codes.local_tooltip.deposit_hint}}></div>
                </div>
                <Popup title="充值"
                       isShow = {this.state.rechargeStartState}
                       hasCancel = {false}
                       hasSubmit = {false}
                       closePopup={() => {
                           this.closePopup('rechargeStartState');
                       }}
                >
                    <PopupCommon.PopupResult
                        content={
                            <div>
                                <img src="https://static.huli.com/images/loading3.gif" alt=""/>
                                <div style={{marginTop: '10px'}}><span className='hq-popup-only'>充值处理中，请稍候</span>
                                </div>
                            </div>
                        }
                    />
                </Popup>
            </div>
        )
    }
    openBankList(){
        this.webPayChoice();
        const name = this.props.bankName||this.state.bankName
        $('body').css('overflow','hidden');
        $('#bankList .active').removeClass('active');
        if(name!=''&&$('#bankList li[data-key='+ name +']').length!=0){
            $('#bankList li[data-key='+ name +']').trigger('click');
        }else{
            $('.bankInfos').hide();
        }
        $('#bankList').show();
    }

    webPayChoice(){
        const self = this;
        const {bandState}=this.state;
        if(bandState){
            $('.quickRechargBox').stop().slideUp(300,()=>{
                self.setState({payType:1,animateState:true,valiState:false,promptText:'',initValiState:true},()=>{
                    const _num = self.state.rechargeCount;
                    self.rechargeCountChange(_num);
                    $('#webChargeBox').stop().slideDown()
                })
            });
        }else {
            self.setState({payType:1,animateState:true,valiState:false,promptText:'',initValiState:true},()=>{
                const _num = self.state.rechargeCount;
                self.rechargeCountChange(_num);
                $('#webChargeBox').stop().slideDown()
            })
        }

    }
    quickPayChoice(){
        const {bandState}=this.state;
        $('#webChargeBox').stop().slideUp(200,()=>{
            this.setState({payType:0,valiState:false,animateState:false,promptText:'',initValiState:true,initPwdValiState:true},()=>{
                const _num = this.state.rechargeCount;
                this.rechargeCountChange(_num);
                if(bandState)$('.quickRechargBox').stop().slideDown(300);
            })
        });
    }
    rechargeCountChange(e){
        const self = this;
        const {directCard,bandState,payType} = this.state;
        let value = typeof e =='string'?e:e.target.value;
        this.setState({valiState:false});
        let reg = /[^\d.]/g,
            reg_f = /^\d+\.\d{1,}\.\d*$/,
            reg_ff = /^\d+\.\d{3,}$/;
        if(reg.test(value)){
            value = value.replace(reg,"");
        }
        if( reg_ff.test(value)){
            let dotIndex = value.indexOf(".");
            value = value.substr(0,dotIndex+3);
        }
        if(reg_f.test(value)){
            let dotIndex = value.indexOf(".");
            value = value.substr(0,dotIndex+2);
        }
        if(payType==0){
            if(!bandState){
                self.setState({promptText:'请先开通慧赚托管账户',rechargeCount:value});
                return ;
            }
            if(tools.isIE8()&&(value==''||value == "请输入≥100元的金额" || value == null )){
                value =  "请输入≥100元的金额";
                self.setState({promptText:'最小充值金额为100元',rechargeCount:value});
                return ;
            }
            if(value==''|| value == null ){
                this.setState({promptText:'',rechargeCount:'',valiState:true});
                return ;
            }
            if(parseFloat(value) > directCard.limitAmount){
                self.setState({promptText: directCard.hint,rechargeCount:value});
                return ;
            }
            if(parseFloat(value) < 100){
                self.setState({promptText:'最小充值金额为100元',rechargeCount:value});
                return ;
            }
            if(parseFloat(value)>=100&&parseFloat(value)<=directCard.limitAmount){
                this.setState({promptText:tools.convertCurrency(value),rechargeCount:value,valiState:true});
                return ;
            }
        }else{
            if(tools.isIE8()&&(value==''||value == "请输入≥1元的金额" || value == null )){
                value =  "请输入≥1元的金额";
                self.setState({promptText:'最小充值金额为1元',rechargeCount:value});
                return ;
            }
            if(value==''|| value == null ){
                this.setState({promptText:'',rechargeCount:value,valiState:true});
                return ;
            }
            if(parseFloat(value) > 300000){
                self.setState({promptText:'单笔最多充值30万元，具体限额以各银行为准',rechargeCount:value});
                return ;
            }
            if(parseFloat(value) < 1){
                self.setState({promptText:'最小充值金额为1元',rechargeCount:value});
                return ;
            }
            if(parseFloat(value)>=1&&parseFloat(value)<=300000){
                this.setState({promptText:tools.convertCurrency(value),rechargeCount:value,valiState:true});
                return ;
            }
        }

    }
    formData(e){
        let value = e.target.value;
        value!=''&&this.setState({rechargeCount:tools.tansformMoney(value*100)})
    }
    backData(e){
        let value = e.target.value;
        value  = value.replace(/\,/g,'')
        this.setState({rechargeCount:value,initValiState:false})
    }
    doCharge(){
        const {isOpen,isFetching} = this.props;
        const {isSetPayPassword} = this.state;
        this.setState({initValiState:false,initPwdValiState:false});
        let sessions;
        if(isOpen||isFetching==3){
            //未开户
            this.props.doWeb(-2);
            return ;
        }else if(!isSetPayPassword){
            this.props.doWeb(-1);
            return ;
        }else {
            this.setState({initValiState:false})
            if(!this.state.valiState||this.state.bankName==''){
                if(this.state.rechargeCount==''){
                    this.setState({promptText:'请输入充值金额'},()=>{
                        this.errorAnimation();
                    })
                }else if(this.state.bankName==''){
                    this.setState({bankPrompt:'请选择网银支付的银行'})
                }else {
                    this.errorAnimation();
                }
                return ;
            }
            if(this.state.rechargeCount=='') {
                this.setState({promptText: '请输入充值金额'}, () => {
                    this.errorAnimation();
                })
                return ;
            }
            if(!this.state.isLimit){
                this.props.doWeb(-3,this.state.isLimitMessage);
                return ;
            }
            sessions = 0;
        }

        this.props.doWeb(sessions,2,this.state.rechargeCount,this.state.bankName.toUpperCase());
    }
    judgeCharge(){
        let self = this;
        $.ajax({
            url: '/trust/charge/judgeOp',
            data: {accountType: 2,op: 'charge'},
            async:false,
            success: function (data) {
                data = data.errorCode != undefined ? data : JSON.parse(data);
                const message = data.errorMessage;
                if (data.errorCode == 92 || data.errorCode == 91) {
                    self.props.doWeb(-3,message);
                }else{
                    self.doCharge();
                }
            }
        })
    }
    errorAnimation(){
        var arrNew = ["86px","76px","82px","80px"];
        for(var i=0,len = arrNew.length;i < len ;i++){
            (function(i){
                setTimeout(function(){
                    $(".cashNum .error").animate({left:arrNew[i]},100,'linear');
                }, 100*i);
            })(i);
        }
    }
    errorPayAnimation(){
        var arrNew = ["126px","116px","122px","120px"];
        for(var i=0,len = arrNew.length;i < len ;i++){
            (function(i){
                setTimeout(function(){
                    $(".quickPayPrompt").animate({left:arrNew[i]},100,'linear');
                }, 100*i);
            })(i);
        }
    }
    quickPayStateChange(){
        this.setState({initPwdValiState:false})
    }
    getBankPrompt(){
        const self = this;
        $.get('https://help.huli.com/text/android_tlpay_recharge.htm',(data)=>{
            self.setState({bankNotice: data});
        });
    }
    quickPay(){
        const {isOpen,isFetching,isSetPayPassword} = this.props;
        const self = this;
        this.setState({initValiState:false,initPwdValiState:false})
        if(isOpen||isFetching==3){
            this.props.doWeb(-2);
            return ;
        }
        if(isSetPayPassword=='false'){
            this.props.doWeb(-1);
            return ;
        }
        if(!this.state.valiState){
            if(this.state.rechargeCount==''){
                this.setState({promptText:'请输入充值金额'},()=>{
                    this.errorAnimation();
                })
            }else {
                this.errorAnimation();
            }
            return ;
        }
        if(this.state.payPwd==''){
            self.setState({'quickPayPrompt':'请输入交易密码'},()=>{
                this.errorPayAnimation();
            })
            return ;
        }
        $.post({
            url: '/trust/charge/judgeOp',
            data: {accountType: 2,op: 'charge'},
            success: function (data) {
                data = data.errorCode != undefined ? data : JSON.parse(data);
                const message = data.errorMessage;
                if (data.errorCode == 92 || data.errorCode == 91) {
                    self.props.doWeb(-3,message);
                    return ;
                }else{
                    self.setState({rechargeStartState:true});
                    self.payDirect();
                }
            }
        })

    }
    payDirect(){
        const self = this;
        const { directCard:{bankCode }} = this.state;
        $.post({
            url:'/trust/charge/huli/direct',
            data:{
                amount:parseInt(self.state.rechargeCount.replace(/[\.\,]/g,"")),
                password:self.state.payPwd,
                bankCode
            },
            success:function (data) {
                self.setState({rechargeStartState:false},()=>{
                    if(data.errorCode == 0){
                        self.props.doWeb(1);
                    }else if(data.errorCode == 1||data.errorCode == 2){
                        self.props.doWeb(2,data.errorMessage);
                    }else if(data.errorCode == 3){
                        self.props.doWeb(4,data.errorMessage);
                    }
                })
            }
        })
    }
    quickPayPwdChange(e){
        if(e.target.value!=''){
            this.setState({'quickPayPrompt':''})
        }
        this.setState({payPwd:e.target.value});
    }
}
const mapLcProps = (state, ownProps) => {
    const {userBase : {directCard:{data:data,isFetching:data4},userStatus:{data:{id5Status:data2,isSetPayPassword:data3}}}} = state
    return{
        directCard:data,
        isOpen:data2!="3",
        isSetPayPassword:data3,
        isFetching:data4
    }
};

const mapDispatchsLcprops = (dispatch, ownProps) => {
    return {
        dispatch
    }
};

export const chargeLC = connect(
    mapLcProps,mapDispatchsLcprops
)(chargeLCDom);