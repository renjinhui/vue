const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const InnerList = require('./innerList.component').LcInnerList;
const ToolPE = require('../../../../common/tool').tansformMoney;
const ToolTM = require('../../../../common/tool').transformTime;
const lcPopupActions = require('../../../../reducers/popup/lcpop/lcPopupActions');
const baseDataActions = require('../../../../reducers/userBase/userBaseActions')
const lcActions = require('../../../../reducers/myaccount/lc/myaccountLcActions');
const ToolTip = require('../../../common/tooltip.component').ToolTip;
const Popup = require('../../../popup/index.popup').Popup;
const PopupTip  = require('../../../popup/popup-tip.component').PopupTip;

const lcOutList = React.createClass({
  getInitialState(){
    return{
      showInd: -1,
      showBKPop: false
    }
  },
  componentWillMount:function(){

  },
  transFnJudge(item){
    this.props.dispatch(baseDataActions.accountNeedBindCardToHl((isneed)=>{
      if(isneed){ //已实名未绑卡
        this.setState({
          showBKPop:true
        })
      }else{
        this.transFn(item);
      }
    }))
  },
  transFn(item){
    
    let _this = this;
    let pType = 'jjs';
    if(item.isTransfer == '1'){
      pType = 'jjszrb';
    }else{
      pType = 'jjs';
    }
    if (item.transferStatus == 1) {
      let params = {
        bidId: item.bidIdStr,
        productType:pType,
        rate: 10000,
        t: Math.random()
      };
      this.props.dispatch(lcPopupActions.myaccountLcTransPosts(params,function () {
        _this.props.dispatch(lcPopupActions.popupSetStatus({
          isShow: true,
          type: 'lc-trans',
          title: item.bidTitle,
          bidId:item.bidIdStr,
          rate:10000,
          submitText:'确认转让'
        }));
      }));

    }else if(item.transferStatus == 2){
      // console.log(item)
      let params = {
        bidId: item.bidIdStr,
        cancelType: 1,
        t: Math.random()
      }
      this.props.dispatch(lcActions.getServerTime());
      this.props.dispatch(lcPopupActions.myaccountLcCancelTransPosts(params,function () {
        _this.props.dispatch(lcPopupActions.popupSetStatus({
          isShow: true,
          type: 'lc-revoke',
          title: item.bidTitle,
          bidId:item.bidIdStr,
          rate:10000,
          submitText:'确认撤销'
        }));
      }));

    }

  },
  handleChange: function (index,data) {
    // data.list[index].show = true;
    // this.setState({data: data});
  },
  openAccountFn(type){
    let str = window.location.hash.replace(/#/,'');
    window.location.hash = 'collocation/openAccount?backhash=' + str;
  },
  handleCancel(type){
    this.setState({
      showBKPop :false
    })
  },
  showHide:function(ind,item){
    if(item.show){
      item.show = false
    }else{
      item.show = true;
    }
    this.setState({
      showInd:ind
    })
  },
  render() {
    if(!this.props.userLogin.isLogin){
      window.location = 'https://passport.huli.com/?backurl=https://www.huli.com/hl/#/myaccount/lc_lend/normal';
      return;
    }
    if(this.props){
      // console.log(this.props,'this.props');
    }
    let _this = this;
    let data = this.props.data;
    let list='';
    list = data.list.map(function(item,index){
          let titleIcon = '',transBtn = '';
          let lastInnerList =item.repayPlanInfoVOList ? item.repayPlanInfoVOList[item.repayPlanInfoVOList.length-1] : 0;
          switch (item.iconType){
            case 1:
              titleIcon = <span className="global-bgcolor-blue font-size-small sydinject-position">固</span>;
              break;
            case 2:
              titleIcon = <span className="global-bgcolor-green font-size-small sydinject-position">预</span>;
              break;
            case 3:
              titleIcon = <span className="global-bgcolor-green font-size-small sydinject-position">转</span>;
              break;
            case 4:
              titleIcon = <div className="title-icon-box"><span className="global-bgcolor-blue font-size-small sydinject-position">固</span><span className="global-bgcolor-green font-size-small sydinject-position">转</span></div>;
              break;
            default:
              titleIcon = <span></span>
          };
          switch (item.transferStatus){
            case 1:
              transBtn = <td  onClick={() => {_this.transFnJudge(item)}}>
                            <a href="javascript:;" className="lt a-default font-size-base transfer-button" style={{cursor: 'pointer'}}>转让</a>
                         </td>;
              break;
            case 2:
              transBtn = <td  onClick={() => {_this.transFnJudge(item)}}>
                            <span className="lt a-default global-green" style={{'cursor': 'default','fontSize': '12px'}}>转让中</span>
                            <a href="javascript:;" className="lt a-default btn-cancle" style={{'cursor':'pointer'}}>撤销转让</a>
                         </td>;
              break;
            case 3:
              transBtn = <td>
                            <a href="javascript:;" className="lt a-default font-size-base transfer-end">转让</a>
                            <ToolTip data-text="local_tooltip.transfer_restrict" />
                         </td>;
              break;
            case 4:
              transBtn = <td>
                            <a href="javascript:;" className="lt a-default font-size-base transfer-end">已撤销</a>
                         </td>;
              break;
            default:
              transBtn = <span></span>
          };

          return (
              <div  key={'out'+index}>
                  <div className="sydinlist-list">
                      <span className="grid-wh-20">&nbsp;</span>
                      <div className="grid-wh-120 lt">
                          <table border="0" cellSpacing="0" cellPadding="0" width="100%" className="sydinlist-table">
                            <tbody>
                              <tr>
                                  <td>
                                      <div className="number relative">
                                        <a href={'https://www.huli.com/hl/#/details/project?bid='+item.bidIdStr+'&proType='+(item.isTransfer == 1 ? 'jjszrb' : 'jjs')} target='_blank' className="font-arial font-size-base word-wrap" title={item.bidTitle}>{item.bidTitle}</a>
                                        {titleIcon}
                                      </div>
                                      <a href={item.agreementUrl} target="_blank">{item.agreementName}</a>
                                    {
                                      item.policyUrl
                                        ?
                                      <a href={item.policyUrl} target="_blank" style={{paddingLeft:'5px'}}>{item.policyStr}</a>
                                        :
                                        ''
                                    }

                                  </td>
                              </tr>
                            </tbody>
                          </table>
                      </div>
                      <span className="grid-wh-100 right-justified">
                          <span className="font-arial">{ToolPE(item.bidPrincipal) || '\u00A0'}</span>
                      </span>
                      <span className="grid-wh-100 right-justified">
                          <span className="font-arial">{ToolPE(item.totalAmount) || '\u00A0'}</span>
                      </span>

                      <span className="grid-wh-30">&nbsp;</span>

                      <span className="grid-wh-120">
                        {
                          item.annualRate > 0
                          ?
                          <span className="vertical-high-40 lt">
                              <span className="font-size-large font-arial">{ToolPE(item.annualRate) || '\u00A0'}</span>%&nbsp;
                          </span>
                          :
                          <span className="vertical-high-40 lt">
                              <span className="font-size-large font-arial"> &nbsp;</span>&nbsp;
                          </span>
                        }
                        {
                          item.raiseRate > 0
                          ?
                          <span className="global-orange font-arial">
                            +{ToolPE(item.raiseRate) || '\u00A0'}%
                          </span>
                          :
                          null
                        }

                      </span>
                      <div className="grid-wh-85 lt">
                          <span className="scale">{item.periods}</span>
                          <span className="speed">
                              <strong className={item.statusStr === '逾期中' ? 'overdue-bg' : 'color-green'} style={{'width':(item.periodsNum)+'%'}}></strong>
                          </span>
                      </div>
                      <span className="grid-wh-85">
                          <span className={item.statusStr === '逾期中' ? 'global-orange' : 'global-green'}>{item.statusStr || '\u00A0'}</span>
                      </span>
                      <span className="grid-wh-100">
                          <span className="font-arial">{ToolTM(item.grantTime,'-') || '\u00A0'}</span>
                      </span>

                      <div className="grid-wh-50 lt">
                          <table border="0" cellSpacing="0" cellPadding="0" width="100%" className="sydinlist-table">
                            <tbody>
                              <tr>
                                  {transBtn || '\u00A0'}
                              </tr>
                            </tbody>
                          </table>
                      </div>
                      <span className="grid-wh-80 rt">
                          <a href="javascript:;" className={item.show ? "press-button current" : 'press-button'} data-type="sydinlist-action" onClick={() => {_this.showHide(index,item)}}>
                              <span>{item.show ? '收起' : '详细'}</span>
                              <em className={item.show ? "version-details-img down" :"version-details-img up"}></em>
                          </a>

                      </span>
                  </div>

                  <InnerList data={item} isShow={item.show ? 'block' : 'none'}/>

              </div>
            )
        })
    return (
      <div>
        {list}
        <Popup 
            title="安全提示"
            submitFn={()=>{this.openAccountFn('bk')}}
            closePopup={()=>{ this.handleCancel('bk') }}
            submitText="立即开户"
            hasCancel={false}
            isShow={this.state.showBKPop}
          >
          <PopupTip content="为了您的资金安全，请先开通慧赚托管账户！" />
        </Popup>
      </div>
    )
  }
});


const mapStateToProps = (state, ownProps) => {

  return{
    state,
    userLogin:state.userLogin
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const LcOutList = connect(
  mapStateToProps,mapDispatchToProps
)(lcOutList);
