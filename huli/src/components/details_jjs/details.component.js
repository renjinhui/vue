const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const Link = require('react-router').Link;
const DocumentTitle = require('react-document-title');

const detailsActions = require('../../reducers/details_jjs/detailsActions');
const sysTimeActions = require('../../reducers/sysTime/sysTimeActions');
const userBaseActions = require('../../reducers/userBase/userBaseActions');

const DetailsRight = require('./detailsRight.component').DetailsRight;
const HeaderLeft = require('./headerLeft.component').HeaderLeft;
const HeaderRight = require('./headerRight.component').HeaderRight;

const DetailsMain = React.createClass({
  getInitialState(){
    return{
      bid: this.props.location.query.bid,
      proType: this.props.location.query.proType || 'jjs'
    }
  },
  componentWillMount:function(){
    this.props.dispatch(detailsActions.getLcDetailData({bid:this.state.bid,proType:this.state.proType}));//获取该标的详细信息
    if(this.props.state.userLogin.isLogin){
      this.props.dispatch(detailsActions.investPersonList({bid:this.state.bid,proType:this.state.proType}));//获取投资人列表
      this.props.dispatch(detailsActions.getUserFuli({bid:this.state.bid,proType:this.state.proType}));//获取弹框上的福利列表
      this.props.dispatch(userBaseActions.getUserBaseAccount());//获取用户个人信息
      this.props.dispatch(detailsActions.userRiskLevel());//首次获取用户风险等级
    }
  },

  render:function(){
    let bid = this.state.bid;
    let proType = this.state.proType;
    let datas = this.props.state.lcDetailsData.data.data;
    let transStatus = 0;
    if(datas){
      transStatus = (datas.assetTransfer && datas.assetTransfer.status == 1) ? 1 : 0;
    }
    return (
      <DocumentTitle title='狐狸慧赚-项目详情'>
        <div className="myacoount-contain  cf">
          <div className="myacoount-box cf huli-details-container">
            <div className="details-left lt">
              <div className="header-content">
                <HeaderLeft />
                <HeaderRight />
              </div>
              <div className="tab-content">
                <ul className="tab-title-box cf">
                    <li className="tab-title">
                      <Link to={"/details/project"}  query={{bid: bid, proType: proType}} activeClassName='current'>项目详情</Link>
                    </li>
                    <li className="tab-title">
                      <Link to={"/details/subscription"} query={{bid: bid, proType: proType}} activeClassName='current'>认购记录</Link>
                    </li>
                    <li className="tab-title">
                      <Link to={"/details/question"} query={{bid: bid, proType: proType}} activeClassName='current'>常见问题</Link>
                    </li>
                </ul>
                <div className="tab-content-box">
                  {this.props.children}
                </div>
              </div>
            </div>
            {
              proType == 'jjs'?
              <DetailsRight/>
              : transStatus == 1 ?
              <DetailsRight/>
              :null
            }
            
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

const mapStateToProps = (state, ownProps) => {
  return{
    state
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const Details = connect(
  mapStateToProps,mapDispatchToProps
)(DetailsMain);