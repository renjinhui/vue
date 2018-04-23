const React = require('react');
const Tabs = require('../../common/Tabs/Tabs').Tabs;
const TabPane = require('../../common/Tabs/TabPane').TabPane;
const Month = require('./ranking-month.component').RankingMonth;
const Week = require('./ranking-week.component').RankingWeek;
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const actions = require('../../../reducers/ranking/rankingActions');
const RankingMain = React.createClass({
  componentWillMount:function(){
    let data = {
      limit:10,
      isTransfer:0
    };

    if(this.props.limit){
      data.limit = this.props.limit;
    }
    if(this.props.isTransfer){
      data.isTransfer = this.props.isTransfer
    }
    this.props.getRankingData(data)
  },
  render:function(){
    return (
      <div className="lt ranking-list">
        <Tabs>
          <TabPane order="0" tab={'周排行榜'}><Week /></TabPane>
          <TabPane order="1" tab={'月排行榜'}><Month /></TabPane>
        </Tabs>
      </div>
    );
  }
});


// module.exports = {
//   Ranking
// };

const mapStateToProps = (state, ownProps) => {
  return{
    rankingList:state.rankingList
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getRankingData:(data)=>{
      dispatch(actions.rankingListPosts(data))
    }
  }
};

export const Ranking = connect(
  mapStateToProps,mapDispatchToProps
)(RankingMain);