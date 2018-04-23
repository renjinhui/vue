const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const actionsPopup = require('../../../reducers/popup/newpop/newpopActions');
const userBaseActions = require('../../../reducers/userBase/userBaseActions');
const detailsActions =require('../../../reducers/details_jjs/detailsActions');

const JjsIndex = require('./jjs/jjs_index').jjsIndex;
// const RiskTestTip = require('../risk-test.component').RiskTestTip;
// const RiskLevelLowerTip = require('../risk-level-lower-tip.component').RiskLevelLowerTip;

const newPopPar = React.createClass({

  getInitialState() {
    return{
      bid: window.location.hash.match(/bid=(\w+)&proType=([a-z]+)/) ? window.location.hash.match(/bid=(\w+)&proType=([a-z]+)/)[1] : '',
      proType: window.location.hash.match(/bid=(\w+)&proType=([a-z]+)/) ? (window.location.hash.match(/bid=(\w+)&proType=([a-z]+)/)[2] || 'jjs') : '',
    }
  },
  getDefaultProps() {

  },
  componentWillMount() {

  },
  componentDidMount() {

  },
  componentDidUpdate(){

  },
  closePopup() {
    if(this.state.bid && this.state.proType){
      if(this.props.state.newPop.innerType == 'jjs_suc'){
        this.props.dispatch(detailsActions.getLcDetailData({bid:this.state.bid,proType:this.state.proType}))//刷新该标数据
        this.props.dispatch(detailsActions.investPersonList({bid:this.state.bid,proType:this.state.proType}));//获取投资人列表
        this.props.dispatch(userBaseActions.getUserBaseAccount())//刷新用户数据
        this.props.dispatch(detailsActions.getUserFuli({bid:this.state.bid,proType:this.state.proType}));//获取弹框上的福利列表
      }
    }
    this.props.dispatch(actionsPopup.newpopSetStatus({
      isShow: false
    }));
  },
  render() {
    const data = this.props.state.newPop;
    if(!data || data.isShow === false){
      return (
        <div></div>
      )
    }
    let popupContent = '';
    switch(data.type){
      case "jjs":
        popupContent = <JjsIndex />;
        break;
    }
    return (
      <div>
        <div className="rc-dialog-mask" style={{animation: 'opShow5 .5s'}}></div>
        <div className="rc-dialog-wrap jjs-detail" style={{top: data.top + 'px',animation: 'opShow .5s'}}>
        <div className="huli-popup-closed  jjs-pop-title" onClick={this.closePopup}>
            <a href="javascript:void(0)"></a>
        </div>
          {popupContent}
        </div>
      </div>
    )
  }
});

const mapStateToProps = (state, ownProps) => {
  return{
    state
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const newPop = connect(
  mapStateToProps,mapDispatchToProps
)(newPopPar);
