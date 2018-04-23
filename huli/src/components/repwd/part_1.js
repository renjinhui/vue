const React = require('react');
const Util = require('./pwdCookie').Util;

let t;
export const partOne = React.createClass({
    getInitialState() {
        return {
            params:{
                username:'',
                captcha:'',
                t:''
            },
            promptText:'',
            imgUrl:'/connect/passimage.jpg',
            rt:'0',
            valiState:true
        }
    },
    render(){
        t = this.props.t;
        this.state.params.t = this.props.t;
        return (
            <div className="forget-form stepOne">
                <div className="rwd-group">
                    <label>账户名</label>
                    <input type="text" className="rwdInput" placeholder="昵称/手机号码" value={this.state.params.username} onChange={this.setUserName}/>
                </div>
                <div className="rwd-group noBt">
                    <label>验证码</label>
                    <input type="text" className="rwdInput" placeholder="请输入验证码" value={this.state.params.captcha} onChange={this.setCaptcha} />
                    <img src={this.state.imgUrl + '?t=' + t + '&_t=' + this.state.rt} alt="" className="vailImg" onClick={this.getImg}/>
                    <i className="icon-fresh" onClick={this.getImg}></i>
                    <b></b>
                </div>
                <div className="rwd-group prompt-group">
                    <p className="promptError">{this.state.promptText}</p>
                </div>
                <div className="rwd-btns-box">
                    {
                        this.state.valiState?<a className="rwd-btn" onClick={this.valiMobile}>申请密码找回</a>:
                        <a className="rwd-btn false-btn">申请密码找回</a>
                    }
                </div>
            </div>
        )
    },
    componentWillMount(){
        this.setState({valiState:true});
        const {valiState}  =  this.state;
        Util.enterClick(valiState,this.valiMobile)
    },
    componentWillUnmount(){
        Util.removeClick(this.valiMobile)
    },
    valiMobile(){
        const self = this;
        this.setState({valiState:false});
        const valiBefore =  this.baseVali();
        if(valiBefore){
            this.setState({promptText:valiBefore});
            this.setState({valiState:true});
        }else {
            const url = '/findPassword/checkCaptcha';
            this.setState({promptText:''});
            $.post({
                url:url,
                data:this.state.params,
                dataType: 'json',
                success:result => {
                    const json=result;
                    if(json.errorCode == 0){
                        // redux记录
                        //根据输入的username 手机号还是昵称走下一步路由
                        self.props.onChange(3,self.state.params.username)
                    }else if(json.errorCode == 2){
                        self.setState({promptText:json.errorMessage +'，正在为您重新创建会话'});
                        setTimeout( () => {
                            self.props.onChange(0)
                        },2000);
                    }else{
                        self.setState({promptText:json.errorMessage});
                        self.getImg();
                        self.setState({valiState:true});
                    }
                },
                error:function (error) {
                    return ;
                }

            })
        }
        // this.props.onChange(2)
    },
    setUserName(event){
        this.setState({params:{username: event.target.value,captcha:this.state.params.captcha,t:this.props.t}});
    },
    setCaptcha(event){
        this.setState({params:{username: this.state.params.username,captcha:event.target.value,t:this.props.t}});
    },
    baseVali(){
        if(this.state.params.username.trim()=='')return '请输入手机号或者昵称';
        if(this.state.params.captcha.trim()=='')return '请输入验证码';
        return false;
    },
    getImg(){
        this.setState({rt:Math.random() +''})
    }
})

