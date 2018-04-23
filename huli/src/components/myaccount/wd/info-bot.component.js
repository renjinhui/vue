const React=require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const ToolPE = require('../../../common/tool').tansformMoney;

const botInfo=React.createClass({
	getInitialState(){
		return{

		}
	},
  componentDidMount:function(){
    
  },
  showChart:function(dom){
    
  },
  hideChart:function(){
    

  },
  alertDiv(){
    
  },
	render:function(){
    let data = this.props.state.wdData.basicData.data ? this.props.state.wdData.basicData.data.data : {};
		return(
      
      <div className="sydinject-v2 cf">
        <div className="item grid-wh-345 lt">
            <div className="graphic grid-wh-55 lt">
              <span className="graphic-v1 certifi-img a1"></span>
            </div>
            <div className="column">
                <span className="name">约定收益(元)</span>
                <span className="value">{(data.willGainInterest || data.willGainInterest==0) ? ToolPE(data.willGainInterest) :''}</span>
                <span className="total">
                    累计历史收益：<strong>{(data.gainAmount || data.gainAmount==0) ? ToolPE(data.gainAmount) : ''}</strong>
                </span>
            </div>
        </div>
        <div className="item grid-wh-345 lt">
          <div className="graphic grid-wh-55 lt">
            <span className="graphic-v1 certifi-img a2"></span>
          </div>
          <div className="column">
              <span className="name">待收本金(元)</span>
              <span className="value">{(data.willGainPrincipal || data.willGainPrincipal==0) ? ToolPE(data.willGainPrincipal) : ''}</span>
              <span className="total">
                  投标冻结本金：<strong>{(data.blockedBalance || data.blockedBalance==0) ? ToolPE(data.blockedBalance) : ''}</strong>
              </span>
          </div>
        </div>
        {/*<div className="item grid-wh-165 rt">
          <div className="graphic grid-wh-55 lt">
            <span className="graphic-v1 certifi-img a3"></span>
          </div>
          <div className="column">
              <span className="name">约定年化利率</span>
              <span className="value md-tp">{data.weighting/100 || 0}%</span>

          </div>
        </div>*/}
      </div> 
		)
	}
})
const mapStateToProps = (state, ownProps) => {
  return {
  	state
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const BotInfo = connect(
  mapStateToProps, mapDispatchToProps
)(botInfo);
