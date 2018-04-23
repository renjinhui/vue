const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const AssetChangeCom = require('./children/assetChange').AssetChangeCom;
const AllgetCom = require('./children/allget').AllgetCom;
const WithdrawCom = require('./children/withdraw').WithdrawCom;
const ReceiptCom = require('./children/receipt').ReceiptCom;
const InvestCom = require('./children/invest').InvestCom;
const RechargeCom = require('./children/recharge').RechargeCom;
const FoxjfCom = require('./children/foxjf').FoxjfCom;



const monthBillBody = React.createClass({
  getInitialState:function(){
    return {
      data:{},
    }
  },
  componentDidMount:function(){
    
  },
  getData(){

  },
  render:function() {
    return (
      // <!--展示资产部分start-->
        <div className="myaccount-contentbox">
         <div className="content-topline">
            <div className="content-toplineIn"></div>
         </div>
         <div className="contentbox">
            <AssetChangeCom/>
            <AllgetCom/>
            <ReceiptCom/>
            <InvestCom/>
            <RechargeCom/>
            <WithdrawCom/>
            <FoxjfCom/>
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

export const MonthBillBody = connect(
  mapStateToProps,mapDispatchToProps
)(monthBillBody);