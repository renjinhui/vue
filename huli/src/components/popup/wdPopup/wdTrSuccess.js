const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const wdTrSuccess = React.createClass({
  componentWillMount() {
    
  },
  render() {
    
    let list = '';
    switch(this.props.state.wdPopup.errorCode){
      case 1:
        list =  <div className="version-popup-only">
                  <span className="version-popup-icon-only  version-bigico version-bigico-fail">&nbsp;</span>
                  <span className="version-popup-prompt-name">
                      <a href={'https://passport.huli.com/?backurl='+window.location.href}>登录</a>
                      <strong>后投标，新朋友请先</strong>
                      <a href={'https://passport.huli.com/regist.html'}>注册</a>
                  </span>
                </div>;
        break;
      case 2:
        list =  <div className="version-popup-only">
                  <span className="version-popup-icon-only  version-bigico version-bigico-fail">&nbsp;</span>
                  <span className="version-popup-prompt-name">
                      <strong>{codes.local_tooltip.inv_layer_fail_busy}</strong>
                  </span>
                </div>;
        break;
      case 3:
        list =  <div className="version-popup-only">
                  <span className="version-popup-icon-only  version-bigico version-bigico-fail">&nbsp;</span>
                  <span className="version-popup-prompt-name">
                      <strong>{codes.local_tooltip.my_tran_cancel_fail_busy}</strong>
                  </span>
                </div>;
        break;
      case 4:
        list =  <div className="version-popup-only">
                  <span className="version-popup-icon-only  version-bigico version-bigico-fail">&nbsp;</span>
                  <span className="version-popup-prompt-name">
                      <strong>{codes.local_tooltip.inv_layer_fail_busy}</strong>
                  </span>
                </div>;
        break;  
      case 100:
        list =  <div className="version-popup-only">
                    <span className="version-popup-icon-only  version-bigico version-bigico-success">&nbsp;</span>
                    <span className="version-popup-prompt-name">转让成功</span>
                </div>
        break;
      case 101:
        list =  <div className="version-popup-only">
                    <span className="version-popup-icon-only  version-bigico version-bigico-success">&nbsp;</span>
                    <span className="version-popup-prompt-name">{codes.local_tooltip.my_tran_cancel_suc}</span>
                </div>
        break;
    }
    
    return (
        <div className="version-popup-suc-fail">
            {list}
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

export const WdTrSuccess = connect(
  mapStateToProps,mapDispatchToProps
)(wdTrSuccess);
