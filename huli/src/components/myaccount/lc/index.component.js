const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const LcLendInfo= require('./info.component').LcLendInfo;
const LcLendListBox=require('./list.component').LcLendListBox;
// const WdLendInfo = require('./info.component').WdLendInfo;




const CapitalMain = React.createClass({
  componentWillMount:function(){
    
    
  },
  render() {
    if(!this.props.userLogin.isLogin){
      window.location = 'https://passport.huli.com/?backurl=https://www.huli.com/hl/#/myaccount/lc_lend/normal';
      return;
    }
    if(this.props){
      // console.log(this.props,'this.props');
    }
    return (
      <div className="myacoount-right-con lt paddings">
        <LcLendInfo />
        <LcLendListBox>
          {this.props.children}
        </LcLendListBox>
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

export const LcLendMain = connect(
  mapStateToProps,mapDispatchToProps
)(CapitalMain);
