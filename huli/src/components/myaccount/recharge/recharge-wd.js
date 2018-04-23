const React = require('react');
const bankLists = require('./bank').bankList;
const {connect} = require('react-redux');
const cs = require('classnames');
const tool = require('./../../../common/tool');
const util = require('./../../../common/util');

class chargeWDDom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            _bankList:{
                src:'',
                name:''
            },
            showState:false,
            bankName:'',
            rechargeCount:'',
            promptText:'',
            valiState:false,
            initValiState:true,
            bankPropmpt:'',
            isLimit:false,
            isLimitMessage:''
        }
    }
    render(){
        const _state = this.props.state;
        const {valiState,promptText,initValiState,bankPropmpt,showState} = this.state;
        return (
            <div style={{'display':'none'}} id="wd">
                <div className="cashNum mb40" >
                    <label className="mr20">充值金额</label>
                    <input type="text" placeholder="请输入≥1元的金额" className={cs({'error-input':!initValiState&&!valiState})}
                           value={this.state.rechargeCount} onChange={(e)=>{this.rechargeCountChange(e)}} onFocus={(e)=>{this.backData(e)}}
                           onBlur={(e)=>{this.formData(e)}}/>
                    <span className="yuan">元</span>
                    <span className={cs({'promptStyle':true,'error':!valiState})}>{promptText}</span>
                </div>
                <div className="cashControl mb30">
                    <h3 className="title">充值方式</h3>
                    <div className="bankBox mt10">
                        <div className="webPay">
                            <i className="bankicon check-right"></i>
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
                                bankPropmpt!==''&&!showState&&<p className="promptText" style={{marginLeft:'10px',color:'#FF781A',float:'left'}}>{bankPropmpt}</p>
                            }
                        </div>
                        <a className="cashSure webBtn" onClick={()=>{this.doCharge()}}>确认充值</a>
                    </div>
                </div>
                <div className="promptInfo">
                    <h3 className="title">温馨提示：</h3>
                    <div dangerouslySetInnerHTML={{__html:codes.local_tooltip.deposit_hint}}></div>
                </div>
            </div>
        )
    }
    openBankList(){
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
    componentWillMount(){
        const self = this;
        $.post({
            url: '/trust/charge/recentCyberCard',
            data: {accountType: 1},
            success: function (data) {
                if (data.errorCode == 0) {
                    const name = data.data.bankCode.toLowerCase();
                    self.setState({_bankList: bankLists.bank[name],showState: name!=='',bankName:name})
                }
            }
        })
      $.post({
        url: '/trust/charge/judgeOp',
        data: {accountType: 1,op:'charge'},
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
    componentWillReceiveProps(nextProps){
        const {id5Status,bankName} = nextProps;
        if(bankName) {
            this.setState({_bankList: bankLists.bank[nextProps.bankName],bankName:nextProps.bankName,showState:true});
        }
        const rechargeValue = util.getUrlParam('cash');
        this.setState({id5Status:id5Status},()=>{
            if(rechargeValue!=''&&rechargeValue>=100){
                this.rechargeCountChange(tool.tansformMoney(rechargeValue));
                const href = location.href.replace(/cash=\d*&*/,'')
                location.href = href;
            }else if(this.state.rechargeCount!=''){
                let {rechargeCount} = this.state;
                rechargeCount = rechargeCount.replace(/,/,'');
                this.rechargeCountChange(tool.tansformMoney(rechargeCount*100));
            }
        });
    }
    rechargeCountChange(e){
        const self = this;
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
        if(tool.isIE8()&&(value==''||value == "请输入≥1元的金额" || value == null )){
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
            this.setState({promptText:tool.convertCurrency(value),rechargeCount:value,valiState:true});
            return ;
        }
    }
    formData(e){
        let value = e.target.value;
        value!=''&&this.setState({rechargeCount:tool.tansformMoney(value*100)})
    }
    backData(e){
        let value = e.target.value;
        value  = value.replace(/\,/g,'')
        this.setState({rechargeCount:value,initValiState:false})
    }
    doCharge(){
        const {id5Status, isSetPayPassword} = this.props;
        let sessions ;
        if(id5Status!=3){
            //未开户
            this.props.doWeb(-2);
            return ;
        }else if(!isSetPayPassword){
            this.props.doWeb(-1);
            return ;
        }else {
            this.setState({initValiState:false});
            if(!this.state.valiState||this.state.bankName==''){
                if(this.state.rechargeCount==''){
                    this.setState({promptText:'请输入充值金额'},()=>{
                        this.errorAnimation();
                    })
                }else if(this.state.bankName==''){
                    this.setState({bankPropmpt:'请选择网银支付的银行'})
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

        this.props.doWeb(sessions,1,this.state.rechargeCount,this.state.bankName.toUpperCase());
    }

    judgeCharge(){
      let self = this;
      $.ajax({
          url: '/trust/charge/judgeOp',
          data: {accountType: 1,op:'charge'},
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
}
const mapWdProps = (state, ownProps) => {
    const {userBase : {userStatus:{data:{isSetPayPassword:data3,id5Status:data2}}}} = state
    return{
        id5Status:data2,
        isSetPayPassword:data3
    }
};

const mapDispatchsWdprops = (dispatch, ownProps) => {
    return {
        dispatch
    }
};

export const chargeWD = connect(
    mapWdProps,mapDispatchsWdprops
)(chargeWDDom);