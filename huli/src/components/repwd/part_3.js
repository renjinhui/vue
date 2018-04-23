const React = require('react');
const Util = require('./pwdCookie').Util;

let t,mobile,timer=null;
export const partTrd = React.createClass({
    getInitialState(){
        return {
            promptText:'',
            sendState:false,
            time:60,
            valiState:false,
            shortMsg:'',
            mobile:'',
            valiState:false,
            initSend:true
        }
    },
    render(){
        t = this.props.t;
        mobile =this.props.mobile;
        return (
            <div className="forget-form steptrd">
                {
                    this.usernameState(mobile)?
                    <div className="rwd-group">
                        <label>手机号</label>
                        <p className="rwdName">{mobile}</p>
                        <a className="link-blue modify-rwd" onClick={this.modify}>修改</a>
                    </div>
                        :
                    <div className="rwd-group">
                        <label>手机号</label>
                        <input type="text" className="rwdInput" placeholder="请输入注册时手机号" value={this.state.mobile} onChange={this.setMobile}/>
                    </div>
                 }
                <div className="rwd-group noBt">
                    <label>短信验证码</label>
                    <input type="text" className="rwdInput" placeholder="请输入短信验证码" value={this.state.shortMsg} onChange={this.setShortMsg}/>
                    {
                        this.state.sendState?
                            <a className="get-mess gray">{this.state.time}s</a>:
                        this.state.initSend?
                            <a className="get-mess" onClick={this.sendSms}>点击获取</a>:
                        <a className="get-mess" onClick={this.sendSms}>重新获取</a>
                    }
                </div>
                <div className="rwd-group prompt-group">
                    <p className="promptError">{this.state.promptText}</p>
                </div>
                <div className="rwd-btns-box">
                    {
                        !this.state.valiState?<a className="rwd-btn" onClick={this.nextPart}>下一步</a>:
                            <a className="rwd-btn">下一步</a>
                    }
                </div>
            </div>
        )
    },
    componentWillMount(){
        if(this.usernameState(this.props.mobile)){
            this.setState({mobile:this.props.mobile}, this.sendSms())
        }else {
            this.setState({mobile:''})
        }
        const {valiState}  =  this.state;
        Util.enterClick(!valiState,this.nextPart)
    },
    componentWillUnmount(){
        Util.removeClick(this.nextPart)
    },
    nextPart(){
        const self = this;
        this.setState({valiState:true});
        if(this.state.shortMsg==''){
            this.setState({promptText:'请输入短信验证码'});
            return ;
        }
        this.setState({promptText:''});
        const url = '/findPassword/checkSmscode';
        const data = {
            smscode:this.state.shortMsg,
            t:t
        };
        $.post({
            url:url,
            data:data,
            dataType: 'json',
            success:result => {
                const json = result;
                if(json.errorCode==0){
                    self.props.onChange(4)
                }else if(json.errorCode==2){
                    self.setState({promptText:json.errorMessage + '   即将为您跳转回第一步'})
                    setTimeout( () => {
                        this.props.onChange(0)
                    },2000);
                }else {
                    self.setState({promptText:json.errorMessage})
                    self.setState({valiState:false})
                }
            },
            error:error=> {
                self.setState({valiState:false})
                return error;
            }

        })
    },
    modify(){
        // 修改手机号 redux
        mobile='';
        this.props.onChange(1,'')
    },
    sendSms(){
        let _mobile,_t;
        if(!this.usernameState(this.props.mobile)){
            if(this.state.mobile==''){
                this.setState({promptText:'请先输入手机号'})
                return false;
            }else if(!(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(this.state.mobile))){
                this.setState({promptText:'手机号格式不对，请重新输入'})
                return false;
            }
            _mobile = this.state.mobile;
            _t = t;
        }else {
            _mobile = this.props.mobile;
            _t = this.props.t;
            this.setState({initSend:false})
        }
        this.setState({promptText:''})
        const url = '/findPassword/sendSms';
        fetch(url,{method:'POST',credentials:'include', mode: 'cors',headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },body:Util.turnData.form({mobile:_mobile,t:_t})}).then(response => response.json())
            .then( (json) => {
                if(json.errorCode == 0){
                    //发送成功
                    this.setState({sendState:true});
                    this.setState({time:json.data.needWaitTime==0?60:json.data.needWaitTime},this.countDown());
                }else if(json.errorCode==2){
                    this.setState({promptText:json.errorMessage + '   即将为您跳转回第一步'})
                    setTimeout( () => {
                        this.props.onChange(0)
                    },2000);
                }else {
                    if(json.errorMessage){
                        this.setState({promptText:json.errorMessage})
                    }else if(json.data.desc){
                        this.setState({promptText:json.data.desc})
                    }else {
                        this.setState({promptText:'发送短信失败，请稍后重试'})
                    }
                }
            })
    },
    usernameState(mobile){
        return /^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(mobile)
    },
    setMobile(event){
        this.setState({mobile:event.target.value})
    },
    setShortMsg(event){
        this.setState({shortMsg:event.target.value})
    },
    countDown(){
        timer = setTimeout( () => {
            if(this.state.time>0){
                this.setState({time:--this.state.time},this.countDown());
            }else {
                clearTimeout(timer);
                this.setState({sendState:false});
            }
        },1000);
    }
})