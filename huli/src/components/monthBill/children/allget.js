const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const ToolTip = require('../../common/tooltip.component').ToolTip;

export const allget = React.createClass({
  getInitialState:function(){
    return {
      data:{
        interestAmount:'',
        jjsInterest:'',
        hqbInterest:'',
        p2pInterest:'',
        coupon:'',
        cashback:''
      },
    }
  },
  componentDidMount:function(){

  },
  getData(){

  },
  render:function() {
    if(this.props.state.monthBillHeadList.isFetching == 1 && this.props.state.monthBillData.isFetching == 1){
      this.state.data = this.props.state.monthBillData.data.data;
    }
    return (

        // {<!--收益汇总start-->}
         <div className="asset-changebox top-space">
             <div className="asset-title">
                 <div className="public-title">收益汇总</div><span className="unit-span">单位：元</span><span className="download-span"></span>
             </div>
             <div className="assetincome-total">
                 <span className="total-tit">合计</span><span className="total-num">{this.state.data.interestAmount || '0.00'}</span>
             </div>
             <div className="assetincomeBox">
                 <div className="line-blue"></div>
                 <ul>
                     <li>
                         <p className="income-p1">
                          <span className="span-title">理财</span>
                          <ToolTip data-text='bill.bill_profit_licai' />
                         </p>
                         <p className="income-p2">{this.state.data.jjsInterest || '0.00'}</p>
                     </li>
                     <li>
                         <p className="income-p1">
                          <span className="span-title">活期-小金罐</span>
                          <ToolTip data-text='bill.bill_profit_huoqi' />
                         </p>
                         <p className="income-p2">{this.state.data.hqbInterest || '0.00'}</p>
                     </li>
                     <li>
                         <p className="income-p1">
                          <span className="span-title">网贷</span>
                          <ToolTip data-text='bill.bill_profit_p2p' />
                         </p>
                         <p className="income-p2">{this.state.data.p2pInterest || '0.00'}</p>
                     </li>
                     <li>
                         <p className="income-p1">
                          <span className="span-title">红包</span>
                          <ToolTip data-text='bill.bill_profit_coupon' />
                         </p>
                         <p className="income-p2">{this.state.data.coupon || '0.00'}</p>
                     </li>
                     <li>
                         <p className="income-p1">
                          <span className="span-title">返现</span>
                          <ToolTip data-text='bill.bill_profit_cashback' />
                         </p>
                         <p className="income-p2">{this.state.data.cashback || '0.00'}</p>
                     </li>
                 </ul>
             </div>
         </div>
        // {<!--收益汇总end-->}

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

export const AllgetCom = connect(
  mapStateToProps,mapDispatchToProps
)(allget);
