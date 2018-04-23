const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const base64 = require('js-base64').Base64;
const Util = require('../../common/util').cookie;
const ToolTip = require('../common/tooltip.component').ToolTip;

const Info = React.createClass({
  render:function(){
    let Money = 0;
    let HB = 0;
    if(this.props.investingList.isFetching  ===1){
      Money = this.props.userBase.account.data.huliCurrentBalance;
      HB =this.props.userBase.account.data.couponAmount;
    }
    let str = '';
    if(this.props.userLogin.isLogin){
      str = <div>
        <div className="useful lt">
          <div><span className="lt">慧赚可用余额</span>
            <ToolTip data-text="acc_asset_available_licai" />{Money}<em>元</em></div>
          <div>可用红包{HB}<em>元</em></div>
        </div>
        <a href="/hl/#/myaccount/recharge/main" className="lt common-btn-70 orange-btn recharge-buttons">充值</a>
      </div>
    }
    return (
      <div className="acount-detail rt">
        {str}
      </div>
    );
  }
});


// module.exports = {
//   UserInfo
// };

const mapStateToProps = (state, ownProps) => {
  return{
    investingList:state.investingList,
    userLogin:state.userLogin,
    userBase:state.userBase
  }
};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
};

export const UserInfo = connect(
  mapStateToProps,mapDispatchToProps
)(Info);
