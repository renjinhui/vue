const React=require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const actionsPopup = require('../../../reducers/popup/popupActions');
const ToolPE = require('../../../common/tool').tansformMoney;
const Chart = require('../../common/lineReact').xjgChart;

const TopInfoBot1=React.createClass({
	getInitialState(){
		return{

		}
	},
  componentDidMount:function(){
    let _this = this;
    $('.chartShow,.chartBox').mouseover(function(event){
      event.stopPropagation();
      _this.showChart($(this));
    });
    $('.chartShow,.chartBox').mouseout(function(event){
      event.stopPropagation();
      _this.hideChart();
    });
  },
  showChart:function(dom){
    // let $left = dom.offset().left;
    // let $top = dom.offset().top;
    $('.chartBox').css('zIndex',10);
  },
  hideChart:function(){
    $('.chartBox').css('zIndex',-10);

  },
  alertDiv(){
    let data = this.props.xjgBasicData.data;
    if(data.rollOutCredit==0){
        this.props.dispatch(actionsPopup.popupSetStatus({
              isShow: true,
              type: 'xjg-turnout1',
              title: '小金罐转出',
              submitDisabled: true
            }));  
    }else{
        this.props.dispatch(actionsPopup.popupSetStatus({
              isShow: true,
              type: 'xjg-noturnout',
              title: '小金罐转出',
              submitDisabled: false
            })); 
    }
    
  },
	render:function(){
    const data = this.props.xjgBasicData.data;
    let profitRate='0.00';
    let raiseInterestRate=0;
    if(this.props.xjgBasicData.isFetching == 1){
      profitRate=ToolPE(data.profitRate);
      if(data.raiseInterestRate){
        raiseInterestRate=ToolPE(data.raiseInterestRate);
      }
    }

		return(
      <div style={{position:'relative'}}>
  			<div className='hq-tp-btn cf'>
          <a className="lt orange-btn prime-rate">
            <span>预期年化收益率 </span> 
            <i>
              {profitRate}%
              {
                raiseInterestRate
                ?
                <span>+{raiseInterestRate}%</span>
                :
                ''
              }  
            </i>
          </a>
          <div className="hq-rate-graph lt  chartShow">
            <p className="lt">过往年化收益率</p>
            <em className="hq-common-images rate-images lt"></em> 
          </div>
          <a className="rt roll-out-btn" onClick={this.alertDiv}>转出</a>
          <a className="rt orange-btn" target='_blank' href='#/xjg'>转入</a>
        </div> 
        {
          raiseInterestRate
          ?
          <div className='myaccount-xjg-raise chartBox myaccount-xjg-chart' style={{zIndex:"-10",display:'block',position:'absolute',width:'340px'}}>
            <Chart width='340px' height='200px'/>
          </div> 
          :
          <div className='chartBox myaccount-xjg-chart' style={{zIndex:"-10",display:'block',position:'absolute',width:'340px'}}>
            <Chart width='340px' height='200px'/>
          </div> 
        }
      </div>  
		)
	}
})
const mapStateToProps = (state, ownProps) => {
  return {
  	xjgBasicData:state.xjgData.basicData
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const TopInfoBot = connect(
  mapStateToProps, mapDispatchToProps
)(TopInfoBot1);
