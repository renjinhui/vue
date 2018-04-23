const React = require('react');
const cs = require('classnames');
const _ =  require('lodash');
const Pagination = require('rc-pagination');
const { ToolTip } = require('common/tooltip.component.js');

const stateArr = ['处理中','充值成功','充值失败','充值失败','已超时','充值失败'];


export const WDHistory = React.createClass({
    getInitialState(){
        return {
            startTime:'不限',
            endTime:'不限',
            list:[],
            loading:false,
            userType:false,
            page:{
                total:1,
                current:1,
                pageSize:10
            },
            chargeStatus:10,
            rechargeId:''
        }
    },
    render(){
        const {page,chargeStatus} = this.state;
        return (
            <div id="his-wd-list" style={{'padding':'0 30px'}}>
                <div className="curact-screening margin-md-vertical">
                    <span className="curact-screening-item"  style={{'zoom':1}} >
                        <span className="name">类型筛选</span>
                        <span className="queue">
                           <a className={cs({'current':chargeStatus==10})} onClick={()=>{this.changeSearchState(10)}}>全部</a>
                            <a className={cs({'current':chargeStatus==1})} onClick={()=>{this.changeSearchState(1)}}>充值成功</a>
                            <a className={cs({'current':chargeStatus==0})} onClick={()=>{this.changeSearchState(0)}}>处理中</a>
                            <a className={cs({'current':chargeStatus==2})} onClick={()=>{this.changeSearchState(2)}}>已失败</a>
                         </span>
                    </span>
                    <span className="curact-screening-item md-tp14"  style={{'zoom':1}}>
                        <span className="name">时间筛选</span>
                        <span className="time type-data">
                           <input type="text" data-target="start" value={this.state.startTime} className="time-start" id="beginTime1" readOnly />
                            <label>-</label>
                            <input type="text" data-target="last" value={this.state.endTime}  className="time-start" id="endTime1" readOnly />
                            <a className="choose-time"  onClick={()=>this.handleDateChange(7)}>最近7天</a>
                            <a className="choose-time" onClick={()=>this.handleDateChange(30)}>最近30天</a>
                            <a className="choose-time" onClick={()=>this.handleDateChange(90)}>最近90天</a>
                            <a className="choose-time" onClick={()=>this.handleDateChange(365)}>最近一年</a>
                            <a className="choose-time" onClick={()=>this.handleDateChange()}>全部</a>
                        </span>
                    </span>
                </div>
                <div className="acgral-th margin-md-vertical head-normal">
                    <span className="grid-wh-160">充值时间</span>
                    <span className="grid-wh-130 text-right">充值金额(元)</span>
                    <span className="grid-wh-310" >充值单号</span>
                    <span className="grid-wh-90 text-left" >状态</span>
                    <span className="grid-wh-200" >备注</span>
                </div>
                <div id="charge-detail-main">
                    {
                        !this.state.loading&&this.state.list.map( (item,index) => {
                            const obj = item
                            {/*const len = (obj.chargeTypeStr+ ' - '+ obj.chargeBank).length;*/}
                            const bankNote = `${obj.chargeTypeStr || ''}${obj.chargeBank ? ('-' + obj.chargeBank): ''}${obj.cardNo ? ('-'+obj.cardNo)  : ''}`;
                            return <div key={index} className="acgral-xs" data-opid={obj.chargeOpId} >
                                <span className='grid-wh-160 chargetimestr'>
                                {obj.chargeTimeStr}
                                    {
                                       obj.chargeType==3||obj.chargeType==4||obj.chargeType==7?<ToolTip data-text="通过手机充值" extClass="ver-ico-url acgral-mobile" hoverClass="ver-ico-url mobile-hover"/>
                                        : obj.chargeType==6?<ToolTip data-text="通过月薪宝功能自动充值" extClass="ico month-style" hoverClass="ico month-style" />
                                            :null

                                    }
                                    </span>
                                <span className='grid-wh-130 text-right'>{obj.amountStr}</span>
                                <span className="grid-wh-310 chargenumber">{obj.chargeNumber}</span>
                                <span className={cs({
                                    'text-left transfer':true,
                                    'grid-wh-90':true,
                                    'bankBrown':obj.chargeStatus==0,
                                    'bankGreen':obj.chargeStatus==1,
                                    'bankGrey':obj.chargeStatus!=0&&obj.chargeStatus!=1
                                })}>{stateArr[obj.chargeStatus]}</span>
                                {
                                  bankNote.length >=19
                                  ?
                                  <span className='grid-wh-200 depositremarks twoline'>{bankNote}</span>
                                  :
                                  <span className='grid-wh-200 depositremarks'>{bankNote}</span>
                                }
                            </div>
                        })
                    }
                    {
                        this.state.loading?
                            <div id='ele-loading' style={{'height':'240px','textAlign':'center','lineHeight':'240px'}}>
                                <img src='https://static.souyidai.com/www/images/loading.gif'/>
                                加载中……
                            </div>:null
                    }
                </div>
                {
                    !this.state.loading&&<div className="paging-boxs cf">
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
    componentDidMount(){
        $('#beginTime1,#endTime1').datepicker({
            format: 'yyyy-mm-dd',
            weekStart: 1,
            autoclose: true,
            todayBtn: 'linked',
            language: 'zh-CN'
        })
        $('#beginTime1').on('changeDate',(ev) => {
            if ($('#beginTime1').val() > $('#endTime1').val() && $('#endTime1').val() != '') {
                alert("生效时间 不能晚于 失效时间 ！");
                $("#beginTime1").val($("#endTime1").val());
            }else {
                this.setState({startTime: $("#beginTime1").val()},()=>{
                    this.getLCData()
                })
            }

        })
        $('#endTime1').on('changeDate',(ev) => {
            if ($('#beginTime1').val()!="不限"&&$('#beginTime1').val() > $('#endTime1').val() && $('#endTime1').val() != '') {
                alert("失效时间 不能早于 生效时间 ！");
                $("#endTime1").val($("#beginTime1").val());
            }else {
                this.setState({endTime: $("#endTime1").val()} ,() =>{
                    this.getLCData()
                })
            }
        })
        const self = this;
        const userType = $('.aside-right').attr('data-usertype');
        this.setState({userType:userType},() => {
            this.getLCData();
        });
    },
    getLCData(){
        const self = this;
        const { page:{ current, pageSize},startTime, endTime,chargeStatus} = this.state;
        $.get({
            url:'/myaccount/capital/deposit',
            data:{
                startTime:startTime=='不限'?'':startTime,
                endTime:endTime=='不限'?'':endTime,
                pageNo:current,
                pageSize:pageSize,
                chargeStatus:chargeStatus,
                isAjax:true,
                t:Math.random()
            },
            dataType:'json',
            beforeSend : function(xhr) {
                self.setState({loading:true})
            },
            success:function (data) {
                if(data.errorCode == 1 && data.errorMessage == "noLogin"){
                    window.location.href = "https://passport.huli.com?backurl=" + document.URL;
                    return;
                }
                const total = data.data.totalRecords;
                self.setState({
                    list:data.data.list,
                    loading:false,
                    page:_.assign({},self.state.page,{total}),
                });
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
            this.getLCData()
        })
    },
    asyncData(fn){
        fn&&fn()
        return new Promise(res => {
            res()
        })
    },
    changeSearchState(n){
        this.setState({chargeStatus:n},()=>{
            this.getLCData()
        })
    },
    getLastDay(day){
        let newDate = new Date();
        if(day){
            newDate = newDate.valueOf();
            newDate = newDate - day*24*60*60*1000;
        }else{
            newDate = newDate.getFullYear() - 1;
        }
        newDate = new Date(newDate);
        var m = this.toDou(newDate.getMonth() + 1);
        var d = this.toDou(newDate.getDate());
        return newDate.getFullYear() + "-" + m + "-" + d;
    },
    toDou(d){
        return d.toString().length == 1 ? ('0' + d) : d ;
    },
    handleDateChange(day=0){
        const { startTime, endTime, page:{ total } } = this.state;
        let nET = new Date().getFullYear() + "-" + this.toDou(new Date().getMonth()+1) + "-" + this.toDou(new Date().getDate());
        let nST = this.getLastDay(day);
        this.setState({
            startTime:nST,
            endTime:nET
        })
        this.asyncData(()=>{
            this.setState({
                startTime:nST,
                endTime:nET,
                page:{total, current:1},
                loading:true
            })
        }).then(() => {
            this.getLCData();
        })
    },
    openLoader(id){
        this.setState({rechargeId:id},()=>{
            $('#uploading').show();
        })
    }
})