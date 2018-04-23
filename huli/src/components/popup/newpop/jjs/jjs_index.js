const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const JjsNorDo = require('./jjs_normal_do').jjsNormalDo;
const JjsTransDo = require('./jjs_trans_do').jjsTransDo;
const JjsSuc = require('./jjs_success').jjsSuc;
const JjsError = require('./jjs_error').jjsError;

const actionsPopup = require('../../../../reducers/popup/newpop/newpopActions');
const newActionsPopup = require('../../../../reducers/popup/newpop/newpopActions');
const detailsActions =require('../../../../reducers/details_jjs/detailsActions');

const jjs_index = React.createClass({
  componentWillMount:function(){
    let bid = window.location.hash.match(/bid=(\w+)&proType=([a-z]+)/)[1];
    let protype = window.location.hash.match(/bid=(\w+)&proType=([a-z]+)/)[2];
    let params = {
      bidId:bid,
      productType:protype
    }
    this.props.dispatch(detailsActions.getPopData(params,()=>{
      this.props.dispatch(newActionsPopup.newpopSetStatus({
          isShow: true,
          type: 'jjs',
          innerType: 'jjs_error',
          errorType: -3
      }));
    }))
  },
  render() {
    let mid = '';
    let data = this.props.state.newPop;
    let bigData = this.props.state.lcDetailsData.data.data;
    let popdata = this.props.state.JjsPopData.data;
    if(popdata.investBidInfo && bigData.asset){ //这么写是为了进入组件时先判断账户的钱够不够用
      if(data.innerType == 'jjs_normal_do'){
        mid = <JjsNorDo popdata={popdata} popselfdata={data} bigData={bigData}/>;
      }else if(data.innerType == 'jjs_trans_do'){
        mid = <JjsTransDo popdata={popdata} popselfdata={data} bigData={bigData}/>;
      }
    }
    switch(data.innerType){
      case "jjs_suc":
        mid = <JjsSuc popdata={popdata} popselfdata={data} isTransfer={bigData.jjsIsTransfer == 1 ? 1 : 0}/>;
        break;
      case "jjs_error":
        mid = <JjsError popdata={popdata} popselfdata={data} bigData={bigData}/>;
        break;
    }  
    
    return (
      <div className="huli-popup-main">
          <div className="huli-popup-title">
              
              <div className="huli-popup-name">
                  <span className="huli-popup-name-left"> {bigData.asset ? (bigData.asset.titleForSale || bigData.asset.title) :''} </span>
                {
                  (bigData.jjsIsTransfer == 1 && bigData.isSelfTransfer == 1) ?
                  <span className='transfer-icon'>我的转让</span>
                  : bigData.jjsIsTransfer == 1 ?
                  <span className='transfer-icon'>转</span>
                  :null
                }
                
              </div>
          </div>
          {mid}
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

export const jjsIndex = connect(
  mapStateToProps,mapDispatchToProps
)(jjs_index);
