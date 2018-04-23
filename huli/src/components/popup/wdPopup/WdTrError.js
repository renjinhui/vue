const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const wdTrError = React.createClass({
  render() {
    return (
        <div className="version-popup-suc-fail">
            <div className="version-popup-only">
              <span className="version-popup-icon-only  version-bigico version-bigico-fail">&nbsp;</span>
              <span className="version-popup-prompt-name">
                  <strong>&nbsp;提交转让申请失败</strong>
              </span>
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

export const WdTrError = connect(
  mapStateToProps,mapDispatchToProps
)(wdTrError);
