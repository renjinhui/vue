const React = require('react');
const cs = require('classnames');

let params , stepState;
export const stepView = React.createClass({
    render :function () {
        params = this.props.toggleStep;
        stepState = this.props.toggleBand;
        const state1= stepState.email||stepState.security;
        const state2= stepState.realName;
        return (
            params.partState!=9?
                <div className="flow-step-box">
                {
                    params.partState==1?<h2 className="title">请输入您需要找回登录密码的账户名</h2>:

                    <div className="flow-step">
                        <div className={cs({'rwd-step lt frist':true, 'finished':params.partState>3,'active':params.partState<=3})}>
                            <div className="step-lines cf">
                               <em>1</em>
                            </div>
                            <span className="step-text">手机验证</span>
                        </div>
                        <div className="oneline"></div>
                        {
                            (stepState.email||stepState.security)?
                                <div className="rwdInline">
                                     <div className={cs({"rwd-step lt":true,'finished':params.partState>5,'active':params.partState==4||params.partState==5})}>
                                        <div className="step-lines cf">
                                           <em>2</em>
                                        </div>
                                        <span className="step-text">{params.partState==4?'邮箱验证':'密保验证'}</span>
                                    </div>
                                    <div className="oneline"></div>
                                </div>
                            :''
                        }
                        {
                            stepState.realName?
                            <div className="rwdInline">
                                <div className={cs({"rwd-step lt":true,'finished':params.partState>7,'active':params.partState==7})}>
                                    <div className="step-lines cf">
                                        <em>{(stepState.email||stepState.security)?3:2}</em>
                                    </div>
                                    <span className="step-text">身份验证</span>
                                </div>
                                < div className="oneline"></div>
                            </div>
                            :''
                        }
                        <div className={cs({"rwd-step lt":true,'active':params.partState>7})}>
                            <div className="step-lines cf">
                               <em>{
                                   state1&&state2?4:state1&&!state2?3:!state1&&state2?3:2
                               }</em>
                            </div>
                            <span className="step-text">重置密码</span>
                        </div>
                    </div>
                }
            </div>:
                <div></div>
        )
    }
})