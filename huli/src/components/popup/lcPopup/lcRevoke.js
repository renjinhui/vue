const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const ToolPE = require('../../../common/tool').tansformMoney;
const ToolTM = require('../../../common/tool').transformTime;
const lcPopupActions = require('../../../reducers/popup/lcpop/lcPopupActions');
const OriginPrice = require('./lc_trans_originPrice').OriginPrice;
const ToolTip = require('../../common/tooltip.component').ToolTip;

const lcRevoke = React.createClass({
  getInitialState(){
    return{
      showTab: 1,
      staticData:{
        transferFee: 0
      }
    }
  },
  componentDidMount(){

  },
  componentDidUpdate() {

  },
  changeBtn(blon){
    this.props.dispatch(lcPopupActions.popupLcSetSubmitDisabled(blon))
  },
  render() {
    let data = this.props.state.lcPopup.transCancelData;
    let topTip = codes.local_tooltip.my_tran_cancel_jjs ? codes.local_tooltip.my_tran_cancel_jjs.replace(/\<br\>/g,'<br/>') : '';
    let list = '',h='',m='',s='';
    if(!this.props.userLogin.isLogin){
      window.location = 'https://passport.huli.com/?backurl=https://www.huli.com/hl/#/myaccount/lc_lend/normal';
      return;
    }
    let newData = {};
    if(data.isFetching ==1){
      newData = data.data.data;
      this.state.staticData.transferFee = newData.transferFee;
      let sysTime = this.props.state.lcData.sysTime ? this.props.state.lcData.sysTime : (new Date()).getTime();
      let spanLocal = newData.expireTime - sysTime;
      let diffSecs = spanLocal / 1000;
      let secs = Math.floor(diffSecs % 60);
      newData.secs = secs < 10 ? "0" + secs : secs;
      let mins = Math.floor((diffSecs / 60) % 60);
      newData.mins = mins < 10 ? "0" + mins : mins;
      let hours = Math.floor((diffSecs / 3600) % 24);
      let days = Math.floor((diffSecs / 3600) / 24);
      hours = hours + days * 24;
      newData.hours = hours < 10 ? "0" + hours : hours;
    }else if(data.isFetching == 3){
      return(<span></span>)
    }
    if(newData.discountRate == 10000){
      list = <OriginPrice data={data} revoke={'yes'}/> ;
      this.state.showTab = 1
    }
    return (

      <div className="version-popup-transfer ">
          <div className="version-popup-lookup" style={{padding:'0 65px'}}>
              <table cellSpacing="0" cellPadding="0" border="0" style={{fontSize: '12px'}}>
                <tbody>
                  <tr>
                      <td dangerouslySetInnerHTML={{__html:topTip}}>

                      </td>
                  </tr>
                </tbody>
              </table>
          </div>
          <div className="version-popup-talbe">
              <div className="version-popup-item-title">
                  <p>
                      <a href='javascript:;' className={this.state.showTab == 1 ? "bd-left current" : "bd-left"}>原价转让</a>
                      {/*<a href='javascript:;' className={this.state.showTab == 2 ? "current" : ""}>打折转让</a>*/}
                      {/*<a href='javascript:;' className={this.state.showTab == 3 ? "current" : ""}>溢价转让</a>*/}
                  </p>
              </div>
              <div className="version-popup-cols-list">
                  <div className="version-popup-general">
                      <div className="version-popup-gen-item">
                          <span className="version-popup-gen-name">转让本金
                            <ToolTip data-text="local_tooltip.transfer_principal" />
                          </span>
                          <span className="version-popup-gen-money"><strong>{newData.principal ? ToolPE(newData.principal) : '0.00'}</strong>元</span>
                      </div>
                      {list}
                      <div className="version-popup-gen-item">
                          <span className="version-popup-gen-name">转让结息
                            <ToolTip data-text="local_tooltip.transfer_interest" />
                          </span>
                          <span className="version-popup-gen-money"><strong>{newData.interest ? ToolPE(newData.interest) : '0.00'}</strong>元</span>
                      </div>
                  </div>
              </div>
          </div>
          <div className="version-popup-visible cf">
              <div className="version-popup-gen-item overflow-div">
                  <span className="version-popup-gen-name">转让价格
                    <ToolTip data-text="local_tooltip.bid_sum_tran" />
                  </span>
                  <span className="version-popup-price v-popup-totalMoney">
                      <strong>{newData.actualPrincipal ? ToolPE((newData.actualPrincipal+newData.interest)) : '0.00'}</strong>元
                  </span>
              </div>
              <div className="version-popup-gen-item">
                  <span className="version-popup-gen-name">转让手续费
                    <ToolTip data-text="local_tooltip.tran_fee" />
                  </span>
                  <span className="version-popup-gen-money"><strong>{newData.transferFee ? ToolPE(newData.transferFee) : '0.00'}</strong>元</span>
                  <div className="version-popup-odiv">
                      <span className="version-popup-html v-popup-returnMoney"><i>转让成功后预计回款</i><strong>{newData.actualPrincipal ? ToolPE((newData.actualPrincipal-newData.transferFee+newData.interest)) : '0.00'}</strong><em>元</em></span>
                      <span className="ar_up"></span>
                      <span className="ar_up_in"></span>
                  </div>
              </div>

              <div className="version-popup-gen-item">
                  <span className="version-popup-gen-name">到期时间</span>
                  <span className="version-popup-gen-money"><strong>{newData.hours}</strong>小时<strong>{newData.mins}</strong>分<strong>{newData.secs}</strong>秒</span>
              </div>
          </div>
          <div className="version-popup-undo">

          </div>
      </div>
    )
  }
});
const mapStateToProps = (state, ownProps) => {
  return{
    userLogin:state.userLogin,
    state
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const LcRevoke = connect(
  mapStateToProps,mapDispatchToProps
)(lcRevoke);
