const React = require('react');
const Util = require('./pwdCookie').Util;

let t;
export const partSev = React.createClass({
    getInitialState(){
        return {
            realName:'',
            identity:'',
            promptText:'',
            valiState:true,
            toolTipState:false
        }
    },
    render(){
        const t = this.props.t;
        return (
            <div className="forget-form stepSev">
                <div className="rwd-group">
                    <label>真实姓名</label>
                    <input type="text" className="rwdInput" value={this.state.realName} onChange={this.setRealName}/>
                </div>
                <div className="rwd-group noBt">
                    <label>身份证号</label>
                    <input type="text" className="rwdInput" value={this.state.identity} onChange={this.setIdentity}/>
                </div>
                <div className="rwd-group prompt-group otherPrompt" onMouseOut={this.hideTooptips}>
                    <span onMouseOver={this.getTooltips}>港澳臺居民請點擊這裏</span>
                    <i className="icon-info" onMouseOver={this.getTooltips}></i>
                    <div className="rwd-tooltips" style={{display:this.state.toolTipState?'block':'none'}}>
                        <i className="border-cart-1"></i>
                        <i className="border-cart-2"></i>
                        <p>港、澳居民，請輸入永久性居民身份證；臺灣居民請輸入國民身份證</p>
                    </div>
                </div>
                <div className="rwd-group prompt-group">
                    <p className="promptError">{this.state.promptText}</p>
                </div>
                <div className="rwd-btns-box">
                    {
                        this.state.valiState?<a className="rwd-btn" onClick={this.nextPart}>下一步</a>:
                        <a className="rwd-btn">下一步</a>
                    }
                </div>
            </div>
        )
    },
    nextPart(){
        const self = this;
        const url= '/findPassword/checkId5';
        const valiInfo = this.valiIndentity();
        if(valiInfo){
            this.setState({promptText:valiInfo})
        }else{
            this.setState({valiState:false});
            const data = {
                realName : this.state.realName,
                id5 : this.state.identity,
                t :  this.props.t
            };
            $.post({
                url:url,
                data:data,
                success:result => {
                    const json = JSON.parse(result)
                    if(json.errorCode ==0){
                        //触发下一步
                        self.props.onChange(8);
                    }else if(json.errorCode==2){
                        self.setState({promptText:json.errorMessage + '即将为您跳转回第一步'});
                        setTimeout( () => {
                            self.props.onChange(0);
                        },2000);
                    }else{
                        self.setState({valiState:true});
                        self.setState({promptText:json.errorMessage});
                    }
                },
                error:error=> {
                    return error;
                }

            })
        }
    },
    componentWillMount(){
        const self = this;
        Util.cookie.del('syd_email');
        $('body').bind('click',function (event) {
            if(event.target.className!='tooltips'&&$(event.target).parents('.otherPrompt').length==0){
                self.setState({toolTipState:false});
            }
        })
        const {valiState}  =  this.state;
        Util.enterClick(valiState,this.nextPart)
    },
    componentWillUnmount(){
        Util.removeClick(this.nextPart)
    },
    valiIndentity(){
        if(this.state.realName=='')return '请输入真实姓名';
        if(this.state.identity=='')return '请输入身份证号码';
        return false;
    },
    setRealName(event){
        this.setState({realName:event.target.value})
    },
    setIdentity(event){
        this.setState({identity:event.target.value})
    },
    getTooltips(){
        this.setState({toolTipState:true})
    },
    hideTooptips(event){
        this.setState({toolTipState:false})
    }
})