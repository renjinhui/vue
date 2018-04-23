const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const base64 = require('js-base64').Base64;
const capitalActions = require('../../../reducers/myaccount/capital/capitalActions');
const userLevelAction = require('../../../reducers/myaccount/userSafeLevel/userSafeLevelActions');
const Util = require('../../../common/util').cookie;
const actions = require('../../../reducers/login/loginActions');
const CapitalInfo = require('./capital-info.component').CapitalInfo;
const Welfare = require('./capital-welfare.component').CapitalWelfare;
const Property = require('./capital-property.component').CapitalProperty;
const Invest = require('./capital-invest.component').CapitalInvest;
const CapitalCalender = require('./capital-calendar.component').CapitalCalender;

const Capital = React.createClass({
  componentWillMount:function(){
    this.props.getCapitalInfoData();
    this.props.getUserLevelInfoData()
  },
  render() {
    if(!this.props.userLogin.isLogin){
      window.location = 'https://passport.huli.com/?backurl=https://www.huli.com/hl/#/myaccount/capital';
      return;
    }
    return (
      <div className="myacoount-right-con lt">
        <CapitalInfo />
        <Welfare />
        <Property />
        <Invest />
        <CapitalCalender />
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
    getCapitalInfoData: () => {
      dispatch(capitalActions.capitalInfoPosts())
    },
    getUserLevelInfoData:()=>{
      dispatch(userLevelAction.userSafeLevelPosts())
    }/*,
    getLoginData:()=>{
      let cookies = Util.get('syd_name');
      let name = base64.decode(decodeURIComponent(cookies));
      if(cookies == ''){
        window.location='https://passport.huli.com/?backurl=https://www.huli.com/hl/#/myaccount/capital';
        dispatch(actions.userLogout(false));
      }else{
        dispatch(actions.userLogin(true,name));
      }

    }*/
  }
};

export const CapitalMain = connect(
  mapStateToProps,mapDispatchToProps
)(Capital);

// module.exports = {
//   Capital
// };