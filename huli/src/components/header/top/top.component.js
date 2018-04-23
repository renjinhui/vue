const React = require('react');
const ReactRedux = require('react-redux');
const base64 = require('js-base64').Base64;
// const base64 = require('base-64');
const connect = ReactRedux.connect;
const Util = require('../../../common/util').cookie;
const actions = require('../../../reducers/login/loginActions');


const TopBar = React.createClass({

  render() {
    return (
      <div className="huli-head-top cf">
        <p className="server-phone lt">服务热线 400-817-8877（周一至周日9:00-18:00）</p>
        <div className="top-nav rt">
          <div className={this.props.userLogin.isLogin ? "login-status lt login2" : "login-status lt login1"}>
            <div className="no-login lt">
              <p>已有账号，</p>
              <a href="https://passport.huli.com/?backurl=https://www.huli.com" target="_blank">登录</a>
              <span></span>
              <a href="https://passport.huli.com/regist.html" target="_blank">注册</a>
            </div>
            <div className="logining lt">
              <p>您好,</p>
              <a href="https://www.huli.com/hl/#/myaccount/capital" className="account-name">{this.props.userLogin.cookies}</a>
              <a href="https://passport.huli.com/logout?backurl=https://www.huli.com">安全退出</a>
            </div>
          </div>

          <a href="https://events.huli.com/static/web/huli-app/" target="_blank" className="item-a about-phone lt">
            <p className="huli-common-icons"></p>
            <em>手机客户端</em>
            <span className="huli-common-icons drop-down-small lt"></span>
            <div className="scan-code">
              <div className="code-box">
                <div className="code-empty"></div>
                <div className="code-images"></div>
                <i>扫一扫 下载</i>
              </div>
            </div>
          </a>
          <a href="https://help.huli.com/about/aboutus.html" target="_blank" className="item-a lt">公司介绍</a>
          <a href="https://events.huli.com/static/web/guide/" target="_blank" className="item-a lt">新手福利</a>
          <a href="https://help.huli.com/huli/help/index.htm" target="_blank" className="item-a lt">帮助中心</a>
          {/*<a href="https://help.huli.com/about/announce/" className="item-a lt">网站公告</a>*/}
          {/*<a href="/myaccount/score/index" className="item-a item-a2 lt">积分商城</a>*/}
        </div>
      </div>
    )
  }
});


const mapStateToProps = (state, ownProps) => {
  return{
    userLogin:state.userLogin
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
  }
};

export const Top = connect(
  mapStateToProps,mapDispatchToProps
)(TopBar);