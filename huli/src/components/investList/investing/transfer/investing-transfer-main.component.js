const React = require('react');
const _ = require('lodash');
const Intro = require('../../investList-intro.component').ListIntro;
const Header = require('./investing-transfer-header.component').TableHead;
const List = require('./investing-transfer-body.component').List;
const Pagination = require('rc-pagination');

const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const actiongs = require('../../../../reducers/investList/investing/investingActions');
const sysTimeActions = require('../../../../reducers/sysTime/sysTimeActions');
const Tool = require('../../../../common/tool');
const DocumentTitle = require('react-document-title');

const HYMain = React.createClass({
  getInitialState:function(){
    return{
      param:{
        huliProductType:'LIB',
        subIndex:'zrb',
        pageNo:1,
        repayMode:-1,
        orderBy:'DEFAULT'
      },
      sysTime:''
    }
  },
  componentDidMount:function(){
  },
  componentWillMount:function(){
    let _this = this;
    this.props.getInvestingListData(this.state.param);
    // _this.state.sysTime = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate()+' '+ new Date().getHours() + ':'+new Date().getMinutes()+':'+new Date().getMilliseconds();
    this.props.getSysTime(function(){
      _this.setState({
        sysTime:_this.props.sysTimeData.data
      });
    });
  },
  onChange:function(page){
    this.state.param.pageNo = page;
    this.props.getInvestingListData(this.state.param);
  },
  raiseSelect:function(item){
    this.state.param.repayMode = -1;
    if(item == 0){
      this.state.param.orderBy = 'DEFAULT';
    }else if(item == 1){
      this.state.param.orderBy = 'RATEASC';
    }else if(item == 2){
      this.state.param.orderBy = 'RATEDESC';
    }
    this.state.param.pageNo =  1;
    this.setState(_.assign({}, this.state.param, {pageNo: 1}));
    this.props.getInvestingListData(this.state.param);
    document.getElementById('investingTransfer').scrollIntoView();
  },
  timeSelect :function(item){
    this.state.param.repayMode = -1;
    if(item == 0){
      this.state.param.orderBy = 'DEFAULT';
    }else if(item == 1){
      this.state.param.orderBy = 'PERIODASC';
    }else if(item == 2){
      this.state.param.orderBy = 'PERIODDESC';
    }
    this.state.param.pageNo =  1;
    this.setState(_.assign({}, this.state.param, {pageNo: 1}));
    this.props.getInvestingListData(this.state.param);
  },
  typeSelect :function(order){
    this.state.param.pageNo =  1;
    this.setState(_.assign({}, this.state.param, {pageNo: 1}));
    this.state.param.repayMode = order;
    this.state.param.orderBy = 'DEFAULT';
    this.props.getInvestingListData(this.state.param);
  },
  render:function(){

    let list = '';
    let total = 0;
    let _this = this;
    if(this.props.investingList.isFetching == 1){
      if(!this.props.investingList.data.page.data || this.props.investingList.data.page.data.length == 0 ){
        list = <div className="without-investment-box">
          <img src="https://static.huli.com/images/nodata.png" alt="" />
          <p>暂无项目记录</p>
        </div>
      }else{
        total = this.props.investingList.data.countTrans;
        list = this.props.investingList.data.page.data.map(function(item,index){
          if((item.amount+'').indexOf('.') == -1){
            item.amount = Tool.tansformMoney(item.amount,2) ;
          }
          return <List key={index} data={item} sysTime={_this.state.sysTime} />
        });
      }
    }else if(this.props.investingList.isFetching == 0){
      list  = <div className="loading-box">
        <div></div>
        <p>加载中…</p>
      </div>
    }
    return (

    <div className="invest-project" id="investingTransfer">
      {/*<Intro name="理财转让：好货多多 灵活变现" />*/}
      <p className="recommend-title"></p>
      <div className="list-invest-detail">
        <Header raiseclick={this.raiseSelect} timeClick={this.timeSelect} typeClick={this.typeSelect}/>
        {list}
        <div className="paging-boxs cf">
          <Pagination showLessItems onChange={this.onChange} current={this.state.param.pageNo} total={total}/>
        </div>
      </div>
    </div>
    );
  }
});


const mapStateToProps = (state, ownProps) => {
  return{
    investingList:state.investingList,
    sysTimeData:state.sysTimeData
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getInvestingListData:(data)=>{
      dispatch(actiongs.investingListPosts(data))
    },
    getSysTime:(fn) => {
      dispatch(sysTimeActions.sysTimePosts(fn));
    }
  }
};

export const Main = connect(
  mapStateToProps,mapDispatchToProps
)(HYMain);