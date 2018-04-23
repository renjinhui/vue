const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const ToolTip = require('../../common/tooltip.component').ToolTip;

export const invest = React.createClass({
  getInitialState:function(){
    return {
      data:{
        investSum:'',
        investInterest: '',
        investFee: '',
        investCount: ''
      },
      investShow: 1,
    }
  },
  componentDidMount:function(){

  },
  componentWillUpdate:function(){
    this.state.investShow = 1;
  },
  isShow(ary){
    if(this.state.investShow == 1){
      this.setState({
        investShow : 2
      })
    }else if(this.state.investShow == 2){
      this.setState({
        investShow : 1
      })
    }
  },
  render:function() {
    // console.log(this.props.state.monthBillData)
    let investList = ''; //投资项目列表
    if(this.props.state.monthBillHeadList.isFetching == 1 && this.props.state.monthBillData.isFetching == 1){

      this.state.data = this.props.state.monthBillData.data.data;
      let ary = this.state.data.investBidVOList;
      if(ary.length<6){
        this.state.investShow = 0;
      }

      let that =this;
      investList = ary.map(function(item,index){
        if(that.state.investShow == 1){
          if(index>4)return;
          return(
              <li key={index}>
                 <ul className="inUl">
                     <li className="time-li">{item.opTime}</li>
                     <li className="type-li">{item.productType}</li>
                     <li className="throw-li">{item.title}</li>
                     <li className="money-li">{item.principal}</li>
                     <li className="over-li">{item.interest}</li>
                     <li className="price-li">{item.discount}</li>
                     <li className="total-li">{item.amount}</li>
                 </ul>
              </li>
            )
        }else{
          return(
              <li key={index}>
                 <ul className="inUl">
                     <li className="time-li">{item.opTime}</li>
                     <li className="type-li">{item.productType}</li>
                     <li className="throw-li">{item.title}</li>
                     <li className="money-li">{item.principal}</li>
                     <li className="over-li">{item.interest}</li>
                     <li className="price-li">{item.discount}</li>
                     <li className="total-li">{item.amount}</li>
                 </ul>
              </li>
            )
        }
      })
    }else{
      // this.state.investShow = 0;
    }
    return (
            // {<!--投资项目start-->}
             <div className="asset-changebox top-space">
                 <div className="asset-title">
                     <div className="public-title">投资项目</div><span className="unit-span"></span><span className="download-span"></span>
                 </div>
                 <div className="comemoneyBox">
                     <ul>
                         <li>
                             <div className="comemoney">
                                 <p className="comemoney-tit">
                                  <span className="span-title">投资金额合计(元)</span>
                                  <ToolTip data-text='bill_invest'/>
                                 </p>
                                 <p className="comemoney-num">{this.state.data.investSum || '0.00'}</p>
                             </div>
                         </li>
                         <li>
                             <div className="comemoney">
                                 <p className="comemoney-tit">
                                  <span className="span-title">收益(元)</span>
                                  <ToolTip data-text='bill.bill_invest_profit'/>
                                 </p>
                                 <p className="comemoney-num">{this.state.data.investInterest || '0.00'}</p>
                             </div>
                         </li>
                         <li>
                             <div className="comemoney">
                                 <p className="comemoney-tit">
                                  <span className="span-title">费用(元)</span>
                                  <ToolTip data-text='bill.bill_invest_cost'/>
                                 </p>
                                 <p className="comemoney-num">{this.state.data.investFee || '0.00'}</p>
                             </div>
                         </li>
                         <li>
                             <div className="comemoney no-rightborder">
                                 <p className="comemoney-tit">投资项目数(个)</p>
                                 <p className="comemoney-num">{this.state.data.investCount || '0.00'}</p>
                             </div>
                         </li>
                     </ul>
                 </div>
                 <div className={investList == '' ? "displayN" : "investment"}>
                    <ul className="outUl">
                        <li className="isUltitle">
                            <ul className="inUl">
                                <li className="time-li">项目投资时间</li>
                                <li className="type-li">项目类型</li>
                                <li className="throw-li">投资项目</li>
                                <li className="money-li">本金(元)</li>
                                <li className="over-li">结息(元)</li>
                                <li className="price-li">调价(元)</li>
                                <li className="total-li">投资金额(元)</li>
                            </ul>
                        </li>
                        {investList}
                    </ul>
                    <div className={this.state.investShow ? "moreBox" : "moreBox displayN"}>
                       <div className="more-btn" onClick={this.isShow}>{this.state.investShow == 1 ? '查看全部投资明细' : '收起'}</div>
                    </div>

                  </div>

             </div>
            // {<!--投资项目end-->}


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

export const InvestCom = connect(
  mapStateToProps,mapDispatchToProps
)(invest);
