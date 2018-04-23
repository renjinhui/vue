const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const ToolTip = require('../../common/tooltip.component').ToolTip;

const receipt = React.createClass({
  getInitialState:function(){
    return {
      data:{
        receiptSum: '',
        receiptIncome: '',
        receiptFee: '',
        receiptCount: ''
      },
      receiptShow: 1,
    }
  },
  componentDidMount:function(){

  },
  componentWillUpdate:function(){
    this.state.receiptShow = 1;
  },
  isShow(){
    if(this.state.receiptShow == 1){
      this.setState({
        receiptShow : 2
      })
    }else if(this.state.receiptShow == 2){
      this.setState({
        receiptShow : 1
      })
    }
  },
  render:function() {
    // console.log(this.props.state.monthBillData)
    let receiptList = ''; //回款项目列表
    if(this.props.state.monthBillHeadList.isFetching == 1 && this.props.state.monthBillData.isFetching == 1){
      this.state.data = this.props.state.monthBillData.data.data;
      let ary = this.state.data.receiptProductVOList;
      if(ary.length<6){
        this.state.receiptShow = 0;
      }
      let that =this;
      receiptList = ary.map(function(item,index){
        if(that.state.receiptShow == 1){
          if(index>4)return;
          return(
              <li key={index}>
                 <ul className="inUl">
                     <li className="cometime-li">{item.opTime}</li>
                     <li className="cometype-li">{item.productType}</li>
                     <li className="comethrow-li">{item.title}</li>
                     <li className="comemoney-li">{item.principal}</li>
                     <li className="comeover-li">{item.interest}</li>
                     <li className="comeprice-li">{item.discount}</li>
                     <li className="cometotal-li">{item.fee}</li>
                     <li className="comeall-li">{item.amount}</li>
                 </ul>
              </li>
            )
        }else{
          return(
              <li key={index}>
                 <ul className="inUl">
                     <li className="cometime-li">{item.opTime}</li>
                     <li className="cometype-li">{item.productType}</li>
                     <li className="comethrow-li">{item.title}</li>
                     <li className="comemoney-li">{item.principal}</li>
                     <li className="comeover-li">{item.interest}</li>
                     <li className="comeprice-li">{item.discount}</li>
                     <li className="cometotal-li">{item.fee}</li>
                     <li className="comeall-li">{item.amount}</li>
                 </ul>
              </li>
            )
        }
      })
    }else{
      // this.state.receiptShow = 0;
    }
    return (

        // {<!--回款项目start-->}
        <div className="asset-changebox top-space">
            <div className="asset-title">
                <div className="public-title">回款项目</div><span className="unit-span"></span><span className="download-span"></span>
            </div>
            <div className="comemoneyBox">
                <ul>
                     <li>
                         <div className="comemoney">
                             <p className="comemoney-tit">
                              <span className="span-title">回款金额合计(元)</span>
                              <ToolTip data-text='bill.bill_receipt'/>
                             </p>
                             <p className="comemoney-num">{this.state.data.receiptSum || '0.00'}</p>
                         </div>
                     </li>
                     <li>
                         <div className="comemoney">
                             <p className="comemoney-tit">
                              <span className="span-title">收益(元)</span>
                              <ToolTip data-text='bill.bill_receipt_profit'/>
                             </p>
                             <p className="comemoney-num">{this.state.data.receiptIncome || '0.00'}</p>
                         </div>
                     </li>
                     <li>
                         <div className="comemoney">
                             <p className="comemoney-tit">
                              <span className="span-title">费用(元)</span>
                              <ToolTip data-text='bill.bill_receipt_cost'/>
                             </p>
                             <p className="comemoney-num">{this.state.data.receiptFee || '0.00'}</p>
                         </div>
                     </li>
                     <li>
                         <div className="comemoney no-rightborder">
                             <p className="comemoney-tit">回款笔数(笔)</p>
                             <p className="comemoney-num">{this.state.data.receiptCount || '0.00'}</p>
                         </div>
                     </li>
                </ul>
            </div>
            <div className={receiptList == '' ? "displayN" : "investment"}>
                <ul className="outUl">
                   <li className="isUltitle">
                       <ul className="inUl">
                           <li className="cometime-li">回款时间</li>
                           <li className="cometype-li">项目类型</li>
                           <li className="comethrow-li">回款项目</li>
                           <li className="comemoney-li">本金(元)</li>
                           <li className="comeover-li">收益(元)</li>
                           <li className="comeprice-li">调价(元)</li>
                           <li className="cometotal-li">手续费(元)</li>
                           <li className="comeall-li">回款金额(元)</li>
                       </ul>
                   </li>
                   {receiptList}

                </ul>
                <div className={this.state.receiptShow ? "moreBox" : "moreBox displayN"}>
                   <div className="more-btn" onClick={this.isShow}>{this.state.receiptShow == 1 ? '查看全部回款明细' : '收起'}</div>
                </div>
            </div>
        </div>
        // {<!--回款项目end-->}

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

export const ReceiptCom = connect(
  mapStateToProps,mapDispatchToProps
)(receipt);
