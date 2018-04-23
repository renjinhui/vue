const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const cookie = require('../common/util').cookie;
const base64 = require('js-base64').Base64;
// const tooltips = require('../common/tooltip').showToolTip;
const calendar = require('../common/calendar').showDetail;
const Header = require('../components/header/header.component').Header;
const Footer = require('../components/footer/footer.component').Footer;
// const UserHeaderModal = require('../components/popup/user-pic').UserHead;
const Popup = require('../components/popup/index.component').Popup;
const WelfarePopup =require('../components/popup/welfare-popup.component').WelfarePopup;
const BirthdayPopup =require('../components/popup/birthday-popup.component').BirthdayPopup;
const actionsLogin = require('../reducers/login/loginActions');
const userActions = require('../reducers/userBase/userBaseActions');
// const welfareActions = require('../reducers/welfarePopup/welfarePopupActions');
// const birthdayActions = require('../reducers/birthdayPopup/birthdayPopupActions');
const sysTimeActions = require('../reducers/sysTime/sysTimeActions');
const LcPopup = require('../components/popup/lcPopup/index').LcPopup;
const WdPopup = require('../components/popup/wdPopup/index').WdPopup;
const NewPop = require('../components/popup/newpop/index').newPop;

const RootInfo = React.createClass({
    setLoginInfo() {
      if(process.env.NODE_ENV === 'develop'){
        cookie.add('syd_name', '5YiY5YWI55Sf', 7, 'localhost');
      }
      let syd_name = cookie.get('syd_name');
      let name = base64.decode(decodeURIComponent(syd_name));
      if(syd_name == ''){
        this.props.dispatch(actionsLogin.userLogout(false));
      }else{
        this.props.dispatch(actionsLogin.userLogin(true, name));
        // this.getBirthdayPopup();
        // this.getWelfarePopup();
      }
    },
    setUserBaseInfo() {
      if(cookie.get('syd_name')){
        this.props.dispatch(userActions.getUserBaseAccount());
      }
    },
    getSysTime (){
      this.props.dispatch(sysTimeActions.sysTimePosts());
    },
    // getWelfarePopup(){
    //   this.props.dispatch(welfareActions.welfarePopupPosts());
    // },
    // getBirthdayPopup(){
    //   this.props.dispatch(birthdayActions.birthdayPopupPosts());
    // },
    componentWillMount() {
      this.setLoginInfo();
      this.setUserBaseInfo();
      // this.getSysTime();
    },
    componentDidMount() {
        // tooltips();
        calendar();

        // 底部二维码更换
        $(".iphone-downloads").hover(function() {
            var _this = $(this);
            _this.find('.code-images').show().parent().siblings().find('.code-images').hide();
        }, function() {
            $(".code-images.iphone").show().parent().siblings().find('.code-images').hide();;
        });

        // 底部友情链接、网站链接
        var $alink = $('.huli-links-arrow');
        $alink.on("click", function() {
            var _this = $(this);
            _this.toggleClass('current');
            _this.parent().parent().find('.huli-links-a-list').toggleClass('overflow');
        });

        //头像弹出
        // $('.myacoount-part1').click(function(){
        //   var $Popup = $('.user-head-modal');
        //   var winW = $(window).width(),
        //     winH = $(window).height(),
        //     dW = $(document).width(),
        //     dH = $(document).height(),
        //     left = (winW - $Popup.width()) / 2,
        //     top = (winH - $Popup.height()) / 2;
        //
        //   // $Popup.show();
        //   $('.version1-mask').show().css("width", dW + 'px').css("height", dH + 'px');
        //   $Popup.show().css("top", top + $(window).scrollTop() + 'px').css("left", left + 'px');
        // });

        $('#closeUserModel,#nextStep').click(function() {
            $('.user-head-modal').hide();
            $('.version1-mask').hide();
        });

    },
    render: function() {
        // let isShowWelfarePopup = '',isShowBirthdayPopup = '';
        //  if(this.props.state.birthdayPopupData.isFetching == 1 && this.props.state.birthdayPopupData.data.data &&  this.props.state.birthdayPopupData.data.data.show == 1){
        //   if(this.props.state.birthdayPopupData.birState == 0){
        //     isShowBirthdayPopup = <BirthdayPopup />;
        //   }
        //  }
        // if(this.props.state.welfarePopupData.isFetching == 1 && this.props.state.welfarePopupData.data.data &&  this.props.state.welfarePopupData.data.data.show == 1){
        //   if(this.props.state.birthdayPopupData.birState == 1){
        //     isShowWelfarePopup = <WelfarePopup />;
        //   }
        //
        // }

        return (
            <div >
              <Header /> { this.props.children } <Footer />
              <Popup />
              <NewPop />
              <WdPopup/>
              <LcPopup />
              {/*{isShowWelfarePopup}*/}
              {/*{isShowBirthdayPopup}*/}
            </div>
        );
    }
});

const mapStateToProps = (state, ownProps) => {
  return {
    state
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const Root = connect(
  mapStateToProps,mapDispatchToProps
)(RootInfo);
