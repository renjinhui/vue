const React = require('react');
const ReactRedux = require('react-redux');

const connect = ReactRedux.connect;
const signInActions = require('../../../reducers/myaccount/integral/signInActions');
const signTodayActions = require('../../../reducers/myaccount/integral/signTodayActions');
const userHeadActions = require('../../../reducers/userHead/userHeadActions');
const welfareActions = require('../../../reducers/myaccount/welfare/welfareActions');
const ToolTip = require('../../common/tooltip.component').ToolTip;

const Capital = React.createClass({
    getInitialState(){
        return{
            isSignStatus:false,
            imageUrl:'https://static.huli.com/images/passport/head3.png'
        }
    },
    componentWillMount:function(){
        this.props.getSignToday();
        this.props.getUserHead();
    },
    signIn:function(){
        this.setState({isSignStatus:true});
        this.props.getIsSignSuccess();
    },
    render:function() {
        let _this = this;
        let level = null;
        let levelBtn = null;
        let styleName = null;

        const map = this.props.userLevel.data.userstatusmap;
        if (map && map.secretLevel) {
            if (map.secretLevel < 3) {
                level = <em>安全等级：低</em>;
                levelBtn = <a href="/myaccount/safecenter">立即提升</a>;
            } else if (map.secretLevel >= 6) {
                level = <em className="high">安全等级：高</em>;
                levelBtn = '';
            } else {
                level = <em className="medium">安全等级：中</em>;
                levelBtn = <a href="/myaccount/safecenter">立即提升</a>;
            }
        }

        let isSign = <a href="javascript:;" className="common-btn-90 blue-btn lt" onClick={this.signIn}>签到送积分</a>;
        if(this.props.signTodayData.isFetching  ==1){
            if(this.props.signTodayData.data.signStatus  ==0 ){
                isSign = <a href="javascript:;" className="common-btn-90 blue-btn lt success">今日积分+{this.props.signTodayData.data.todayScore}</a>;
            }
        }

        if(this.state.isSignStatus){
            styleName = {
                animation: 'calendar 2s linear'
            }
        }

        let now = new Date(),hour = now.getHours();
        let timeStr = '上午好';
        if(hour < 6){timeStr = "凌晨好"}
        else if (hour < 9){timeStr = "早上好"}
        else if (hour < 12){timeStr = "上午好"}
        else if (hour < 14){timeStr = "中午好"}
        else if (hour < 17){timeStr = "下午好"}
        else if (hour < 19){timeStr = "傍晚好"}
        else if (hour < 22){timeStr = "晚上好"}
        else {timeStr = "夜里好！"}

        let head = <img src="https://static.huli.com/images/passport/head3.png" alt="" width="70" height="70" />;
        if(this.props.userHeadData.isFetching == 1){

            if(this.props.userHeadData.data.cutimage != '' && this.props.userHeadData.data.cutimage != null && this.props.userHeadData.data.cutimage != '@'){
                let  img = new Image();

                img.onload = function(){
                    $('.user-header').attr('src',_this.props.userHeadData.data.cutimage);
                }
                img.src = this.props.userHeadData.data.cutimage;
            }

        }
        return (
            <div className="myacoount-top-details cf">
              <div className="myacoount-part1 lt">
                  {/*{head}*/}
                <img className="user-header" src="https://static.huli.com/images/passport/head3.png" alt="" width="70" height="70" />
              </div>
              <div className="myacoount-part2 lt">
                <p>{this.props.userLevel.data.username}，{timeStr}</p>
                <div className="sign-in cf">
                    {isSign}
                  <a href="javascript:" className="huli-common-icons calendar-fix"></a>
                  <a href="javascript:" className="sign-images huli-common-icons" style={styleName}>
                    <div className="version-detail-hover">

                      <em className="sign-detail">您本月已成功签到{this.props.signTodayData.data.monthCount}天 </em>
                      <div className="arrow">
                        <div className="arrow-up"></div>
                        <div className="arrow-up-in"></div>
                      </div>
                      <div className="sign-list cf">
                        <span></span>
                        <em>每日仅可签到一次，每次随机获得积分；</em>
                      </div>
                      <div className="sign-list cf">
                        <span></span>
                        <em>每个自然月内，累计签到满10次时，额外赠送10积分；累计签到满20次时，额外赠送20积分；</em>
                      </div>
                      <div className="sign-list cf">
                        <span></span>
                        <em>每笔积分的有效期将截止到获得此积分的12个月后，最后一个自然月最后一天的24时。</em>
                      </div>
                    </div>
                  </a>
                  <span>{this.props.signTodayData.data.monthCount}天</span>
                </div>
                <div className="details-images cf">
                  <p className="db">
                    <span title="手机认证" className={this.props.userLevel.data.userstatusmap ?(this.props.userLevel.data.userstatusmap.isMobileActive == 'true' ?  "rank-images0 huli-common-icons finish":"rank-images0 huli-common-icons") : "rank-images0 huli-common-icons"}><a title="手机认证" href="/myaccount/safecenter"></a></span>
                    <span title="实名开户" className={this.props.userLevel.data.userstatusmap ?(this.props.userLevel.data.userstatusmap.id5Status == 3 ?  "rank-images1 huli-common-icons finish":"rank-images1 huli-common-icons") : "rank-images1 huli-common-icons"}><a title="实名开户" href="/myaccount/safecenter"></a></span>
                    <span title="邮箱认证" className={this.props.userLevel.data.userstatusmap ?(this.props.userLevel.data.userstatusmap.emailStatus == 3 ?  "rank-images2 finish huli-common-icons":"rank-images2 huli-common-icons") : "rank-images2 huli-common-icons"}><a title="邮箱认证" href="/myaccount/safecenter"></a></span>
                    <span title="交易密码" className={this.props.userLevel.data.userstatusmap ?(this.props.userLevel.data.userstatusmap.isSetPayPassword == 'true'?  "rank-images3 finish huli-common-icons":"rank-images3 huli-common-icons") : "rank-images3 huli-common-icons"}><a title="交易密码" href="/myaccount/safecenter"></a></span>
                    <span title="安全保护问题" className={this.props.userLevel.data.userstatusmap ?(this.props.userLevel.data.userstatusmap.isSetSecret == 'true' ?  "rank-images4 finish huli-common-icons":"rank-images4 huli-common-icons") : "rank-images4 huli-common-icons"}><a title="安全保护问题" href="/myaccount/safecenter"></a></span>
                    <span title="风险评估" className={this.props.userLevel.data.userstatusmap ?(this.props.userLevel.data.userstatusmap.riskCount <3 ?  "rank-images5 finish huli-common-icons":"rank-images5 huli-common-icons") : "rank-images5 huli-common-icons"}><a title="风险评估" href="/myaccount/safecenter"></a></span>
                      {level}
                      {levelBtn}
                  </p>
                  <p className="db">上次登录时间 {this.props.userLevel.data.lastloginTime}</p>
                </div>
              </div>
              <div className="myacoount-part3 lt">
                <div className="useful-money cf">
                  <div className="search-drop-down lt">
                    <p>总可用余额(元）</p>
                    <span className="drop-down-big lt huli-common-icons"></span>
                    <div className="version-detail-hover">
                      <div className="arrow useful">
                        <div className="arrow-up"></div>
                        <div className="arrow-up-in"></div>
                      </div>
                      <div className="version-useful-account cf">
                        <em className="lt">慧赚</em>
                        <i className="rt">{this.props.capital.data.currentBalanceHuli}</i>
                      </div>
                      <div className="version-useful-account cf">
                        <em className="lt">搜易贷</em>
                        <i className="rt">{this.props.capital.data.currentBalanceP2P}</i>
                      </div>
                    </div>
                  </div>
                  <ToolTip data-text="local_tooltip.acc_asset_available" />
                </div>
                <p className="money-num">{this.props.capital.data.availableBalance}</p>
                <div className="recharge-btns cf">
                  <a href="/hl/#/myaccount/recharge" className="orange-btn common-btn-80 lt">充值</a>
                  <a href="/hl/#/myaccount/collocation/takeNow" className="common-btn-80 lt cash-button">取现</a>
                </div>
              </div>
              <div className="gray-lines lt"></div>
              <div className="myacoount-part3 lt" style={{'width':'210px'}}>
                <div className="useful-money cf">
                  <div className="search-drop-down lt">
                    <p>日日盈(元）</p>
                  </div>
                  <ToolTip data-text="local_tooltip.acc_asset_rry" />
                </div>
                <p className="money-num">{this.props.capital.data.amountHq}</p>
                <div className="recharge-btns cf" style={{'position': 'relative', 'left': '-24px'}}>
                  <a href="/hl/#/rry?state=1" className="common-btn-80 lt cash-button">转入</a>
                  <a href="/hl/#/myaccount/rry?state=2" className="common-btn-80 lt cash-button">转出</a>
                </div>
              </div>
            </div>
        );
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        capital: state.capitalInfo,
        userLevel: state.userLevelInfo,
        isSign:state.isSign,
        signTodayData:state.signTodayData,
        userHeadData:state.userHeadData
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getSignToday: (fn) =>{
            dispatch(signTodayActions.singTodayPosts(fn))
        },
        getIsSignSuccess:() =>{
            dispatch(signInActions.signInPosts());

        },
        getUserHead:() =>{
            dispatch(userHeadActions.userheadPosts());
        }
    }
};

export const CapitalInfo = connect(
    mapStateToProps, mapDispatchToProps
)(Capital);

// module.exports = {
//   CapitalInfo
// }
