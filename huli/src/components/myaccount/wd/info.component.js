const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const TopInfo=require('./info-top.component').TopInfo;
const BotInfo=require('./info-bot.component').BotInfo;;
const wdActions = require('../../../reducers/myaccount/wd/myaccountWdActions');


const wdLendInfo = React.createClass({
  getInitialState(){
    return{
      param:{
        assetMode: 1,
        t:Math.random()
      }
      
    }
  },
  componentWillMount:function(){
    this.props.dispatch(wdActions.myaccountWdBsPosts(this.state.param))
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




export const WdLendInfo = connect(
  mapStateToProps, mapDispatchToProps
)(wdLendInfo);