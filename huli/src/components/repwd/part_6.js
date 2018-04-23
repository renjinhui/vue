const React = require('react');
const Util = require('./pwdCookie').Util;


let timer,email;
export const partSix = React.createClass({
    getInitialState(){
        return {
            sendState:true,
            time:60,
            promptText:''
        }
    },
    render(){
        return (
            <div className="forget-form stepSix">
                <div className="mailSend">
                    <div className="mailImg"></div>
                    <p>邮箱发送成功！您可以去邮箱认证，8小时有效</p>
                </div>
                <div className="rwd-group prompt-group">
                    <p className="promptError">{this.state.promptText}</p>
                </div>
                <div className="rwd-btns-box">
                    {
                        this.state.sendState? <a className="rwd-btn sendIn">重新发送（{this.state.time}s）</a>:
                            <a className="rwd-btn" onClick={this.reSendTo}>重新发送</a>
                     }
                </div>
            </div>
        )
    },
    componentWillMount(){
        this.getMailTime();
        email=this.props.email;
        const {sendState}  =  this.state;
        Util.enterClick(sendState,this.nextPart)
    },
    componentWillUnmount(){
        Util.removeClick(this.nextPart)
    },
    getMailTime(){
        timer = setTimeout( () => {
            if(this.state.time>0){
                this.setState({time:--this.state.time},this.getMailTime());
            }else {
                clearTimeout(timer);
                this.setState({sendState:false});
            }
        },1000);
    },
    reSendTo(){
        const self = this;
        const data = {
            email:this.props.email,
            t:this.props.t
        }
        const url = '/findPassword/sendEmail';
        $.post({
            url:url,
            data:data,
            success:result => {
                const json = JSON.parse(result)
                if(json.errorCode == 0){
                    //触发下一步
                    this.setState({sendState:true,time:60},function () {
                        self.getMailTime();
                    })
                }else if(json.errorCode==2){
                    self.setState({promptText:json.errorMessage + '即将为您跳转回第一步'});
                    setTimeout( () => {
                        self.props.onChange(0);
                    },2000);
                }else{
                    self.setState({mail:'',vailiState:true});
                    self.setState({promptText:json.errorMessage});
                    self.setState({valiState:true});
                }
            },
            error:error=> {
                return error;
            }

        })
    }
})