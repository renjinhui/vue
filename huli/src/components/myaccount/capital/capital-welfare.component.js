const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const welfareActions = require('../../../reducers/myaccount/welfare/welfareActions');
const ToolTip = require('../../common/tooltip.component').ToolTip;

const Welfare = React.createClass({
  componentWillMount:function(){
    this.props.getWelfareData();
  },
  render() {
    let HB;
    let JX;
    let JF;
    let Invest;
    let scoreStr;
    let friendStr;

    if(this.props.welfareData.isFetching == 1){
      HB = <a href="/myaccount/coupon/list" target="_blank" className="normal-text lt">红包{this.props.welfareData.data.couponCount}个，{this.props.welfareData.data.couponAmount}元</a>;
      JX = <a href="/myaccount/raise/list" target="_blank" className="normal-text lt">加息券{this.props.welfareData.data.raiseInterestCouponCount}张</a>;
      JF = <a href="/myaccount/score/index" target="_blank" className="normal-text lt">狐狸积分{this.props.welfareData.data.currentScore}分</a>;
      Invest = <a href="/myaccount/invite/list" target="_blank" className="normal-text lt">已邀请{this.props.welfareData.data.invitedCount}人 </a>;
    }else {
      HB = <a href="/myaccount/coupon/list" target="_blank" className="normal-text lt">红包0个，0元</a>;
      JX = <a href="/myaccount/raise/list" target="_blank" className="normal-text lt">加息券0张</a>;
      JF = <a href="/myaccount/score/index" target="_blank" className="normal-text lt">狐狸积分0分</a>;
      Invest = <a href="/myaccount/invite/list" target="_blank" className="normal-text lt">已邀请0人 </a>;
    }

    if(this.props.welfareData.data.expireScore > 0){
      scoreStr = <ToolTip data-text="您有即将过期的易积分，请您尽快兑换" />;
    }else{
      scoreStr = '';
    }
    if(this.props.welfareData.data.unRealedCount > 0){
      friendStr = <ToolTip data-text="您有注册后20天尚未实名的好友,注册30天内实名/投资可以获得奖励" />;
    }else{
      friendStr = '';
    }
    return (
      <div className="useful-boxs cf">
        <div className="useful-details due-date lt">
          <span className="red-bags huli-common-icons lt"></span>

          {HB}

        </div>

        <div className="useful-details lt">
          <span className="red-bags raise-icon huli-common-icons lt"></span>
          {JX}
        </div>

        <div className="useful-details lt">
          <span className="red-bags grade-icon huli-common-icons lt"></span>
          {JF}
          {scoreStr}
        </div>

        <div className="useful-details last-details lt">
          <span className="red-bags friend-icon huli-common-icons lt"></span>
          {Invest}
          <a href="https://www.huli.com/myaccount/invite/list" className="normal-text invite-text lt">立即邀请</a>
          {friendStr}
        </div>
      </div>
    )
  }
});


const mapStateToProps = (state, ownProps) => {
  return{
    welfareData:state.welfareData
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getWelfareData:()=>{
      dispatch(welfareActions.welfareInfoPosts())
    }
  }
};

export const CapitalWelfare = connect(
  mapStateToProps,mapDispatchToProps
)(Welfare);
