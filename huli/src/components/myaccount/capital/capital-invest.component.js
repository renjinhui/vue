const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const capitalActions = require('../../../reducers/myaccount/capital/capitalActions');
const Item = require('./capital-invest-item.component').CapitalInvestItem;
const Title = require('./capital-invest-type-title.component').InvestTitle;

const Invest = React.createClass({
  getInitialState:function(){
    return {
      titleList: [
        {
          title: '理财',
          key: 'huli'
        },
        {
          title: '网贷',
          key: 'p2p'
        }
      ]
    }

  },
  componentWillMount:function(){
    // this.props.getCapitalInfoData();
  },
  render() {

    return (
      <div>
        <div className="manage-money">

          <div className="finance-contain cf">
            <div style={{width:'50%',float:'left'}}>
              <Title name='理财'/>
              <Item className="huli-common-icons manage-icon" href="https://www.huli.com/hl/#/myaccount/lc_lend/normal" willGainPrincipal={this.props.capital.data.willGainPrincipalForHuli} willGainInterest={this.props.capital.data.willGainInterestForHuli} title="认购项目" index="0" earningsTitle="预期收益"/>
            </div>
            <div style={{width:'50%',float:'left'}}>
              <Title name='活期'/>
              <Item className="huli-common-icons hq-icon-new" href="https://www.huli.com/hl/#/myaccount/rry/income" willGainPrincipal={this.props.capital.data.amountHq} willGainInterest={this.props.capital.data.rryEarningsYesterDay} title="日日盈" index="0" principalTitle="总金额" earningsTitle="昨日收益" />
            </div>
          </div>
        </div>
        <div className="manage-money">
          <Title name='网贷'/>
          <div className="finance-contain cf">
            <Item className="huli-common-icons invest-icon" href="https://www.huli.com/hl/#/myaccount/wd_lend/normal" willGainPrincipal={this.props.capital.data.willGainPrincipalForP2P} willGainInterest={this.props.capital.data.willGainInterestForP2P} title="出借项目" index="0" earningsTitle="约定收益"/>
            <Item className="huli-common-icons fixed-icon" href="/myaccount/fixedTerm/list" willGainPrincipal={this.props.capital.data.willGainProductPrincipal} willGainInterest={this.props.capital.data.willGainProductInterest} title="投标工具" index="1" earningsTitle="约定收益"/>
          </div>
        </div>
      </div>

    )
  }
});


const mapStateToProps = (state, ownProps) => {
  return{
    capital:state.capitalInfo
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCapitalInfoData: () => {
      dispatch(capitalActions.capitalInfoPosts())
    },
  }
};

export const CapitalInvest = connect(
  mapStateToProps,mapDispatchToProps
)(Invest);
