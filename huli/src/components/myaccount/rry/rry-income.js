const React = require('react');
const Pagination = require('rc-pagination');
const cs = require('classnames');
const _ = require('lodash');
const tool = require('./../../../common/tool');

export const RryIncome = React.createClass({
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
            /**
             * 参数说明
             * @author zangpeihui
             * @date   2017-09-25
             * @param  startDateTime 转入时间/转出时间
             *         datetimer 格式化
             *         transDate （XX月XX日)
             *         processDateTime -转入:起息时间  -转出:转出到账时间 （XX月XX日)
             *         finishDateTime -收益到账时间
             *         finishDate -收益到账时间 （XX月XX日)
             */
        }
    },
    componentWillMount(){
        this.getIncomeData();
    },
    getIncomeData(){
        const self = this;
        const {page:{current,pageSize}} = this.state;
        $.post({
            url:'/hqb/rry/queryRryRecord',
            dataType:'JSON',
            data:{transType:1,pageNo:current,pageSize:pageSize},
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
            this.getIncomeData()
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
                                    <th className="flt" width="230px">日期</th>
                                    <th className="frt" width="210px">金额(元)</th>
                                    <th className="flt pl130" width="320px">类型</th>
                                    <th className="flt" width="150px">操作</th>
                                </tr>
                                </thead>

                                {
                                    lists.map((item, index) => {
                                        const rightnow = systemDate;
                                        const startTime = tool.format(item.startDateTime, 'yyyy-MM-dd hh:mm:ss');
                                        const startDay = week[new Date(item.startDateTime).getDay()];
                                        const startDate = this.getDateDetail(item.startDateTime);
                                        const finalDate = this.getDateDetail(item.processDateTime);
                                        const finalDay = week[new Date(item.processDateTime).getDay()];
                                        const compeleteDate = this.getDateDetail(item.finishDateTime);
                                        const compeleteDay =  week[new Date(item.finishDateTime).getDay()];
                                        return <tbody key={index}>
                                        <tr>
                                            <td className="flt">{startTime}</td>
                                            <td className="frt">{tool.tansformMoney(item.amount)}</td>
                                            <td className="flt pl130">{item.type==1?'余额转入':'银行卡转入'}</td>
                                            <td className="flt">
                                                {
                                                    item.transStatus!=3?<a className="link-blue" onClick={(e)=>this.StateToggle(e)}>查看状态<i
                                                        className="cart-up"></i></a>:'转入失败'
                                                }
                                            </td>
                                        </tr>
                                        {
                                            item.transStatus != 3 && <tr style={{display: 'none'}}>
                                                <td colSpan="4" className="tbGroup-detail">
                                                    <div className="hq-T-progress">
                                                        <div className="hq-progress-group">
                                                            <i className={cs({
                                                                'icon icon-income': true,
                                                                'default': item.startDateTime > rightnow
                                                            })}></i>
                                                            <span className="dbSpan">
                                                                <span>转入提交</span>
                                                                {startDate + ' ' + startDay}
                                                            </span>
                                                            <i className={cs({
                                                                'icon-cartright': true,
                                                                'default': (item.type==2?item.startDateTime:item.finishDateTime) > rightnow
                                                            })}></i>
                                                        </div>
                                                        {
                                                            item.type==2&&<div className="hq-progress-group lg">
                                                                <i className={cs({
                                                                    'icon icon-bankwork': true,
                                                                    'default': item.startDateTime > rightnow
                                                                })}></i>
                                                                <span className="dbSpan">
                                                                     <span>银行处理中</span>
                                                                    {finalDate  + ' ' + finalDay}
                                                                </span>
                                                                <i className={cs({
                                                                    'icon-cartright': true,
                                                                    'default': item.processDateTime > rightnow
                                                                })}></i>
                                                            </div>
                                                        }
                                                        <div className="hq-progress-group">
                                                            <i className={cs({
                                                                'icon icon-computed': true,
                                                                'default':  item.transStatus!==2
                                                            })}></i>
                                                            <span className="dbSpan">
                                                                <span>计算收益</span>
                                                                {compeleteDate  + ' ' + compeleteDay}
                                                            </span>
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