const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;


const LcTrans = require('./lcTrans').LcTrans;
const LcRevoke = require('./lcRevoke').LcRevoke;
const LcTrSuccess = require('./lcTrSuccess').LcTrSuccess;
const lcPopupActions = require('../../../reducers/popup/lcpop/lcPopupActions');
const lcActions = require('../../../reducers/myaccount/lc/myaccountLcActions');

const PopupPar = React.createClass({

  cancelSubmit() {
    const data = this.props.state.popup;
    switch (data.type){
      case 'xjg-turnout2':
        this.props.dispatch(lcPopupActions.popupSetStatus({
          isShow: true,
          type: 'xjg-turnout1',
          title: '小金罐转出',
          submitDisabled: true
        }));
        break;
      default:
        this.closePopup()
    }
  },
  getDefaultProps() {

  },
  componentWillMount() {

  },
  componentDidMount() {

  },
  componentDidUpdate(){

  },
  closePopup() {
    switch(this.props.state.lcPopup.errorCode){
      case 100:
      case 101:{
        // window.location.reload();
        this.props.dispatch(lcPopupActions.popupSetStatus({
          isShow: false
        }));
        this.props.dispatch(lcActions.myaccountLcNormalPosts())
      }
      default:
        break;

    }
    this.props.dispatch(lcPopupActions.popupSetStatus({
      isShow: false
    }));
    
  },
  submitFn() {
    const data = this.props.state.lcPopup;
    if(data.submitDisabled || data.submitNeverAble){
      return;
    }
    switch(data.type){
      case "lc-trans":
        let params = {
          bidId: data.bidId,
          rate: data.rate,
          t: Math.random()
        };
        let _this = this;
        this.props.dispatch(lcPopupActions.myaccountLcSureTransPosts(params,function(){
          // window.location.reload();
          _this.closePopup();
          _this.props.dispatch(lcActions.myaccountLcNormalPosts())
        }));

        break;
      case "lc-revoke":
        let params2 = {
          bidId: data.bidId,
          cancelType: 1,
          t: Math.random()
        };
        this.props.dispatch(lcPopupActions.myaccountLcSureCancelTransPosts(params2,function(){
            // window.location.reload();
            _this.closePopup();
            _this.props.dispatch(lcActions.myaccountLcNormalPosts())
        }));
        break;
      case "xjg-success":
        this.closePopup();
        break;
      case "xjg-noturnout":
        this.closePopup();
        break;
      case "xjg-turnout1":
        if(this.props.state.popup.submitDisabled)return;
        this.props.state.xjgData.isSuc.errorMessage='';
        this.props.dispatch(lcPopupActions.popupSetStatus({
          isShow: true,
          type: 'xjg-turnout2',
          title: '小金罐转出',
          cancelText:'上一步',
          submitDisabled: true

        }));
        break;
      case "xjg-turnout2":
        if(this.props.state.popup.submitDisabled)return;
        this.props.dispatch(xjgActions.myaccountXjgSureOutPosts());
        break;
      case "xjg-turnout3":
        this.closePopup();
        break;  
      case "xjg-revoke":
        if(this.props.state.popup.submitDisabled)return;
        this.props.dispatch(xjgActions.myaccountXjgCancelPosts())
        break;
      case "xjg-revoke-result":
        this.closePopup();
        window.location.reload();
        break;
      case "balanceNotEnough":
        this.closePopup();
        break;
      case "risk-first":
      case "risk-again":
        this.props.dispatch(lcPopupActions.popupSetStatus({
          type: 'risk-question',
          title: '风险评估测试',
          hasCancel: false,
          submitDisabled: true
        }));
        break;
      case "risk-question":
        this.props.dispatch(lcPopupActions.popupSubmitRiskQuestions(function(){
          this.props.dispatch(actionsXJGDetail.xjgDetailPosts(true));
        }.bind(this)));
        break;
      case "risk-tip":
        this.props.dispatch(lcPopupActions.popupSetStatus({
          type: 'xjg-invest',
          title: '小金罐转入'
        }));
        break;
      case "login":
        window.location.href = 'https://passport.huli.com?backurl=' + data.backurl;
        break;
      case "popup-error":
        this.closePopup();
        break;
      default: this.closePopup();
        break;
    }
  },
  setSubmitDisabled(disabled){
    if(disabled === undefined){
      disabled = !this.props.state.lcPopup.submitDisabled;
    }
    this.props.dispatch(lcPopupActions.popupSetSubmitDisabled(disabled));
    return disabled;
  },
  render() {
    const data = this.props.state.lcPopup;
    const data_xjgDetail = this.props.state.hqDetail;
    const submitDisabled = data.submitDisabled;
    let hasCancel = data.hasCancel;
    let hasSubmit = data.hasSubmit;
    let cancelText = data.cancelText || '取消';
    let submitText = data.submitText || '确定';
    if(data.isShow === false){
      return (
        <div></div>
      )
    }
    let popupContent = '';

    let submitCls = 'blue-btn common-btn-130 ' + ( submitDisabled? 'false-btn' : '' );
    switch(data.type){

      case "lc-trans":
        popupContent = <LcTrans/>;
        break;
      case "lc-revoke":
        popupContent = <LcRevoke />;
        break;
      case "lc-tr-success":
        popupContent = <LcTrSuccess />;
        
        break;
    }

    return (
      <div className=''>
        <div className="rc-dialog-mask" style={{zIndex: 2}}></div>
        <div className="version-popup" style={{top: 200 + 'px',zIndex: 3,left: '50%',marginLeft:'-300px'}}>
          <div className="version-popup-mask" style={{height: '486px'}}></div>
          <div className="version-popup-main">
              <div className="version-popup-title"> 
                <span className="version-popup-closed" onClick={this.closePopup}> 
                  <a href="javascript:void(0)"> 
                    <em className="certifi-img">&nbsp;</em> 
                  </a> 
                </span> 
                <div className="version-popup-name"> 
                  <span className="version-popup-name-left"> <strong></strong>{data.title} </span>  
                  <a href="javascript:;" className="icon-popup gold-bgcolor">理财资产转让 </a>
                </div> 
              </div>
              <div className='version-popup-content'>
                { popupContent }
              </div>
              <div className="version-popup-footer"> 
                <div className="version-popup-action"> 
                {
                  data.hasCancel
                  ?
                  <span> <input type="button" className="version-btn-h30 version-btn-bg-darkgrey version-btn-closePopup" value="取消" onClick={this.closePopup} /> </span> 
                  :null
                }  
                  <span>  <input type="button" className={(data.submitDisabled ||data.submitNeverAble) ? "version-btn-h30 version-btn-sureInvest disabled" : "version-btn-h30 version-btn-sureInvest"} value={data.submitText || "确认"} onClick={this.submitFn} />  </span>  
                </div> 
                <span className="version-popup-risk">投资有风险，理财需谨慎</span> 
              </div>
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

export const LcPopup = connect(
  mapStateToProps,mapDispatchToProps
)(PopupPar);
