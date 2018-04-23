const React = require('react');
const ReactDom = require('react-dom');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const ToolPE = require('../../../../common/tool').tansformMoney;
const ToolTM = require('../../../../common/tool').transformTime;
const ToolTip = require('../../../common/tooltip.component').ToolTip;

const lcInnerList = React.createClass({
  getInitialState(){
    return {
        domH:0,
        boxH: 0,
        baBoxH: 0,
        barH: 0,
        isDrag: false,
        isShowBar : false,
        startY: 0,
        startTop: 0,
    };
  },
  componentDidMount() {
    if(window.addEventListener){
      this.scrollBox ?  this.scrollBox.addEventListener('mousewheel', this.handleScroll) : null;
    }else{
      this.scrollBox ?  this.scrollBox.attachEvent('onmousewheel', this.handleScroll) : null;
    }
  },

  componentWillUnmount() {
    if(window.addEventListener){
      this.scrollBox ? this.scrollBox.removeEventListener('mousewheel', this.handleScroll) : null;
    }else{
      this.scrollBox ? this.scrollBox.attachEvent('onmousewheel', this.handleScroll) : null;
    }
  },
  componentDidUpdate(){
      if(!this.scrollDom)return;
      this.state.domH = this.scrollDom.scrollHeight || this.state.domH;
      this.state.boxH = this.scrollBox.clientHeight || this.state.boxH;
      this.state.barBoxH = this.scrollBarBox.clientHeight || this.state.barBoxH;
      this.state.barH = this.state.domH ? (this.state.boxH)/(this.state.domH)*(this.state.barBoxH) : 0;
      this.scrollBar.style.height = this.state.barH + 'px';
      if(this.state.domH <= this.state.boxH){
        this.scrollBarS.style.display = 'none'
      }else{
        this.scrollBarS.style.display = 'block'
      }
  },
  handleScroll(e,mf) {
    if(e != 'click'){
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }
    if(!this.scrollDom)return;
    let scale = (this.state.boxH)/(this.state.domH);
    this.state.domH = this.scrollDom.scrollHeight;
    this.state.boxH = this.scrollBox.clientHeight;
    this.state.barBoxH = this.scrollBarBox.clientHeight;
    this.state.barH = scale*(this.state.barBoxH);
    this.scrollBar.style.height = this.state.barH + 'px';
    if(this.state.domH<=this.state.boxH)return;
    let th = this.state.domH - this.state.boxH;
    let mUp = mf || 'yes'; // 'yes' 内容下滚  'no' 内容上滚
    if(e && e.detail){
      mUp = e.detail >= 0 ? 'yes' : 'no'
    }else if(e && e.wheelDelta){
      mUp = e.wheelDelta >= 0 ? 'yes' : 'no'
    }
    let t = parseFloat(this.scrollDom.style.top)
    if(mUp == 'yes'){
      this.scrollDom.style.top = (t+10)>0 ? 0 : (t+10)+'px';
    }else if(mUp == 'no'){
      this.scrollDom.style.top = (t-10)<=(-th) ? -th+'px' : (t-10)+'px';
    }
    let barMaxTop = this.state.barBoxH - this.state.barH;
    this.scrollBar.style.top = barMaxTop<(-t*scale) ? barMaxTop + 'px' : -t*scale+'px';
  },
  moveUp(){
    this.handleScroll('click','yes')
  },
  moveDown(){
    this.handleScroll('click','no')
  },
  mouseDown(e){

    e.preventDefault()
    this.state.isDrag = true;
    this.state.startY = e.pageY
    this.state.startTop = parseFloat(this.scrollBar.style.top) || 0;
  },
  mouseOut(){
    this.state.isDrag = false;
  },
  mouseMove(e){

    e.preventDefault()
    if(!this.state.isDrag)return;
    let mt = e.pageY - this.state.startY;
    let nt = this.state.startTop;
    let barMaxTop = this.state.barBoxH - this.state.barH;
    this.scrollBar.style.top = ((mt+nt) < 0 ? 0 :((mt+nt) >= barMaxTop ? barMaxTop : (mt+nt))) + 'px';
    let barT = parseFloat(this.scrollBar.style.top);
    let scale = this.state.domH/this.state.barBoxH;
    let th = this.state.domH - this.state.boxH;
    this.scrollDom.style.top = barT*scale >= th ? -th+'px' : -barT*scale+'px';
  },
  mouseUp(){
    this.state.isDrag = false;
  },
  render() {
     let item = this.props.data;
     let repLength = item.repayPlanInfoVOList ? item.repayPlanInfoVOList.length-1 : 0;
     let isShow = this.props.isShow;
     let list = '';
     let _this = this;
    let weiJToolTip = (this.props.state.lcData.tabNormalList.data && this.props.state.lcData.tabNormalList.data.data && this.props.state.lcData.tabNormalList.data.data.receiptTip.replace(/&lt;/g, "<").replace(/&gt;/g, ">")) || '';
    if(!item.repayPlanInfoVOList){
      return (
        <div></div>
        )
     }
     list =   item.repayPlanInfoVOList.map(function(value,ind){
                let newInd = ind;
                if(item.repayPlanInfoVOList[0].receiptStatus == 5){
                  newInd = ind - 1;
                }
                return (
                  <div key={"inner"+ind}>
                    {
                      (ind == 0 && value.receiptStatus == 5)
                      ?

                      <div className="row">
                          <span className="grid-wh-70 center-justified">-</span>
                          <span className="grid-wh-20">&nbsp;</span>
                          <span className="grid-wh-100 center-justified">-</span>

                          <span className="grid-wh-1 right-justified">&nbsp;</span>

                          <span className="grid-wh-90 right-justified">{ToolPE(value.principalInterestSum) || '\u00A0'}</span>
                          <span className="grid-wh-110 right-justified">-</span>
                          <span className="grid-wh-95 right-justified">{ToolPE(value.interest) || '\u00A0'}</span>
                          <span className="grid-wh-85 right-justified">-</span>
                          <span className="grid-wh-75 right-justified">-</span>

                          <span className="grid-wh-25">&nbsp;</span>
                          <span className="grid-wh-1">&nbsp;</span>

                          <span className="grid-wh-20">&nbsp;</span>

                          <div className="grid-wh-95 lt">
                              <table border="0" cellSpacing="0" cellPadding="0" width="100%" className="forhigh-td-35" style={{fontSize: '14px'}}>
                                  <tbody>
                                  <tr>
                                      <td>
                                          <span className="lt payments">{value.receiptStatusStr || '\u00A0'}</span>
                                      </td>
                                  </tr>
                                  </tbody>
                              </table>
                          </div>
                          <span className="grid-wh-100">{ToolTM(value.opTime,'-') || '\u00A0'}</span>

                      </div>
                      :
                      <div>
                        <div className={value.receiptStatus !== 0 ? 'row bg-color' : 'row'} >
                            <span className="grid-wh-70 center-justified">{newInd+1}</span>
                            <span className="grid-wh-20">&nbsp;</span>
                            <span className="grid-wh-100">{ToolTM(value.periodDate,'-') || '\u00A0'}</span>

                            <span className="grid-wh-1">&nbsp;</span>

                            <span className="grid-wh-90 right-justified">{ToolPE(value.principalInterestSum) || '\u00A0'}</span>
                            <span className="grid-wh-110 right-justified">{ToolPE(value.principal) || '\u00A0'}</span>
                            <span className="grid-wh-95 right-justified">{ToolPE(value.interest) || '\u00A0'}</span>
                            <span className="grid-wh-85 right-justified">{ToolPE(value.raiseInterest) || '\u00A0'}</span>
                            <div className="grid-wh-75 right-justified lt">


                                <table border="0" cellSpacing="0" cellPadding="0" width="100%" className="forhigh-td-35" style={{'fontSize': '12px'}}>
                                    <tbody>
                                        <tr>
                                            <td>
                                              {
                                                value.handing != 0
                                                ?
                                                <ToolTip data-text={weiJToolTip} />
                                                :
                                                null
                                              }
                                                <span className="rt">{value.receiptStatus == 0 ? '-' : (ToolPE(value.handing) || '-')}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <span className="grid-wh-25">&nbsp;</span>
                            <span className="grid-wh-1">&nbsp;</span>

                            <span className="grid-wh-20">&nbsp;</span>

                            <div className="grid-wh-95 lt">
                                <table border="0" cellSpacing="0" cellPadding="0" width="100%" className="forhigh-td-35" style={{'fontSize': '12px'}}>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <span className={value.receiptStatus == 0 ? 'lt ' : 'lt payments'}>{value.receiptStatusStr || '\u00A0'}</span>
                                          {
                                            (value.receiptStatus == 4 || value.receiptStatus == 6 )
                                            ?
                                            <span className="relative">
                                              <em data-text='bid_overdue_pay' className="tooltipcol"></em>
                                              <ToolTip data-text={value.repayStatusToolTip} />
                                            </span>
                                            :null
                                          }                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <span className="grid-wh-100">{ToolTM(value.opTime,'-') || '\u00A0'}</span>

                        </div>

                      </div>
                    }
                  </div>
                  )
              })
    return (
        <div className="sydinlist-spreads" style={{display:isShow}}>
            <div className="theh">
                <span className="grid-wh-190">
                    <span className="vertical-high-31">&nbsp;</span>
                <span>
                <span className="grid-wh-70 center-justified">期数</span>
                <span className="grid-wh-20">&nbsp;</span>
                <span className="grid-wh-100">计划还款日</span>
                </span>
                </span>
                <span className="menu-box">
                    <span className="menu-main">月收还款(元)</span>
                <span>
                <span className="grid-wh-90 right-justified">本息合计</span>
                <span className="grid-wh-110 right-justified">本金</span>
                <span className="grid-wh-95 right-justified">利息</span>
                <span className="grid-wh-85 right-justified">加息</span>
                <span className="grid-wh-75 right-justified">违约金</span>
                </span>
                </span>
                <span className="grid-wh-215">
                    <span className="vertical-high-31">&nbsp;</span>
                    <span>
                    <span className="grid-wh-20">&nbsp;</span>
                    <span className="grid-wh-95">还款状态</span>
                    <span className="grid-wh-100">实际还款日</span>
                </span>
                </span>
            </div>
            <div className="sydinlist-subqueue relative" >

                    <div className="listcontent" ref={dom => {this.scrollBox = dom}} onWheel={()=>{this.handleScroll}} style={{position:'relative'}}>
                      <div className="scrollBox" ref={dom => {this.scrollDom = dom}} style={{position:'absolute',top:0}}>
                        {list}
                        {
                          ( item.haveBu )
                          ?
                          <div className="sydinlist-fill">
                              <div className="fillword">
                                  补
                              </div>

                              <div className="aside">

                                  <div className="row">
                                      <span className="grid-wh-10">&nbsp;</span>
                                      <span className="grid-wh-100">{ToolTM(item.repayPlanInfoVOList[repLength].periodDate,'-')  || '\u00A0'}</span>
                                      <span className="grid-wh-90 right-justified"><span className="font-wr">本金：</span>{ToolPE(item.subsidyPrincipal)}</span>
                                      <span className="grid-wh-50">&nbsp;</span>
                                      <span>
                                          <span className="font-wr">待最后一次补贴</span>
                                      </span>
                                  </div>
                                  <div className="row">
                                      <span className="grid-wh-10">&nbsp;</span>
                                      <span className="grid-wh-100">{ToolTM(item.repayPlanInfoVOList[repLength].periodDate,'-') || '\u00A0'}</span>
                                      <span className="grid-wh-90 right-justified"><span className="font-wr">利息：</span>{ToolPE(item.subsidyInterest)}</span>
                                      <span className="grid-wh-50">&nbsp;</span>
                                      <span>
                                          <span className="font-wr">待最后一次补贴</span>
                                      </span>
                                  </div>

                              </div>

                          </div>
                          :
                          null
                        }
                      </div>
                      <div className="sydinlist-scrollbars" ref={dom => {this.scrollBarS = dom}}>
                          <span className="treetop" data-type="up">
                            <span className="version-details-img up" onClick={this.moveUp}></span>
                          </span>
                          <span className="scbar" ref={dom => {this.scrollBarBox = dom}}>
                            <span ref={dom => {this.scrollBar = dom}} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp} onMouseDown={this.mouseDown} onMouseOut={this.mouseOut}></span>
                          </span>
                          <span className="treetop" data-type="down" onClick={this.moveDown}>
                            <span className="version-details-img down"></span>
                          </span>
                      </div>
                    </div>

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

  }
};

export const LcInnerList = connect(
  mapStateToProps,mapDispatchToProps
)(lcInnerList);
