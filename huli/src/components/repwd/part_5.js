const React = require('react');
const Util = require('./pwdCookie').Util;
const cs = require('classnames');

let t;
// let codes={
//     securityQuestion:{1: "您母亲的姓名是？", 2: "您父亲的姓名是？", 3: "您配偶的姓名是？", 4: "您的出生地是？", 5: "您高中班主任的名字是？", 6: "您初中班主任的名字是？", 7: "您小学班主任的名字是？", 8: "您的小学校名是？", 9: "您的学号（或工号）是？", 10: "您父亲的生日是？", 12: "您母亲的生日是？", 13: "您配偶的生日是？"}
// }
export const partFiv = React.createClass({
    getInitialState(){
        return {
            selected:false,
            promptText:'',
            selectedInfo:'请选择您设置过的问题',
            answer:'',
            valiState:true,
            qtId:0
        }
    },
    render(){
        const m = this.props.Mail;
        const t = this.props.t;
            return (
            <div className="forget-form stepfur">
                <div className="rwd-group" style={{'left':'-20px'}}>
                    <label style={{'width':'120px'}}>已设置的密保问题</label>
                    <div className={cs({'rwdSelect':true,'active':this.state.selected})} style={{border:0,textIndent:0}}>
                        <a className="selectBtn">{this.state.selectedInfo} {false&&<i className="icon allow-down"></i>}</a>
                        {
                            false&&<ul className="rwdOptions" onClick={this.optionSelected}>
                                {
                                    Object.keys(codes.securityQuestion).map(item=>{
                                        return <li onClick={this.select} data-id={item}>{codes.securityQuestion[item]}</li>
                                    })
                                }
                            </ul>
                        }
                    </div>
                </div>
                <div className="rwd-group noBt">
                    <label>密保答案</label>
                    <input type="text" placeholder="请输入密保答案" className="rwdInput" value={this.state.answer} onChange = {this.setAnswer}/>
                </div>
                {
                    m?<div className="rwd-group prompt-group">
                        <p>您也可以通过<a className="link-blue" onClick={this.email}>安全邮箱</a>找回密码</p>
                    </div>:''
                }
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
    componentWillMount(){
        const self = this;
        const {valiState}  =  this.state;
        Util.enterClick(valiState,this.nextPart)
        $('body').bind('click',function (event) {
            if(event.target.className!='rwdSelect'&&$(event.target).parents('.rwdSelect').length==0){
                self.setState({selected:false});
            }
        })
    },
    componentWillUnmount(){
        Util.removeClick(this.nextPart)
    },
    componentDidMount(){
        const {questionId} = this.props;
        this.setState({qtId:questionId,selectedInfo:codes.securityQuestion[questionId]});
    },
    optionSelected(event){
        const  str= event.target.innerHTML;
        if($(event.target).is('ul'))return false
        const self = this;
        this.setState({selectedInfo:str},function () {
            window.setTimeout(function () {
                self.setState({selected:false})
            },300);
        });
    },
    email(){
        this.props.onChange(4);
    },
    triggleSelect(){
        this.setState({selected:!this.state.selected});
    },
    select(event){
        $(event.target).addClass('selected').siblings().removeClass('selected');
        this.setState({qtId:$(event.target).attr('data-id')});
    },
    setAnswer(event){
        this.setState({answer:event.target.value});
    },
    nextPart(){
        if(this.state.selectedInfo == '请选择您设置过的问题'){
            this.setState({promptText:'请选择密保问题'});
            return ;
        }
        const self = this;
        const url = '/findPassword/checkUserQuestion';
        const data = {
            questionId : this.state.qtId,
            answer : this.state.answer.toString().trim(),
            t : this.props.t
        }
        this.setState({valiState:false});
        $.post({
            url:url,
            data:data,
            success:result => {
                const json = JSON.parse(result)
                if(json.errorCode ==0){
                    //触发下一步
                    self.props.onChange(7);
                }else if(json.errorCode==2){
                    self.setState({promptText:json.errorMessage + '即将为您跳转回第一步'});
                    setTimeout( () => {
                        self.props.onChange(0);
                    },2000);
                    self.setState({valiState:true})
                }else{
                    self.setState({answer:'',vailiState:true,promptText:json.errorMessage,valiState:true});
                }
            },
            error:error=> {
                return error;
            }

        })
    }
})