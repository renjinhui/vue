const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const TopInfo=require('./info-top.component').TopInfo;
const BotInfo=require('./info-bot.component').BotInfo;
const lcActions = require('../../../reducers/myaccount/lc/myaccountLcActions');


const lcLendInfo = React.createClass({
  getInitialState(){
    return{
      param:{
        assetMode: 5,
        t:Math.random()
      }
      
    }
  },
  componentWillMount:function(){
    this.props.dispatch(lcActions.myaccountLcBsPosts(this.state.param))
  },
  onDestroyOnCloseChange(e) {
    this.setState({
      destroyOnClose: e.target.checked,
    });
  },
  render:function() {
    return (
      <div>
        <TopInfo/>
        <BotInfo/> 
      </div>
    );
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    state
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};




export const LcLendInfo = connect(
  mapStateToProps, mapDispatchToProps
)(lcLendInfo);