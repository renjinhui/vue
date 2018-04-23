const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const actions = require('../../../reducers/notice/noticeActions');

const NoticeBar = React.createClass({
  componentWillMount:function(){
    this.props.getNoticeData();
    this.startTimer();
  },
  componentWillUnmount:function(){
    clearInterval(this.state.timer)
  },
  getInitialState:function(){
    return{
      num:0,
      total:0,
      top:0,
      timer:null,
      transition:null,
      data:[]
    }
  },
  startTimer:function(){
    let _this = this ;
    if (this.state.timer == null) {
      this.state.timer = setInterval(function () {
        _this.countDown();
      }, 2000);
    }
  },
  stop:function(){
    clearInterval(this.state.timer);
    this.state.timer = null;
  },
  countDown:function(){
    this.state.num ++;
    if(this.state.num == this.state.total-1){
      this.setState({
        transition:'margin .55s ease'
      });
    }else if(this.state.num == this.state.total){
      this.state.num = 0;
      this.setState({
        transition:'none'
      });
    }else{
      this.setState({
        transition:'margin .55s ease'
      });
    }
    this.setState({
      top:this.state.num*(-40)
    });
  },
  render() {
    let noticeStr = '';
    let _this = this;
    if(this.props.noticeList.isFetching == 1){
      this.state.data = [];
      this.props.noticeList.data.map(function(item,index){

        if(index == _this.props.noticeList.data.length-1){
          _this.state.data.push(item);
          _this.state.data.push(_this.props.noticeList.data[0]);
        }else{
          _this.state.data.push(item);
        }

      });
      this.state.total= this.props.noticeList.data.length+1;
      noticeStr = this.state.data.map(function(item,index){
        return <p key={index} onMouseOver={_this.stop} onMouseOut={_this.startTimer}><a href={item.link ? item.link : 'javascript:;'} target="_blank">{item.title}</a></p>
      });
    }
    return (
      <div className="invest-public-box">
        <div className="notice-public cf">
          <span className="lt public-images huli-common-icons"></span>
          <p className="lt small-title">公告</p>
          <div className="lt public-contain" style={{marginTop:this.state.top,transition: this.state.transition}}>
            {noticeStr}
          </div>
          <p className="rt notice-risk">市场有风险，投资需谨慎</p>
          <a href="https://help.huli.com/huli/announ/subannoun/index.htm" target="_blank" className="rt">查看更多</a>
        </div>
      </div>
    )
  }
});

// module.exports = {
//   Notice
// };

const mapStateToProps = (state, ownProps) => {
  return{
    noticeList:state.notcieData
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getNoticeData:()=>{
      dispatch(actions.noticeListPosts());

    }
  }
};

export const Notice = connect(
  mapStateToProps,mapDispatchToProps
)(NoticeBar);