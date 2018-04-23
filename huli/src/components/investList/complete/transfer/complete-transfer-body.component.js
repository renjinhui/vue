const React = require('react');
const ReactDOM = require('react-dom');
const setProgress = require('../../../../common/tool').setProgress;
const fmtPercent  = require('../../../../common/tool').fmtPercent;
const isIE8 = require('../../../../common/util').isIE8;
const List = React.createClass({
  componentDidMount() {
    // const node = ReactDOM.findDOMNode(this);
    // const el = node.querySelectorAll('canvas')[0];
    // const el = node.getElementsByTagName('canvas')[0];
    // const pre = this.props.data.percent;
    // const pre = 100;
    // if(pre || pre ==0){
    //   setProgress(el,pre);
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
  render:function(){
    let idStr = (this.props.data.detailUrl.match(/\?bid=(\d+)&/) ? this.props.data.detailUrl.match(/\?bid=(\d+)&/)[1] : '') || this.props.data.idStr;
    let a_href = 'https://www.huli.com/hl/#/details/project?bid='+idStr+'&proType=jjszrb';
    return (
      <div className={this.props.data.iconStyles && this.props.data.iconStyles !==0 ? "list-summary cf" : "list-summary transfer-list cf"}>
        <div className="lt list-30">&nbsp;</div>
        <div className="lt list-310">
          <div className={this.props.data.isfresh ==1 ? "title-contal cf is-guide" : "title-contal cf"}>
            <a href={a_href} className="project-name lt" target="_blank">{this.props.data.title}</a>
            {this.props.data.isfresh ==1 ? <p className="guide">新手专享</p> : ''}
            {this.props.data.feature == 'huliwzhuanrang' ? <em className="transfer-icon">我的转让</em> : ''}
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
          {/*<canvas className="canvas" width="56" height="56" ></canvas>*/}
          <p className="font-arial">100%</p>
        </div>
        <div className="lt list-30">&nbsp;</div>
        <div className="lt list-200 button-item">
          <p className="end-time">募集结束时间 {this.props.data.expiredTime}</p>
          <a href={a_href} className={this.props.data.status == 1 ? 'blue-btn common-btn-200' : 'gray-btn2 common-btn-200'} target="_blank">{this.props.data.statusText}</a>
        </div>
        <div className="lt list-30">&nbsp;</div>
      </div>
    );
  }
});


module.exports = {
  List
};