const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const actiongs = require('../../../../reducers/investList/complete/completeActions');
const Pagination = require('rc-pagination');
const Header = require('./complete-hb-head.component').TableHead;
const List = require('./complete-hb-body.component').List;
const Info = require('../../investList-intro.component').ListIntro;
const Tool = require('../../../../common/tool');
const CompleteMain = React.createClass({
  getInitialState:function(){
    return{
      param:{
        huliProductType:'LIB',
        subIndex:'jjs',
        pageNo:1
      }
    }
  },
  componentWillMount:function(){
    this.props.getCompleteListData(this.state.param)
  },
  onChange:function(page){
    this.state.param.pageNo = page;
    this.props.getCompleteListData(this.state.param);
    document.getElementById('completeHB').scrollIntoView();
  },
  render:function(){
    let list = '';
    let total = 0;
    if(this.props.completeList.isFetching == 1){
      if(!this.props.completeList.data.page.data || this.props.completeList.data.page.data.length == 0 ){
        list = <div className="without-investment-box">
          <img src="https://static.huli.com/images/nodata.png" alt="" />
          <p>暂无项目记录</p>
        </div>
      }else{
        total = this.props.completeList.data.page.totalCount;
        list = this.props.completeList.data.page.data.map(function(item,index){
          item.amount = Tool.tansformMoney(item.amount,2);
          return <List key={index} data={item} />
        });
      }
    }else if(this.props.completeList.isFetching == 0){
      list = <div className="loading-box">
        <div></div>
        <p>加载中…</p>
      </div>
    }
    return (
    <div className="invest-list-contain finish-over-list">
      <div className="invest-project" id="completeHB">
        <Info name="近期已满投资项目"/>
        <div className="list-invest-detail">
          <Header/>
          {list}
          <div className="paging-boxs cf">
            <Pagination showLessItems onChange={this.onChange} current={this.state.param.pageNo} total={total}/>
          </div>
        </div>
      </div>
    </div>
    );
  }
});


// module.exports = {
//   CompleteList
// };

const mapStateToProps = (state, ownProps) => {
  return{
    completeList:state.completeList
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCompleteListData:(data)=>{
      dispatch(actiongs.completeListPosts(data))
    }
  }
};

export const Main = connect(
  mapStateToProps,mapDispatchToProps
)(CompleteMain);