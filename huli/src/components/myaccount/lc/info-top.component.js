const React=require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const ToolPE = require('../../../common/tool').tansformMoney;

const topInfo=React.createClass({
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
    let data = this.props.state.lcData.basicData.data && this.props.state.lcData.basicData.data.data ? this.props.state.lcData.basicData.data.data : {};
		return(
      <div className="sydinject-v1">
        <div className="status" style={{height: 0,padding: 0}}>
            <span className="grid-wh-80">
              {
                data.currentBalance < 100
                ?
                  <a href="javascript:;" className="version-btn-h30 disabled">去认购</a>
                :  
                  <a href="https://www.huli.com/hl/#/invest/" target="_blank" className="version-btn-h30">去认购</a>
              }
            </span>
        </div>
        <span className="name">理财-认购项目</span>
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

export const TopInfo = connect(
  mapStateToProps, mapDispatchToProps
)(topInfo);
