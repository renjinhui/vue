const React=require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const xjgActions = require('../../reducers/myaccount/xjg/myaccountXjgActions');
const xjgTabActions = require('../../reducers/myaccount/xjg/tabList/myaccountXjgTabActions');
const actionsPopup = require('../../reducers/popup/popupActions');
const InfoTurnOutthr=React.createClass({
  getInitialState() {
    return {
    };
  },
  onClose:function(){
    this.props.dispatch(xjgActions.myaccountXjgBsPosts());
    let param={
      subType:'XJG',
      opType:2,//确认中
      pageNo:1,
      pageSize:5,
    }
    this.props.dispatch(xjgTabActions.myaccountXjgTablePosts(param));
    this.props.dispatch(actionsPopup.popupSetStatus({
          isShow: false,
        }));
  },
  
	render:function () {
   
    return(
    		<div className="huli-popup-content">
          <div className="hq-popup-success">
              <div className="hq-ico-success"></div>
              <div className="hq-popup-prompt">
                  <p className="hq-prompt-suc">
                      <span>活期产品转出提交成功！请在活期小金罐中查看进度。</span>
                  </p>
                  <p className="hq-prompt-balance">
                      <a href="#/myaccount/cur_deposit/mksure" onClick={this.onClose}>立即查看</a>
                  </p>
              </div>
          </div>

        </div>
  	)
	}



})

const mapStateToProps = (state, ownProps) => {
  return {
    state
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const XjgTurnOut3 = connect(
  mapStateToProps, mapDispatchToProps
)(InfoTurnOutthr);