const React = require('react')
const _  = require('lodash')
const cs = require('classnames')
const { connect } = require('react-redux');
const tools = require('./../../common/tool');
const banks = require('./../myaccount/recharge/bank').bankList;
const userBaseActions = require('../../reducers/userBase/userBaseActions');

class RryInvestPopup extends React.Component{
    constructor(props){
        super(props);
        /**
         * 状态说明
         * @author zangpeihui
         * @date   2017-09-25
         * @param  state operaState 1－转入   2－转出
         */
        this.state = {
            checkState:true,
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
            payType:true,   //true 银行快捷转入 false 慧赚余额转入
            subCount:'',
            promptText:'',
            pwd:'',
            rightDateInfo:{
                inTime:'',
                incomeCalculationDay:'',
                incomeArrivalDay:''
            },
            rightDateInfo_after:{
                isWorkday:0,
                inTime:'',
                incomeCalculationDay:'',
                incomeArrivalDay:''
            },
            passwordValiState:false,
            passwordErrorInfo:'',
            ajaxState:false,
            bankPrompt:''
        }
    }
    componentWillMount(){
        const {investMoney,account,directCard} = this.props;
        // 获取外部传入的转入金额
        this.setState({loadingState:true,account:account,directCard:directCard,subCount:investMoney==''?'':tools.tansformMoney(investMoney.replace(/\,/g,'')*100)});
        this.getRryAccount();
        this.getRightInfo();
        this.getInvestDate();
        this.getBankPrompt();
    }

    componentDidMount(){
        const {subCount} = this.state;
        //获得日日盈总金额
        if(subCount!=''){
            this.investVali(subCount,2);
        }
    }
    //获取银行公告
    getBankPrompt(){
        $.get('https://help.huli.com/text/android_tlpay_recharge.htm',(data)=>{
            this.setState({bankPrompt: data});
        });
    }
    //获取日日盈总金额
    getRryAccount(){
        const self = this;
        $.get({
            url:'/hqb/rry/queryUserRryInfo',
            dataType:'JSON',
            data:{t:Math.random()},
            success:function (data) {
                if(data.errorCode===0){
                    self.setState({RryAccount:data.data.rryAmount})
                }
            }
        })
    }

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
        this.investVali(value);
    }
    //验证转入金额
    investVali(value){
        if(value==''||value=='.'){
            this.setState({promptText:'请输入转入金额',subCount:''});
            return;
        }
        const {payType,directCard,account}=this.state,
            limited = payType?directCard.limitAmount:parseFloat(account.huliCurrentBalance.replace(/\,/g,''));
        const type = arguments[1]==2;
        let _value=parseFloat(type?value.replace(/\,/g,''):value);
        const result = _value>limited?(payType?'转入金额超出银行限额':'转入金额超过慧赚余额')
            :_value<1?'请输入1元以上的金额' :'';
        this.setState({promptText:result,
            subCount:type?tools.tansformMoney(_value*100):value
        });
        return result==''
    }

    backData(e){
        let value = e.target.value;
        value  = value.replace(/\,/g,'');
        value = parseFloat(value)==0?'':value;
        this.setState({subCount:value,initValiState:false})
    }
    formData(e){
        let value = e.target.value;
        value!=''&&this.setState({subCount:tools.tansformMoney(value*100)})
    }
    selectPayType(state){
        const {payType,subCount,checkState} = this.state;
        if(payType==state)return;
        this.setState({payType:state},()=>{
            this.investVali(subCount,2)
        })
    }
    changeChecked(){
        const {checkState} = this.state;
        this.setState({checkState:!checkState});
    }

    changePwd(e){
        const value = e.target.value;
        this.setState({pwd:value,passwordErrorInfo:''})
    }
    pwdVali(){
        const {pwd} = this.state,self = this;
        let state;
        $.post({
            url:'/hqb/rry/checkPayWord',
            async:false,
            data:{payPassword:pwd},
            success:function(data) {
                if(data.errorCode==0){
                    self.setState({passwordErrorInfo:''})
                    state = true
                }else {
                    self.setState({passwordErrorInfo:'交易密码错误，请确认后重新输入',ajaxState:false})
                    state = false
                }
            }
        });
        return state
    }
    //获取当前时间对应转入时间信息
    getRightInfo(){
        const self = this;
        $.post({
            url:'/hqb/rry/inFlowDate',
            data:{date:new Date().getTime()},
            success:function (data) {
                self.setState({rightDateInfo:data.data})
            }
        })
    }
    //获取下午三点后转入时间信息
    getInvestDate(){
        const self = this;
        let afterTime = new Date();
        $.post({
            url:'/hqb/rry/inFlowDate',
            data:{date:afterTime.setHours(16)},
            success:function (data) {
                self.setState({rightDateInfo_after:data.data})
            }
        })
    }
    getDateDetail(date) {
        const _date = new Date(date);
        return (_date.getMonth()+1) + '月' + _date.getDate() + '日'
    }

    //footer功能
    closeMask(){
        this.props.close();
    }
    //下一步按钮
    investAjax(){
        const {promptText,subCount,pwd,checkState,ajaxState} = this.state;
        const self = this;
        if(!this.investVali(subCount,2))return ;
        if(!checkState){
            alert('请先同意《用户服务协议》、《银行自动转账授权书》')
            return ;
        }
        if(pwd==''){
            self.setState({passwordErrorInfo:'请输入交易密码'});
            return ;
        }
        if(promptText!=''||subCount==''||subCount==0)return ;
        if(!ajaxState){
            self.setState({ajaxState:true},()=>{
                if(self.pwdVali()){
                    self.transIn();
                }
            })
        }
    }
    transIn(){
        const self = this;
        const {pwd,payType,subCount} = this.state;
        const obj = {
            isFromBank:payType,
            applyAmount:Math.round(parseFloat(subCount.replace(/\,/g,''))*100),
            payPassword:pwd
        }
        $.post({
            url:'/hqb/rry/transferIn',
            data:obj,
            success:function (data) {
                self.setState({subCount:'',ajaxState:false,promptText:'',pwd:'',payType:true})
                self.props.onResult(data,obj);
            }
        })
    }
    render(){
        const {account,directCard,loadingState,RryAccount,payType,promptText,pwd,rightDateInfo,rightDateInfo_after,ajaxState,bankPrompt} = this.state;
        const {bankCode} = directCard;
        const week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
        return (
            <div>
                <div className="huli-popup-content">
                    {
                        bankPrompt!==''&&<div className="bank-inform">
                            <p>{bankPrompt}</p>
                        </div>
                    }
                    <div style={{'height':0,'width':0,'overflow':'hidden','position':'relative','zIndex':'-1'}}>
                        <input type="text"/>
                        <input type="password"/>
                    </div>
                    {
                        loadingState &&
                        <div className={cs({"shift-to-box": true, 'margin-top10': bankPrompt!==''})}>
                            <div className="shift-version-list cf">
                                <p className="shift-title lt">日日盈总金额</p>
                                <p className="money-num lt"><span>{tools.tansformMoney(parseFloat(RryAccount))}</span><span>元</span></p>
                            </div>
                            <div className="shift-version-list cf">
                                <p className="shift-left lt">转入金额</p>
                                <div className="money-input lt">
                                    <input type="text" value={this.state.subCount} placeholder="1元起，0.01元递增" onChange={(e)=>{this.subCountChange(e)}} onFocus={(e) => {this.backData(e)}} onBlur={(e) => {this.formData(e)}}/>
                                    <span>元</span>
                                </div>
                                <p className="error-text lt">{promptText}</p>
                            </div>
                            <div className="shift-version-list cf">
                                <p className="shift-left lt">选择转入方式</p>
                                <div className={cs({"pay-way lt":true,"xjg":!payType,"bank":payType})}>
                                    <div className="way-item bank-way cf " onClick={()=>{this.selectPayType(true)}}>
                                        <img src={loadingState&&banks.bank[bankCode.toLowerCase()].src} alt=""/>
                                        <p className="bank-name lt">{loadingState&&banks.bank[bankCode.toLowerCase()].name}</p>
                                        <p className="bank-num rt" style={{'margin':'0 20px 0 0'}}>{tools.bankCardInit(directCard.cardId)}</p>
                                        <i></i>
                                    </div>
                                    <div className="way-item xjg-way cf" onClick={()=>{this.selectPayType(false)}}>
                                        <img src="https://static.huli.com/images/myaccount/hq-icon.png" alt=""/>
                                        <p className="bank-name lt">慧赚余额</p>
                                        <p className="remain-num lt"><span>{account.huliCurrentBalance}</span><span>元</span>
                                        </p>
                                        <i></i>
                                    </div>
                                    {
                                        payType && <p className="describe-bank">{directCard.hint}</p>
                                    }
                                    {
                                        !payType &&<div className="describe-bank">预计收益到账时间
                                            <span style={{color:'#FF7E24'}}>{this.getDateDetail(rightDateInfo.incomeArrivalDay)}{week[new Date(rightDateInfo.incomeArrivalDay).getDay()]}</span>
                                            {
                                                (new Date().getHours()>11&&new Date().getHours()<15&&rightDateInfo_after.isWorkday==0)?<p><span>如在15:00之后转入，预计<span style={{color:'#FF7E24'}}>{this.getDateDetail(rightDateInfo_after.incomeArrivalDay)}{week[new Date(rightDateInfo_after.incomeArrivalDay).getDay()]}</span></span>到账</p>: ''
                                            }
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="shift-version-list cf">
                                <p className="shift-left lt">交易密码</p>
                                <div className="money-input lt">
                                    <input type="password" value={pwd} onChange={(e)=>{this.changePwd(e)}} placeholder="请输入交易密码"/>
                                    <a className="link-blue" href="https://www.huli.com/myaccount/safecenter#set_deal_password_div">忘记交易密码？</a>
                                    <p className="prompt">{this.state.passwordErrorInfo}</p>
                                </div>
                            </div>
                            <div className="shift-version-list cf">
                                <div className="huli-one-checkbox popup-checkbox" style={{'margin':'10px 0 0 136px'}}>
                                    <em className={cs({'huli-common-icons': true, 'checked': this.state.checkState})}
                                        onClick={() => {
                                            this.changeChecked()
                                        }}></em>
                                    <span className="huli-agrees">
                                            同意
                                            <a href="https://events.huli.com/static/web/agree/bankAuthorization.html"
                                               target="_blank">《用户服务协议》</a>
                                            <a href="https://events.huli.com/static/web/agree/bankTransfer.html"
                                               target="_blank">《银行自动转账授权书》</a>
                                        </span>
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
                                !ajaxState && <input type="button" className={cs({'blue-btn common-btn-130':true,'false-btn':!this.state.checkState})} onClick={() => {
                                    this.investAjax()}} value='确定'/>
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

const mapStateRryInvestProps = (state, ownProps) => {
    const {userBase : {account:{ data:data1 } , directCard:{ data:data2 }, accountInfo:{ data:data3 }, userStatus:{ data:data4 }}} = state;
    return{
        account:data1,
        directCard:data2,
        accountInfo:data3,
        userStatus:data4
    }
};

const mapDispatchRryInvestProps = (dispatch, ownProps) => {
    return {
        dispatch
    }
};

export const investMask = connect(
    mapStateRryInvestProps,mapDispatchRryInvestProps
)(RryInvestPopup);