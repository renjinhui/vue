const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const ToolPE = require('../../../common/tool').tansformMoney;
const ToolTM = require('../../../common/tool').transformCutDownTime;
const ToolTip = require('../../common/tooltip.component').ToolTip;
const RiskWarning = require('../../common/riskWarning.component').riskWarning;

const detailsActions =require('../../../reducers/details_jjs/detailsActions');

const headerLeft = React.createClass({
  getInitialState(){
    return{
      leftTime:'',
      timer: ''
    }
  },
  componentDidMount:function(){
    this.state.timer = window.setInterval(()=>{
      let t = this.props.datas.leftTime;
      if(ToolTM(t)){
        this.cutTime(t)
      }else{
        window.clearInterval(this.state.timer)
      }
    },1000)
  },
  cutTime:function(t){
    let str = ToolTM(t);
    this.props.dispatch(detailsActions.transLeftTime(str))
    this.setState({
      leftTime:str
    })
  },
  render:function(){
    let datas = this.props.datas;
    let icon_list = '';
    icon_list = datas.tags.map(function(value,ind){
        return(<span className="item" >{value.labelTxt}</span>)
    });
    let fromHref = 'https://www.huli.com/hl/#/details/project?bid='+datas.assetTransfer.rootAssetId+'&proType=jjs'
    return (
      <div className="header-left lt">
          <div className="basic-title cf">
          {
            datas.asset.titleForSale
            ?
            <span className='lt'>转让{datas.asset.titleForSale}</span>
            :
            <span className='lt'>转让{datas.asset.title}</span>
          }
            <span>
            {
              datas.isSelfTransfer == 1 ?
              <span className='transIcon'>我的转让</span>
              :
              <span className='transIcon'>转</span>
            }
              <a href={fromHref} target='_blank' className='rt'>查看原项目</a>
            </span>
            <div className="title-small-icons cf">{icon_list}</div>
          </div>
          <div className="project-list">
              <div className="list-item list-rate list-w140 lt">
                  <div className="item-key-value rate-num">{datas.assetTransfer ? ToolPE(datas.assetTransfer.rootAnnualRate) : ''}%</div>

                  <div className="item-key rate-bot">
                      预期年化收益率
                      <ToolTip data-text="local_tooltip.bid_jjs_interest" />
                  </div>
              </div>
              <div className="list-item list-date list-w132 lt">
                  <div className="item-key-value date-num">{datas.periods}</div>
                  <div className="item-key date-bot">
                      剩余期限
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
                  <div className="item-key-value money-num">{datas.assetTransfer ? ToolPE(datas.assetTransfer.principal) : 0.00}</div>
                  <div className="item-key money-bot">
                      转让本金(元)
                      <ToolTip data-text="local_tooltip.transfer_principal" />
                  </div>
              </div>
          </div>
          <div className="project-percent">
              <div className="move-title" style={{left:datas.biddingPercent>86 ? '86%' : (datas.biddingPercent)+'%'}}>已认购{datas.biddingPercent}%</div>
              <div className="bot-line"></div>
              <div className="percent-line" style={{width:datas.biddingPercent+'%'}}></div>
          </div>
          <div className="end-time">
              剩余时间
              <span className='time-num'>{this.state.leftTime}</span>
          </div>
          <RiskWarning type={1} className={'project-risk-warning'}></RiskWarning>
      </div>
    );
  }
});
const mapStateToProps = (state, ownProps) => {
  return{
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};
export const HeaderLeft = connect(
  mapStateToProps,mapDispatchToProps
)(headerLeft);
