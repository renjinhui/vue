const React  = require('react');
const Util = require('./pwdCookie').Util;

let t;
export const partFor = React.createClass({
    getInitialState(){
        return {
            mail:'',
            mailVali:false,
            promptText:'',
            valiState:true
        }
    },
    render(){
        const s = this.props.Secur;
        return (
            <div className="forget-form stepFiv">
                <div className="rwd-group noBt">
                    <label>邮箱</label>
                    <input type="text" placeholder="请输入邮箱" className="rwdInput" value={this.state.mail} onChange={this.setUserMail}/>
                </div>
                {
                   s? <div className="rwd-group prompt-group">
                      <p>您也可以通过<a className="link-blue" onClick={this.security}>安全密保</a>找回密码</p>
                    </div>:''
                }
                <div className="rwd-group prompt-group">
                    <p className="promptError">{this.state.promptText}</p>
                </div>
                <div className="rwd-btns-box">
                    {
                       this.state.valiState? <a className="rwd-btn" onClick={this.nextPart}>下一步</a>:
                           <a className="rwd-btn">下一步</a>
                    }
                </div>
            </div>
        )
    },
    componentWillMount(){
        t = this.props.t;
        const {valiState}  =  this.state;
        Util.enterClick(valiState,this.nextPart)
    },
    componentWillUnmount(){
        Util.removeClick(this.nextPart)
    },
    nextPart(){
        const self  = this;
        if(this.state.mail == ''){
            this.setState({promptText:'请输入设置的安全邮箱'})
            return ;
        }
        if(this.state.mail.indexOf('@')==-1){
            this.setState({promptText:'请输入正确的邮箱格式'});
            return false
        }
        this.setState({valiState:false});
        const data = {
            email:this.state.mail,
            t:t
        }
        const url = '/findPassword/sendEmail';
        $.post({
            url:url,
            data:data,
            success:result => {
                const json = JSON.parse(result)
                if(json.errorCode == 0){
                    //触发下一步
                    Util.cookie.add('syd_email',this.state.mail,1);
                    self.props.onChange(6,self.state.mail);
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
    },
    setUserMail(event){
        const value = event.target.value;
        this.setState({mail:value});
    },
    security(){
        this.props.onChange(5);
    }
});

