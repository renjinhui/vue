const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const actions = require('../../reducers/monthbill/monthbillActions');



export const monthBillHead = React.createClass({
  componentDidMount:function(){
    // if(!this.props.state.userLogin.isLogin){
    //   window.location = 'https://passport.huli.com/?backurl=https://www.huli.com/hl/#/monthbill';
    //   return;
    // }
    this.props.dispatch(actions.getMonthBillHeadList(''))
    
  },
  getInitialState(){
    return{
      selectM: '',
      selectMGet: '',
      selectMfrom: '',
      selectedLi: 0,
      isFirst: true,
      showList: false,
      interestAmount: 0,
      billprofit:''
    }
  },
  onSelectM(y,m,allD,i,e){
    m = m<10 ? ('0'+m) : m;
    this.setState({
      isFirst:false,
      selectMGet: m+'月收益(元)',
      selectM : y+'年'+m+'月账单',
      selectMfrom : y+'-'+m+'-01~'+y+'-'+m+'-'+allD,
      selectedLi : i,
      showList : false
    })

    // this.state.selectM = y+'年'+m+'月账单';
    // this.state.selectMfrom = y+'-'+m+'-01~'+y+'-'+m+'-'+allD;
    // this.state.selectedLi = i;

    // 根据月份请求数据
    let params={
      startTime:y+'-'+m+'-01',
      endTime:y+'-'+m+'-'+allD
    }
    this.props.dispatch(actions.monthBillPost(params));//改变stone里的请求参数
    this.props.dispatch(actions.getMonthBillData(params))//发送该月的数据请求
  },
  showList(){
    if(this.state.showList){
      this.setState({
        showList : false
      })
    }else{
      this.setState({
        showList : true
      })
    }
    // this.state.showList ? (this.state.showList = false) : (this.state.showList = true);
    // console.log(this.state)
  },
  hideList(e){
    let tar = e.target || e.srcElement;
    if(!(/monthly-icon1/.test(tar.getAttribute('class')))){
      this.setState({
          showList : false
        })
    }
  },
  
  render:function() {
    // console.log(this.props.state.monthBillHeadList);
    let list = '';
    if(this.props.state.monthBillHeadList.isFetching == 1 && this.props.state.monthBillData.isFetching == 1){
      let ary = this.props.state.monthBillHeadList.data.data;
      this.state.interestAmount = this.props.state.monthBillData.data.data.interestAmount;
      let getM =this.state.interestAmount ? parseFloat(this.state.interestAmount.replace(/,/g,'')) :'';
      let n = getM;
      if(n<0){
        this.state.billprofit = window.codes ? window.codes.bill.bill_profit_1 : '';
      }else if(n == 0){
        this.state.billprofit = window.codes ? window.codes.bill.bill_profit_2 : '';
      }else if(n > 0 && n < 50){
        this.state.billprofit = window.codes ? window.codes.bill.bill_profit_3 : '';
      }else if(n >= 50 && n<150){
        this.state.billprofit = window.codes ? window.codes.bill.bill_profit_4 : '';
      }else if(n >= 150 && n<500){
        this.state.billprofit = window.codes ? window.codes.bill.bill_profit_5 : '';
      }else if(n >= 500 && n<2000){
        this.state.billprofit = window.codes ? window.codes.bill.bill_profit_6 : '';
      }else if(n >= 2000 && n<4000){
        this.state.billprofit = window.codes ? window.codes.bill.bill_profit_7 : '';
      }else if(n >= 4000 && n<8000){
        this.state.billprofit = window.codes ? window.codes.bill.bill_profit_8 : '';
      }else if(n >= 8000 && n<20000){
        this.state.billprofit = window.codes ? window.codes.bill.bill_profit_9 : '';
      }else if(n >= 20000){
        this.state.billprofit = window.codes ? window.codes.bill.bill_profit_10 : '';
      }
      if(ary.length<1){

      }else{
        if(this.state.isFirst){//首次进来显示第一个数据
          let startY = new Date(ary[0]).getFullYear(),startM = new Date(ary[0]).getMonth()+1,startAllD=new Date(startY,startM,0).getDate();
          this.state.selectM = startY+'年'+startM+'月账单';
          this.state.selectMfrom = startY+'-'+startM+'-01~'+startY+'-'+startM+'-'+startAllD;
          this.state.selectMGet= startM+'月收益(元)';
        }
        
        list = ary.map(function(k,i){
          let y = new Date(k).getFullYear();
          let m = new Date(k).getMonth()+1;
          let allD = new Date(y,m,0).getDate();
          return (
              <li key={k} className = {i == this.state.selectedLi ? 'selectActive' : ''}  onClick={this.onSelectM.bind(this,y,m,allD,i)}>{y}年{m<10?'0'+m:m}月账单</li>
            )
        }.bind(this))  
        
        
      }

    }
    return (
      <div className="myacoount-billbox cf" onClick={this.hideList}>
          <div className="monthly-text">
              <div className="monthly-title">{this.state.selectM}</div>
              <p className="monthly-nav">{this.state.selectMfrom}</p>
              <span className={this.state.showList ? "monthly-icon1" : "monthly-icon1  rotae"} onClick={this.showList}></span>
          </div>
          <div className="monthlynav-box">
              <div className="monthlynav-title">{this.state.selectMGet}</div>
              <div className="monthlynav-num">{this.state.interestAmount}</div>
              <div className="monthlynav-text">{this.state.billprofit ? this.state.billprofit : ''}</div>
              <div className={this.state.showList ? "monthly-select" : "monthly-select hidden"}>
                  <ul>
                      {list}
                  </ul>
              </div>
          </div>
      </div>
    )
  }
});

const mapStateToProps = (state, ownProps) => {
  return{
    state
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const MonthBillHead = connect(
  mapStateToProps,mapDispatchToProps
)(monthBillHead);