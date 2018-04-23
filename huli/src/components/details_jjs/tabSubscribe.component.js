const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const DocumentTitle = require('react-document-title');

const ToolPE = require('../../common/tool').tansformMoney;
const ToolPT = require('../../common/tool').format;
const ToolTip = require('../common/tooltip.component').ToolTip;

const subscribeTab = React.createClass({
  getInitialState(){
    return{
      fromDicts:{
        "PC":0,
        "AUTO":1,
        "WAP":2,
        "IOS":3,
        "ANDROID":4,
        "DELEGATOR":5,
        "WECHAT":6,
        "YXB":7,
        "BIDSET":8
      }
    }
  },
  render:function(){
    let listData = this.props.state.investPerList.data.data;
    let list = '';
    let bidType = this.props.location.query.proType || 'jjs';
    if(!this.props.userLogin.isLogin){
        list =  <div className='please-login-box'>
                    <span>更多信息请</span>
                    <a href="https://passport.huli.com/?backurl=https://www.huli.com/" target="_blank" className="detail_login">登录</a>
                    <span>或</span>
                    <a href="https://passport.huli.com/regist.html?backurl=https://www.huli.com/" target="_blank" className="detail_regist">注册</a>
                    <span>后查看</span>
                </div>
    }else{
        if(listData && bidType=='jjszrb'){
            list =  <ul>
                        <li className="record-title">
                            <span className='num'>序号</span>
                            <span className='time'>认购时间</span>
                            <span className='person'>投资人</span>
                            <span className='money'>认购金额(元)</span>
                        </li>
                    {
                        listData.length
                        ?
                        listData.map(function(item,index){
                            return(
                                <li key={index+'key'}>
                                    <span className='num'>{index+1}
                                {
                                    item.selfInvest
                                    ?
                                    <ToolTip data-text="inv_tag_myinv" title='我的认购' extClass='my-subscribe' hoverClass="my-subscribe"></ToolTip>
                                    :null
                                }
                                    </span>
                                    <span className='time'>{ToolPT(item.times,'yyyy-MM-dd hh:mm:ss')}</span>
                                    <span className='person'>{item.nickName}</span>
                                    <span className='money'>￥{ToolPE(item.amount)}</span>
                                </li>

                            )
                            
                        })
                        :

                        <div className="without-project-record">
                            <img src="https://static.huli.com/images/nodata.png" alt=""/>
                            <p>暂无投标记录</p>
                        </div>

                    }

                    </ul>
        }else if(listData && bidType=='jjs'){
          let that =this;
            list =  <ul>
                        <li className="record-title">
                            <span className='num'>序号</span>
                            <span className='time'>认购时间</span>
                            <span className='person'>投资人</span>
                            <span className='money'>认购金额(元)</span>
                        </li>
                    {
                        listData.length
                        ?
                        listData.map(function(item,index){
                            return(
                                <li key={index+'key'}>
                                    <span className='num'>{index+1}
                                {
                                    item.selfInvest
                                    ?
                                    <ToolTip data-text="inv_tag_myinv" title='我的认购' extClass='my-subscribe' hoverClass="my-subscribe"></ToolTip>
                                    // <span className='my-subscribe tooltipcol version-tooltip-csshover' data-text="inv_tag_myinv">我的认购</span> hoverClass="invest-person-tooltip-hover"
                                    :null
                                }
                                    </span>
                                    <span className='time'>{ToolPT(item.times,'yyyy-MM-dd hh:mm:ss')}</span>
                                    <span className='person'><span className='lt'>{item.nickName}</span>
                                    {
                                        that.state.fromDicts[item.bidFrom] == 5
                                        ?
                                        <ToolTip data-text="local_tooltip.mortgage_inv_rep" title='投资人代表' extClass='invest-person-tooltip' hoverClass="invest-person-tooltip-hover"/>
                                        // <a href="####" className="version-project-record-text version-tooltip-css tooltipcol" data-text={codes.local_tooltip.mortgage_inv_rep}>投资人代表</a>
                                        :null
                                    }
                                    {
                                        that.state.fromDicts[item.bidFrom]==1
                                        ?
                                        <ToolTip data-text="local_tooltip.inv_tag_auto" title='自动' extClass='invest-person-tooltip' hoverClass="invest-person-tooltip-hover"/>
                                        // <a href="####" className="version-project-record-text version-tooltip-css tooltipcol" data-text={codes.local_tooltip.inv_tag_auto} >自动</a>
                                        :null
                                    }
                                    {
                                        that.state.fromDicts[item.bidFrom]>=2&&that.state.fromDicts[item.bidFrom]<=4
                                        ?
                                        <a href="javascript:" target="_blank" className="version-project-phone-client">
                                            <em className="version-project-phone-client-tel ver-ico-url">&nbsp;</em>
                                            <span className="version-project-webapp-box">
                                                <em className="version-project-webapp-img"><img src="https://static.huli.com/images/page-home/app-code.png" width="100%"/></em>
                                                <em className="version-project-webapp-title">手机客户端成功投资</em>
                                                <em className="ar_up"></em>
                                                <em className="ar_up_in"></em>
                                            </span>
                                        </a>
                                        :null
                                    }
                                    </span>
                                    <span className='money'>￥{ToolPE(item.amount)}</span>
                                </li>
                                )

                        })
                        :

                        <div className="without-project-record">
                            <img src="https://static.huli.com/images/nodata.png" alt=""/>
                            <p>暂无认购记录</p>
                        </div>

                    }

                    </ul>
        }

    }
    return (
        <div className="subscribe-record-box">
            {list}
        </div>
    );
  }
});

const mapStateToProps = (state, ownProps) => {
  return{
    state,
    userLogin:state.userLogin
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const SubscribeTab = connect(
  mapStateToProps,mapDispatchToProps
)(subscribeTab);
