const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const ToolPE = require('../../../common/tool').tansformMoney;
const ToolTM = require('../../../common/tool').transformTime;
const lcPopupActions = require('../../../reducers/popup/lcpop/lcPopupActions');
const OriginPrice = require('./lc_trans_originPrice').OriginPrice;
const ToolTip = require('../../common/tooltip.component').ToolTip;

const lcTrans = React.createClass({
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
  ischeck(e){
    if(e.target.checked){
      this.changeBtn(false)
    }else{
      this.changeBtn(true)
    }
  },
  changeTab(n){
    this.setState({
      showTab: n
    });
    let rate = 10000;
    if(n == 2){
      rate = 9990
    }else if(n ==3 ){
      rate = 10010
    }
    this.props.dispatch(lcPopupActions.popupLcSetRate(rate));
    let params = {
      bidId: this.props.state.lcPopup.bidId,
      rate: rate,
      t: Math.random()
    };
    this.props.dispatch(lcPopupActions.myaccountLcTransPosts(params));
  },
  render() {
    let data = this.props.state.lcPopup.transData;
    let topTip = window.codes.local_tooltip.my_tran_tip_jjs ? window.codes.local_tooltip.my_tran_tip_jjs.replace(/\<br\>/g,'<br/>') : '';
    let list = '';
    if(!this.props.userLogin.isLogin){
      window.location = 'https://passport.huli.com/?backurl=https://www.huli.com/hl/#/myaccount/lc_lend/normal';
      return;
    }
    let newData = {};
    if(data.isFetching ==1){
      newData = data.data.data;
      this.state.staticData.transferFee = newData.transferFee;
    }else if(data.isFetching == 3){
      return(<span></span>)
    }
    if(this.state.showTab == 1){
      list = <OriginPrice data={data}/>
    }
    return (

      <div className="version-popup-transfer">
          <div className="version-popup-lookup" style={{padding:'5px 65px',height:'90px'}}>
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
                      <a onClick={()=>{this.changeTab(1)}} href='javascript:;' className={this.state.showTab == 1 ? "bd-left current" : "bd-left"}>原价转让</a>
                      {/*<a onClick={()=>{this.changeTab(2)}} href='javascript:;' className={this.state.showTab == 2 ? "current" : ""}>打折转让</a>*/}
                      {/*<a onClick={()=>{this.changeTab(3)}} href='javascript:;' className={this.state.showTab == 3 ? "current" : ""}>溢价转让</a>*/}
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
                      {/*{list}*/}
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

              <div className="version-popup-checkbox">
                  <span><em><input type="checkbox" id="v_chk_promiss" defaultChecked="checked" onChange={(e)=>{this.ischeck(e)}}/></em><label htmlFor='v_chk_promiss'>{codes.local_tooltip.inv_layer_cb_agree}</label><a href={newData.agreementUrl} target="_blank">{newData.agreementName}</a> </span>
                {newData.agreementName && newData.agreementName == '产品合同' ?
                  <span style={{color: '#999'}}>产品合同包含：会员开户、风险提示、认购承诺、风险评测、认购协议</span>
                  :
                  ''
                }
              </div>
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

export const LcTrans = connect(
  mapStateToProps,mapDispatchToProps
)(lcTrans);
