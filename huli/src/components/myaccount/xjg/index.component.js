const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const CurDepositInfo= require('./info.component').CurDepositInfo;
const CurDepositListBox=require('./listBox.component').CurDepositListBox
// const CurDepositInfo = require('./info.component').CurDepositInfo;

const xjgActions = require('../../../reducers/myaccount/xjg/myaccountXjgActions');



const CapitalMain = React.createClass({
  componentWillMount:function(){
    
    
  },
  render() {
    if(!this.props.userLogin.isLogin){
      window.location = 'https://passport.huli.com/?backurl=https://www.huli.com/hl/#/myaccount/cur_deposit/income';
      return;
    }
    if(this.props){
      // console.log(this.props,'this.props');
    }
    return (
      <div className="myacoount-right-con lt hq">
        <CurDepositInfo />
        <CurDepositListBox>
          {this.props.children}
        </CurDepositListBox>
      </div>
    )
  }
});


const mapStateToProps = (state, ownProps) => {
  
  return{
    userLogin:state.userLogin
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
  }
};

export const CurDepositMain = connect(
  mapStateToProps,mapDispatchToProps
)(CapitalMain);
