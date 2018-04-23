const React=require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const ToolTR = require('../../common/tool').tansformMoney;
const actionsPopup = require('../../reducers/popup/popupActions');
const xjgActions = require('../../reducers/myaccount/xjg/myaccountXjgActions');
const ToolTip = require('../common/tooltip.component').ToolTip;

const InfoTurnOutsec=React.createClass({
  getInitialState() {
    return {
    };
  },
  componentWillMount(){
    let item=this.props.state.xjgData.sureOutData;
    let obj={
      subType:item.subType,
      applyMap:item.applyMap
    }
    this.props.dispatch(xjgActions.myaccountXjgNextPosts(obj));
    //this.handleClose();console.log(this.data)
  },
  componentDidUpdate:function(){
    let n=this.props.state.xjgData.isSuc;
    if(n.isFetching==1 && n.errorCode==0 ){
      this.props.state.xjgData.isSuc.isFetching=0;
      this.props.dispatch(actionsPopup.popupSetStatus({
          isShow: true,
          type: 'xjg-turnout3',
          title: '小金罐转出',
          hasCancel: false,
          isReload:true
        }));
    }

  },
  thisSureOut(e){
    var tar=e.target||e.srcElement;
    if(/false-btn/.test(tar.className))return;
    let str=this.refs.password.value;
    let item=this.props.state.xjgData.sureOutData;
    let obj={
      subType:item.subType,
      password:str,
      applyMap:item.applyMap
    }
    this.props.dispatch(xjgActions.myaccountXjgSureOutPosts(obj));
    this.refs.password.value='';

  },
  onKeyup:function(){
    let val=this.refs.password.value;
    if(val.length>5&&val.length<21){
      this.props.dispatch(actionsPopup.popupSetSubmitDisabled(false))
    }else{
      this.props.dispatch(actionsPopup.popupSetSubmitDisabled(true))
    }
  },
  onBlur(){
    let item=this.props.state.xjgData.sureOutData;
    let str=this.refs.password.value;
    this.props.dispatch(xjgActions.myaccountXjgSureOutData({
      subType:item.subType,
      applyMap:item.applyMap,
      turnOutM:item.turnOutM,
      turnOutG:item.turnOutG,
      password:str
    }))
  },
	render:function () {
    let turnOM=this.props.state.xjgData.sureOutData.turnOutM;
    let turnOG=turnOM!=0?this.props.state.xjgData.sureOutData.turnOutG:0;
    let n=this.props.state.xjgData.isSuc;
    let m=this.props.state.xjgData.nextData;
    //console.log(m)
    if(m.isFetching==0){
      return(<div className="loading-box myaccount-loading" style={{width:'100%'}}>
                <div></div>
                <p>加载中…</p>
              </div>
            )
    }else if(m.isFetching==1){
      if(m.data.errorCode==0){
       return(
          <div className="huli-popup-content">
              <div className="hq-popup-tp module-2">
                  <div className="hq-frm-group ">
                      <label>转出本金</label>
                      <span>{ToolTR(turnOM)}元</span>
                  </div>
                  <div className="hq-frm-group transfer-input transfer-input2">
                      <label>预计到账时间</label>
                      <span>{m.data.data.date}</span><ToolTip data-text="local_tooltip.xjg_predict_outcome_date" />
                  </div>
                  <div className="hq-frm-group transfer-input transfer-input2">
                      <label>预计收益</label>
                      <span>{ToolTR(m.data.data.profit)}元</span><ToolTip data-text="local_tooltip.xjg_predict_income" />
                  </div>
                  <div className="hq-frm-group">
                      <label>入账金额共计</label>
                      <span>{ToolTR(m.data.data.profit+turnOM)}元</span>
                  </div>
                  <div className="hq-frm-group transfer-input transfer-input2">
                      <label>交易密码</label>
                      <input type="password" className="hq-pwd" placeholder="请输入交易密码" onKeyUp={this.onKeyup} ref='password' onBlur={this.onBlur}/>

                      <a className="link-blue" href='https://www.huli.com/myaccount/safecenter/#set_deal_password_div' target='_blank'>忘记交易密码?</a>
                      <p className='hq-input-prompt'>{n.errorMessage}</p>
                  </div>
              </div>

          </div>
        )
      }else{
        return(<div className="without-investment-box myaccount-without" style={{width:'100%'}}>
                  <img src="https://static.huli.com/images/nodata.png" alt="" />
                  <p>系统繁忙！</p>
                </div>)
      }

    }else{
      return(<div className="without-investment-box myaccount-without" style={{width:'100%'}}>
                <img src="https://static.huli.com/images/nodata.png" alt="" />
                <p>系统繁忙！加载失败！</p>
              </div>)
    }
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

export const XjgTurnOut2 = connect(
  mapStateToProps, mapDispatchToProps
)(InfoTurnOutsec);
