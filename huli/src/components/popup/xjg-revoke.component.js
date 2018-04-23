const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const TranF= require('../../common/tool').tansformMoney;
const actionsPopup = require('../../reducers/popup/popupActions');
const xjgActions = require('../../reducers/myaccount/xjg/myaccountXjgActions');
const ToolTip = require('../common/tooltip.component').ToolTip;

const XjgRevokePopup = React.createClass({
  getInitialState(){
    return{

    }
  },
  componentDidUpdate:function(){
    let n=this.props.state.xjgData.cancelData;//console.log(n)
    if(n.isFetching==1&&n.errorCode==0){
      //console.log(n.isFetching)
      this.props.dispatch(actionsPopup.popupSetStatus({
          isShow: true,
          type: 'xjg-revoke-result',
          hasCancel:false,
          isReload:true,
          title: '撤销结果'
        }));
    }

  },
  isSure: function(){
    this.props.dispatch(xjgActions.xjgDetailSetPopupIsAgree(!this.props.state.hqDetail.popup.invest.isAgree));
  },
  onBlur:function(){
    let val=this.refs.passInp.value;
    this.props.dispatch(xjgActions.myaccountXjgPopupRevokePassW({
      passW:val
    }));
  },
  onKeyup:function(){
    let val=this.refs.passInp.value;
    if(val.length>5&&val.length<21){
      this.props.dispatch(actionsPopup.popupSetSubmitDisabled(false))
    }else{
      this.props.dispatch(actionsPopup.popupSetSubmitDisabled(true))
    }
  },
  render: function() {
    let money=this.props.state.xjgData.popup.revoke.transMoney;
    let transId=this.props.state.xjgData.popup.revoke.transId;
    let transTitle=this.props.state.xjgData.popup.revoke.transTitle;
    let n=this.props.state.xjgData.cancelData;
    return (
      <div className="huli-popup-content">
          <div className="hq-popup-tp module-2 p80">
              <div className="hq-frm-group">
                  <label>{transTitle}金额</label>
                  <span>{TranF(money)}</span>
              </div>
              <div className="hq-frm-group ">
                  <label>到账时间</label>
                  <span>即时生效</span>
                  <ToolTip data-text={transTitle=='转入'?"xjg_in_cancel":"xjg_out_cancel"} extClass="lf5"/>
              </div>
              <div className="hq-frm-group  transfer-input transfer-input2">
                  <label>交易密码</label>
                  <input type="password" className="hq-pwd" ref='passInp' onBlur={this.onBlur} onKeyUp={this.onKeyup} placeholder="请输入交易密码" />

                  <a className="link-blue" href='https://www.huli.com/myaccount/safecenter/#set_deal_password_div' target='_blank'>忘记交易密码?</a>
                  <p className='hq-input-prompt'>{n.errorMessage}</p>
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

export const XjgRevoke = connect(
  mapStateToProps,mapDispatchToProps
)(XjgRevokePopup);
