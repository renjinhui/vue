const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;
const base64 = require('js-base64').Base64;
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const Util = require('../../../common/util').cookie;
const actions = require('../../../reducers/login/loginActions');
const userActions = require('../../../reducers/userBase/userBaseActions');

const NavMain = React.createClass({
  componentWillMount:function(){
  },
  render:function(){
    const account = this.props.state.userBase.account;
    return (
      <div className="myacoount-navs lt">
        <div className="nva-item-menu">
          <div className="menu-title cf">
            <span className="huli-common-icons lt"></span>
            <p className="lt">我的资金</p>
          </div>
          <div className="menu-list">
            <Link to="/myaccount/capital" className="cf" activeClassName="current"><span className="blue-line lt"></span><p>资金概览</p></Link>
            <Link to="/myaccount/recharge" className="cf" activeClassName="current"><span className="blue-line lt"></span><p>充值</p></Link>
            <Link to="/myaccount/collocation/takeNow" className="cf" activeClassName="current"><span className="blue-line lt"></span><p>取现</p></Link>
          </div>
        </div>

        <div className="nva-item-menu manage">
          <div className="menu-title cf">
            <span className="huli-common-icons lt"></span>
            <p className="lt">理财</p>
          </div>
          <div className="menu-list">
            <Link to="/myaccount/lc_lend" className="cf" activeClassName="current">
              <span className="blue-line lt"></span>
              <p>认购项目</p>
            </Link>

            <a href="/myaccount/invest/cooperation_transfer" className="cf">
              <span className="blue-line lt"></span>
              <p>转让记录</p>
            </a>
            <a href="/myaccount/capital/assets_detail" className="cf">
              <span className="blue-line lt"></span>
              <p>资金明细</p>
            </a>
          </div>
        </div>

         <div className="nva-item-menu manage">
          <div className="menu-title cf">
            <span className="huli-common-icons lt"></span>
            <p className="lt">活期</p>
          </div>
          <div className="menu-list">
            <Link to="/myaccount/rry" className="cf" activeClassName="current"><span className="blue-line lt"></span><p>日日盈</p></Link>
          </div>
        </div>

        <div className="nva-item-menu lending">
          <div className="menu-title cf">
            <span className="huli-common-icons lt"></span>
            <p className="lt">网贷</p>
          </div>
          <div className="menu-list">
            <Link to="/myaccount/wd_lend" className="cf" activeClassName="current">
              <span className="blue-line lt"></span>
              <p>出借项目</p>
            </Link>
            <a href="/myaccount/invest/p2p_transfer" className="cf">
              <span className="blue-line lt"></span>
              <p>转让记录</p>
            </a>
            <a href="/myaccount/invest/invest_list_product" className="cf">
              <span className="blue-line lt"></span>
              <p>投标工具</p>
            </a>
            <a href="/myaccount/capital/detail" className="cf">
              <span className="blue-line lt"></span>
              <p>资金明细</p>
            </a>
          </div>
        </div>

        <div className="nva-item-menu accounts">
          <div className="menu-title cf">
            <span className="huli-common-icons lt"></span>
            <p className="lt">账户</p>
          </div>
          <div className="menu-list">
            <a href="/myaccount/stainfo/list" className="cf">
              <span className="blue-line lt"></span>
              <p>消息箱{ (account.isFetching === 1 && account.data.stainfoCount != 0) ? <em className="accview-msg-num">{account.data.stainfoCount}</em> : ''}</p>
            </a>
            <a href="/myaccount/safecenter" className="cf">
              <span className="blue-line lt"></span>
              <p>安全中心</p>
            </a>
            <Link to="/myaccount/bankCard" className="cf" activeClassName="current"><span className="blue-line lt"></span><p>银行卡</p></Link>
            <a href="/myaccount/coupon/list" className="cf">
              <span className="blue-line lt"></span>
              <p>红包 {(account.isFetching === 1 && account.data.couponCount != 0) ? <em className="accview-msg-num">{account.data.couponCount}</em> : ''}</p>
            </a>
            <a href="/myaccount/raise/list" className="cf">
              <span className="blue-line lt"></span>
              <p>加息券 {(account.isFetching === 1 && account.data.raiseInterestCouponCount != 0) ? <em className="accview-msg-num">{account.data.raiseInterestCouponCount}</em> : ''}</p>
            </a>
            <a href="/myaccount/score/index" className="cf">
              <span className="blue-line lt"></span>
              <p>狐狸积分</p>
            </a>
            <a href="/myaccount/invite/list" className="cf">
              <span className="blue-line lt"></span>
              <p>邀请好友</p>
            </a>
          </div>
        </div>
      </div>

    );
  }
});


const mapStateToProps = (state, ownProps) => {
  return{
    state,
    userBase: state.userBase,
    userLogin: state.userLogin
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const Nav = connect(
  mapStateToProps,mapDispatchToProps,null, { pure: false }
)(NavMain);
