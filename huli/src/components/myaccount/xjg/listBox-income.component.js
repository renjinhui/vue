const React = require('react');
const isIE8 = require('../../../common/util').isIE8;
const xjgTabActions = require('../../../reducers/myaccount/xjg/tabList/myaccountXjgTabActions');
const Pagination = require('rc-pagination');
const Tool = require('../../../common/tool');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const listBoxInCome1 = React.createClass({
	getInitialState(){
		return{
      param:{
        subType:'XJG',
        opType:1,//收益中
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
    //console.log(this.props.tableList)
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
                    <td className="frt">{Tool.tansformMoney(item.transAmount)}</td>
                    <td className="flt" >{item.transStatus}</td>
                    <td className="flt">{item.finishDateTime?item.finishDateTime:''}</td>
                    <td className="flt"><a className="link-blue" href="https://events.huli.com/static/web/agree/xjg.html" target="_blank">查看合同</a></td>
                </tr>
              )
          });
          list=<table>
              <thead>
              <tr>
                  <th className="flt" width="210px">操作时间</th>
                  <th className="frt" width="200px">本金(元)</th>
                  <th className="flt" width="180px" >状态</th>
                  <th className="flt" width="200px">收益起始日</th>
                  <th className="flt">操作</th>
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
      list = <div className="without-investment-box myaccount-without">
                  <img src="https://static.huli.com/images/nodata.png" alt="" />
                  <p>系统繁忙！加载失败！</p>
                </div>
    } 

  	return(
  		<div className="hq-income" >
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


export const listBoxInCome = connect(
  mapStateToProps,mapDispatchToProps
)(listBoxInCome1);
