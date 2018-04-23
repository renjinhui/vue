const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const CurrentDate = new Date();
const calendarMonthActions = require('../../../reducers/myaccount/calendar/calendarMonthActions');
const calendarDayActions = require('../../../reducers/myaccount/calendar/calendarDayActions');
const sysTimeActions = require('../../../reducers/sysTime/sysTimeActions');
const Tool = require('../../../common/tool').tansformMoney;

const Calender = React.createClass({
  getInitialState(){
    return{
      isShow:false,
      amount:'',
      totalDayNum:42,
      weeks:[7,1,2,3,4,5,6],
      current_date:CurrentDate,
      current_year:CurrentDate.getFullYear(),
      current_month:CurrentDate.getMonth(),
      current_day:CurrentDate.getDate(),
      dataNumArray:[],
      listIndex:0,
      isFirstTime:true,
      nextDisable:false,
      prevDisable:false
    }
  },
  componentDidMount(){

  },
  //避免指向同一地址
  clone (date){
    return new Date(date.getTime());
  },

  //获取这个月第一天是星期几
  getWeekDay(time){
    let date = this.clone(time);
    date.setDate(1);
    return date.getDay();
  },

  //获取上个月最后一天
  getLastMonthDate(time){
    let date = this.clone(time);
    date.setDate(0);
    return date.getDate();
  },

  //获取当前月份天数
  getMonthDate(time){
    let date = this.clone(time);
    date.setDate(1);
    date.setMonth(date.getMonth()+1);
    date.setDate(0);
    return date.getDate();
  },

  //获取今天是几号
  getNowDay(time){
    let date = this.clone(time);
    return date.getDate();
  },

  getSysTime(){
    if(this.props.sysTime.data && this.props.sysTime.data!==''){
      let arr = [];
      // arr = this.props.sysTime.data.split(/[-\s:]/);
      // return new Date(arr[0],arr[1]-1,arr[2],arr[3],arr[4],arr[5]);
      return new Date(this.props.sysTime.data);

    }else{
      return new Date();
    }
  },
  //将当前时间转换成相应格式时间
  //time 初始时间  date 当前  day 当前天 month 0当月 1下月 -1 上月
  transformTime(time,day,month){
    let prevDate = this.clone(time);
    let date = this.clone(time);
    prevDate.setMonth(date.getMonth()+month,1);
    // prevDate.setMonth(date.getMonth()+month);
    prevDate.setDate(day);
    prevDate.setHours(0,0,0,0);
    return prevDate.getTime();
  },

  getDateArray(time){
    this.setState( (state) => {
      state.dataNumArray = [];
      return state;
    });
    let date = this.clone(time);
    let dayNum = this.getMonthDate(date);
    let weekday = this.getWeekDay(date);
    let current_Month = date.getMonth();
    let lastMonthDate = this.getLastMonthDate(date);
    let Today = this.state.current_day;

    let length = dayNum + weekday - 1;
    let weekNum =  weekday;
    let lastWeek = weekday;
    let lastMonth  = lastMonthDate - weekday +2;
    let tempArr = [];

    let param = {
      start:null,
      end:null
    };

    //获取前一个月的补天数
    if(weekday > 1 && weekday < 7 ){


      for(let i=0;i<weekday-1;i++){
        let prevTime = this.transformTime(time,lastMonth,-1);
        let obj = {
          key:prevTime,//时间戳 月日年零点
          data:lastMonth ,//上个月 日
          week:this.state.weeks[lastWeek-1],
          MonthType:0 //0 上个月 1当前月 2下个月
        };
        tempArr.push(obj);
        this.setState( (state) => {
          state.dataNumArray = state.dataNumArray.concat([obj]);
          return state;
        });
        lastWeek--;
        lastMonth++;
      }

    }
    if(weekday == 0){
      let lastMonth = lastMonthDate - 6 +1;
      let lastWeek = 2;
      for(let i=0;i<6;i++){
        let prevTime = this.transformTime(time,lastMonth,-1);
        let obj = {
          key:prevTime,
          data:lastMonth ,
          week:this.state.weeks[lastWeek-1],
          MonthType:0 //0 上个月 1当前月 2下个月
        };
        tempArr.push(obj);
        this.setState( (state) => {
          state.dataNumArray = state.dataNumArray.concat([obj]);
          return state;
        });
        lastWeek++;
        lastMonth++;
      }
    }

    //获取当前月份的天数
    for(let i=0;i<dayNum;i++){
      let day = i+1;
      // let dayType ;
      //获取时间戳  为和后台数据对比
      let prevTime=this.transformTime(time,day,0);
      // if(day == Today){
      //   dayType = true
      // }

      let obj = {
        key:prevTime,
        data:day,
        week:this.state.weeks[weekNum],
        MonthType:1,
        dayType:false
      };
      tempArr.push(obj);
      this.setState( (state) => {
        state.dataNumArray = state.dataNumArray.concat([obj]);
        return state;
      });
      if(weekNum >= 6){
        weekNum =0;
      }else{
        weekNum++
      }
    }

    //获取下一个月分的补天数
    if(length < this.state.totalDayNum){
      let nextDayNum = this.state.totalDayNum - length;
      for(let i=0;i<nextDayNum;i++){
        let prevTime=this.transformTime(time,i+1,1);
        let obj ={
          key:prevTime,
          data:i+1,
          week:this.state.weeks[weekNum],
          MonthType:2
        };
        tempArr.push(obj);
        this.setState( (state) => {
          state.dataNumArray = state.dataNumArray.concat([obj]);
          return state;
        });
        if(weekNum >= 6){
          weekNum =0;
        }else{
          weekNum++
        }
      }
    }

    //获取日历的数据
    param.start = tempArr[0].key;param.end=tempArr[tempArr.length-1].key;
    this.props.getCalendarDayData(param);

  },

  //选择下个月
  setNextMonth(){
    this.state.isFirstTime = false;
    let index = this.state.listIndex + 1;
    if(this.props.calendarMonthData.data.length){
      if(index >this.props.calendarMonthData.data.length-1){
        this.setState({nextDisable:true});
        return;
      }else if(index == this.props.calendarMonthData.data.length-1){
        this.setState({nextDisable:true});
      }else{
        this.setState({prevDisable:false});
        this.setState({nextDisable:false});
      }
    }

    // let currentDate = new Date();
    let currentDate = this.getSysTime();
    this.state.current_month++;

    this.setState({listIndex:++this.state.listIndex});
    currentDate.setMonth(this.state.current_month,1);
    this.getDateArray(currentDate);
  },
  //选择上个月()
  setPrevMonth(param){
    this.state.isFirstTime = false;
    // let currentDate = new Date();
    let currentDate = this.getSysTime();
    let index = this.state.listIndex - 1;
    if(index < 0){
      this.setState({prevDisable:true});
      return;
    }else if(index == 0){
      this.setState({prevDisable:true});
    }else{
      this.setState({prevDisable:false});
      this.setState({nextDisable:false});
    }

    this.state.current_month--;
    this.setState({listIndex:--this.state.listIndex});
    currentDate.setMonth(this.state.current_month,1);
    this.getDateArray(currentDate);
  },
  selectMonth(item,index){
    if(this.props.calendarMonthData.data.length){
      if(index ==this.props.calendarMonthData.data.length-1){
        this.setState({nextDisable:true})
      }else{
        this.setState({nextDisable:false})
      }
    }
    if(index ==0){
      this.setState({prevDisable:true});
    }else{
      this.setState({prevDisable:false});
    }
    this.state.isFirstTime = false;
    this.setState({isShow:false});
    this.setState({listIndex:index});
    let currentDate = new Date(item.monthStr);
    let currentMonth = currentDate.getMonth();
    this.state.current_month = currentMonth;
    currentDate.setMonth(this.state.current_month,1);
    this.getDateArray(currentDate);
  },

  showList(){
    this.setState({isShow:true});
  },
  hideList(){
    this.setState({isShow:false});
  },
  componentWillMount (){
    let _this = this;
    this.props.getSysTime(function(){
      _this.state.current_date = _this.getSysTime();
      _this.state.current_year = _this.getSysTime().getFullYear();
      _this.state.current_month = _this.getSysTime().getMonth();
      _this.state.current_day = _this.getSysTime().getDate();
      _this.getDateArray(_this.state.current_date);
      _this.props.getCalendarMonthData();
    });


  },
  render() {
    let _this = this;
    let listMap = '';
    let calendar = '';
    if(this.props.calendarMonthData.isFetching == 1){
      listMap = this.props.calendarMonthData.data.map(function(item,index){

        return (
          <span onClick={() => this.selectMonth(item,index)} key={index}>
            <span className="font-arial lt">{item.monthStr}</span>
            <span className="font-arial rt">{Tool(item.amount,2)}</span>
        </span>
        )
      }.bind(this))
    }

    let mainTop = '';
    if(this.props.calendarMonthData.isFetching == 1 && this.props.calendarMonthData.data){
      if(this.state.isFirstTime){
        // let month = new Date().getMonth()+1;
        let month = this.getSysTime().getMonth()+1;
        let currentTime = this.state.current_year + '-'+( month< 10 ? ('0'+month) : month);
        for (let i = 0;i<this.props.calendarMonthData.data.length;i++){
          if(this.props.calendarMonthData.data[i].monthStr == currentTime){
            this.state.listIndex = i;
          }
        }
        if(this.props.calendarMonthData.data.length){
          if(this.state.listIndex ==this.props.calendarMonthData.data.length-1){
            this.state.nextDisable = true;
            // this.setState({nextDisable:true})
          }
        }
        if(this.state.listIndex ==0){
          this.state.prevDisable = true;
          // this.setState({prevDisable:true})
        }

      }

      let money = '';
      if(this.props.calendarMonthData.data[this.state.listIndex].amount){
        money = Tool(this.props.calendarMonthData.data[this.state.listIndex].amount,2);
      }
      mainTop = <div className="sum-title">
        <span className="predict-date lt">{this.props.calendarMonthData.data[this.state.listIndex].monthStr}待收回款</span>
        <p className="lt">{money}</p>
        <span className="drop-down-big huli-common-icons lt"></span>
      </div>
    }

    if(this.props.calendarDayData.isFetching == 1){
      for(let i in this.props.calendarDayData.data){
        this.state.dataNumArray.map(function(item){
          if(_this.props.calendarDayData.data[i].realDate == item.key){
            item.value = _this.props.calendarDayData.data[i].amount;
            item.jjs = _this.props.calendarDayData.data[i].jjsAmount ? _this.props.calendarDayData.data[i].jjsAmount  : 0;
            item.p2p = _this.props.calendarDayData.data[i].p2pAmount ? _this.props.calendarDayData.data[i].p2pAmount : 0;
          }
        });
      }
    }

    calendar = this.state.dataNumArray.map(function(item,index){

      let today = '';
      let isThisMonth ='';
      let isWeekEnd = '';
      let payment = '';
      let accountDetail = '';
      let timeKey = null;
      let cursor = '';
      let notCurrentMonthWeekEnd = '';

      // let prevDate = new Date();
      let prevDate = _this.getSysTime();
      let event = null;
      prevDate.setHours(0,0,0,0);
      timeKey = prevDate.getTime();
      if(item.key == timeKey){
        item.dayType = true;
      }

      if(item.dayType){
        today = 'today';
      }else if(item.value){
        today = 'payment-status';
        // accountDetail = <div className="version-detail-hover calendar-detail-hover">
        //   <div className="arrow useful">
        //     <div className="arrow-up"></div>
        //     <div className="arrow-up-in"></div>
        //   </div>
        //   <div className="version-useful-account cf">
        //     <em className="lt">理财</em>
        //     <i className="rt">{item.jjs ? Tool(item.jjs,2) : '0.00'}</i>
        //   </div>
        //   <div className="version-useful-account cf">
        //     <em className="lt">网贷</em>
        //     <i className="rt">{item.p2p ? Tool(item.p2p,2) : '0.00'}</i>
        //   </div>
        // </div>
      }
      if(item.MonthType !==1){
        if(item.week == 6 || item.week == 7){
          isThisMonth = 'daily';
        }else{
          isThisMonth = 'daily gray-light';
        }

      }else{
        isThisMonth = 'daily';
      }

      if(item.week == 6 || item.week == 7){
        if(item.MonthType !==1){
          notCurrentMonthWeekEnd = 'weak-status';
        }else{
          notCurrentMonthWeekEnd = '';
          isWeekEnd = ' global-orange';
        }


      }


      if(item.MonthType == 0){
        event = _this.setPrevMonth;
        cursor = 'pointer';
      }else if(item.MonthType == 1){
        event = null;
        cursor = 'default';
      }else if(item.MonthType == 2){
        event = _this.setNextMonth;
        cursor = 'pointer';
      }
      return (
        <span key={index} onClick={event} style={{cursor:cursor}}>
          <span className={today + ' '+notCurrentMonthWeekEnd} >
            <em className={isThisMonth + isWeekEnd}>{item.dayType ? '今天' : item.data}</em>
            <a href="javascript:" className="sums" data-jjs={item.jjs ? Tool(item.jjs,2) : '0.00'} data-p2p={item.p2p ? Tool(item.p2p,2) : '0.00'}  data-time={item.key}>{item.value ? Tool(item.value,2) : ''}</a>
            {/*{accountDetail}*/}
          </span>
        </span>
      )
    });

    return (
      <div className="calendar-contain">
        <div className="calendar-title cf">
          <p className="title lt">待收回款日历</p>
          <em className="unit lt">单位：元</em>
          <div className="sum-detail lt" onMouseEnter={this.showList} onMouseLeave={this.hideList}>
            {mainTop}
            <div className="sum-list" style={{display:this.state.isShow ?'block':'none'}}>
              {listMap}
            </div>
          </div>
          <div className="paging-boxs rt">
            <ul>
              <li className={this.state.prevDisable ? "rc-pagination-prev rc-pagination-disabled" : "rc-pagination-prev"} onClick={this.setPrevMonth}><a href="javascript:"></a></li>
              <li className={this.state.nextDisable ? "rc-pagination-next rc-pagination-disabled" : "rc-pagination-next"} onClick={this.setNextMonth}><a href="javascript:"></a></li>
            </ul>
          </div>
        </div>

        <div className="survey-calendar">
          <div className="title cf">
            <span><em>周一</em></span>
            <span><em>周二</em></span>
            <span><em>周三</em></span>
            <span><em>周四</em></span>
            <span><em>周五</em></span>
            <span><em>周六</em></span>
            <span><em>周日</em></span>
          </div>
          <div className="calendar-box">
            <div className="days cf">
              {calendar}
            </div>


          </div>
        </div>
      </div>
    )
  }
});




const mapStateToProps = (state, ownProps) => {
  return{
    calendarMonthData:state.calendarMonth,
    calendarDayData:state.calendarDay,
    sysTime:state.sysTimeData
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCalendarMonthData:(fn)=>{
      dispatch(calendarMonthActions.calendarMonthPosts(fn))
    },
    getCalendarDayData:(param)=>{
      dispatch(calendarDayActions.calendarDayPosts(param))
    },
    getSysTime:(fn) => {
      dispatch(sysTimeActions.sysTimePosts(fn));
    }
  }
};

export const CapitalCalender = connect(
  mapStateToProps,mapDispatchToProps
)(Calender);