const React = require('react');
const _  = require('lodash')
const cs = require('classnames')
const { connect } = require('react-redux');
const tools = require('./../../common/tool');
const banks = require('./../myaccount/recharge/bank').bankList;
const userBaseActions = require('../../reducers/userBase/userBaseActions');

class RryOutModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            account:{
                huliCurrentBalance:''
            },
            directCard:{
                cardId:'',
                hint:'',
                bankName:'',
                limitAmount:''
            },
            loadingState:false,
            RryAccount:0,
            payType:false,   //true 银行快捷转入 false 慧赚余额转入
            subCount:'',
            promptText:'',
            isFast:true,
            pwd:'',
            rightDateInfo:{
                inTime:'',
                incomeCalculationDay:'',
                incomeArrivalDay:''
            },
            passwordErrorInfo:'',
            poundageState:false,  //手续费费用
            ajaxState:false
        }
    }

    componentWillMount(){
        const {account,directCard} = this.props;
        this.setState({account:account,directCard:directCard,loadingState:true});
        this.getRryAccount();
        this.getDate();
        this.getTransoutCount();
    }
    //获取当下转出返回的信息
    getDate(){
        const self = this;
        $.post({
            url:'/hqb/rry/inFlowDate',
            data:{date: new Date().getTime()},
            success:function (data) {
                self.setState({rightDateInfo:data.data})
            }
        })
    }
    //获取当前账户余额
    getRryAccount(){
        const self = this;
        $.get({
            url:'/hqb/rry/queryUserRryInfo',
            dataType:'JSON',
            data:{t:Math.random()},
            success:function (data) {
                if(data.errorCode===0){
                    self.setState({RryAccount:data.data.rryCurrentBalance})
                }
            }
        })
    }

    //获取取现和日日盈转出记录次数
    getTransoutCount(){
        const self = this;
        $.post({
            url:'/myaccount/capital/withdrawcount',
            data:{t:Math.random()},
            success:function (data) {
                if(data.errorCode==0){
                    self.setState({poundageState:data.data>4});
                }
            }
        })
    }
    //全部转出
    outputAll(){
        const {RryAccount} = this.state;
        const value = RryAccount/100;
        this.setState({subCount:value},()=>{ this.outGoingVali(value);})
    }
    //转出金额验证
    outGoingVali(value){
        if(value==''||value=='.'){
            this.setState({promptText:'请输入转出金额',subCount:''});
            return;
        }
        const {RryAccount,poundageState,isFast,payType}=this.state;
        let _value=parseFloat(value);
        const min = (payType&&poundageState)?2.01:0.01;
        const maxOnce = 50000;
        const maxCount=RryAccount/100;
        this.setState({
            promptText: _value<min?'实际到账金额不能低于1分'
                :isFast?(_value>maxOnce?'超过快速单次转出限额':_value>maxCount?'转出金额超出余额':'')
                    :(_value>maxCount?'转出金额超出余额':''),
            subCount:value
        });
    }
    //选择转出方式
    selectPayType(state){
        const paytype=this.state.payType;
        if(paytype==state)return;
        this.setState({payType:state,promptText:''})
    }
    //选择普通转出 快速转出
    changeOutputType(state){
        const {subCount} = this.state;
        this.setState({isFast:state},()=>{
            if(subCount!='')this.outGoingVali(subCount);
        })
    }
    //操作转出
    outGoingAjax(){
        const {ajaxState,subCount,pwd,promptText,poundageState,payType} = this.state;
        const self = this;
        //先验证表单
        if(subCount==0||subCount==''){
            self.setState({promptText:'请输入转出金额'})
            return ;
        }else if((!payType&& subCount <0.01)||(!poundageState&& subCount <0.01)||(payType&&poundageState && subCount < 2.01)){
            self.setState({promptText:'实际到账金额不能低于1分'})
            return;
        }else{
            if(promptText!='')return ;
        }
        if(pwd==''){
            self.setState({passwordErrorInfo:'请输入交易密码'});
            return ;
        }
        if(!ajaxState){
            self.setState({ajaxState:true},()=>{
                if(self.pwdVali()){
                    self.transOut();
                }
            })
        }
    }
    //onchange
    subCountChange(e){
        let value = e.target.value;
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
        this.outGoingVali(value);
    }
    //验证密码
    pwdVali(){
        const {pwd} = this.state,self = this;
        let state;
        $.post({
            url:'/hqb/rry/checkPayWord',
            data:{payPassword:pwd},
            async:false,
            success:function(data) {
                if(data.errorCode==0){
                    self.setState({passwordErrorInfo:''})
                    state = true
                }else {
                    self.setState({passwordErrorInfo:'交易密码错误，请确认后重新输入',ajaxState:false})
                    state  = false
                }
            }
        });
        return state
    }
    //转出请求
    transOut(){
        const self = this;
        const {pwd,payType,subCount,isFast} = this.state;
        const obj = {
            password:pwd,
            isToBank:payType,
            applyAmount:Math.round(subCount*100),
            isFast:isFast
        }
        $.post({
            url:'/hqb/rry/transferOut',
            data:obj,
            success:function (data) {
                self.setState({pwd:'',subCount:'',isFast:1,payType:true,promptText:'',ajaxState:false});
                self.props.onResult(data,obj);
            }
        })
    }

    closeMask(){
        this.props.close()
    }
    //修改密码双绑定
    changePwd(e){
        const value = e.target.value;
        this.setState({pwd:value,passwordErrorInfo:''})
    }
    getDateDetail(date) {
        const _date = new Date(date);
        return (_date.getMonth()+1) + '月' + _date.getDate() + '日'
    }
    getDateDetailPrev(date){
        const _date = new Date(date);
        const _prevDate = new Date(_date.getTime()-24*60*60*1000);
        return (_prevDate.getMonth()+1) + '月' + _prevDate.getDate() + '日'
    }
    render(){
        const {isFast,account,directCard,loadingState,RryAccount,payType,promptText,pwd,rightDateInfo,poundageState,ajaxState,subCount} = this.state;
        const {bankCode} = directCard;
        const isSameDay = (new Date(rightDateInfo.inTime).getDate()) ==(new Date(rightDateInfo.incomeCalculationDay-24*60*60*1000).getDate());
        //bank-out-fast-prompt
        const baseText = codes.local_tooltip.rry_out_fast_result_tip;
        const baseTimeText = payType?codes.local_tooltip.rry_bank_out_fast_time:codes.local_tooltip.rry_out_fast_time;
        const fastPrompText = baseText.replace('%s','<em>'+baseTimeText+'</em>');
        return (
            <div>
                <div className="huli-popup-content">
                    <div style={{'height':0,'width':0,'overflow':'hidden','position':'relative','zIndex':'-1'}}>
                        <input type="text"/>
                        <input type="password"/>
                    </div>
                    {
                        loadingState &&
                        <div className={cs({"shift-to-box": true})}>
                            <div className="shift-version-list cf">
                                <p className="shift-title lt">可转出金额</p>
                                <p className="money-num lt"><span>{tools.tansformMoney(parseFloat(RryAccount))}</span><span>元</span></p>
                                <a className="all-shift lt" onClick={()=>{this.outputAll()}}>全部转出</a>
                            </div>
                            <div className="shift-version-list cf">
                                <p className="shift-left lt">转出金额</p>
                                <div className="money-input lt">
                                    <input type="text" value={subCount} placeholder='请输入1分以上金额' onChange={(e)=>{this.subCountChange(e)}} />
                                    <span>元</span>
                                </div>
                                {
                                    payType&&<div className="poundage" style={{float:'left'}}>
                                        <span>手续费:</span>
                                        <em style={{'color':poundageState?'#FF781A':'#333'}}>{poundageState?'2.00':'0.00'}</em>
                                        <span>元</span>
                                    </div>
                                }
                                <p className="error-text lt">{promptText}</p>
                            </div>
                            <div className="shift-version-list cf">
                                <p className="shift-left lt">实际到账金额</p>
                                <p className="lt" style={{'fontSize':'14px','lineHeight':'30px','color':'#666'}}>
                                    <span>
                                        {
                                            (subCount==0||subCount=='')?'0.00':tools.tansformMoney(((poundageState&&payType)?(subCount>=2.01?subCount - 2:0):subCount)*100)
                                        }
                                </span><span>元</span>
                                </p>
                            </div>
                            <div className="shift-version-list cf">
                                <p className="shift-left lt">选择转出去向</p>
                                <div className={cs({"pay-way lt":true,"xjg":!payType,"bank":payType})}>
                                    <div className="way-item xjg-way cf" onClick={()=>{this.selectPayType(false)}}>
                                        <img src="https://static.huli.com/images/myaccount/hq-icon.png" alt=""/>
                                        <p className="bank-name lt">慧赚余额</p>
                                        <p className="remain-num lt"><span>{account.huliCurrentBalance}</span><span>元</span>
                                        </p>
                                        <i></i>
                                    </div>
                                    <div className="way-item bank-way cf " onClick={()=>{this.selectPayType(true)}}>
                                        <img src={loadingState&&banks.bank[bankCode.toLowerCase()].src} alt=""/>
                                        <p className="bank-name lt">{loadingState&&banks.bank[bankCode.toLowerCase()].name}</p>
                                        <p className="bank-num rt" style={{'margin':'0 20px 0 0'}}>{tools.bankCardInit(directCard.cardId)}</p>
                                        <i></i>
                                    </div>
                                </div>
                            </div>
                            <div className="shift-version-list cf">
                                <p className="shift-left lt">选择转出方式</p>
                                <div className={cs({'speed-way lt':true, 'quick':isFast,'slow':!isFast})}>
                                    <div className="speed-item quick-way cf" onClick={()=>{this.changeOutputType(true)}}>
                                        <p className="title">快速转出</p>
                                        <p className="detail" dangerouslySetInnerHTML={{__html:fastPrompText}}></p>
                                        <i></i>
                                    </div>
                                    <div className="speed-item slow-way cf " onClick={()=>{this.changeOutputType(false)}}>
                                        <p className="title">普通转出</p>
                                        <p className="detail">预计
                                            <em>{this.getDateDetail(rightDateInfo.incomeCalculationDay)}</em>到账，
                                            <em>
                                                {
                                                    isSameDay?this.getDateDetail(rightDateInfo.inTime): this.getDateDetail(rightDateInfo.inTime)+'-'+this.getDateDetailPrev(rightDateInfo.incomeCalculationDay)
                                                }
                                            </em>
                                            仍有收益</p>
                                        <i></i>
                                    </div>
                                </div>
                            </div>
                            <div className="shift-version-list cf">
                                <p className="shift-left lt">交易密码</p>
                                <div className="money-input lt">
                                    <input type="password" value={pwd} onChange={(e)=>{this.changePwd(e)}}  placeholder="请输入交易密码"/>
                                    <a className="link-blue" href="https://www.huli.com/myaccount/safecenter#set_deal_password_div">忘记交易密码？</a>
                                    <p className="prompt">{this.state.passwordErrorInfo}</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="huli-popup-footer">
                    <div className="huli-popup-action">
                        <span><input type="button" className="gray-btn common-btn-130"
                                     onClick={()=>{this.closeMask()}} value='取消'/>
                        </span>
                        <span>
                            {
                                !ajaxState&&<input type="button" className="blue-btn common-btn-130" onClick={() => {
                                    this.outGoingAjax()}}value='确定'/>
                            }
                            {
                                ajaxState&&<a className="gray-btn common-btn-130"><img src="https://static.huli.com/images/hq-gold/waite-2.gif" alt=""/></a>
                            }
                        </span>
                    </div>
                    <span className="huli-popup-risk">投资有风险，理财需谨慎</span>
                </div>
            </div>
        )
    }
}
const mapStateRryOutGoingProps = (state, ownProps) => {
    const {userBase : {account:{ data:data1 } , directCard:{ data:data2 }}} = state;
    return{
        account:data1,
        directCard:data2,
    }
};

const mapDispatchRryOutGoingProps = (dispatch, ownProps) => {
    return {
        dispatch
    }
};

export const outGoingMask = connect(
    mapStateRryOutGoingProps,mapDispatchRryOutGoingProps
)(RryOutModal);