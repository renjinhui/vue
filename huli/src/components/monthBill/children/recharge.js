const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;


export const recharge = React.createClass({
  getInitialState:function(){
    return {
      data:{
        rechargeAmount: '',
        rechargeCount: ''
      },
      rechargeShow: 1,
    }
  },
  componentDidMount:function(){
    
  },
  componentWillUpdate:function(){
    this.state.rechargeShow = 1;
  },
  isShow(){
    if(this.state.rechargeShow == 1){
      this.setState({
        rechargeShow : 2
      })
    }else if(this.state.rechargeShow == 2){
      this.setState({
        rechargeShow : 1
      })
    } 
  },
  render:function() {
    // console.log(this.props.state.monthBillData)
    let rechargeList = ''; //充值项目列表
    if(this.props.state.monthBillHeadList.isFetching == 1 && this.props.state.monthBillData.isFetching == 1){
      this.state.data = this.props.state.monthBillData.data.data;
      let ary = this.state.data.rechargeLogVOList;
      if(ary.length<6){
        this.state.rechargeShow = 0;
      }
      let that =this;
      rechargeList = ary.map(function(item,index){
        if(that.state.rechargeShow == 1){
          if(index>4)return;
          return(
              <li key={index}>
                 <ul className="inUl">
                     <li className="rechargeTime-li">{item.rechargeDate}</li>
                     <li className="rechargeType-li">{item.rechargeType}</li>
                     <li className="rechargeNum-li">{item.rechargeCode}</li>
                     <li className="rechargemoney-li">{item.rechargeAmount}</li>
                 </ul>
              </li>
            )
        }else{
          return(
              <li key={index}>
                 <ul className="inUl">
                     <li className="rechargeTime-li">{item.rechargeDate}</li>
                     <li className="rechargeType-li">{item.rechargeType}</li>
                     <li className="rechargeNum-li">{item.rechargeCode}</li>
                     <li className="rechargemoney-li">{item.rechargeAmount}</li>
                 </ul>
              </li>
            )
        }
      })
    }else{
      // this.state.rechargeShow = 0;
    }
    return (
      
        // {<!--充值记录start-->}
        <div className="asset-changebox top-space">
            <div className="asset-title">
                <div className="public-title">充值记录</div><span className="unit-span"></span><span className="download-span"></span>
            </div>
            <div className="comemoneyBox">
                <ul id="historyUl">
                    <li>
                        <div className="comemoney">
                            <p className="comemoney-tit">充值金额(元)</p>
                            <p className="comemoney-num">{this.state.data.rechargeAmount || '0.00'}</p>
                        </div>
                    </li>
                    <li>
                        <div className="comemoney no-rightborder">
                            <p className="comemoney-tit">充值笔数(笔)</p>
                            <p className="comemoney-num">{this.state.data.rechargeCount || '0.00'}</p>
                        </div>
                    </li>

                </ul>
            </div>
            <div className={rechargeList == '' ? "displayN" : "investment"}>
                   <ul className="outUl">
                       <li className="isUltitle">
                           <ul className="inUl">
                               <li className="rechargeTime-li">充值时间</li>
                               <li className="rechargeType-li">充值类型</li>
                               <li className="rechargeNum-li">充值单号</li>
                               <li className="rechargemoney-li">充值金额(元)</li>
                           </ul>
                       </li>
                       {rechargeList}
                   </ul>
                   <div className={this.state.rechargeShow ? "moreBox" : "moreBox displayN"}>
                      <div className="more-btn" onClick={this.isShow}>{this.state.rechargeShow == 1 ? '查看全部充值明细' : '收起'}</div>
                   </div>
            </div>
        </div>
        // {<!--充值记录end-->}
            

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

export const RechargeCom = connect(
  mapStateToProps,mapDispatchToProps
)(recharge);