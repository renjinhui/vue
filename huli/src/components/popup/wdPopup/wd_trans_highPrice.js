const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const wdPopupActions = require('../../../reducers/popup/wdpop/wdPopupActions');
const ToolPE = require('../../../common/tool').tansformMoney;
const ToolTM = require('../../../common/tool').transformTime;
const ToolTip = require('../../common/tooltip.component').ToolTip;

const highP = React.createClass({
  getInitialState(){
    return{
      isShow: 'none',
      newPercent: 100.1
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
    }else{
      this.setState({
        isShow: 'none'
      })
    }

  },
  getNewData(e,dataList){
    this.setState({
      isShow: 'none'
    })
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
            <span className="version-popup-gen-name">溢价比例
              <ToolTip data-text="local_tooltip.inv_layer_percent" />
            </span>
            <div className="version-popup-gen-box">
                <span className={this.props.revoke=='yes'?"version-popup-rate disabled":'version-popup-rate'} onClick={this.isShowSel}><i className="ver-ico-url"></i><span>{dataList.discountRate ? dataList.discountRate/100 :this.state.newPercent}%</span></span>
                  {
                    dataList.actualYearRate < codes.globalRules.tran_raise_rate_limit
                    ?
                    <div className="version-popup-error-message">
                        <div className="version-popup-odiv-message">
                            <div className="version-popup-odiv-message-con">
                                <span className="version-popup-html-msg">
                                    <em className="certifi-img"></em>
                                    <i>收益增加</i>
                                    <strong>{dataList.actualPrincipal ? ToolPE((dataList.actualPrincipal-dataList.principal)) : '0.00'}元</strong><i>，受让人利率</i>
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
                        <span className="version-popup-html"><i>收益增加</i>
                            <ToolTip data-text="local_tooltip.inv_layer_discount" />

                            <strong>{dataList.actualPrincipal ? ToolPE((dataList.actualPrincipal-dataList.principal)) : '0.00'}元</strong><i>，受让人利率</i>
                            <ToolTip data-text="local_tooltip.inv_layer_interest" />

                            <strong>{dataList.actualYearRate ? dataList.actualYearRate/100 : 0}%</strong></span>
                        <span className="ar_up"></span>
                        <span className="ar_up_in"></span>
                    </div>

                  }
                <div className="version-popup-rate-list" style={{display: this.state.isShow}} onClick={(e)=>{this.getNewData(e,dataList)}}>
                    <a href="javascript:;">100.1%</a>
                    <a href="javascript:;">100.2%</a>
                    <a href="javascript:;">100.3%</a>
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

export const HighPrice = connect(
  mapStateToProps,mapDispatchToProps
)(highP);
