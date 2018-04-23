const React = require('react');
const Pagination = require('rc-pagination');
const cs = require('classnames');
const _ = require('lodash');
const tool = require('./../../../common/tool');
const ToolTip = require('../../common/tooltip.component').ToolTip;

export const RryOutput = React.createClass({
    getInitialState(){
        return {
            loading:false,
            page:{
                total:1,
                current:1,
                pageSize:10
            },
            systemDate:'',
            lists:[]
        }
    },
    componentWillMount(){
        this.getOutputData();
    },
    getOutputData(){
        const self = this;
        const {page:{current,pageSize}} = this.state;
        $.post({
            url:'/hqb/rry/queryRryRecord',
            dataType:'JSON',
            data:{transType:2,pageNo:current,pageSize:pageSize},
            success:function (data) {
                if(data.errorCode===0){
                    self.setState({systemDate:data.data.systemDate,loading:true,lists:data.data.list,page:_.assign({},self.state.page,{total:data.data.total})})
                }
            }
        })
    },
    changePage(pageNo){
        const { page:{ total, current } } = this.state;
        if(pageNo == current)return;
        let nCurrent = pageNo < 1 ? 1 : pageNo > total ? total : pageNo;
        this.asyncData(() => {
            this.setState({
                page:_.assign({},this.state.page,{total,current:nCurrent}),
                loading: true
            });
        }).then(() => {
            this.getOutputData()
        })
    },
    asyncData(fn){
        fn&&fn()
        return new Promise(res => {
            res()
        })
    },
    render(){
        const {loading,page,lists,systemDate} = this.state;
        const rightnow = new Date().getTime();
        const week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
        return (
            <div className="hq-new-tb">
                <div className="tbGroup">
                    {
                        lists.length!=0?
                            <table>
                                <thead>
                                <tr>
                                    <th className="flt" width="183px">日期</th>
                                    <th className="frt" width="180px">金额(元)</th>
                                    <th className="frt" width="180px">手续费(元)</th>
                                    <th className="flt pl80" width="220px">类型</th>
                                    <th className="flt" width="150px">操作</th>
                                </tr>
                                </thead>
                                {
                                    lists.map((item,index) => {
                                        const rightnow = systemDate;
                                        const startTime = tool.format(item.startDateTime, 'MM-dd hh:mm');
                                        const startDate = this.getDateDetail(item.startDateTime);
                                        const startDay = week[new Date(item.startDateTime).getDay()];
                                        const finalTime = tool.format(item.processDateTime, 'MM-dd hh:mm');
                                        const finalDate = this.getDateDetail(item.processDateTime);
                                        const finalDay = week[new Date(item.processDateTime).getDay()];
                                        const compeleteTime = item.isFast&&item.transStatus!==2?tool.format((item.finishDateTime + 3*60*1000), 'MM-dd hh:mm'):tool.format(item.finishDateTime, 'MM-dd hh:mm');
                                        const compeleteDate = this.getDateDetail(item.finishDateTime);
                                        const compeleteDay = week[new Date(item.finishDateTime).getDay()];
                                        return <tbody key={index}>
                                        <tr>
                                            <td className="flt">{tool.format(item.startDateTime, 'yyyy-MM-dd hh:mm')}</td>
                                            <td className="frt">{tool.tansformMoney(parseFloat(item.amount)+parseFloat(item.userFee))}</td>
                                            <td className="frt">{tool.tansformMoney(item.userFee)}</td>
                                            <td className="flt pl80">
                                                    {item.type==13?'购买理财':item.type==14?'投标网贷':item.type==15?'取现手续费':(item.isFast?'快速':'普通') + (item.type==11?'转出到余额':'转出到银行卡')}
                                                {
                                                    item.type==15&&<div className="tolBox"><ToolTip data-text="local_tooltip.rry_bank_out_fee"/></div>
                                                }
                                            </td>
                                            <td className="flt">
                                                {
                                                    ((item.type==11||item.type==12)&&item.transStatus!=3)&&<a className="link-blue" onClick={(e)=>this.StateToggle(e)}>查看状态<i className="cart-up"></i></a>
                                                }
                                                {
                                                    item.transStatus==3&&'转出失败'
                                                }
                                            </td>
                                        </tr>
                                        {
                                            ((item.type==11||item.type==12)&&item.transStatus!=3)&&<tr style={{display:'none'}} >
                                                <td colSpan="5" className="tbGroup-detail">
                                                    <div className="hq-T-progress">
                                                        <div className="hq-progress-group">
                                                            <div>
                                                                <i className={cs({'icon icon-output':true,'default':item.startDateTime>rightnow})}></i>
                                                                <span className="dbSpan"><span>转出提交</span>{(item.isFast?startTime:startDate) + ' '  + startDay}</span>
                                                                <i className={cs({'icon-cartright':true,'default': (item.type==12?item.processDateTime:item.finishDateTime)>rightnow})}></i>
                                                            </div>
                                                        </div>
                                                        {/*银行卡转入时有该状态
                                                         *actionType 2 银行卡转入
                                                         * 1 余额转入
                                                         * 11转出到余额
                                                         * 12转出到银行
                                                         * 13购买理财
                                                         * 14购买网贷
                                                         * 15取现手续费
                                                         */
                                                            item.type==12&&<div className="hq-progress-group">
                                                                <i className={cs({'icon icon-bankwork':true})}></i>
                                                                <span className="dbSpan"><span>银行处理中</span>{(item.isFast?finalTime:finalDate) + ' ' + finalDay}</span>
                                                                <i className={cs({'icon-cartright':true,'default':item.finishDateTime>rightnow})}></i>
                                                            </div>
                                                        }
                                                        <div className="hq-progress-group lg">
                                                            <i className={cs({'icon icon-setPro':true,'default':item.transStatus!==2})}></i>
                                                            <span className="dbSpan"><span>转出成功</span>{(item.isFast?compeleteTime:compeleteDate) + ' ' + compeleteDay}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        }
                                        </tbody>
                                    })
                                }
                            </table>:''
                    }
                    {
                        lists.length==0?
                            <div className="nothing">
                                <i className="icon-noDate"></i>
                                <p>暂无记录</p>
                            </div>:''
                    }
                </div>
                {
                    loading&&<div className="paging-boxs cf">
                        <Pagination
                            showLessItems
                            current={page.current}
                            total={page.total}
                            onChange={(nextPage)=>this.changePage(nextPage)}
                        ></Pagination>
                    </div>
                }
            </div>
        )
    },
    showInfo(e){
        $(e.target).parents('tr').next().show();
    },
    hideInfo(e){
        $(e.target).parents('tr').next().hide();
    },
    StateToggle(e){
        $(e.target).parents('tr').next().stop().fadeToggle();
    },
    getDateDetail(date){
        const _date = new Date(date);
        return (_date.getMonth()+1) + '月' + _date.getDate() + '日'
    }
})