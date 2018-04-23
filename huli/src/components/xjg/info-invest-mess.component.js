const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const fmtPercent = require('../../common/tool').fmtPercent;
const Chart = require('../common/lineReact').xjgChart;
const isIE8 = require('../../common/tool').isIE8;
const ToolTip = require('../common/tooltip.component').ToolTip;

const Mess = React.createClass({
  componentDidMount:function(){
    let _this = this;
    $('.chartShow,.chartBox').mouseover(function(event){
      event.stopPropagation();
      _this.showChart($(this));
    });
    $('.chartShow,.chartBox').mouseout(function(event){
      event.stopPropagation();
      _this.hideChart();
    });

  },
  showChart:function(dom){
    // let $left = dom.offset().left;
    // let $top = dom.offset().top;
    // $('.chartBox').show();
    $('.chartBox').css({'zIndex':999,'top':$('.chartShow').offset().top+$('.chartShow').height()});
    // $('.chartBox').css({'zIndex':999});
  },
  hideChart:function(){
    $('.chartBox').css('zIndex',-1);
    // $('.chartBox').hide();

  },
  render:function() {
    const data = this.props.data;
    let  raiseClass = 'hq-version-left lt';
    let percent = '', confirmTime = '', investAmountTip = '',raise='';
    if(data.page_isFetching == 1){
      if(data.page.xjg.raiseInterestRate){
        raiseClass = 'hq-version-left hq-raise lt';
        raise = '+' + fmtPercent(data.page.xjg.raiseInterestRate)+'%';
      }
      percent = fmtPercent(data.page.xjg.profileRate);
      confirmTime = data.page.xjg.confirmTime;
      investAmountTip = data.page.xjg.investAmountTip;
    }

    return (
      <div className={raiseClass} >
        <div className="hq-rate lt">
          <div className="rate-top cf">
            <p className="top-title-text lt">预期年化收益率</p>
            <ToolTip data-text="local_tooltip.xjg_profit_rate"/>
          </div>
          <div className="rate-center">
            <span className="rate-num">{ percent }</span><span>%</span><span>{ raise }</span>
          </div>

          <div className="rate-bottom cf chartShow">
            <p className="bottom-text lt">过往年化收益率</p>
            <em className="hq-common-images rate-images lt"></em>

          </div>
        </div>
        <div className="hq-time lt">
          <div className="rate-top cf">
            <p className="top-title-text lt">确认时间</p>
            <ToolTip data-text="local_tooltip.xjg_confirm_date" />
          </div>
          <p className="time-num">
            <span>{ confirmTime }</span>
          </p>
        </div>
        <div className="hq-money lt">
          <p className="top-title-text">起投金额</p>
          <p className="start-money">{ investAmountTip }</p>
          {/*<p className="bottom-text lt">用户每日转入上限为20万元</p>*/}
        </div>

        <div className="chartBox xjg-detail-chart" style={{display:"block",position:"absolute",zIndex:-1}}>
          <Chart width="350px" height="250px"/>
        </div>

      </div>
    )
  }
});

const mapStateToProps = (state, ownProps) => {
  return{
    data: state.hqDetail
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
};

export const XJGInfoMess = connect(
  mapStateToProps,mapDispatchToProps
)(Mess);
