const React = require('react');
const Pagination = require('rc-pagination');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const lcActions = require('../../../../reducers/myaccount/lc/myaccountLcActions');
const ToolPE = require('../../../../common/tool').tansformMoney;
const ToolTM = require('../../../../common/tool').transformTime;

const OutList = require('./outList.component').LcOutList;

const lclistNormal = React.createClass({
	getInitialState(){
		return{
      param:{
        pageNo:1,
        assetMode:5,
        t: Math.random()
      }
    }
	},
  componentWillMount:function(){
    this.props.dispatch(lcActions.myaccountLcNormalPosts(this.state.param))
  },
  onChange:function(page){
    this.state.param.pageNo = page;
    this.props.dispatch(lcActions.myaccountLcNormalPosts(this.state.param))
  },
	render:function(){
    // console.log(this.props.state.lcData.tabNormalList.data,1)
    // let data = this.props.state.lcData.tabNormalList.data ? this.props.state.lcData.tabNormalList.data.data : {};
    // console.log(data,2)
    let outHtml = '', outList = '',innerList = '';
    let _this = this;
    if(this.props.state.lcData.tabNormalList.isFetching == 1){
      let data = this.props.state.lcData.tabNormalList.data.data;
      if(this.props.state.lcData.tabNormalList.data.errorCode == 0){
        if(!this.props.state.lcData.tabNormalList.data.data.list.length){
          outHtml = <div className="sydinlist-notips">
                        <span className="imgbox1">
                            <img src="https://static.huli.com/images/account.png" alt=""/>
                        </span>
                        <span>暂无回款中的项目，<a href="https://www.huli.com/hl/#/invest/">先去认购</a>吧!</span>
                    </div>
        }else{
          outHtml = <div>
                      <div className="sydinlist-th">
                          <span className="grid-wh-20">&nbsp;</span>
                          <span className="grid-wh-120">项目编号</span>
                          <span className="grid-wh-100 right-justified">认购本金(元)</span>
                          <span className="grid-wh-100 right-justified">应收本息(元)</span>

                          <span className="grid-wh-30">&nbsp;</span>

                          <span className="grid-wh-120">年利率</span>
                          <div className="grid-wh-85 lt">
                              <table cellpading="0" cellSpacing="0" border="0" width="100%" className="sydinlist-table" style={{'fontSize': '12px'}}>
                                <tbody>
                                  <tr>
                                      <td>
                                          已还期数/<br/>总期数
                                      </td>
                                  </tr>
                                </tbody>
                              </table>
                          </div>
                          <span className="grid-wh-85">还款状态</span>
                          <span className="grid-wh-100">起息日</span>

                          <span className="grid-wh-50">操作</span>
                          <span className="grid-wh-80 center-justified rt">还款计划</span>
                      </div>

                      <OutList data={data}/>

                      <div className="cf">
                          
                          <div className="sydinject-total lt">
                            回款中：<em>{data.total}</em>笔
                          </div>
                          <div className="paging-boxs cf" style={{display:'table'}}>
                            <Pagination showLessItems onChange={this.onChange} current={this.state.param.pageNo} pageSize={10} total={data.total}/>
                          </div>                          
                      </div>

                    </div>
        }
      }
    }else if(this.props.state.lcData.tabNormalList.isFetching == 0){
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


export const LclistNormal = connect(
  mapStateToProps,mapDispatchToProps
)(lclistNormal);
