const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;


const InnerList = require('./innerList.component').WdInnerList
const ToolPE = require('../../../../common/tool').tansformMoney;
const ToolTM = require('../../../../common/tool').transformTime;
const wdPopupActions = require('../../../../reducers/popup/wdpop/wdPopupActions');


const wdOutList = React.createClass({
  getInitialState(){
    return{
      showInd: -1,
    }
  },
  componentWillMount:function(){
    
    
  },
  transFn(item){
    let params = {
      bidId: item.bidId,
      t: Math.random()
    }
    this.props.dispatch(wdPopupActions.myaccountWdTransPosts(params));
    this.props.dispatch(wdPopupActions.popupSetStatus({
        isShow: true,
        type: 'wd-trans',
        title: item.bidTitle,
        isReload:true
    }));
  },
  handleChange: function (index,data) {
    // data.list[index].show = true;
    // this.setState({data: data});
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
      window.location = 'https://passport.huli.com/?backurl=https://www.huli.com/hl/#/myaccount/wd_lend/normal';
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
          let url = item.isTransfer == 1 ? ("https://www.souyidai.com/p2p/#/bid/zr/detail/intro?id=" + item.bidIdStr ): ("https://www.souyidai.com/p2p/#/bid/zt/detail/intro?id=" + item.bidIdStr);
          switch (item.iconType){
            case 1:
              titleIcon = <span className="global-bgcolor-blue font-size-small sydinject-position">固</span>
              break;
            case 2:
              titleIcon = <span className="global-bgcolor-green font-size-small sydinject-position">预</span>
              break;
            case 3:
              titleIcon = <span className="global-bgcolor-green font-size-small sydinject-position">转</span>
              break;
            default:
              titleIcon = <span></span>
          };
          return (
              <div data-type="row-v1" key={'out'+index}>
                  <div className="sydinlist-list">
                      <span className="grid-wh-20">&nbsp;</span>
                      <div className="grid-wh-120 lt">
                          <table border="0" cellSpacing="0" cellPadding="0" width="100%" className="sydinlist-table">
                            <tbody>
                              <tr>
                                  <td>
                                      <div className="number relative">
                                        <a href={url} className="font-arial font-size-base word-wrap">{item.bidTitle}</a>
                                        {titleIcon}
                                      </div>
                                  </td>
                              </tr>
                            </tbody>
                          </table>
                      </div>
                      <span className="grid-wh-30">&nbsp;</span>
                      <span className="grid-wh-100 right-justified">
                          <span className="font-arial">{ToolPE(item.borrowAmount) || '\u00A0'}</span>
                      </span>

                      <span className="grid-wh-30">&nbsp;</span>

                      <span className="grid-wh-120">
                        <span className="vertical-high-40 lt">
                            <span className="font-size-large font-arial">{ToolPE(item.annualRate) || '\u00A0'}</span>%&nbsp;
                        </span>
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
                      <span className="grid-wh-70 left-justified">
                          {item.periods || '\u00A0'}
                      </span>
                      <span className="grid-wh-65 left-justified">
                          {item.repayModeStr || '\u00A0'}
                      </span>
                      <span className="grid-wh-85 right-justified">
                          <span className="font-arial">{ToolPE(item.bidPrincipal) || '\u00A0'}</span>
                      </span>
                      <span className="grid-wh-100 right-justified">
                          <span className="font-arial">{ToolPE(item.totalAmount) || '\u00A0'}</span>
                      </span>
                      <span className="grid-wh-30">&nbsp;</span>
                      <span className="grid-wh-70 left-justified">
                          <span className="font-arial">{item.percent}%</span>
                      </span>
                      <span className="grid-wh-80 rt">
                        {item.isFixedRepay == 1 
                          ?
                          <a href="javascript:;" className="press-button" data-type="sydinlist-action" >
                              
                          </a>
                          :
                          <a href="javascript:;" className={item.show ? "press-button current" : 'press-button'} data-type="sydinlist-action" onClick={() => {_this.showHide(index,item)}}>
                              <span>{item.show ? '收起' : '详细'}</span>
                              <em className={item.show ? "version-details-img down" :"version-details-img up"}></em>
                          </a>
                        }
                      </span>
                  </div>
                  {item.isFixedRepay == 1
                    ?
                    <div></div>
                    :
                    <InnerList data={item} isShow={item.show ? 'block' : 'none'}/>
                  }
              </div>
            )
        })
    return (
      <div>
        {list}
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

export const WdOutList = connect(
  mapStateToProps,mapDispatchToProps
)(wdOutList);
