const React = require('react');
const isIE8 = require('../../../common/util').isIE8;
const xjgActions = require('../../../reducers/myaccount/xjg/myaccountXjgActions');
const xjgTabActions = require('../../../reducers/myaccount/xjg/tabList/myaccountXjgTabActions');
const actionsPopup = require('../../../reducers/popup/popupActions');
const Pagination = require('rc-pagination');
const Tool = require('../../../common/tool');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const ToolTip = require('../../common/tooltip.component').ToolTip;

const listBoxMkSure1 = React.createClass({
	getInitialState(){
    return{
      param:{
        subType:'XJG',
        opType:2,//确认中
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
  onAlert:function(mytitle,money,id){
    let str='撤销'+mytitle;
    this.props.dispatch(actionsPopup.popupSetStatus({
      isShow: true,
      type: 'xjg-revoke',
      title: str,
      submitDisabled: true

    }));
    this.props.dispatch(xjgActions.myaccountXjgPopupRevoke({
      transId: id,
      transMoney: money,
      transTitle:mytitle
    }));
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
          // let str = ;
          list=<table>
              <thead>
              <tr>
                  <th className="flt" width="200px">操作时间</th>
                  <th className="flt" width="95px">类型</th>
                  <th className="frt" width="133px" style={{paddingRight:'30px',paddingLeft:'15px'}}>本金(元)</th>
                  <th className="flt" width="153px">状态</th>
                  <th className="flt" width="170px" style={{padding:0,paddingLeft:'30px'}}>预计收益日/预计到账日</th>
                  <th className="flt" width="120px">操作</th>
              </tr>
              </thead>
              <tbody>
                {
                  this.props.tableList.data.data.recordList.map(function(item,index){
                    // return <div>list {index}</div>
                    return (
                        <tr key={index}>
                            <td className="flt">{item.transDateTime}</td>
                            <td className="flt">{item.title?item.title:''}</td>
                            <td className="frt" style={{paddingRight:'30px',paddingLeft:'15px'}}>{Tool.tansformMoney(item.transAmount)}</td>


                            {
                              (item.confirm==0)
                              ?
                              <td className="flt">{item.transStatus}<ToolTip data-text={item.transType==1?"local_tooltip.xjg_in_apply":'local_tooltip.xjg_out_apply'}/></td>
                              :
                              <td className="flt">{item.transStatus}<ToolTip data-text={item.transType==1?"local_tooltip.xjg_in_confirm":'local_tooltip.xjg_out_confirm'}/></td>
                            }

                            <td className="flt">{item.confirmDateTime?item.confirmDateTime:''}</td>

                            {
                              (item.confirm==0)
                              ?

                                <td className="flt"><a className="link-blue" onClick={this.onAlert.bind(this,item.title,item.transAmount,item.transId)}>撤销</a></td>
                              :

                                <td className="flt"><span className="link-gray" >撤销</span></td>

                            }
                        </tr>
                      )
                  }.bind(this))
                }
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
  		<div className="hq-mksure" id='hq-mksure'>
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
    state,
    tableList:state.xjgTabList
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch,
    getListData:(data)=>{
      dispatch(xjgTabActions.myaccountXjgTablePosts(data))
    }
  }
};

export const listBoxMkSure = connect(
  mapStateToProps,mapDispatchToProps
)(listBoxMkSure1);
