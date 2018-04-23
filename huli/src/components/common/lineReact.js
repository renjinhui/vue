let React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
let echarts = require('echarts/echarts');
let line = require('echarts/chart/line');
const chartAction = require('../../reducers/xjgChart/xjgChartActions');

export const xjgChartModule = React.createClass({
  getInitialState(){
    return{
      params:{
        type:'XJG'
      },
      chartStyle:{
        width:this.props.width|| '350px',
        height:this.props.height || '250px'
      }
    }
  },
  componentDidMount:function() {
    let _this = this;
    this.props.getChartData(this.state.params,function(){
      let myChart = echarts.init(_this.refs.linePeact);
      if(_this.props.chartData.isFetching == 1 ){
        let options = _this.setPieOption(_this.props.chartData.data);
        myChart.setOption(options);
      }

    });

  },
  setPieOption:function (data) {
    let times=[],_rates=[];
    for(let i in data){
      let pre = Number(data[i]/100) ? Number(data[i]/100).toFixed(2) : 0;
      // option.xAxis[0].data.push(i);
      times.push({"value":i.split(" ")[0].replace(/^\d{4}-*/,""),"testStyle":{color:'#BFBFBF'}});
      _rates.push(pre);
    }
    let option = {
      title:{
        show: false
      },
      tooltip : {
        trigger: 'axis',
        formatter: function(a){
          return (a[0].name+' : '+a[0].value+'%');
        }
      },

      toolbox: {
        show : false,
        backgroundColor: 'rgba(0,0,0,0)'
      },

      grid:{
        x:50,
        y:20,
        x2:20,
        y2:30,
        containLabel: true
      },
      calculable : false,
      // xAxis : [
      //   {
      //     type : 'category',
      //     boundaryGap : false,
      //     splitNumber:4,
      //     splitLine:{
      //       show:false
      //     },
      //     data : [],
      //     axisLine:{lineStyle:{color:'#BFBFBF',width:0}},
      //     axisLabel:{margin:20,interval:0,textStyle:{baseline:'bottom'}},
      //     axisTick:{show:false}
      //   }
      // ],
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          splitLine:{show: false},
          data : times,
          axisLine:{lineStyle:{color:'#BFBFBF',width:0}},
          axisLabel:{formatter:function(value){
            let _index;
            for(let i=0 ;i<times.length; i++){
              if(times[i].value == value){
                _index=i;

                break
              }
            }
            if((_index != undefined && (_index+2)%8==0)||_index==0){
              return value;
            }

          },margin:10,interval:0},
          axisTick:{show:false}
        }
      ],
      yAxis : [
        {
          type : 'value',
          scale: true,
          min:0,
          precision: 2,
          min:0.00,
          boundaryGap: [0.01, 0.01],
          // splitArea: { show: true },
          axisLabel:{formatter:function(value){return value.toFixed(2)+"%"},textStyle:{baseline:'middle'}},
          axisLine:{lineStyle:{color:'#BFBFBF',width:0}},
          axisTick:{show:false},
          splitLine:{lineStyle:{color:'#ECECEC'}}
        }

      ],
      series : [
        {
          name:'',
          type:'line',
          smooth:false,
          symbol:'none',
          showAllSymbol:true,
          label:{normal:{show:false}},
          itemStyle: {normal: {areaStyle: {type: 'default'}}},
          areaStyle: {normal: {color:'rgba(255,123,26,.1)'}},
          lineStyle:{normal:{color:'#FF7B1A',width:4}},
          data:_rates
        }
      ]
    };


    return option;
  },
  render:function(){
    return(
      <div className="line-chart">
            <a className="line-cart-bg"></a>
            <a className="line-cart-white"></a>

        <div className="line-chart-view" ref="linePeact" style={{width:this.state.chartStyle.width,height:this.state.chartStyle.height}}></div>

      </div>
    )
  }
});

// module.exports = {
//   xjgChart
// };

const mapStateToProps = (state, ownProps) => {
  return {
    chartData:state.xjgChartData
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getChartData:function(params,fn){
      dispatch(chartAction.xjgChartDataPosts(params,fn));
    }
  }
};




export const xjgChart = connect(
    mapStateToProps, mapDispatchToProps
)(xjgChartModule);