const React = require('react');
const isIE8 = require('../../../common/util').isIE8;
const xjgTabActions = require('../../../reducers/myaccount/xjg/tabList/myaccountXjgTabActions');
const Pagination = require('rc-pagination');
const Tool = require('../../../common/tool');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const listBoxRevoke1 = React.createClass({
	getInitialState(){
    return{
      param:{
        subType:'XJG',
        opType:4,//已撤销
        pageNo:1,
        pageSize:10,
      }
    }
  },
  componentWillMount:function(){
    this.props.getListData(this.state.param)
  },
  onChange:function(page){
    this.state.param.pageNo = page;
    this.props.getListData(this.state.param);
  },
	render:function(){
    let list = '';
    let total = 0;
    if(this.props.tableList.isFetching == 1){
      if(this.props.tableList.data.errorCode==0){
        if(!this.props.tableList.data.data.recordList || this.props.tableList.data.data.recordList.length == 0 ){
          list = <div className="without-investment-box myaccount-without">
                    <img src="https://static.huli.com/images/nodata.png" alt="" />
                    <p>暂无项目记录</p>
                  </div>
        }else{
          total = this.props.tableList.data.data.totalRecords;
          let str = this.props.tableList.data.data.recordList.map(function(item,index){
            
            // return <div>list {index}</div>
            return (
                <tr key={index}>
                  <td className="flt">{item.transDateTime}</td>
                  <td className="flt">{item.title?item.title:''}</td>
                  <td className="frt">{Tool.tansformMoney(item.transAmount)}</td>
                  <td className="flt">{item.transStatus}</td>
                  <td className="flt">{item.finishDateTime}</td>
                </tr>
              )
          });
          list=<table>
              <thead>
              <tr>
                  <th className="flt" width="210px">操作时间</th>
                  <th className="flt" width="130px">类型</th>
                  <th className="frt" width="150px">本金(元)</th>
                  <th className="flt" width="230px">状态</th>
                  <th className="flt" width="184px">撤销日期</th>
              </tr>
              </thead>
              <tbody>
                {str}
              </tbody>
          </table>
        }
      }else if(this.props.tableList.data.errorCode==99){
      list = <div className="without-investment-box myaccount-without">
                  <img src="https://static.huli.com/images/nodata.png" alt="" />
                  <p>系统繁忙！加载失败！</p>
                </div>        
      }
    }else if(this.props.tableList.isFetching == 0){
    
      list  = <div className="loading-box myaccount-loading">
                <div></div>
                <p>加载中…</p>
              </div>
    }else{
      list = <div>加载失败</div>
    } 
  	return(
  		<div className="revoke" >
          <div className="tbGroup">
              {list}
          </div>
          <div className='hq-paging'>
            <div className="paging-boxs cf">
              <Pagination showLessItems onChange={this.onChange} current={this.state.param.pageNo} pageSize={10} total={total}/>
            </div>
          </div>
      </div>
      
  		);
	},
});
const mapStateToProps = (state, ownProps) => {
  return{
    tableList:state.xjgTabList
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getListData:(data)=>{
      dispatch(xjgTabActions.myaccountXjgTablePosts(data))
    }
  }
};


export const listBoxRevoke = connect(
  mapStateToProps,mapDispatchToProps
)(listBoxRevoke1);