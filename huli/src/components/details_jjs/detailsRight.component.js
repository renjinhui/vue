const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const DocumentTitle = require('react-document-title');
const ToolTip = require('../common/tooltip.component').ToolTip;

const detailsActions =require('../../reducers/details_jjs/detailsActions');
const newActionsPopup = require('../../reducers/popup/newpop/newpopActions');
const ToolPE = require('../../common/tool').tansformMoney;
const ToolTM = require('../../common/tool').transformTime;

const detailsRight = React.createClass({
  getInitialState(){
    return{
      isShow:false
    }
  },
  showList(){
    this.setState({
      isShow:true
    })
  },
  render:function(){
    let datas = this.props.state.CalculateData.data;
    let detailDatas = this.props.state.lcDetailsData.data.data;
    let willBuyM = this.props.state.newPop.howmuch;
    let buyedM = (detailDatas&&detailDatas.totalAmountBid) ? detailDatas.totalAmountBid :0;
    let transM = (detailDatas && detailDatas.assetTransfer ) ? detailDatas.assetTransfer.amount : 0;
    let list ='';
    if(datas.list && datas.list.length <= 6){
        list=datas.list.map((item,index)=>{
            return (
                <li key={index+'k'}>
                    <span className='span-w80 lt'>{ToolTM(item.periodDate)}</span>
                    <span className='span-w111 rt'>{ToolPE(item.interest + item.principal + item.subsidyInterest + item.subsidyPrincipal)}</span>
                </li>
            )
        })
    }else if(datas.list && datas.list.length > 6){
        
        list=datas.list.map((item,index)=>{
            if(index == 3){
                return (
                    <li key={index+'k'} className="version-project-an-row" onClick={this.showList} style={this.state.isShow ? {display:'none'} : {display:'block'}}>
                        <a href="javascript:;" className="version-project-an-row-oa">展开<em className="ver-ico-url v-open-profit" style={{top: "12px"}}>&nbsp;</em></a>
                    </li>
                )
            }else if(index < (datas.list.length-3) && index > 2){
                return (
                    <li key={index+'k'} style={this.state.isShow ? {display:'block'} : {display:'none'}}>
                        <span className='span-w80 lt'>{ToolTM(item.periodDate)}</span>
                        <span className='span-w111 rt'>{ToolPE(item.interest + item.principal + item.subsidyInterest + item.subsidyPrincipal)}</span>
                    </li>
                )
            }else{
                return (
                    <li key={index+'k'}>
                        <span className='span-w80 lt'>{ToolTM(item.periodDate)}</span>
                        <span className='span-w111 rt'>{ToolPE(item.interest + item.principal + item.subsidyInterest + item.subsidyPrincipal)}</span>
                    </li>
                )
            }   
        })
        
    }
    return (
        <div className="details-right rt">
            <div className="right-title">投资收益明细</div>
            <div className="project-sub-row cf">
                <div className="sub-left lt">
                    <div className="til">
                        <span className='lt'>计划投资(元)</span>
                        <ToolTip data-text="local_tooltip.bid_calc_invest" />
                    </div>
                {
                    detailDatas && detailDatas.assetTransfer ?
                    <div className="num">{transM ? ToolPE(transM) : ToolPE(0)}</div>
                    :
                    <div className="num">{willBuyM||buyedM ? ToolPE(buyedM+willBuyM) : ToolPE(1000000)}</div>
                }
                </div>
                <div className="sub-right rt">
                    <div className="til rt">
                        <span className='lt'>预计收益(元)</span>
                        <ToolTip data-text="local_tooltip.bid_calc_interest" />
                    </div>
                {
                    detailDatas && detailDatas.assetTransfer ?
                    <div className="num orange">{datas.total ? ToolPE(datas.total-transM) : '0.00'}</div>
                    :
                    <div className="num orange">{datas.total ? (willBuyM||buyedM ? ToolPE((datas.total-buyedM-willBuyM)<0 ? 0 :(datas.total-buyedM-willBuyM)) : ToolPE((datas.total-1000000)<0?0:(datas.total-1000000))) : '0.00'}</div>
                }
                </div>
            </div>
            <div className="detail-bottom">
                <ul className='time-list'>
                    <li className="til">
                        <span className="span-w80 lt">
                            <span className='lt'>计划还款日</span>
                            <ToolTip data-text="local_tooltip.bid_calc_pay_day" />
                        </span>
                        <span className="span-w96 rt">
                            <span className="lt">回收本息(元)</span>
                            <ToolTip data-text="local_tooltip.bid_calc_pay_money" />
                        </span>
                    </li>
                    {list}
                </ul>
                <div className="project-explain cf">
                {
                    detailDatas && detailDatas.repayModeTooltip?
                    <ToolTip data-text={detailDatas.repayModeTooltip} title={detailDatas.repayModeStr} extClass='blue-text-tooltip' hoverClass="blue-text-tooltip"/>
                    :null
                }
                </div>
                <div className="project-annotation cf">
                    <div className="zhu lt">注：</div>
                    <ul className="zhu-list lt">
                        <li>
                            1.产品成立当日开始计息
                        </li>
                        <li>
                            2.节假日以国家公布的日期为准
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    );
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

export const DetailsRight = connect(
  mapStateToProps,mapDispatchToProps
)(detailsRight);
