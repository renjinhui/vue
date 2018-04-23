const React = require('react');
const ReactRedux = require('react-redux');
const base64 = require('js-base64').Base64;
const connect = ReactRedux.connect;
const Util = require('../../common/util');
const actions = require('../../reducers/login/loginActions');
const Nav = require('./navLink/nav.component').Nav;
const DocumentTitle = require('react-document-title');
const userBaseActions = require('../../reducers/userBase/userBaseActions');

const MyaccountMain = React.createClass({
    componentDidMount:function(){
      let cookie = Util.cookie.get('syd_name');
      if(cookie == ''){
        this.props.dispatch(actions.userLogout(false));
        window.location = 'https://passport.huli.com/?backurl=https://www.huli.com/hl/#/myaccount/capital';
      }

      // if(!this.props.userLogin.isLogin){
      //   window.location = 'https://passport.huli.com/?backurl=https://www.huli.com/hl/#/myaccount/capital';
      // }
    },
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(userBaseActions.getUserBaseUserStatus());
    },
    render:function(){
        return (
            <DocumentTitle title='狐狸慧赚-我的账户'>
              <div className="myacoount-contain">
                <div className="myacoount-box cf">
                  <Nav />
                    {this.props.children}
                </div>
              </div>
            </DocumentTitle>
        );
    }
});

const mapStateToProps = (state, ownProps) => {
    return{
        userLogin:state.userLogin
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    dispatch
  }
};

export const Myaccount = connect(
    mapStateToProps,mapDispatchToProps
)(MyaccountMain);