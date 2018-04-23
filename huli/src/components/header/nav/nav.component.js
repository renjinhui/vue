const React = require('react');
const ReactRedux = require('react-redux');
const base64 = require('js-base64').Base64;
const connect = ReactRedux.connect;
const Link = require('react-router').Link;
const Util = require('../../../common/util').cookie;
const actions = require('../../../reducers/login/loginActions');

const NavBar = React.createClass({
  componentWillMount:function(){

  },
  render() {
    return (
      <div className="main-nav-contain">
        <div className="huli-head-box cf">
          <a href="https://www.huli.com" className="huli-logo lt"></a>
          <div className="menu-navs rt">
            <div className="normal-nav ">
              <a href="https://www.huli.com">首页</a>
            </div>
            <div className="normal-nav " >
              <Link to="/rry" activeClassName="current">活期</Link>
            </div>
            <div className="normal-nav navLC">
              <Link to="/invest" activeClassName="current">理财</Link>
              <div className="nva-two-details">
                <div className="arrow">
                  <div className="arrow-up"></div>
                  <div className="arrow-up-in"></div>
                </div>
                <ul className="next-navs">
                  <li><Link to="/invest/hy" activeClassName="current">慧盈</Link></li>
                  <li><Link to="/invest/hyou" activeClassName="current">慧优</Link></li>
                  <li><Link to="/invest/hb" activeClassName="current">慧保</Link></li>
                  <li><Link to="/invest/transfer" activeClassName="current">理财转让</Link></li>
                </ul>
              </div>

            </div>
            <div className="normal-nav">
              <a href="https://www.souyidai.com/p2p/#/invest/gs" target="_blank">网贷</a>
              <div className="nva-two-details">
                <div className="arrow">
                  <div className="arrow-up"></div>
                  <div className="arrow-up-in"></div>
                </div>
                <ul className="next-navs">
                  <li className="ht-90"></li>
                  <li><a href="https://www.souyidai.com/p2p/#/invest/gtjd" target="_blank"> 网贷项目</a></li>
                  <li><a href="https://www.souyidai.com/p2p/#/invest/transfer" target="_blank">网贷转让</a></li>
                </ul>
              </div>

            </div>
            <div className={this.props.userLogin.isLogin ? "huli-account logining" : "huli-account no-login"}>
              <span className="huli-common-icons"></span>
              <Link className="my-acoount" to="/myaccount/capital">我的账户</Link>
              <span className="down-top huli-common-icons"></span>
              <div className="account-details">
                <div className="top-empty"></div>
                <a href="/myaccount/stainfo/list" className="detail-list">
                  <p>未读消息</p>
                  {/*<em class="blue-text" data-type="index-infoMessage"></em>*/}
                  <em className={this.props.userBase.account.data.stainfoCount ? "blue-text":"gray-text"}>{this.props.userBase.account.data.stainfoCount}个</em>
                </a>

                <a href="/myaccount/coupon/list" className="detail-list">
                  <p>可用红包</p>
                  {/*<em class="gray-text" data-type="index-coupon"></em>*/}
                  <em className={this.props.userBase.account.data.couponCount ? "blue-text":"gray-text"}>{this.props.userBase.account.data.couponCount}个</em>
                </a>

                <a href="/myaccount/raise/list" className="detail-list">
                  <p>可用加息券</p>
                  {/*<em class="gray-text" data-type="index-raise"></em>*/}
                  <em className={this.props.userBase.account.data.raiseInterestCouponCount ? "blue-text":"gray-text"}>{this.props.userBase.account.data.raiseInterestCouponCount}个</em>
                </a>

                <Link to="/myaccount/recharge" className="detail-list"><p>充值</p></Link>

                <Link to="/myaccount/collocation/takeNow" className="detail-list"><p>取现</p></Link>

                <a href="https://passport.huli.com/logout?backurl=https://www.huli.com" className="safety-exit">安全退出</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
});

// module.exports = {
//   Nav
// };

const mapStateToProps = (state, ownProps) => {
  return{
    userLogin:state.userLogin,
    userBase:state.userBase
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
};

export const Nav = connect(
  mapStateToProps,mapDispatchToProps
)(NavBar);
