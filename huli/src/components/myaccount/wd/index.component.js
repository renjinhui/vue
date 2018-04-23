const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const WdLendInfo= require('./info.component').WdLendInfo;
const WdLendListBox=require('./list.component').WdLendListBox
// const WdLendInfo = require('./info.component').WdLendInfo;




const CapitalMain = React.createClass({
  componentWillMount:function(){
    
    
  },
  render() {
    if(!this.props.userLogin.isLogin){
      window.location = 'https://passport.huli.com/?backurl=https://www.huli.com/hl/#/myaccount/wd_lend/normal';
      return;
    }
    if(this.props){
      // console.log(this.props,'this.props');
    }
    return (
      <div className="myacoount-right-con lt paddings">
        <WdLendInfo />
        <WdLendListBox>
          {this.props.children}
        </WdLendListBox>
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

export const WdLendMain = connect(
  mapStateToProps,mapDispatchToProps
)(CapitalMain);
