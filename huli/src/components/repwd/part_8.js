const React = require('react');
const cs = require('classnames');
const _ = require('lodash');
const Util  = require('./pwdCookie').Util;

let t;
let _vali_isChar = false;
try{
    _vali_isChar = codes.secure.level == "4";
}catch(ex){
}
export const partEit = React.createClass({
    getInitialState(){
        return {
            password:'',
            repassword:'',
            promptText:'',
            focusState:false,
            passwordStrength:0,
            pwdVali:{
                one:false,
                two:false,
                trd:false,
                fur:false
            },
            sendState:true
        }
    },
    componentWillMount(){
        const {sendState}  =  this.state;
        Util.enterClick(sendState,this.compelete)
    },
    componentWillUnmount(){
        Util.removeClick(this.compelete)
    },
    render(){
        t = this.props.t;
        return (
            <div className="forget-form stepEit">
                <div className="rwd-group long">
                    <label>请输入新密码</label>
                    <input type="password" className="rwdInput" placeholder={"8-20位，要包含字母"+(_vali_isChar?"、特殊字符":"")+"和数字"} value={this.state.password} onChange={this.setPassword} onFocus={this.setLayerShow} onBlur={this.setLayerHide}/>
                    <div className={cs({'pwdValiInfo':true,'focused':this.state.focusState})}>
                        <i className="icon-cart-3"></i>
                        <i className="icon-cart-4"></i>
                        <div className="pwdValiBox">
                            <h3 className="title">您的密码必须包括</h3>
                            <ul>
                                <li className={cs({'success':this.state.pwdVali.one})}>
                                    <i className="icon-check"></i>
                                    <span>登录密码位8-20个字符</span>
                                </li>
                                <li className={cs({'success':this.state.pwdVali.two})}>
                                    <i className="icon-check"></i>
                                    <span>必须包含大写或小写英文字母</span>
                                </li>
                                <li className={cs({'success':this.state.pwdVali.trd})}>
                                    <i className="icon-check"></i>
                                    <span>至少1个数字</span>
                                </li>
                                {
                                    _vali_isChar?
                                        <li className={cs({'success':this.state.pwdVali.fur})}>
                                            <i className="icon-check"></i>
                                            <span>至少1个特殊字符</span>
                                        </li>
                                        :
                                        null
                                }
                            </ul>
                            <h3 className="strength">密码强度：
                                {
                                    this.state.passwordStrength==0?'':this.state.passwordStrength==1?'弱':this.state.passwordStrength==2?'中':this.state.passwordStrength==3?'强':''
                                }
                            </h3>
                            <div className="line-strength">
                                {
                                    this.state.passwordStrength==1?
                                        <div className="gray-line one">
                                            <span className="red"></span>
                                        </div>
                                        :this.state.passwordStrength==2?
                                        <div className="gray-line two">
                                            <span className="orange"></span>
                                            <span className="orange"></span>
                                        </div>
                                        :this.state.passwordStrength==3?
                                            <div className="gray-line trd">
                                                <span className="green"></span>
                                                <span className="green"></span>
                                                <span className="green"></span>
                                            </div>:''
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rwd-group noBt">
                    <label>确认新密码</label>
                    <input type="password" className="rwdInput" value={this.state.rePassword} onChange={this.setRePassword} onBlur={this.valiDbPwd}/>
                </div>
                <div className="rwd-group prompt-group">
                    <p className="promptError">{this.state.promptText}</p>
                </div>
                <div className="rwd-btns-box">
                    {
                        this.state.sendState?<a className="rwd-btn" onClick={this.compelete}>重置密码</a>:
                            <a className="rwd-btn">重置密码</a>
                    }
                </div>
            </div>
        )
    },
    setPassword(event){
        const pwd = event.target.value;
        this.setState({password:pwd});
        const vali_1 = Boolean(pwd.length>=8&&pwd.length<=20),
            vali_2 = Boolean(/[a-zA-Z]/g.test(pwd)),
            vali_3 = Boolean(/[\d]/g.test(pwd)),
            vali_4 = _vali_isChar? Boolean(/[~`!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\\\|\;\:\'\"\,\<\.\>\/\?]/g.test(pwd)) : true;
        this.setState({pwdVali:_.assign({},this.state.pwdVali,{
            one:vali_1,
            two:vali_2,
            trd:vali_3,
            fur:vali_4
        })});
        let num = 0,passwordStrength;
        num+=(vali_1?1:0) + (vali_2?1:0) + (vali_3?1:0) + (vali_4?1:0);
        passwordStrength = num==0?0:num==1?1:num<4?2:3;
        this.setState({passwordStrength:passwordStrength});
    },
    setRePassword(event){
        this.setState({rePassword:event.target.value})
    },
    setLayerShow(){
        this.setState({focusState:true,promptText:''});
    },
    setLayerHide(){
        let prompt = '';
        if(this.state.password==''){
            prompt  = '请输入密码'
        }else if(this.state.passwordStrength!=3){
            prompt  = '密码不符合规则'
        }else if(this.state.repassword ==''){
            prompt = '';
        }
        this.setState({focusState:false});
        this.setState({promptText:prompt});
    },
    valiDbPwd(){
        let prompt = '';
        if(this.state.rePassword==''){
            prompt  = '请再次输入密码'
        }else if(this.state.password==''){
            prompt  = '请输入密码'
        }else if(this.state.passwordStrength!=3){
            prompt  = '密码不符合规则'
        }else if(this.state.password != this.state.rePassword){
            prompt = '设置的密码不一致，请确认后重试'
        }
        this.setState({promptText:prompt});
    },
    compelete(){
        const self = this;
        const valiResult = this.valiFun();
        if(valiResult){
            self.setState({promptText:valiResult});
        }else {
            self.setState({sendState:false});
            const url = '/findPassword/resetPassword';
            const data = {
                password:this.state.password,
                confirmPassword:this.state.rePassword,
                t:this.props.t
            };
            $.post({
                url:url,
                data:data,
                success:result => {
                    const json = JSON.parse(result)
                    if(json.errorCode == 0){
                        self.props.onChange(9)
                    }else if(json.errorCode == 2){
                        self.setState({promptText:json.errorMessage +'，正在为您重新创建会话'});
                        setTimeout( () => {
                            self.props.onChange(0)
                        },2000);
                    }else{
                        self.setState({promptText:json.errorMessage,sendState:true});
                    }
                },
                error:function (error) {
                    return ;
                }
            })
        }
    },
    valiFun(){
        const state = this.state.pwdVali;
        if(!(state.one&&state.two&&state.trd&&state.fur)){
            return '设置的密码不符合安全要求';
        }
        if(this.state.password != this.state.rePassword){
            return '设置的密码不一致，请确认后重试';
        }
        return false;
    }
})