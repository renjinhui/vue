const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const Title=require('./title.component').CurDepositTitle;
const TopInfoMid=require('./info-mid.component').TopInfoMid;
const TopInfoBot=require('./info-bot.component').TopInfoBot;
const xjgActions = require('../../../reducers/myaccount/xjg/myaccountXjgActions');
const actionsPopup = require('../../../reducers/popup/popupActions');



const curDepInfo = React.createClass({
  getInitialState(){
    return{
      isSignStatus:false,
      imageUrl:'https://static.huli.com/images/passport/head3.png',
      turnOutM:0,//父组件得到的转出数量
      turnOutG:0,//父组件得到的转出收益
      
    }
  },
  
  onDestroyOnCloseChange(e) {
    this.setState({
      destroyOnClose: e.target.checked,
    });
  },
  render:function() {
    return (
      <div className="hq-tp">
      	<Title title='小金罐'/>
        <TopInfoMid/>
        {/*<TopInfoBot alertDiv={this.onClick} />*/}
        
      </div>
    );
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    state,
    giveData:state.xjgData.isSuc
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch,
    getIsSureData:(postdata)=>{
      dispatch(xjgActions.myaccountXjgSureOutPosts(postdata))
    }
  }
};




export const CurDepositInfo = connect(
  mapStateToProps, mapDispatchToProps
)(curDepInfo);