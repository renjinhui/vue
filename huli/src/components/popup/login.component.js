const React = require('react');

const Login = React.createClass({
  render() {
    let loginUrl = 'https://passport.huli.com/?backurl=' + location.href;
    return (
        <div className="huli-popup-content">
          <div className="hq-popup-success">
              <div className="hq-login-head"></div>
              <div className="hq-popup-prompt">
                  <p className="hq-prompt-suc login-hq">
                      <a href={loginUrl} target="_blank">登录</a><span>&nbsp;后操作，新朋友请先</span>&nbsp;<a href="https://passport.huli.com/regist.html" target="_blank">注册</a>
                  </p>
              </div>
          </div>
      </div>
    )
  }
});

module.exports = {
  Login
};
