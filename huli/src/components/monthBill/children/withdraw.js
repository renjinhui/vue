const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;


export const withdraw = React.createClass({
  getInitialState:function(){
    return {
      data:{
        withdrawAmount: '',
        withdrawFee: '',
        withdrawCount: ''
      },
      withdrawShow: 1,
    }
  },
  componentDidMount:function(){
    
  },
  componentWillUpdate:function(){
    this.state.withdrawShow = 1;
  },
  isShow(){
    if(this.state.withdrawShow == 1){
      this.setState({
        withdrawShow : 2
      })
    }else if(this.state.withdrawShow == 2){
      this.setState({
        withdrawShow : 1
      })
    } 
  },
  render:function() {

    // console.log(this.props.state.monthBillData)
    let withdrawList = '';//取现项目列表
    if(this.props.state.monthBillHeadList.isFetching == 1 && this.props.state.monthBillData.isFetching == 1){
      this.state.data = this.props.state.monthBillData.data.data;
      let ary = this.state.data.withdrawLogVOList;
      if(ary.length<6){
        this.state.withdrawShow = 0;
      }
      let that =this;
      withdrawList = ary.map(function(item,index){
        if(that.state.withdrawShow == 1){
          if(index>4)return;
          return(
              <li key={index}>
                 <ul className="inUl">
                     <li className="drawTime-li">{item.withdrawDate}</li>
                     <li className="drawOther-li">{item.withdrawFee}</li>
                     <li className="drawMoney-li">{item.withdrawAmount}</li>

                 </ul>
              </li>
            )
        }else{
          return(
              <li key={index}>
                 <ul className="inUl">
                     <li className="drawTime-li">{item.withdrawDate}</li>
                     <li className="drawOther-li">{item.withdrawFee}</li>
                     <li className="drawMoney-li">{item.withdrawAmount}</li>

                 </ul>
              </li>
            )
        }
      })
    }else{
      // this.state.withdrawShow = 0;
    }
    
    return (
          // <!--取现记录start-->
           <div className="asset-changebox top-space">
               <div className="asset-title">
                   <div className="public-title">取现记录</div><span className="unit-span"></span><span className="download-span"></span>
               </div>
               <div className="comemoneyBox">
                   <ul id="enchashmentUl">
                       <li>
                           <div className="comemoney">
                               <p className="comemoney-tit">取现金额(元)</p>
                               <p className="comemoney-num">{this.state.data.withdrawAmount || '0.00'}</p>
                           </div>
                       </li>
                       <li>
                           <div className="comemoney">
                               <p className="comemoney-tit">手续费(元)</p>
                               <p className="comemoney-num">{this.state.data.withdrawFee || '0.00'}</p>
                           </div>
                       </li>
                       <li>
                           <div className="comemoney no-rightborder">
                               <p className="comemoney-tit">取现笔数(笔)</p>
                               <p className="comemoney-num">{this.state.data.withdrawCount || '0.00'}</p>
                           </div>
                       </li>
                   </ul>
               </div>
               <div className={withdrawList == '' ? "displayN" : "investment"}>
                   <ul className="outUl">
                       <li className="isUltitle">
                           <ul className="inUl">
                               <li className="drawTime-li">取现申请时间</li>
                               <li className="drawOther-li">手续费(元)</li>
                               <li className="drawMoney-li">取现金额(元)</li>

                           </ul>
                       </li>
                       {withdrawList}
                   </ul>
                   <div className={this.state.withdrawShow ? "moreBox" : "moreBox displayN"}>
                       <div className="more-btn" onClick={this.isShow}>{this.state.withdrawShow == 1 ? '查看全部取现明细' : '收起'}</div>
                   </div>
               </div>
           </div>
          // <!--取现记录end-->
            
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

export const WithdrawCom = connect(
  mapStateToProps,mapDispatchToProps
)(withdraw);