const React = require('react');
const ReactDOM = require('react-dom');
const setProgress = require('../../../../common/tool').setProgress;
const Tool = require('../../../../common/tool').transformCutDownTime;
const fmtPercent  = require('../../../../common/tool').fmtPercent;
const MillisecondToDate  = require('../../../../common/tool').MillisecondToDate;
const isIE8 = require('../../../../common/util').isIE8;
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const sysTimeActions = require('../../../../reducers/sysTime/sysTimeActions');

const ListMain = React.createClass({
  getInitialState:function(){
    return{
      timeObj:{
        hours:0,
        minutes:0,
        seconds:0
      },
      now:'',
      timer:null
    }
  },
  componentDidMount:function() {
    let _this = this;
    // const node = ReactDOM.findDOMNode(this);
    // const el = node.getElementsByTagName('canvas')[0];
    // const el = node.querySelectorAll('canvas')[0];
    // const pre = this.props.data.percent;
    //
    // if(pre || pre == 0){
    //   isIE8 && G_vmlCanvasManager.initElement(el);
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
    // this.props.getSysTime(function(){
    //   if(_this.props.sysTime.data && _this.props.sysTime.data!==''){
    //     let arr = [];
    //     arr = _this.props.sysTime.data.split(/[-\s:]/);
    //     _this.state.now = new Date(arr[0],arr[1]-1,arr[2],arr[3],arr[4],arr[5]).getTime();
    //   }else {
    //     _this.state.now = new Date().getTime();
    //   }
    //   let difftime = new Date(_this.props.data.expiredTime).getTime() - _this.state.now;
    //   let timeLeftVar = MillisecondToDate(difftime);
    //   if(difftime <=0){
    //     _this.setState({
    //       timeObj: {
    //         hours:0,
    //         minutes:0,
    //         seconds:0
    //       }
    //     })
    //   }else{
    //     _this.setState({ timeObj: timeLeftVar });
    //     _this.startTimer();
    //   }
    // });
    if(_this.props.sysTime && _this.props.sysTime!==''){
      let arr = [];
      // arr = _this.props.sysTime.split(/[-\s:]/);
      // _this.state.now = new Date(arr[0],arr[1]-1,arr[2],arr[3],arr[4],arr[5]).getTime();
      _this.state.now = new Date(_this.props.sysTime).getTime();
    }else {
      _this.state.now = new Date().getTime();
    }
    let difftime = new Date(_this.props.data.expiredTime).getTime() - _this.state.now;
    let timeLeftVar = MillisecondToDate(difftime);
    if(difftime <=0){
      _this.setState({
        timeObj: {
          hours:0,
          minutes:0,
          seconds:0
        }
      })
    }else{
      _this.setState({ timeObj: timeLeftVar });
      _this.startTimer();
    }



  },
  componentWillUnmount:function(){
    clearInterval(this.state.timer)
  },

  startTimer:function(){
    var _this = this ;
    let thisTime = new Date();
    if (this.state.timer == null) {
      this.state.timer = setInterval(function () {
        let now = new Date();
        _this.countDown(now,thisTime);
      }, 1000);
    }
  },
  countDown:function(now,thisTime){
    let c = new Date();
    let m = c - now;
    let dif = c - thisTime;

    let expiredTime = this.props.data.expiredTime;

    let arrDate = expiredTime.split(/-|:|\s/);
    let timeNew = new Date(arrDate[0],arrDate[1]-1,arrDate[2],arrDate[3],arrDate[4],arrDate[5]);
    let bidTime = new Date(timeNew).getTime() - this.state.now - dif;
    // let bidTime = new Date(timeNew).getTime() - new Date().getTime();
    bidTime = bidTime -m;
    if (bidTime <= 0 ) {
      this.setState({
        timeObj: {
          hours:0,
          minutes:0,
          seconds:0
        }
      });
      clearInterval(this.state.timer);
    }else{
      this.setState({
        timeObj: MillisecondToDate(bidTime)
      });
    }



  },
  render:function(){
    if(!this.state.timeObj.hours){
      this.state.timeObj.hours = 0;
    }
    if(!this.state.timeObj.minutes){
      this.state.timeObj.minutes = 0;
    }
    if(!this.state.timeObj.seconds){
      this.state.timeObj.seconds = 0;
    }

    let idStr = (this.props.data.detailUrl.match(/\?bid=(\d+)&/) ? this.props.data.detailUrl.match(/\?bid=(\d+)&/)[1] : '') || this.props.data.idStr;
    let a_href = this.props.data.detailUrl || 'https://www.huli.com/hl/#/details/project?bid='+idStr+'&proType=jjszrb';
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
          <p className="font-arial">{this.props.data.percent}%</p>
        </div>
        <div className="lt list-30">&nbsp;</div>
        <div className="lt list-200 button-item">
          {this.props.data.statusText != '即将开始' ? <p className="end-time ">剩余时间<span className="transfer-end-time">{this.state.timeObj.hours >=10 || this.state.timeObj.hours <0 ? this.state.timeObj.hours : '0'+this.state.timeObj.hours}:{this.state.timeObj.minutes >= 10 || this.state.timeObj.minutes < 0 ?this.state.timeObj.minutes :'0'+this.state.timeObj.minutes}:{this.state.timeObj.seconds>=10 || this.state.timeObj.seconds<0 ? this.state.timeObj.seconds : '0'+this.state.timeObj.seconds}</span></p> : <p className="end-time ">&nbsp;</p>}
          <a href={a_href} className={this.props.data.status == 1 ? 'blue-btn common-btn-200' : 'blue-btn common-btn-200 false-btn'} target="_blank">{this.props.data.statusText}</a>
        </div>
        <div className="lt list-30">&nbsp;</div>
      </div>
    );
  }
});

const mapStateToProps = (state, ownProps) => {
  return{
    // sysTime:state.sysTimeData
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSysTime:(fn) => {
      dispatch(sysTimeActions.sysTimePosts(fn));
    }
  }
};

export const List = connect(
  mapStateToProps,mapDispatchToProps
)(ListMain);

// module.exports = {
//   List
// };