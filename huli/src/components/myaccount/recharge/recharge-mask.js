const React = require('react')

export const rechargeMask = React.createClass({
    getInitialState(){
        return {
            errorText:''
        }
    },
    render(){
        const {maskType} =this.props;
        const {errorText} = this.state;
        return (
            <div className="reCharge-mask" id="maskpop">
                <div className="maskMain">
                    <h2 className="title">{this.props.maskType>0?'充值':'安全提示'}</h2>
                    <img className="icon-close" src="https://static.huli.com/images/jjs/Group1.png" onClick={this.maskClose}/>
                    <div className="maskInfo">
                        {
                            maskType == -2?
                                <div className="rechargeSuccess" >
                                    <img className="icon-success "
                                         src="https://static.huli.com/images/collocation/apologize.png"
                                    />
                                    <p >为了您的账户安全请您先进行</p>
                                    <a className="link-blue"
                                       href="https://www.huli.com/hl/#/collocation/changeCard"
                                       target="_blank">
                                        开通慧赚托管账户
                                    </a>
                                </div>:
                                maskType == -1?
                                    <div className="rechargeSuccess" >
                                        <img className="icon-success "
                                             src="https://static.huli.com/images/collocation/apologize.png"
                                        />
                                        <p >为了您的账户安全请您先设置</p>
                                        <a className="link-blue"
                                           href="https://www.huli.com/myaccount/safecenter"
                                           target="_blank">
                                            交易密码
                                        </a>
                                    </div>:
                                    maskType ==0?
                                        <div className="safePrompt">
                                            <img src="https://static.huli.com/images/collocation/apologize.png"
                                                 alt="" className="icon-safePrompt"
                                            />
                                            <p>请在新打开的网上银行页面进行支付，<br/>支付完成前不要关闭该窗口。</p>
                                        </div>:
                                        maskType ==1?
                                            <div className="rechargeSuccess" >
                                                <img className="icon-success "
                                                     src="https://static.huli.com/images/collocation/success.png"
                                                />
                                                <p >恭喜您充值成功！</p>
                                                <a className="link-blue"
                                                   href="https://www.huli.com/hl/#/myaccount/recharge/lc-history">
                                                    查看明细
                                                </a>
                                            </div>:
                                            maskType ==2?
                                                <div className="rechargeFail">
                                                    <h4 className="prompt">抱歉，本次充值未成功！</h4>
                                                    <p>{errorText}</p>
                                                    <p>如需帮助，请致电客服 <a className="link-blue">400-817-8877</a></p>
                                                </div>:
                                                maskType==3?<div className="cashIng">
                                                    <h4 className="prompt">开户处理中，请稍后...</h4>
                                                </div>:null
                        }
                    </div>
                    <div className="maskFooter">
                        {
                            this.props.maskType < 0 ?
                                <a className="blue-btn mr20" onClick={this.maskClose}>确定</a>:
                                this.props.maskType == 0?
                                    <div>
                                        <a className="blue-btn mr20"
                                           href="https://www.huli.com/hl/#/myaccount/capital"
                                        >
                                            已完成付款
                                        </a>
                                        <a className="gray-btn mr20" onClick={this.maskClose}>选择其他方式</a>
                                    </div>:
                                    this.props.maskType == 1?
                                        <a className="blue-btn mr20" onClick={this.reload}>确定</a>:
                                        <a className="gray-btn mr20" onClick={this.maskClose}>关闭</a>
                        }
                    </div>
                </div>
            </div>
        )
    },
    componentWillMount(){

    },
    componentWillReceiveProps(nextProps){
        this.setState({maskState:nextProps.maskType,errorText:nextProps.errorInfo})
    },
    maskClose(){
        $('.reCharge-mask').hide();
        $('body').css('overflow','auto');
    },
    reload(){
        window.location.reload();
    }
})