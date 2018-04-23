const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const Link = require('react-router').Link;
const TabNav = React.createClass({
  render:function(){
    let hyNum=null;
    let hyouNum = null;
    let zrNum = null;
    let hyNumStr = '';
    let hyouNumStr = '';
    let zrNumStr = '';
    // if(this.props.investingList.isFetching == 1){
    //   hyNum = this.props.investingList.data.huiYinCount > 50 ? '50+' : this.props.investingList.data.huiYinCount;
    //   zrNum = this.props.investingList.data.countTrans > 50 ? '50+' : this.props.investingList.data.countTrans;
    //   hyouNum = this.props.investingList.data.huiYouCount > 50 ? '50+' : this.props.investingList.data.huiYouCount;
    //
    //   if(hyNum != 0){
    //     hyNumStr = <span className="sums-invest">{hyNum}</span>
    //   }
    //
    //   if(hyouNum != 0){
    //     hyouNumStr = <span className="sums-invest">{hyouNum}</span>
    //   }
    //   if(zrNum != 0){
    //     zrNumStr = <span className="sums-invest">{zrNum}</span>
    //   }
    // }
    return (
      <ul>
        <li><Link className='invest-tab' to="/invest/hy" activeClassName="current"><span>慧盈</span>{this.props.investingList.data.huiYinCount !==0 ? (this.props.investingList.data.huiYinCount > 50 ? <span className="sums-invest">50+</span>: <span className="sums-invest">{this.props.investingList.data.huiYinCount}</span>) : ''}</Link></li>
        <li><Link className='invest-tab' to="/invest/hyou" activeClassName="current"><span>慧优</span>{this.props.investingList.data.huiYouCount !==0 ? (this.props.investingList.data.huiYouCount > 50 ? <span className="sums-invest">50+</span>: <span className="sums-invest">{this.props.investingList.data.huiYouCount}</span>) : ''}</Link></li>
        <li><Link className='invest-tab' to="/invest/hb" activeClassName="current"><span>慧保</span>{this.props.investingList.data.huiBaoCount !==0 ? (this.props.investingList.data.huiBaoCount > 50 ? <span className="sums-invest">50+</span>: <span className="sums-invest">{this.props.investingList.data.huiBaoCount}</span>) : ''}</Link></li>
        <li><Link className='invest-tab' to="/invest/transfer" activeClassName="current"><span>转让</span>{this.props.investingList.data.countTrans !==0 ? (this.props.investingList.data.countTrans > 50 ? <span className="sums-invest">50+</span>: <span className="sums-invest">{this.props.investingList.data.countTrans}</span>) : ''}</Link></li>
      </ul>
    );
  }
});


// module.exports = {
//   Tab
// };
const mapStateToProps = (state, ownProps) => {
  return{
    investingList:state.investingList
  }
};


export const Tab = connect(
  mapStateToProps
)(TabNav);