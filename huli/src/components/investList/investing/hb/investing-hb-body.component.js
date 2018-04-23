const React = require('react');
const ReactDOM = require('react-dom');
const setProgress = require('../../../../common/tool').setProgress;
const fmtPercent  = require('../../../../common/tool').fmtPercent;
const MillisecondToDate  = require('../../../../common/tool').MillisecondToDate;
const isIE8 = require('../../../../common/util').isIE8;
const List = React.createClass({
  componentDidMount() {
    // const node = ReactDOM.findDOMNode(this);
    // const el = document.getElementById('precentCanvas');
    // const el = node.getElementsByTagName('canvas')[0];
    // const pre = this.props.data.percent;
    // alert(typeof el.getContext);
    // if(pre || pre == 0){
      // isIE8 && G_vmlCanvasManager.initElement(el);
      // setProgress(el,pre);
    // }

    let foo = $(ReactDOM.findDOMNode(this)).find(".canvasBox")[0];
    let canvas = document.createElement('canvas');
    canvas.setAttribute("width", 56);
    canvas.setAttribute("height", 56);
    foo.appendChild(canvas);
    const pre = this.props.data.percent;

    if(pre || pre == 0){
      setTimeout(function(){
        isIE8 && G_vmlCanvasManager.initElement(canvas);
        setProgress(canvas,pre);
      },100);
    }

  },
  addSc(obj){
    let baseInfObj = { //神策埋点专用
      PlatformType: 'pc',
      LoanId: '',//借款编号（暂无）
      ProjectName: obj.title || '',
      ProjectType: '理财',//不知道从哪拿
      ProductType: '',//产品类型暂无
      ReleaseTime: '',//发布时间暂无
      IncomeType: obj.repayMode || '',
      InterestCalculationMethod: '',//利息计算方式（暂无）
      ProjectDeadline: obj.periods || '',
      LoanAnnualInterestRate: Number(obj.interestRate/100) || ''
    };
    Util.sa('ClickToInvest',baseInfObj);
  },
  render:function(){
    let idStr = (this.props.data.detailUrl.match(/\?bid=(\d+)&/) ? this.props.data.detailUrl.match(/\?bid=(\d+)&/)[1] : '') || this.props.data.idStr;
    let a_href = this.props.data.detailUrl || 'https://www.huli.com/hl/#/details/project?bid='+idStr+'&proType=jjs';
    return (
      <div className={this.props.data.iconStyles && this.props.data.iconStyles !==0 ? "list-summary cf" : "list-summary transfer-list cf"}>
        <div className="lt list-30">&nbsp;</div>
        <div className="lt list-310">
          <div className={this.props.data.isfresh ==1 ? "title-contal cf is-guide" : "title-contal cf"}>
            <a href={a_href} onClick={()=>{this.addSc(this.props.data)}} className="project-name lt" target="_blank">{this.props.data.title}</a>

            {this.props.data.isfresh ==1 ? <p className="guide">新手专享</p> : ''}
          </div>
          {
            this.props.data.iconStyles && this.props.data.iconStyles.map(function(item,index){
              if(item.style == 1){
                return (<span key={index} className="bac-blue">{item.name}</span>)
              }else{
                return (<span key={index} className="bac-normal">{item.name}</span>)
              }

            })
          }
        </div>
        <div className="lt list-20">&nbsp;</div>
        <div className="lt list-140">
          <div className={this.props.data.raiseInterestRate !==0 ? "raise-status cf is-raise" : "raise-status cf"}>
            <p className="percent-p orange-text lt">{fmtPercent(this.props.data.interestRate)}%</p>
            <div className="raise-box lt">
              <div className="arrow-left"></div>
              <p>+{this.props.data.raiseInterestRate/100}%</p>
            </div>
          </div>
        </div>
        <div className="lt list-110">
          <p className="normal-item font-arial right-text">{this.props.data.amount || '\u00A0'}</p>
        </div>
        <div className="lt list-50">&nbsp;</div>
        <div className="lt list-110">
          <p className="normal-item">{this.props.data.periods || '\u00A0'}</p>
        </div>
        <div className="lt list-110">
          <p className="normal-item">{this.props.data.repayMode || '\u00A0'}</p>
        </div>
        <div className="lt list-60 circle-percent">
          <div className="canvasBox"></div>
          {/*<canvas id="precentCanvas" className="canvas" width="56" height="56" ></canvas>*/}
          <p className="font-arial">{this.props.data.percent}%</p>
        </div>
        <div className="lt list-30">&nbsp;</div>
        <div className="lt list-200 button-item">
          <p className="end-time">募集结束时间 {this.props.data.expiredTime || '\u00A0'}</p>
          <a href={a_href} onClick={()=>{this.addSc(this.props.data)}} className={this.props.data.status == 1 ? 'blue-btn common-btn-200' : 'blue-btn common-btn-200 false-btn'} target="_blank">{this.props.data.statusText}</a>

        </div>
        <div className="lt list-30">&nbsp;</div>
      </div>
    );
  }
});


module.exports = {
  List
};