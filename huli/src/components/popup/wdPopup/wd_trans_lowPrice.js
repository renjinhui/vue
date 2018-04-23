const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const wdPopupActions = require('../../../reducers/popup/wdpop/wdPopupActions');
const ToolPE = require('../../../common/tool').tansformMoney;
const ToolTM = require('../../../common/tool').transformTime;
const ToolTip = require('../../common/tooltip.component').ToolTip;

const lowP = React.createClass({
  getInitialState(){
    return{
      isShow: 'none',
      newPercent: 99.9
    }
  },
  componentWillMount() {

  },
  isShowSel(){
    if(this.props.revoke == 'yes')return;
    if(this.state.isShow == 'none'){
      this.setState({
        isShow: 'block'
      })
    }else if(this.state.isShow == 'block'){
      this.setState({
        isShow: 'none'
      })
    }

  },
  getNewData(e,dataList){
    this.isShowSel();
    let str = e.target.innerHTML ? e.target.innerHTML : '';
    let num = parseFloat(str)*100;
    dataList.discountRate = num;
    this.props.dispatch(wdPopupActions.popupWdSetRate(num));
    let params = {
      bidId: this.props.state.wdPopup.bidId,
      rate: num,
      t: Math.random()
    }
    this.props.dispatch(wdPopupActions.myaccountWdTransPosts(params));
  },
  render() {
    let data = this.props.data;
    let dataList = {};
    if(data.isFetching == 1){
      dataList = data.data.data
    }
    return (
        <div className="version-popup-gen-item">
            <span className="version-popup-gen-name">折价比例
              <ToolTip data-text="local_tooltip.inv_layer_percent" />
            </span>
            <div className="version-popup-gen-box">
                <span className={this.props.revoke=='yes'?"version-popup-rate disabled":'version-popup-rate'} onClick={this.isShowSel}><i className="ver-ico-url"></i><span>{dataList.discountRate/100 || this.state.newPercent}%</span></span>
                  {
                    dataList.actualYearRate < codes.globalRules.tran_raise_rate_limit
                    ?
                    <div className="version-popup-error-message">
                        <div className="version-popup-odiv-message">
                            <div className="version-popup-odiv-message-con">
                                <span className="version-popup-html-msg">
                                    <em className="certifi-img"></em>
                                    <i>收益损失</i>
                                    <strong>{dataList.actualPrincipal ? ToolPE((dataList.principal-dataList.actualPrincipal)) : '0.00'}元</strong><i>，受让人利率</i>
                                    <strong>{dataList.actualYearRate ? dataList.actualYearRate/100 : 0}%</strong>
                                </span>
                                <span className="version-popup-compare">
                                    {codes.local_tooltip.tran_raise_rate_limit.replace(/\{0\}/g,(codes.globalRules.tran_raise_rate_limit/100)+'%')}
                                </span>
                            </div>
                            <span className="ar_up"></span>
                            <span className="ar_up_in"></span>
                        </div>
                    </div>
                    :
                    <div className="version-popup-odiv">
                        <span className="version-popup-html"><i>收益损失</i>
                            <ToolTip data-text="local_tooltip.inv_layer_discount" />

                            <strong>{dataList.actualPrincipal ? ToolPE((dataList.principal-dataList.actualPrincipal)) : '0.00'}元</strong><i>，受让人利率</i>
                            <ToolTip data-text="local_tooltip.inv_layer_interest" />

                            <strong>{dataList.actualYearRate ? dataList.actualYearRate/100 : 0}%</strong></span>
                        <span className="ar_up"></span>
                        <span className="ar_up_in"></span>
                    </div>

                  }
                <div className="version-popup-rate-list" style={{display: this.state.isShow,height:'180px',overflow:'auto'}} onClick={(e)=>{this.getNewData(e,dataList)}}>
                    <a href="javascript:;">99.9%</a>
                    <a href="javascript:;">99.8%</a>
                    <a href="javascript:;">99.7%</a>
                    <a href="javascript:;">99.6%</a>
                    <a href="javascript:;">99.5%</a>
                    <a href="javascript:;">99.4%</a>
                    <a href="javascript:;">99.3%</a>
                    <a href="javascript:;">99.2%</a>
                    <a href="javascript:;">99.1%</a>
                    <a href="javascript:;">99%</a>
                    {/*<a href="javascript:;">98.5%</a>*/}
                    <a href="javascript:;">98.9%</a>
                    <a href="javascript:;">98.8%</a>
                    <a href="javascript:;">98.7%</a>
                    <a href="javascript:;">98.6%</a>
                    <a href="javascript:;">98.5%</a>
                    <a href="javascript:;">98.4%</a>
                    <a href="javascript:;">98.3%</a>
                    <a href="javascript:;">98.2%</a>
                    <a href="javascript:;">98.1%</a>
                    <a href="javascript:;">98%</a>
                    {/*<a href="javascript:;">97.5%</a>*/}
                    <a href="javascript:;">97.9%</a>
                    <a href="javascript:;">97.8%</a>
                    <a href="javascript:;">97.7%</a>
                    <a href="javascript:;">97.6%</a>
                    <a href="javascript:;">97.5%</a>
                    <a href="javascript:;">97.4%</a>
                    <a href="javascript:;">97.3%</a>
                    <a href="javascript:;">97.2%</a>
                    <a href="javascript:;">97.1%</a>
                    <a href="javascript:;">97%</a>
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

export const LowPrice = connect(
  mapStateToProps,mapDispatchToProps
)(lowP);
