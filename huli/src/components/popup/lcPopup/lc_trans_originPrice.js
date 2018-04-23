const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;


const ToolPE = require('commonjs/tool').tansformMoney;
const ToolTM = require('commonjs/tool').transformTime;
const ToolTip = require('common/tooltip.component').ToolTip;

const originP = React.createClass({
  componentWillMount() {

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
                <span className="version-popup-rate disabled"><span>{dataList.discountRate ? dataList.discountRate/100 : 100}%</span></span>

                  {dataList.actualYearRate < codes.globalRules.tran_raise_rate_limit
                    ?
                    <div className="version-popup-error-message">
                        <div className="version-popup-odiv-message">
                            <div className="version-popup-odiv-message-con">
                                <span className="version-popup-html-msg">
                                    <em className="certifi-img"></em><i>受让人利率</i>
                                    <strong>{dataList.actualYearRate/100 || 0}%</strong>
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
                        <span className="version-popup-html"><i>受让人利率</i>
                        <ToolTip data-text="local_tooltip.inv_layer_interest" />
                          <strong>{dataList.actualYearRate ? dataList.actualYearRate/100 : 0}%</strong>
                        </span>
                        <span className="ar_up"></span>
                        <span className="ar_up_in"></span>
                    </div>

                  }

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

export const OriginPrice = connect(
  mapStateToProps,mapDispatchToProps
)(originP);
