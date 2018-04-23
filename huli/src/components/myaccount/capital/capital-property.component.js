const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const capitalActions = require('../../../reducers/myaccount/capital/capitalActions');
const ToolTip = require('../../common/tooltip.component').ToolTip;

const Property = React.createClass({

  componentWillMount:function(){
    // this.props.getCapital();
  },
  render() {
    let HAS_PROPERTY;
    let TOTAL_INCOME;
    let BE_INCOME;
    if(this.props.capitalData.isFetching == 1){
      HAS_PROPERTY = <p className="value-num">{this.props.capitalData.data.currentCapital}</p>;
      TOTAL_INCOME = <p className="value-num">{this.props.capitalData.data.allGainAmount}</p>;
      BE_INCOME = <p className="value-num">{this.props.capitalData.data.willGainInterest}</p>;
    }else{
      HAS_PROPERTY = <p className="value-num">0</p>;
      TOTAL_INCOME = <p className="value-num">0</p>;
      BE_INCOME = <p className="value-num">0</p>;
    }
    return(
      <div className="earnings-boxs cf">
        <div className="property-value lt">
          <div className="top-value cf">
            <div className="search-drop-down lt">
              <p>当前资产价值(元)</p>
              <span className="drop-down-big huli-common-icons lt"></span>
              <div className="version-detail-hover">
                <div className="arrow useful">
                  <div className="arrow-up"></div>
                  <div className="arrow-up-in"></div>
                </div>
                <div className="version-sums-account title cf">
                  <em className="lt">慧赚账户</em>
                  <i className="rt">{this.props.capitalData.data.amountHuli}</i>
                </div>
                <div className="version-sums-account cf">
                  <em className="lt">可用余额</em>
                  <i className="rt">{this.props.capitalData.data.currentBalanceHuli}</i>
                </div>
                <div className="version-sums-account cf">
                  <em className="lt">冻结金额</em>
                  <i className="rt">{this.props.capitalData.data.blockedBalanceHuli}</i>
                </div>
                <div className="version-sums-account cf">
                  <em className="lt">理财待收本金</em>
                  <i className="rt">{this.props.capitalData.data.willGainPrincipalForHuli}</i>
                </div>
                <div className="version-sums-account cf">
                  <em className="lt">活期</em>
                  <i className="rt">{this.props.capitalData.data.amountHq}</i>
                </div>
                <div className="version-sums-account title padding-5 cf">
                  <em className="lt">搜易贷账户</em>
                  <i className="rt">{this.props.capitalData.data.amountP2P}</i>
                </div>
                <div className="version-sums-account cf">
                  <em className="lt">可用余额</em>
                  <i className="rt">{this.props.capitalData.data.currentBalanceP2P}</i>
                </div>
                <div className="version-sums-account cf">
                  <em className="lt">冻结金额</em>
                  <i className="rt">{this.props.capitalData.data.blockedBalanceP2P}</i>
                </div>
                <div className="version-sums-account cf">
                  <em className="lt">网贷待收本金</em>
                  <i className="rt">{this.props.capitalData.data.willGainPrincipalForP2PAndProduct}</i>
                </div>
              </div>
            </div>
            <ToolTip data-text="local_tooltip.acc_asset_sum" />
          </div>
          {HAS_PROPERTY}
        </div>

        <div className="gray-lines"></div>

        <div className="property-value accumulated-value lt">
          <div className="top-value cf">
            <div className="search-drop-down lt">
              <p>累计收益(元)</p>
              <span className="drop-down-big huli-common-icons lt"></span>
              <div className="version-detail-hover">
                <div className="arrow useful">
                  <div className="arrow-up"></div>
                  <div className="arrow-up-in"></div>
                </div>
                <div className="version-useful-account cf">
                  <em className="lt">理财</em>
                  <i className="rt">{this.props.capitalData.data.gainAmountHuli}</i>
                </div>
                <div className="version-useful-account cf">
                  <em className="lt">活期</em>
                  <i className="rt">{this.props.capitalData.data.gainAmountHq}</i>
                </div>
                <div className="version-useful-account cf">
                  <em className="lt">网贷</em>
                  <i className="rt">{this.props.capitalData.data.gainAmountP2P}</i>
                </div>
                <div className="version-useful-account cf">
                  <em className="lt">红包</em>
                  <i className="rt">{this.props.capitalData.data.couponInterest}</i>
                </div>
                <div className="version-useful-account cf">
                  <em className="lt">返现</em>
                  <i className="rt">{this.props.capitalData.data.cashbackInterest}</i>
                </div>
              </div>
            </div>
            <ToolTip data-text="local_tooltip.acc_profit_history" />
          </div>
          {TOTAL_INCOME}
        </div>

        <div className="gray-lines"></div>

        <div className="property-value accumulated-value lt">
          <div className="top-value cf">
            <div className="search-drop-down lt">
              <p>预期收益(元)</p>
              <span className="drop-down-big huli-common-icons lt"></span>
              <div className="version-detail-hover">
                <div className="arrow useful">
                  <div className="arrow-up"></div>
                  <div className="arrow-up-in"></div>
                </div>
                <div className="version-useful-account cf">
                  <em className="lt">理财</em>
                  <i className="rt">{this.props.capitalData.data.willGainInterestForHuli}</i>
                </div>
                <div className="version-useful-account cf">
                  <em className="lt">网贷</em>
                  <i className="rt">{this.props.capitalData.data.willGainInterestForP2PAndProduct}</i>
                </div>
              </div>
            </div>
            <ToolTip data-text="local_tooltip.acc_profit_expect" />
          </div>
          {BE_INCOME}
        </div>
      </div>
    )
  }
});


const mapStateToProps = (state, ownProps) => {
  return{
    capitalData:state.capitalInfo
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCapital:()=>{
      dispatch(capitalActions.capitalInfoPosts())
    }
  }
};

export const CapitalProperty = connect(
  mapStateToProps,mapDispatchToProps
)(Property);
