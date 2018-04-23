const React = require('react');


export const partTwo = React.createClass({
    getInitialState() {
        return {
            username:'',
            vivid:''
        }
    },
    render(){
        return (
            <div className="forget-form steptwo">
                <div className="rwd-group">
                    <label>手机号</label>
                    <input type="text" className="rwdInput" placeholder="输入注册时手机号" />
                        <p className="telPrompt">错误！错误！错误哟！</p>
                </div>
                <div className="rwd-group">
                    <label>短信验证码</label>
                    <input type="text" className="rwdInput" />

                        <a className="get-mess gray">30s</a>
                </div>
                <div className="rwd-btns-box">
                    <a className="rwd-btn">下一步</a>
                </div>
            </div>
        )
    }
})