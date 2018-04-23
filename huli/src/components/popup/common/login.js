const React = require('react');

class Login extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const login = "https://passport.huli.com/?backurl=" + location.href;
        const regist = "https://passport.huli.com/regist.html?backurl=" + location.href;

        return (
            <div className="huli-popup-content">
                <div className="hq-popup-success">
                    <div className="hq-login-head"></div>
                    <div className="hq-popup-prompt">
                        <p className="hq-prompt-suc login-hq">
                            <span>欢迎，请您先</span><a href={login}>登录</a><span>/</span><a href={regist}>注册</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = {
    PopupLogin: Login
}