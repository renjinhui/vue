const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const ToolPE = require('../../../common/tool').tansformMoney;
const ToolCutTM = require('../../../common/tool').transformCutDownTime;
const ToolFormate = require('../../../common/tool').format;
const ToolTip = require('../../common/tooltip.component').ToolTip;
const RiskWarning = require('../../common/riskWarning.component').riskWarning;

const HeaderLeft = React.createClass({
  getInitialState(){
    return{
      endTime :''
    }
  },
  componentDidMount:function(){
    this.state.endTime = ToolFormate(this.props.datas.asset.expireTime,'yyyy-MM-dd hh:mm:ss')
  },
  render:function(){
    let datas = this.props.datas;
    let icon_list = '';
    icon_list = datas.tags.map(function(value,ind){
      return(<span className="item" >{value.labelTxt}</span>)
    })
    return (
      <div className="header-left lt">
          <div className="basic-title cf">
          {
            datas.asset.titleForSale
            ?
            <span className='lt'>{datas.asset.titleForSale}</span>
            :
            <span className='lt'>{datas.asset.title}</span>
          }
          {
            datas.asset.isForFresh == 1
            ?
            <span className="version-transfer-icon version-guide-icon  lt new-user">新手专享</span>
            :null
          }
            <div className="title-small-icons cf">{icon_list}</div>
          </div>
          <div className="project-list">
              <div className="list-item list-rate list-w140 lt">
                  <div className="item-key-value rate-num">{datas.asset ? ToolPE(datas.asset.investAnnualRate) : ''}%</div>
                  {
                    datas.asset.curUserRaiseInterest && datas.asset.curUserRaiseInterest > 0 ?
                    <span className="inrlabel">
                        <span>+{ToolPE(datas.asset.curUserRaiseInterest)}%</span>
                        <span className="ar_up"></span>
                    </span>
                    :null
                  }
                  {
                    datas.asset.extraAnnualRate>-10000 && datas.asset.extraAnnualRate!=0
                    ?
                    <span className="inrlabel">
                        <span>+{ToolPE(datas.asset.extraAnnualRate)}%</span>
                        <span className="ar_up"></span>
                    </span>
                    :null
                  }
                  <div className="item-key rate-bot">
                      预期年化收益率
                      <ToolTip data-text="local_tooltip.bid_jjs_interest" />
                  </div>
              </div>
              <div className="list-item list-date list-w132 lt">
                  <div className="item-key-value date-num">{datas.periods}</div>
                  <div className="item-key date-bot">
                      期限
                  </div>
              </div>
              <div className="list-item list-way list-w132 lt">
                  <div className="item-key-value way-num">{datas.repayModeStr}</div>
                  <div className="item-key way-bot">
                      收益方式
                      <ToolTip data-text={datas.repayModeTooltip} />
                  </div>
              </div>
              <div className="list-item list-money list-w150 rt">
                  <div className="item-key-value money-num">{ToolPE(datas.asset.amountFixed)}</div>
                  <div className="item-key money-bot">
                      募集金额(元)
                      <ToolTip data-text="local_tooltip.bid_sum" />
                  </div>
              </div>
          </div>
          <div className="project-percent">
              <div className="move-title" style={{left:datas.biddingPercent>86 ? '86%' : (datas.biddingPercent)+'%'}}>已认购{datas.biddingPercent}%</div>
              <div className="bot-line"></div>
              <div className="percent-line" style={{width:datas.biddingPercent+'%'}}></div>
          </div>
          <div className="end-time">
              募集结束时间
              <span className='time-num'>{this.state.endTime}</span>
          </div>
          <RiskWarning type={1} className={'project-risk-warning'}></RiskWarning>
      </div>
    );
  }
})
module.exports = {
  HeaderLeft
};

