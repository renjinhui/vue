const React = require('react');
const Pagination = require('rc-pagination');
const cs = require('classnames');
const _ = require('lodash');
const tool = require('./../../../common/tool');

export const RryProfit = React.createClass({
    getInitialState(){
        return {
            loading:false,
            page:{
                total:1,
                current:1,
                pageSize:10
            },
            lists:[]
        }
    },
    componentWillMount(){
        this.getProfitData()
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
            this.getProfitData()
        })
    },
    asyncData(fn){
        fn&&fn()
        return new Promise(res => {
            res()
        })
    },
    getProfitData(){
        const self = this;
        const {page:{current,pageSize}} = this.state;
        $.post({
            url:'/hqb/rry/queryRryRecord',
            dataType:'JSON',
            data:{transType:3,pageNo:current,pageSize:pageSize},
            success:function (data) {
                if(data.errorCode===0){
                    self.setState({loading:true,lists:data.data.list,page:_.assign({},self.state.page,{total:data.data.total})})
                }
            }
        })
    },
    render(){
        const {loading,page,lists} = this.state;
        return (
            <div className="hq-new-tb">
                <div className="tbGroup">
                    {
                        lists.length != 0 ?
                            <table>
                                <thead>
                                <tr>
                                    <th className="flt" width="280px">收益日期</th>
                                    <th className="frt" width="180px">金额(元)</th>
                                    <th className="frt pl130" width="350px">类型</th>
                                </tr>
                                </thead>
                                {
                                    lists.map((item, index) => {
                                        const startTime = tool.format(item.startDateTime, 'yyyy-MM-dd');
                                        return <tbody key={index}>
                                        <tr>
                                            <td className="flt">{startTime}</td>
                                            <td className="frt">{tool.tansformMoney(item.amount)}</td>
                                            <td className="frt pl130">收益</td>
                                        </tr>
                                        </tbody>
                                    })
                                }
                            </table> : ''
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
    }
})