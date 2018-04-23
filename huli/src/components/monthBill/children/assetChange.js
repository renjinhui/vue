const React = require('react');
const ReactRedux = require('react-redux');
const base64 = require('js-base64').Base64;
const Util = require('../../../common/util').cookie;
const actionsLogin = require('../../../reducers/login/loginActions');
const connect = ReactRedux.connect;
const ToolTip = require('../../common/tooltip.component').ToolTip;

export const assetChange = React.createClass({
  getInitialState:function(){
    return {
      data: {
        rechargeAmount:'',
        withdrawAmount:'',
        interestAmount:'',
        feeAmount:'',
      }
    }
  },
  componentDidMount:function(){

  },
  getData(){

  },
  downloadZd(str,nt){
    // if(nt){
    //     console.log("/myaccount/monthbill/export_excel?"+str);
    //   }
    let syd_name = Util.get('syd_name');
    // syd_name = '5YiY5YWI55Sf';
    let name = base64.decode(decodeURIComponent(syd_name));
    if(syd_name == ''){
      this.props.dispatch(actionsLogin.userLogout(false));
      window.location.href= 'https://passport.huli.com/?backurl=https://www.huli.com/hl/#/monthbill';
    }else{
      this.props.dispatch(actionsLogin.userLogin(true, name));
      if(nt){
        window.location.href = "/myaccount/monthbill/export_excel?"+str;
      }

    }
  },
  render:function() {
    if(this.props.state.monthBillHeadList.isFetching == 1 && this.props.state.monthBillData.isFetching == 1){
      this.state.data = this.props.state.monthBillData.data.data;
    }
    let params = this.props.state.monthBillPostData.params;
    // let tAry = params.startTime.split('-')
    // let ajMonth = tAry[0] + '-' + tAry[1];
    let st = params.startTime ? new Date(params.startTime.replace(/-/g,  "/")).getTime() : '';
    let nt = params.endTime ? new Date(params.endTime.replace(/-/g,  "/")).getTime() : '';
    let str = "startTime=" + st + "&endTime=" + nt ;
    return (
        // {<!--资产变化start-->}
        <div className="asset-bg">
          <div className="asset-changebox">
              <div className="asset-title">
                <div className="public-title">资金变化</div><span className="unit-span">单位：元</span><span className="download-span"><a href="javascript:void(0);" onClick={this.downloadZd.bind(this,str,nt)}>下载账单</a></span>
              </div>
              <div className="asset-content">
                 <ul>
                     <li>
                         <div className="liBox">
                             <p className="asset-p1">
                                 <span className="recharge-icon"></span>
                                 <span className="rechange-tit">充值</span>
                             </p>
                             <p className="asset-p2">
                                 {this.state.data.rechargeAmount || '0.00'}
                             </p>
                         </div>

                     </li>
                     <li>
                         <div className="liBox">
                             <p className="asset-p1">
                                 <span className="recharge-icon1 "></span>
                                 <span className="rechange-tit">取现</span>
                             </p>
                             <p className="asset-p2">
                                 {this.state.data.withdrawAmount || '0.00'}
                             </p>
                         </div>

                     </li>
                     <li>
                         <div className="liBox">
                             <p className="asset-p1">
                                 <span className="recharge-icon2"></span>
                                 <span className="rechange-tit">收益</span>
                                 <ToolTip data-text='bill.bill_profit' />
                                 <span></span>
                             </p>
                             <p className="asset-p2">
                                 {this.state.data.interestAmount || '0.00'}
                             </p>
                         </div>

                     </li>
                     <li>
                         <div className="liBox">
                             <p className="asset-p1">
                                 <span className="recharge-icon3"></span>
                                 <span className="rechange-tit">费用</span>
                                 <ToolTip data-text='bill.bill_cost' />
                             </p>
                             <p className="asset-p2">
                                 {this.state.data.feeAmount || '0.00'}
                             </p>
                         </div>

                     </li>
                 </ul>
              </div>
          </div>
        </div>
        // {<!-- 资产变化end-->}

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

export const AssetChangeCom = connect(
  mapStateToProps,mapDispatchToProps
)(assetChange);
