const React = require('react');
const Pagination = require('rc-pagination');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const wdActions = require('../../../../reducers/myaccount/wd/myaccountWdActions');
const ToolPE = require('../../../../common/tool').tansformMoney;
const ToolTM = require('../../../../common/tool').transformTime;

const OutList = require('./outList.component').WdOutList

const wdlistOpen = React.createClass({
  getInitialState(){
    return{
      param:{
        pageNo:1,
        assetMode:1,
        t: Math.random()
      }
    }
  },
  componentWillMount:function(){
    this.props.dispatch(wdActions.myaccountWdOpenPosts(this.state.param))
  },
  onChange:function(page){
    this.state.param.pageNo = page;
    this.props.dispatch(wdActions.myaccountWdOpenPosts(this.state.param))
  },
  render:function(){
    // console.log(this.props.state.wdData.tabOpenList.data,1)
    // let data = this.props.state.wdData.tabOpenList.data ? this.props.state.wdData.tabOpenList.data.data : {};
    // console.log(data,2)
    let outHtml = '', outList = '',innerList = '';
    let _this = this;
    if(this.props.state.wdData.tabOpenList.isFetching == 1){
      let data = this.props.state.wdData.tabOpenList.data.data;
      if(this.props.state.wdData.tabOpenList.data.errorCode == 0){
        if(!this.props.state.wdData.tabOpenList.data.data.list.length){
          outHtml = <div className="sydinlist-notips">
                        <span className="imgbox1">
                            <img src="https://static.souyidai.com/www/images/version/my-account/graphic-icon.jpg" alt=""/>
                        </span>
                        <span>暂无冻结中的项目，<a href="https://www.souyidai.com/p2p/">先去投标</a>吧!</span>
                    </div>
        }else{
          outHtml = <div>
                      <div className="sydinlist-th">
                        <span className="grid-wh-20">&nbsp;</span>
                        <span className="grid-wh-120">项目编号</span>
                        <span className="grid-wh-30">&nbsp;</span>
                        <span className="grid-wh-100 right-justified">借款金额(元)</span>
                        <span className="grid-wh-30">&nbsp;</span>
                        <span className="grid-wh-120">约定年化利率</span>
                        <span className="grid-wh-70 left-justified">期限</span>
                        <span className="grid-wh-65 left-justified">还款方式</span>
                        <span className="grid-wh-85 right-justified">投标金额</span>
                        <span className="grid-wh-100 right-justified">应收本息</span>
                        <span className="grid-wh-30">&nbsp;</span>
                        <span className="grid-wh-70 left-justified">满标状态</span>
                        <span className="grid-wh-80 center-justified rt">还款计划</span>
                      </div>

                      <OutList data={data}/>

                      <div className="cf">
                          
                          <div className="sydinject-total lt">
                            冻结中：<em>{data.total}</em>笔
                          </div>
                          <div className="paging-boxs cf" style={{display:'table'}}>
                            <Pagination showLessItems onChange={this.onChange} current={this.state.param.pageNo} pageSize={10} total={data.total}/>
                          </div>
                      </div>
                    </div>
        }
      }
    }else if(this.props.state.wdData.tabOpenList.isFetching == 0){
      outHtml = <div className="center-justified" data-type="sydloading">
                    <div className="vertical-high-80">&nbsp;</div>
                    <div>
                        <img src="https://static.souyidai.com/www/images/version/my-account/sydloading.gif"/>
                    </div>
                    <div className="vertical-high-80">&nbsp;</div>
                </div>
    }else{
      outHtml = <div className="center-justified" data-type="sydloading">
                    <div className="vertical-high-80">&nbsp;</div>
                    <div>
                        系统繁忙，请稍后重试~~
                    </div>
                    <div className="vertical-high-80">&nbsp;</div>
                </div>
    }
    return(
      <div data-type="invest-content">
        {outHtml}  
      </div>
      );
    },
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


export const WdlistOpen = connect(
  mapStateToProps,mapDispatchToProps
)(wdlistOpen);
