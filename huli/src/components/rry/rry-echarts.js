const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');
const tool = require('./../../common/tool');

class RryEchart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list :[],
            type:1,
            lenLimited:7,
            myChart:{},
        }
    }

    componentWillMount(){

    }

    componentDidMount(){
        const isIE8 = tool.isIE8();
        if(isIE8)return;
        const myChart  =  echarts.init(this.refs.chartBox);
        this.setState({myChart:myChart},()=>{
            this.buildChart()
        });
    }

    componentWillReceiveProps(nextProps){
        const {rateLists} = nextProps;
        this.setState({list:rateLists},()=>{
            rateLists.length!=0&&this.buildChart()
        });
    }

    render(){
        const {type,lenLimited} = this.state;
        const isIE8 = tool.isIE8();
        return (
            <div className="hq-charts">
                <div className="charts-tabs">
                    <div className="tabs-lt">
                            <span className={type == 1 ? 'active' : ''} onClick={() => {
                                this.changeType(1)
                            }}>每万份收益(元)</span>
                        <span className={type == 2 ? 'active' : ''} onClick={() => {
                            this.changeType(2)
                        }}>七日年化收益(%)</span>
                    </div>
                    <div className="tabs-rt">
                        <ul>
                            <li className={lenLimited == 7 ? 'chc active' : 'chc'} onClick={() => {
                                this.touchChart(7)
                            }}>7天
                            </li>
                            <li className="gray-line"></li>
                            <li className={lenLimited == 30 ? 'chc active' : 'chc'} onClick={() => {
                                this.touchChart(30)
                            }}>1个月
                            </li>
                            <li className="gray-line"></li>
                            <li className={lenLimited == 60 ? 'chc active' : 'chc'} onClick={() => {
                                this.touchChart(60)
                            }}>2个月
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    isIE8&&<div className="inpress">
                        <img className="opapic" src="https://static.huli.com/images/hq-gold/opapic.png" alt=""/>
                        <p className="warnInfo">请升级Internet Explorer至9版本以上</p>
                    </div>
                }
                {
                    !isIE8&&< div className="chartBox" ref="chartBox" style={{width: '480px', height: '230px', float: 'left'}}>

                    </div>
                }

            </div>
        )
    }

    buildChart(){
        //效果处理
        const isIE8 = tool.isIE8();
        if(isIE8)return;
        const {myChart} = this.state;
        myChart.clear();
        let options = this.setOption();
        myChart.setOption(options);
    }
    touchChart(n){
        const {lenLimited} = this.state;
        if(lenLimited==n)return;
        this.setState({lenLimited:n},()=>{
            this.buildChart()
        })
    }

    changeType(n){
        const {type} = this.state;
        if(type==n)return;
        this.setState({type:n},()=>{
            this.buildChart()
        });
    }

    setOption(){
        let {type,lenLimited} = this.state;
        let times=[],rates=[],perIncome=[],minRete=3,minPerIncome=1;
        const {list} = this.state;
        const len  =list.length;
        lenLimited = len<lenLimited?len:lenLimited;
        const _list = list.slice(len-lenLimited,len);
        const partNum = parseInt(lenLimited/11) + 1;
        for(let i in _list){
            const _time = tool.format(_list[i].calDate,'MM-dd');
            times.push([_time,i]);
            const minNum = parseInt(_list[i].perRate);
            minRete = minRete<minNum?minRete:minNum;
            rates.push(_list[i].perRate);
            const perIncomeNum = parseInt(_list[i].perIncome);
            minPerIncome = minPerIncome<perIncomeNum?minPerIncome:perIncomeNum;
            perIncome.push(_list[i].perIncome);
        }

        let areaStyleString = {
            color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0.1,
                color: 'rgba(255, 123, 26, 0.8)'
            }, {
                offset: 0.8,
                color: 'rgba(255, 123, 26, 0.1)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
        }


        let option = {
            title:{
                show: false
            },
            tooltip : {
                trigger: 'axis',
                axisPointer:{
                    type:'cross',
                    crossStyle:{
                        color:'rgba(0,0,0,.2)',
                        type:'solid',
                    },
                    label:{
                        show:false,
                        backgroundColor:'rgba(255,255,255,0)',
                        borderWidth:0,
                        textStyle:{
                            color:'rgba(255,255,255,0)'
                        }
                    }
                },
                backgroundColor:'rgba(0,0,0,.7)',
                formatter: function(a){
                    const _time =  a[0].name.split(',')[0];
                    return type==1?('时间：'+ _time + '<br/>' +' 每万份收益： '+a[0].value+'元')
                        :('时间：'+ _time + '<br/>' +' 七日年化收益： '+a[0].value+'%');
                }
            },
            toolbox: {
                show : false,
                backgroundColor: 'rgba(0,0,0,0)'
            },

            grid:{
                x:0,
                y:20,
                x2:20,
                y2:30,
                containLabel: true,
                borderWidth:0
            },
            calculable : false,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    splitLine:{show: false},
                    data : times,
                    axisLine:{lineStyle:{color:'#BFBFBF',width:0}},
                    axisLabel:{formatter:function(param){
                        if(typeof param =='string'){
                            param = param.split(',');
                        }
                        return param[0];
                    },margin:10},
                    axisTick:{show:false}
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    scale: true,
                    precision: 2,
                    min:type==1?minPerIncome:minRete,
                    boundaryGap: [0.01, 0.01],
                    // splitArea: { show: true },
                    axisLabel:{formatter:function(value){return parseFloat(value).toFixed(2)+(type==1?'':'%')},textStyle:{baseline:'middle'}},
                    axisLine:{lineStyle:{color:'#BFBFBF',width:0}},
                    axisTick:{show:false},
                    splitLine:{lineStyle:{color:'#F4F6F9'}}
                }

            ],
            series : len==0?[]:[
                {
                    name:'',
                    type:'line',
                    smooth:false,
                    symbol: 'emptyCircle',
                    showSymbol:false,
                    showAllSymbol:true,
                    label:{normal:{show:false}},
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    areaStyle: {
                        normal:areaStyleString,
                    },
                    lineStyle:{normal:{color:'#FF7B1A',width:1}},
                    data:type==1?perIncome:rates
                }
            ]
        }
        return option;
    }
}



const mapStateRryChartsProps = (state,ownProps) => {
    const {userBase : {rryRateLists:{data}}} = state;
    return{
        rateLists:data
    }
}

const mapDispatchRryChartsProps = (dispatch,ownProps) => {
    return {
        dispatch
    }
}

export const RryCharts = connect(
    mapStateRryChartsProps,mapDispatchRryChartsProps
)(RryEchart);

