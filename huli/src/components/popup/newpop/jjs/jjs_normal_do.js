const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const newActionsPopup = require('../../../../reducers/popup/newpop/newpopActions');
const detailsActions =require('../../../../reducers/details_jjs/detailsActions');
const actionsPopup = require('../../../../reducers/popup/popupActions');
const userBaseActions = require('../../../../reducers/userBase/userBaseActions');
const ToolPE = require('../../../../common/tool').tansformMoney;
const ToolTM = require('../../../../common/tool').transformTime;
const ToolTip = require('../../../common/tooltip.component').ToolTip;
const giveAry = require('../../../../common/giveHb').giveAry;

const ChooseFL = require('./chooseFL').chooseFL

const jjs_normal_do = React.createClass({
  getInitialState(){
    return{
      bid: window.location.hash.match(/bid=(\w+)&proType=([a-z]+)/)[1],
      proType: window.location.hash.match(/bid=(\w+)&proType=([a-z]+)/)[2] || 'jjs',
      money:this.props.popselfdata.howmuch/1000/100, //输入框的值
      focu:true,
      isError:false, //超过最大可投额提醒
      showErrMsg:'',//低于最低投标
      canBit: true, //防止连续点击
      canBuy:true,
      isAgree1:true,
      isChangeBuy:false,//是否需要扫尾,或者调额
      allCanBuy:0,//该标剩余可投（展示用）
      allCanBuyNum:0,//该标剩余可投(计算用)
      isAgree2:true,
      showHB:false, // 展示福利框
      showErr:false, // 选择付款方式的余额不足
      chooseType : 'hz', //选择的付款方式
      timer: '',
      timer2:'',
      postNum:0,
      couponUserId: '',//所用福利ID
      isUseCoupon: false, // true 用红包 false 自己选择的红包
      recStr:'',//显示用的所用福利
      useFuliType:0,//所用福利类型 0 红包 1 加息券
      useFuliAmount:0,//所用福利额度
      userFuliItem:{},//所用福利对象
      pk:'' //轮询传的参数
    }
  },
  initM(needM){ //进入组件时先判断账户的钱够不够用
    let m = needM,maxM = this.props.popdata.currentBalanceHuli;
    if(m > maxM){
      this.setState({
        canBuy:false,
        showErr:true
      })
    }
  },
  componentDidMount:function(){
    if(this.isNeedAllBuy('init')){

    }else{
      this.inpt.focus();
      this.inpInit();
      this.couponFn(this.state.money*100000,'init');
    }
  },
  couponFn(n,type){
    // if(this.state.couponUserId == 'nouse')return;//不适用福利时 不在调用福利函数
    let fuliObj = this.props.state.userFuli.data.data || {coupons:[],raiseRates:[]};
    // let getFlObj = giveAry(Number(n)*1,fuliObj.coupons,fuliObj.raiseRates,this.state.userFuliItem);
    let getFlObj = giveAry(Number(n)*1,fuliObj.coupons,fuliObj.raiseRates);
    if(getFlObj.maxGet && (getFlObj.maxGet.type == 0 || getFlObj.maxGet.type)){ //刚进来有可用福利
      this.setState({
        couponUserId:getFlObj.maxGet.couponUserId,
        isUseCoupon:getFlObj.maxGet.type == 0 ? true : false,
        useFuliType:getFlObj.maxGet.type,
        useFuliAmount:getFlObj.maxGet.amount
      })
      if(getFlObj.maxGet.type == 1){
        this.calculatePopMoney(n,getFlObj.maxGet.amount);
        type == 'init' ? this.initM(n) : '';
      }else{
        this.calculatePopMoney(n);
        type == 'init' ? this.initM(n-getFlObj.maxGet.amount) : '';
      }
    }else{ // 刚进来无可用福利
      this.calculatePopMoney(n);
      this.setState({
        couponUserId:'',
        isUseCoupon:false,
        useFuliAmount:0
      })
      type == 'init' ? this.initM(n) : '';
    }

    let str = '';
    if(getFlObj.maxGet && getFlObj.maxGet.type == 0){
      str = getFlObj.maxGet.amount/100+'元红包';
    }else if(getFlObj.maxGet && getFlObj.maxGet.type == 1){
      str = getFlObj.maxGet.amount/100+'%加息券';
      // this.calculatePopMoney(this.state.money*100000)
    }else if(!getFlObj.maxGet && getFlObj.recommendF){
      str = getFlObj.recommendF.text;
    }else{
      str = '本项目暂无可用福利'
    }
    this.setState({
      recStr:str
    })
  },
  inpInit(){
    if(this.inpt.selectionStart != undefined){
      this.inpt.selectionStart = this.inpt.value.length;
      this.inpt.selectionEnd = this.inpt.value.length;
    }else{
      let range = this.inpt.createTextRange();
      range.moveStart("character",this.inpt.value.length);
    }
  },
  inpFocus(e){
    this.inpt.focus();
    this.inpInit();
    this.setState({
      focu:true,
    })
  },
  inpBlur(){
    // this.setState({
    //   focu:false,
    //   showErrMsg: '',
    // })
  },
  inpChange(e,hulM,xjgM,maxM){
    let tar = e.target || e.srcElement;
    let leaveM = hulM; //选择狐狸慧赚付款方式
    if(this.state.chooseType == 'xjg'){ //选择小金罐付款方式
      leaveM = xjgM
    }
    if(Number(tar.value)){
      tar.value = Number(tar.value);
      if(tar.value*100*1000 < this.props.popdata.investBidInfo.biddingLimitMin){ //小于最低投标
        // tar.value = this.state.money;
        this.setState({
          canBuy:false,
          isError: true,
          showErrMsg: '输入金额不能低于最低可投金额',
          money:parseInt(tar.value)||''
        })
        this.couponFn(tar.value*1000*100);
        // this.calculatePopMoney(tar.value*1000*100)
      }else if(tar.value*1000*100 > maxM){
        // tar.value = this.state.money;
        this.setState({
          isError: true,
          showErrMsg: '输入金额不能超过可投金额',
          money:parseInt(tar.value)||''
        })
        this.couponFn(tar.value*1000*100);
        // this.calculatePopMoney(tar.value*1000*100)
      }else{
        this.setState({
          isError: false,
          money:parseInt(tar.value)||''
        });
        this.couponFn(tar.value*1000*100);
        // this.calculatePopMoney(tar.value*1000*100)
      }

    }else if(Number(tar.value) == 0){
      this.setState({
        canBuy:false,
        isError: false,
        money:tar.value
      })
      this.couponFn(0);
      // this.calculatePopMoney(0)
    }else{
      this.setState({
        money:this.state.money
      })
    }
  },
  agreeMent(n){
    switch (n){
      case 1:
        if(this.state.isAgree1){
          this.setState({
            isAgree1:false
          })
        }else{
          this.setState({
            isAgree1:true
          })
        }
        break;
      default:
        if(this.state.isAgree2){
          this.setState({
            isAgree2:false
          })
        }else{
          this.setState({
            isAgree2:true
          })
        }
    };
  },
  calculatePopMoney(num,raiseR){
    let params = {};
    params.bidId = this.props.bigData.idStr;
    params.amount = num ;
    params.productType = 'jjs';
    params.investRate = this.props.bigData.asset.investAnnualRate;
    if(raiseR){
      params.raiseRate = raiseR;
      params.raiseRateType = 2;
    }else{
      params.raiseRate = this.props.bigData.asset.curUserRaiseInterest || (this.state.useFuliType == 1 ? this.state.useFuliAmount : 0);
      params.raiseRateType = this.props.bigData.asset.curUserRaiseInterest ? 1 : (this.state.useFuliType == 1 ? 2 : 0);
    }
    this.props.dispatch(detailsActions.calculatePopMoney(params));
  },
  closeHbList(e){
    if(this.state.showHB){
      this.setState({
        showHB: false
      })
    }
  },
  showHbFn(){
    if(this.state.showHB){
      this.setState({
        showHB: false
      })
    }else{
      this.setState({
        showHB: true
      })
    }
  },
  chooseHb(item){
    let str = '';
    this.state.userFuliItem = item;
    if(item.type == 0){
      str = item.amount/100+'元红包';
    }else if(item.type == 1){
      str = item.amount/100+'%加息券';
      if(this.state.isChangeBuy){
        let bidLeftM = this.state.allCanBuyNum
        this.calculatePopMoney(bidLeftM,item.amount);
      }else{
        this.calculatePopMoney(this.state.money*1000*100,item.amount);
      }
    }else{
      str = '不使用福利';
    }
    this.setState({
      couponUserId: item.couponUserId,
      isUseCoupon: item.type == 0 ? true : false,
      recStr: str,
      useFuliType:(item.type==0 || item.type) ? item.type : 'nouse',
      useFuliAmount:item.amount || 0
    })
  },
  chooseHZ(n){
    this.setState({
      chooseType : 'hz'
    })
    this.huiz.className = /paying-select/.test(this.huiz.className) ? this.huiz.className : this.huiz.className + ' paying-select';
    this.xjg.className = this.xjg.className.replace(/ paying-select/,'')
    if(!n){
      this.setState({
        canBuy:false,
        showErr : true
      })
    }else{
      this.setState({
        canBuy:this.state.money==0 ? false : true,
        showErr : false
      })
    }
  },
  chooseXjg(n){
    if(n){
      this.setState({
        chooseType : 'xjg',
        canBuy:this.state.money==0 ? false : true,
        showErr : false
      })
      this.xjg.className = this.xjg.className + ' paying-select'
      this.huiz.className = this.huiz.className.replace(/ paying-select/,'')
    }
  },
  closePop(){
    this.props.dispatch(newActionsPopup.newpopSetStatus({
      isShow: false
    }));
    window.clearTimeout(this.state.timer);
  },
  shenceBtn(){
    let baseObj = this.props.state.lcDetailsData.data.data;
    let IncomeOfInvestment = (this.props.state.newPop.willIncome-baseObj.totalAmountBid)*(this.props.state.newPop.howmuch/(baseObj.totalAmountBid+this.props.state.newPop.howmuch))/100;
    let baseInfObj = { //神策埋点专用
      PlatformType: 'pc',
      LoanId: '',//借款编号（暂无）
      ProjectName: baseObj.asset.title || '',
      ProjectType: '理财',//不知道从哪拿
      ProductType: '',//产品类型暂无
      ReleaseTime: '',//发布时间暂无
      IncomeType: baseObj.repayModeStr || '',
      InterestCalculationMethod: '',//利息计算方式（暂无）
      ProjectDeadline: baseObj.periods || '',
      LoanAnnualInterestRate: Number(baseObj.asset.investAnnualRate/100) || '',
      AmountOfInvestment:this.props.state.newPop.howmuch/100,
      IncomeOfInvestment: parseFloat(IncomeOfInvestment.toFixed(2)),
      CouponAmount:this.state.useFuliType == 0 ? this.state.useFuliAmount/100 : 0,
      RaiseAmount:this.state.useFuliType == 1 ? this.state.useFuliAmount/100 : 0,
      ActualPaidAmount:this.state.useFuliType == 0 ? (this.state.money*100000-this.state.useFuliAmount)/100 : this.state.money*1000,
      PaymentMethod:''
    };
    Util.sa('PayInvestmentProject',baseInfObj);
  },
  isNeedAllBuy(type){
    let popdata = this.props.popdata;
    let bidLeftM = popdata.investBidInfo.remainBidAmount,//标剩余可投金额
        myCanBuy = popdata.investBidInfo.canBidAmount,//用户对于该标可买金额
        minLimit = popdata.investBidInfo.biddingLimitMin,//该标最小起投金额
        willBuy = Number(this.state.money)*1000*100;//用户打算购买金额
        if(this.state.isChangeBuy)return false;
        bidLeftM = bidLeftM < myCanBuy ? bidLeftM : myCanBuy;
        if((bidLeftM < (minLimit*2)) && (bidLeftM - willBuy)!=0){//标的剩余可投金额不足(最小起投金额+递增尺度)
          this.couponFn(bidLeftM,type)
          this.setState({
            isChangeBuy: true,
            allCanBuy: ToolPE(bidLeftM),
            allCanBuyNum: bidLeftM
          })
          return true
        }else if((bidLeftM - willBuy < minLimit) && (bidLeftM - willBuy)!=0){//剩余可投金额不足最小起投金额（即剩余可投金额不足）
          let inpNum =  parseInt((bidLeftM - minLimit)/100000);
          this.couponFn(inpNum*1000*100,type)
          this.setState({
            isChangeBuy: true,
            allCanBuy: ToolPE(inpNum*1000*100),
            allCanBuyNum: inpNum*1000*100
          })
          return true
        }else{
          this.setState({
            isChangeBuy:false,
            allCanBuy: ToolPE(willBuy,type),
            allCanBuyNum: willBuy
          })
          return false
        }
  },
  sureBuy(){
    if(!this.state.canBuy||!this.state.isAgree2 || this.state.isError || !this.state.canBit)return;
    // if(this.state.isChangeBuy){
    //   if(!this.state.canBuy||!this.state.isAgree2||!this.state.isAgree1)return;
    // }else{

    // }

    if(this.isNeedAllBuy())return;
    this.setState({
      canBuy: false,
      canBit: false
    });

    //获取所用福利对应的对象
    let fuliObj = this.props.state.userFuli.data.data || {};
    fuliObj.coupons = fuliObj.coupons || [];
    fuliObj.raiseRates = fuliObj.raiseRates || [];
    let useFlObj = giveAry(Number(this.state.money)*1000*100,fuliObj.coupons,fuliObj.raiseRates)
    let params = {
      bidId:this.state.bid,
      productType:this.state.proType,
      bidAmount:this.state.isChangeBuy ? this.state.allCanBuyNum : Number(this.state.money)*1000*100,
      isUseCoupon:this.state.isUseCoupon
    };
    //福利类型
    if(this.state.useFuliType == 0){
      params.couponUserId = this.state.couponUserId;
    }else if(this.state.useFuliType == 1){
      params.raiseInterestCouponId = this.state.couponUserId;
    }
    //是否扫尾
    if(this.state.isAgree1){
      params.isFullAmountBuy = true;
    }else{
      params.isFullAmountBuy = false;
    }
    //投标账户
    if(this.state.chooseType=='hz'){
      params.investAccountType = 2;
    }else{
      params.investAccountType = 3;
    }
    this.props.dispatch(detailsActions.sureBuyThisBid(params,(data)=>{this.checkOk(data)}));
    // 神策函数执行
    this.shenceBtn();
  },
  checkOk(data){

    if(data.errorCode == 0){ //一次成功 或者 需要轮询
      this.state.pk = data.data.pendingKey;
      let params = {
        pk:data.data.pendingKey,
        investAccountType: this.state.chooseType == 'hz' ? 2 : 3 ,
        productType: this.state.proType
      }
      if(data.data.isPolling){ //需要轮询
        this.props.dispatch(detailsActions.checkBuyState(params,(data)=>{this.setResTimer(data)}))
      }else{ // 一次成功
        this.props.dispatch(detailsActions.getOperaData()) //弹框上的推广
        this.props.dispatch(newActionsPopup.newpopSetStatus({
            isShow: true,
            type: 'jjs',
            innerType: 'jjs_suc',
            errorType: 0
        }));
        // let _this = this;
        // var timer = window.setTimeout(function(){
        //   window.clearTimeout(timer);
        //   _this.props.dispatch(detailsActions.getLcDetailData({bid:_this.state.bid,proType:_this.state.proType}))//刷新该标数据
        //   _this.props.dispatch(detailsActions.investPersonList({bid:_this.state.bid,proType:_this.state.proType}));//获取投资人列表
        //   _this.props.dispatch(userBaseActions.getUserBaseAccount())//刷新用户数据
        // },1000)

      }
    }else if(data.errorCode == 1){ //未登录
      this.props.dispatch(actionsPopup.popupSetStatus({
        isShow: true,
        type: 'login',
        title: '快速登录',
        hasCancel: false,
        submitText: '关闭'
      }));
      this.props.dispatch(newActionsPopup.newpopSetStatus({
          isShow: false
      }));
    }else if(data.errorCode != 0){ // 购买出错
      this.props.dispatch(newActionsPopup.newpopSetStatus({
          isShow: true,
          type: 'jjs',
          innerType: 'jjs_error',
          errorType: data.errorCode
      }));
    }

  },
  setResTimer(data){
    if(data.errorCode != 0){ //轮询的接口请求出错
      this.props.dispatch(newActionsPopup.newpopSetStatus({
          isShow: true,
          type: 'jjs',
          innerType: 'jjs_error',
          errorType: -3
      }));
      return;
    }
    let params = {
      pk:this.state.pk,
      investAccountType: this.state.chooseType == 'hz' ? 2 : 3 ,
      productType: this.state.proType
    }
    let t = 500;
    if(this.state.postNum>9){
      t=1000;
    }
    if(data.data.retCode != 70){
      this.goWhichPop(data.data.retCode);
      return;
    }
    if(data.data.retCode == 70 && this.state.postNum<20){
      let that =this;
      this.state.timer = window.setTimeout(function(){
        that.state.postNum ++;
        that.props.dispatch(detailsActions.checkBuyState(params,(data)=>{that.setResTimer(data)}))
      },t)
    }
    if(this.state.postNum >= 20){
      this.props.dispatch(newActionsPopup.newpopSetStatus({
          isShow: true,
          type: 'jjs',
          innerType: 'jjs_error',
          errorType: -3
      }));
    }
  },
  goWhichPop(retcode){
    if(retcode == 0){
      this.props.dispatch(detailsActions.getOperaData()) //弹框上的推广
      this.props.dispatch(newActionsPopup.newpopSetStatus({
          isShow: true,
          type: 'jjs',
          innerType: 'jjs_suc',
          errorType: 0
      }));
      // this.props.dispatch(detailsActions.getLcDetailData({bid:this.state.bid,proType:this.state.proType}))//刷新该标数据
      // this.props.dispatch(detailsActions.investPersonList({bid:this.state.bid,proType:this.state.proType}));//获取投资人列表
      // this.props.dispatch(userBaseActions.getUserBaseAccount())//刷新用户数据
      return;
    }
    this.props.dispatch(newActionsPopup.newpopSetStatus({
        isShow: true,
        type: 'jjs',
        innerType: 'jjs_error',
        errorType: retcode
    }));
  },
  render() {
    let popdata = this.props.popdata;
    let month_day = '';
    if(popdata.investBidInfo){
      if(popdata.investBidInfo.month && popdata.investBidInfo.day){
        month_day = <div className="detail-popup-digital">
                      <span>{popdata.investBidInfo.month}</span><em>月</em>
                      <em>{popdata.investBidInfo.day}</em><em>天</em>
                    </div>;
      }else if(popdata.investBidInfo.month && !popdata.investBidInfo.day){
        month_day = <div className="detail-popup-digital">
                      <span>{popdata.investBidInfo.month}</span><em>月</em>
                    </div>;
      }else if(popdata.investBidInfo.day){
        month_day = <div className="detail-popup-digital">
                      <span>{popdata.investBidInfo.day}</span><em>天</em>
                    </div>;
      }else{
        month_day = <div className="detail-popup-digital">
                      <span>{popdata.investBidInfo.periods}</span>
                    </div>;
      }
    }

    let fuliObj = this.props.state.userFuli.data.data || {};
    fuliObj.coupons = fuliObj.coupons || [];
    fuliObj.raiseRates = fuliObj.raiseRates || [];
    let getFlObj = giveAry(Number(this.state.money)*1000*100,fuliObj.coupons,fuliObj.raiseRates);
    if(this.state.isChangeBuy){
      getFlObj = giveAry(Number(this.state.allCanBuyNum),fuliObj.coupons,fuliObj.raiseRates);
    }else{
      getFlObj = giveAry(Number(this.state.money)*1000*100,fuliObj.coupons,fuliObj.raiseRates);
    }

    let canUseRry = true,cantReason='';

    if((this.state.money*100000-this.state.useFuliAmount) > popdata.currentBalanceRry){
      canUseRry = false;
      cantReason = '日日盈可用金额不足';
      this.state.canBuy = false;
    }else if(popdata.rryLimitOfOne < (this.state.money*100000-this.state.useFuliAmount) || popdata.rryLimitOfDay < (this.state.money*100000-this.state.useFuliAmount)){
      canUseRry = false;
      cantReason = codes.local_tooltip.invest_rry_disable;
      this.state.canBuy = false;
    }else{
      this.state.canBuy = true;
    }

    if(this.state.chooseType == 'hz'){
      if((this.state.money*100000-this.state.useFuliAmount) > popdata.currentBalanceHuli){
        this.state.canBuy = false;
        this.state.showErr = true;
      }else{
        this.state.canBuy = true;
        this.state.showErr = false;
      }
    }
    if(Number(this.state.money) == 0){
      this.state.canBuy = false;
    }
    //预计支付金额
    const planPayCount = this.state.useFuliType == 0 ? (this.state.isChangeBuy ? this.state.allCanBuyNum-this.state.useFuliAmount : this.state.money*100000-this.state.useFuliAmount) : this.state.money*100000;
    const planPay = ToolPE(planPayCount);
    //慧赚余额
    const rechargeMoney = popdata.currentBalanceHuli ? ToolPE(popdata.currentBalanceHuli) : '0.00';
    //还需支付金额
    let needRecharge = popdata.currentBalanceHuli!=undefined ? ToolPE(planPayCount-popdata.currentBalanceHuli) : '';


    // console.log(this.props.popselfdata)
    return (
        <div onClick={this.closeHbList}>
          <div className="huli-popup-content">
              <div className="detail-popup-rows cf">
                  <div className="detail-popup-left lt">
                      <div className="detail-popup-digital">
                          <span>{popdata.investBidInfo ? ToolPE(popdata.investBidInfo.investAnnualRate) : '0.00'}</span><em>%</em>
                        {
                          popdata.investBidInfo && popdata.investBidInfo.extraAnnualRate
                          ?
                          <span className="detail-raise">
                              <span>+{ToolPE(popdata.investBidInfo.extraAnnualRate)}%</span>
                              <span className="ar_up"></span>
                          </span>
                          :null
                        }
                      </div>
                      <p className="detail-popup-nameof">约定年化利率</p>
                  </div>
                  <div className="gray-lines lt"></div>
                  <div className="detail-popup-center lt">
                      {month_day}
                      <p className="detail-popup-nameof">期限</p>
                  </div>
                  <div className="gray-lines lt"></div>
                  <div className="detail-popup-right lt">
                      <p className="detail-popup-times">{popdata.investBidInfo ? popdata.investBidInfo.repayModeStr : ''}</p>
                      <p className="detail-popup-nameof">还款方式</p>
                  </div>
              </div>

              <div className="popup-details-list">
                  <div className="detail-list-items cf">
                      <p className="detail-shift-names lt">认购金额</p>
                      {
                        this.state.isChangeBuy
                        ?
                        <div className={this.state.isError ? "popup-input-boxs lt error" : "popup-input-boxs lt"}>
                            <input disabled type="text" style={{width: '135px',background: '#fff'}} value={this.state.allCanBuy}/>
                            <span>元</span>
                            <div className="warn-text" style={{opacity: '0.8',width:'250px',left:'-45px'}}>
                                <div className="arrow" style={{left:'120px'}}></div>
                                <p style={{height: '25px'}}>{codes.local_tooltip.bid_limit_money_lc}</p>
                            </div>
                        </div>
                        :
                        <div className={this.state.focu ? (this.state.isError ? "popup-input-boxs lt error" : "popup-input-boxs lt focus") : 'popup-input-boxs lt'}>
                            <input type="text" ref={dom => {this.inpt = dom}} className=""  onChange={(e)=>{this.inpChange(e,popdata.currentBalanceHuli,popdata.currentBalanceRry,popdata.investBidInfo.canBidAmount,popdata)}} onClick={this.inpFocus} onBlur={this.inpBlur} value={this.state.money}/>
                            <span>,000元</span>
                            <div className="warn-text" style={{opacity: this.state.isError ? '0.8' : '0'}}>
                                <div className="arrow"></div>
                                <p style={{height: '25px'}}>{this.state.showErrMsg}</p>
                            </div>
                        </div>
                      }

                      <div className="expect-earnings lt">
                        <span className='lt'>预计收益</span>
                        <ToolTip data-text="local_tooltip.acc_asset_expectedRevenue"></ToolTip>
                        <em>{this.props.popselfdata.sumIncome||this.props.popselfdata.sumIncome==0 ? ToolPE(this.props.popselfdata.sumIncome) : '0.00'}元</em>
                      </div>
                      {/*<p className="error-text lt">错误提醒文案限制最多20个字符</p>*/}
                  </div>
                  <div className="detail-list-items cf">
                      <div className="detail-variable-names lt">
                        <span className='lt'>使用福利</span>
                        <ToolTip data-text="local_tooltip.inv_layer_benefit"></ToolTip>
                      </div>

                      <ChooseFL getFlObj={getFlObj} recStr={this.state.recStr} showHB={this.state.showHB} couponUserId={this.state.couponUserId} showHbFn={this.showHbFn} chooseHb={this.chooseHb}/>
                    {
                      (this.state.useFuliType == 1 && popdata.investBidInfo.extraAnnualRateType != 1) ?
                      <div className="expect-earnings lt">
                        <span className='lt'>预计加息收益</span>
                        <ToolTip data-text="local_tooltip.acc_asset_interestIncome"></ToolTip>
                        <em>{(this.props.popselfdata.sumRaiseIncome||this.props.popselfdata.sumRaiseIncome==0) ? ToolPE(this.props.popselfdata.sumRaiseIncome) : '0.00'}元</em>
                      </div>
                      :null
                    }

                  </div>
                  <div className="detail-list-items cf">
                      <p className="detail-variable-names lt">预计支付金额</p>
                      <p className="detail-actualPrice lt"><span>{planPay}</span><span>元</span></p>
                  </div>
              </div>

              <div className="paying-way cf">

                  <div className="paying-way-list lt paying-select" ref={(dom)=>{this.huiz = dom}} onClick={()=>{this.chooseHZ((this.state.money*100000-this.state.useFuliAmount) <= popdata.currentBalanceHuli)}}>{/* 选中状态是paying-select,余额不足加limit,余额为0元时加zero*/}
                    <div className="paying-way-boxs">

                        <em className="select-icon"></em>
                        <div className="paying-list">
                            <div className="surplus-nums cf">
                                <p className="lt">慧赚可用余额支付(元)</p>
                                <p className="rt num-money">{rechargeMoney}</p>
                            </div>
                        </div>
                    </div>
                    <div className="detail-popup-lack" style={{display:this.state.showErr ? "block" : 'none'}}>
                        <span>余额不足，还需{needRecharge}元，</span>
                        <a href={"https://www.huli.com/hl/#/myaccount/recharge/main?cash="+(planPayCount-popdata.currentBalanceHuli)} target="_blank">请充值</a>
                    </div>
                  </div>
                  <div className={"paying-way-list lt mar-l10 " + (!canUseRry ? 'zero' : '')} ref={(dom)=>{this.xjg = dom}} onClick={()=>{this.chooseXjg(canUseRry)}}>
                    <div className="paying-way-boxs ">
                        <em className="select-icon no-select"></em>
                        <div className="paying-list">
                            <div className="surplus-nums cf">
                                <p className="lt">日日盈支付(元)</p>
                                <p className="rt num-money">{popdata.currentBalanceRry ? ToolPE(popdata.currentBalanceRry) : '0.00'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="detail-popup-lack">
                        <span>{cantReason}</span>
                    </div>
                  </div>
              </div>

              <div className="detail-content-bottom">
                  {/*<div className="popup-checkbox cf">
                     <em className={this.state.isAgree1 ? "huli-common-icons checked lt" : 'huli-common-icons checked no-checked lt'} onClick={()=>{this.agreeMent(1)}}></em>
                     <span className="huli-agrees lt">若剩余可投金额不足，则自动投满。若使用红包则此选项无效。</span>
                     <ToolTip data-text="local_tooltip.inv_layer_tail" />
                  </div>*/}
                  <div className="popup-checkbox cf">
                     <em className={this.state.isAgree2 ? "huli-common-icons checked lt" : 'huli-common-icons checked no-checked lt'} onClick={()=>{this.agreeMent(2)}}></em>
                     <span className="huli-agrees lt">我已阅读并同意<a href={popdata.investBidInfo.agreementUrl} target="_blank">《{popdata.investBidInfo.agreementName}》</a></span>
                  </div>
                  {
                    popdata && popdata.investBidInfo && !popdata.investBidInfo.isSpecialAsset ?
                    <div className="popup-checkbox cf">
                       <span className="huli-agrees lt">产品合同包含：会员开户、风险提示、认购承诺、风险测评、认购协议</span>
                    </div>
                    :null
                  }

              </div>
          </div>

          <div className="huli-popup-footer">
              <div className="huli-popup-action">
                  <span>
                      <input type="button" className="gray-btn common-btn-130" value="取消" onClick={this.closePop}/>
                  </span>
                  <span>
                  {
                    this.props.popselfdata.leftTime?
                    <input type="button" className='blue-btn common-btn-130 false-btn' value={this.props.popselfdata.submitText}/>
                    :
                    <input type="button" className={(this.state.canBuy&&this.state.isAgree2&&!this.state.isError&&this.state.canBit) ? "blue-btn common-btn-130" : 'blue-btn common-btn-130 false-btn'} value="确认认购" onClick={this.sureBuy}/>
                  }
                     
                  </span>
              </div>
              <span className="huli-popup-risk">投资有风险，理财需谨慎</span>
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

export const jjsNormalDo = connect(
  mapStateToProps,mapDispatchToProps
)(jjs_normal_do);
