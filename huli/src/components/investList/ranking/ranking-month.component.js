const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const fmtMoney = require('../../../common/tool').tansformMoney;
const Month = React.createClass({
  data:function(){
    return {
      hasData:false
    }
  },
  render:function(){
    let list1 = '';
    let list2 = '';
    let content = '';
    if(this.props.rankingList.isFetching == 1){
      if(this.props.rankingList.data.month == 0){
        content = <div className="empty-list-detail current">
          <div className="empty-img"></div>
          <p>即将公布 敬请期待</p>
        </div>;
      }else{
        list1 = this.props.rankingList.data.month.map(function(item,index){
          if(index<5){
            let level = '';
            if(index == 0){
              level = 'bank-num first lt'
            }else if(index ==1){
              level = 'bank-num lt second'
            }else if(index == 2){
              level = 'bank-num lt third'
            }else{
              level = 'bank-num lt'
            }
            return (
              <div className="list-item cf" key={index}>
                <p className={level}>{index+1}</p>
                <p className="lt">{item.phone}</p>
                <p className="rt">{fmtMoney(item.total)}元</p>
              </div>
            )
          }
        });

        list2 = this.props.rankingList.data.month.map(function(item,index){
          if(index>=5 && index<10){
            return (
              <div className="list-item cf" key={index}>
                <p className="bank-num lt">{index+1}</p>
                <p className="lt">{item.phone}</p>
                <p className="rt">{fmtMoney(item.total)}元</p>
              </div>
            )
          }
        });

        content = <div>
          <div className="list-one lt">
            {list1}
          </div>
          <div className="list-one rt">
            {list2}
          </div>
        </div>
      }

    }
    return (
      <div className="list-detail cf">
        {content}
      </div>
    );
  }
});


// module.exports = {
//   RankingMonth
// };

const mapStateToProps = (state, ownProps) => {
  return{
    rankingList:state.rankingList
  }
};


export const RankingMonth = connect(
  mapStateToProps
)(Month);