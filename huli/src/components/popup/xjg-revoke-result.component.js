const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const xjgActions = require('../../reducers/myaccount/xjg/myaccountXjgActions');

const XJGRevokeResult1 = React.createClass({

  componentWillMount:function(){
      
      
  },

  render() {
    return(
          <div className="huli-popup-content">
            <div className="hq-popup-success">
                <div className="hq-ico-success"></div>
                <div className="hq-popup-prompt">
                    <p className="hq-prompt-suc">
                        <span>成功撤销</span>
                    </p>
                    
                </div>
            </div>
          </div>
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

export const XJGRevokeResult = connect(
  mapStateToProps,mapDispatchToProps
)(XJGRevokeResult1);


