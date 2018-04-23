const React=require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const xjgActions = require('../../../reducers/myaccount/xjg/myaccountXjgActions');
const ToolTR = require('../../../common/tool').tansformMoney;
const ToolTip = require('../../common/tooltip.component').ToolTip;

const TopInfoMid1 = React.createClass({
	componentWillMount:function(){
    	this.props.getXjgBsData();
  	},
	getInitialState(){
		return{

		}
	},
	render:function(){
    const data = this.props.xjgBasicData.data;
    let profitYesterday = '', interestAmt = '', willGainInterest = '', accumulatedProfit = '';
    // console.log(this.props.xjgBasicData)
    if(this.props.xjgBasicData.isFetching == 1){
      profitYesterday = ToolTR(data.profitYesterday);
      interestAmt = ToolTR(data.interestAmt);
      willGainInterest = ToolTR(data.willGainInterest);
      accumulatedProfit = ToolTR(data.accumulatedProfit);
    }

		return(
			<ul className="hq-count-info">
          <li><label>昨日收益(元)</label><span className="hq-tp-orange">{ profitYesterday }</span></li>
          <li><label>小金罐本金(元)</label><span>{interestAmt}</span></li>
          <li><label>待结算收益(元)</label><span>{willGainInterest}</span><ToolTip data-text='local_tooltip.xjg_asset_income'/></li>
          <li><label>累计历史收益(元)</label><span>{accumulatedProfit}</span></li>
      </ul>
		)
	}
})

const mapStateToProps = (state, ownProps) => {

  return{
    xjgBasicData:state.xjgData.basicData
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getXjgBsData:()=>{
      dispatch(xjgActions.myaccountXjgBsPosts())
    }
  }
};
export const TopInfoMid = connect(
  mapStateToProps,mapDispatchToProps
)(TopInfoMid1);
